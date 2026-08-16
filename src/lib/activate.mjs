import punycode from 'punycode/punycode.js';

export const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'NS', 'DS', 'TXT', 'TLSA'];

export const PROFILE_FIELDS = [
  { key: 'name', label: 'Display name', group: 'identity' },
  { key: 'bio', label: 'Short bio', group: 'identity' },
  { key: 'pfp', label: 'Profile image URL', group: 'identity' },
  { key: 'link', label: 'Website or primary link', group: 'web' },
  { key: 'mail', label: 'Email', group: 'contact' },
  { key: 'x', label: 'X username', group: 'social' },
  { key: 'gh', label: 'GitHub username', group: 'social' },
  { key: 'hns', label: 'Handshake address', group: 'wallet' },
  { key: 'btc', label: 'Bitcoin address', group: 'wallet' },
];

export const PROFILE_PREFIXES = new Set([
  ...PROFILE_FIELDS.map(({ key }) => key),
  'custom', 'description', 'category', 'bg', 'bgcolor', 'fav', 'tel', 'tb',
  'sx', 'matrix', 'sn', 'wa', 'tg', 'ens', 'onion', 'ipfs', 'pk', 'nostr',
  'bsky', 'ig', 'fb', 'yt', 'rumble', 'ln', 'eth', 'sol', 'doge', 'ltc',
  'xmr', 'zec', 'dash', 'ext', 'agent-manifest', 'skill-md',
  'agent-capabilities', 'arp', 'bmos', 'mpp_enabled', 'tempo_address',
]);

const TYPE_NUMBERS = { A: 1, NS: 2, CNAME: 5, DS: 43, TXT: 16, AAAA: 28, TLSA: 52 };

export function buildDnsWireQuery(name, type, queryId = Math.floor(Math.random() * 65535)) {
  const labels = String(name).split('.');
  const length = 12 + labels.reduce((sum, label) => sum + 1 + label.length, 0) + 1 + 4;
  const bytes = new Uint8Array(length);
  const view = new DataView(bytes.buffer);
  view.setUint16(0, queryId);
  view.setUint16(2, 0x0100);
  view.setUint16(4, 1);
  let offset = 12;
  for (const label of labels) {
    bytes[offset++] = label.length;
    for (const character of label) bytes[offset++] = character.charCodeAt(0);
  }
  bytes[offset++] = 0;
  view.setUint16(offset, TYPE_NUMBERS[type]);
  view.setUint16(offset + 2, 1);
  return bytes;
}

function readDnsName(bytes, start) {
  const labels = [];
  const seen = new Set();
  let offset = start;
  let next = start;
  let jumped = false;
  while (offset < bytes.length) {
    if (seen.has(offset)) throw new Error('The DNS response contains a compression loop.');
    seen.add(offset);
    const length = bytes[offset];
    if (length === 0) {
      if (!jumped) next = offset + 1;
      return { name: labels.join('.').toLowerCase(), offset: next };
    }
    if ((length & 0xc0) === 0xc0) {
      if (offset + 1 >= bytes.length) throw new Error('The DNS response has a truncated pointer.');
      const pointer = ((length & 0x3f) << 8) | bytes[offset + 1];
      if (!jumped) next = offset + 2;
      jumped = true;
      offset = pointer;
      continue;
    }
    if (length > 63 || offset + 1 + length > bytes.length) throw new Error('The DNS response has a malformed name.');
    labels.push(String.fromCharCode(...bytes.slice(offset + 1, offset + 1 + length)));
    offset += length + 1;
    if (!jumped) next = offset;
  }
  throw new Error('The DNS response ended inside a name.');
}

function ipv6FromBytes(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const groups = [];
  for (let i = 0; i < 8; i += 1) groups.push(view.getUint16(i * 2).toString(16));
  return groups.join(':').replace(/(?:^|:)0(?::0)+(?=:|$)/, '::');
}

function hex(bytes) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
}

export function parseDnsWireResponse(buffer, expectedName, type, expectedId) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  if (bytes.length < 12) throw new Error('The DNS response is shorter than its header.');
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const id = view.getUint16(0);
  const flags = view.getUint16(2);
  const qdcount = view.getUint16(4);
  const ancount = view.getUint16(6);
  const status = flags & 0x000f;
  if ((flags & 0x8000) === 0) throw new Error('The DNS message is not a response.');
  if (expectedId !== undefined && id !== expectedId) throw new Error('The DNS response ID did not match the query.');
  if (qdcount !== 1) throw new Error('The DNS response must contain one question.');
  if (![0, 3].includes(status)) throw new Error(`The resolver returned DNS status ${status}.`);

  let offset = 12;
  const question = readDnsName(bytes, offset);
  offset = question.offset;
  if (offset + 4 > bytes.length) throw new Error('The DNS question is truncated.');
  const questionType = view.getUint16(offset);
  offset += 4;
  if (question.name !== String(expectedName).toLowerCase() || questionType !== TYPE_NUMBERS[type]) {
    throw new Error('The resolver response did not match the requested name and type.');
  }
  if (status === 3) return { status, records: [] };

  const records = [];
  for (let index = 0; index < ancount; index += 1) {
    const answerName = readDnsName(bytes, offset);
    offset = answerName.offset;
    if (offset + 10 > bytes.length) throw new Error('The DNS answer is truncated.');
    const answerType = view.getUint16(offset);
    const ttl = view.getUint32(offset + 4);
    const rdlength = view.getUint16(offset + 8);
    offset += 10;
    if (offset + rdlength > bytes.length) throw new Error('The DNS record exceeds the response.');
    const rdataStart = offset;
    const rdata = bytes.slice(offset, offset + rdlength);
    offset += rdlength;
    if (answerType !== TYPE_NUMBERS[type]) continue;

    let value = '';
    if (type === 'A' && rdata.length === 4) value = Array.from(rdata).join('.');
    else if (type === 'AAAA' && rdata.length === 16) value = ipv6FromBytes(rdata);
    else if (type === 'CNAME' || type === 'NS') value = readDnsName(bytes, rdataStart).name;
    else if (type === 'TXT') {
      const chunks = [];
      let cursor = 0;
      while (cursor < rdata.length) {
        const chunkLength = rdata[cursor++];
        if (cursor + chunkLength > rdata.length) throw new Error('The TXT record is malformed.');
        chunks.push(String.fromCharCode(...rdata.slice(cursor, cursor + chunkLength)));
        cursor += chunkLength;
      }
      value = chunks.join('');
    } else if (type === 'DS' && rdata.length >= 4) {
      const rview = new DataView(rdata.buffer, rdata.byteOffset, rdata.byteLength);
      value = `${rview.getUint16(0)} ${rdata[2]} ${rdata[3]} ${hex(rdata.slice(4))}`;
    } else if (type === 'TLSA' && rdata.length >= 3) {
      value = `${rdata[0]} ${rdata[1]} ${rdata[2]} ${hex(rdata.slice(3))}`;
    }
    if (value) records.push({ type, name: type === 'TLSA' ? '_443._tcp' : '@', value, ttl });
  }
  return { status, records };
}

export function normalizeName(input) {
  let value = String(input || '').trim();
  if (!value) throw new Error('Enter a Handshake name.');
  value = value.replace(/^hns:\/\//i, '').replace(/^https?:\/\//i, '');
  value = value.split(/[/?#]/, 1)[0].replace(/\.$/, '').toLowerCase();
  if (!value) throw new Error('Enter a Handshake name.');

  let ascii;
  try {
    ascii = punycode.toASCII(value);
  } catch {
    throw new Error('That name could not be converted to DNS format.');
  }

  if (ascii.length > 253) throw new Error('The DNS name is too long.');
  const labels = ascii.split('.');
  if (labels.some((label) => !label || label.length > 63 || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label))) {
    throw new Error('Use a valid Handshake name without paths or spaces.');
  }
  return { displayName: value, asciiName: ascii };
}

export function parseTxtValue(input) {
  const value = String(input ?? '').trim();
  if (!value.startsWith('"')) return value;
  const chunks = [];
  const pattern = /"((?:\\.|[^"\\])*)"/g;
  let match;
  while ((match = pattern.exec(value)) !== null) {
    try {
      chunks.push(JSON.parse(`"${match[1]}"`));
    } catch {
      throw new Error('Malformed quoted TXT record.');
    }
  }
  if (!chunks.length) throw new Error('Malformed quoted TXT record.');
  return chunks.join('');
}

export function parseDnsJsonResponse(data, expectedName, type) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('The resolver returned malformed JSON.');
  }
  const status = Number(data.Status);
  if (!Number.isInteger(status)) throw new Error('The resolver response has no DNS status.');
  if (![0, 3].includes(status)) throw new Error(`The resolver returned DNS status ${status}.`);

  const questions = Array.isArray(data.Question) ? data.Question : [];
  const queryName = type === 'TLSA' ? `_443._tcp.${expectedName}` : expectedName;
  const normalizedQuestion = String(questions[0]?.name || '').replace(/\.$/, '').toLowerCase();
  if (questions.length !== 1 || normalizedQuestion !== queryName || Number(questions[0]?.type) !== TYPE_NUMBERS[type]) {
    throw new Error('The resolver response did not match the requested name and type.');
  }

  const answers = status === 3 ? [] : (Array.isArray(data.Answer) ? data.Answer : []);
  return answers
    .filter((answer) => Number(answer?.type) === TYPE_NUMBERS[type])
    .map((answer) => ({
      type,
      name: type === 'TLSA' ? '_443._tcp' : '@',
      value: type === 'TXT' ? parseTxtValue(answer.data) : String(answer.data || '').replace(/\.$/, '').trim(),
      ttl: Number.isFinite(Number(answer.TTL)) ? Number(answer.TTL) : null,
    }))
    .filter((record) => record.value);
}

export function emptyRecordSet() {
  return Object.fromEntries(RECORD_TYPES.map((type) => [type, []]));
}

export function recordsToSet(records = []) {
  const set = emptyRecordSet();
  for (const record of records) {
    if (set[record.type]) set[record.type].push({ ...record });
  }
  return set;
}

export function flattenRecordSet(set = {}) {
  return RECORD_TYPES.flatMap((type) => (set[type] || []).map((record) => ({ ...record, type })));
}

export function parseProfile(records = []) {
  const fields = {};
  const entries = [];
  for (const record of records.filter((item) => item.type === 'TXT')) {
    const match = String(record.value).match(/^([a-z0-9_-]+)\s*([:=])\s*(.*)$/i);
    if (!match) continue;
    const key = match[1].toLowerCase();
    if (!PROFILE_PREFIXES.has(key)) continue;
    const entry = { key, value: match[3].trim(), separator: match[2], raw: record.value };
    entries.push(entry);
    if (!(key in fields)) fields[key] = entry.value;
  }
  return { fields, entries };
}

export function analyzeRecords(records = []) {
  const set = recordsToSet(records);
  const profile = parseProfile(records);
  const txtValues = set.TXT.map(({ value }) => value);
  return {
    set,
    profile,
    capabilities: {
      website: set.A.length > 0 || set.AAAA.length > 0 || set.CNAME.length > 0,
      delegatedDns: set.NS.length > 0,
      dnssec: set.DS.length > 0,
      dane: set.TLSA.length > 0,
      profile: profile.entries.length > 0,
      redirect: txtValues.some((value) => /^link\s*[:=]/i.test(value)),
      ipfs: txtValues.some((value) => /^ipfs\s*[:=]/i.test(value)),
      payment: txtValues.some((value) => /^(hns|btc|ln|eth|xmr)\s*[:=]/i.test(value)),
      agent: txtValues.some((value) => /^(agent-manifest|skill-md|agent-capabilities|arp)\s*[:=]/i.test(value)),
    },
  };
}

export function getPublishingContext(name) {
  const onchain = !String(name || '').includes('.');
  return onchain
    ? {
        id: 'handshake-onchain',
        label: 'On-chain Handshake TLD resource',
        addressTypes: { ipv4: 'SYNTH4', ipv6: 'SYNTH6' },
        manager: 'Bob LearnHNS or another HNS wallet',
      }
    : {
        id: 'authoritative-zone',
        label: 'Authoritative DNS / registry zone',
        addressTypes: { ipv4: 'A', ipv6: 'AAAA' },
        manager: 'the authoritative DNS or registry manager',
      };
}

export function isValidIpv4(value) {
  const parts = String(value || '').trim().split('.');
  return parts.length === 4 && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255 && String(Number(part)) === part);
}

export function isValidIpv6(value) {
  const input = String(value || '').trim();
  if (!input || !input.includes(':') || !/^[0-9a-f:]+$/i.test(input)) return false;
  if ((input.match(/::/g) || []).length > 1) return false;
  const sides = input.split('::');
  const groups = sides.flatMap((side) => side ? side.split(':') : []);
  if (groups.some((group) => !/^[0-9a-f]{1,4}$/i.test(group))) return false;
  return sides.length === 2 ? groups.length < 8 : groups.length === 8;
}

export function validateProfileField(key, value) {
  const clean = String(value || '').trim();
  if (!clean) return null;
  if (clean.length > 500) return `${key} is too long for this first release.`;
  if (['pfp', 'link'].includes(key)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(clean) && !/^https?:\/\//i.test(clean)) {
      return `${key} must use HTTP or HTTPS.`;
    }
    let url;
    try {
      url = new URL(/^https?:\/\//i.test(clean) ? clean : `https://${clean}`);
    } catch {
      return `${key} must be a valid web URL.`;
    }
    if (!['http:', 'https:'].includes(url.protocol)) return `${key} must use HTTP or HTTPS.`;
  }
  if (key === 'mail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return 'mail must be a valid email address.';
  if (['x', 'gh'].includes(key) && !/^[a-z0-9_.-]{1,80}$/i.test(clean.replace(/^@/, ''))) return `${key} contains unsupported characters.`;
  if (/[\u0000-\u001f\u007f]/.test(clean)) return `${key} contains control characters.`;
  return null;
}

function cloneRecords(records) {
  return records.map((record) => ({ ...record }));
}

export function createWebsiteProposal(currentRecords, values = {}) {
  const ipv4 = String(values.ipv4 || '').trim();
  const ipv6 = String(values.ipv6 || '').trim();
  const errors = [];
  if (!ipv4 && !ipv6) errors.push('Add at least one IPv4 or IPv6 address.');
  if (ipv4 && !isValidIpv4(ipv4)) errors.push('Enter a valid IPv4 address.');
  if (ipv6 && !isValidIpv6(ipv6)) errors.push('Enter a valid IPv6 address.');
  if (errors.length) return { errors, records: cloneRecords(currentRecords), changes: [] };

  const records = cloneRecords(currentRecords).filter(({ type }) => !['A', 'AAAA'].includes(type));
  if (ipv4) records.push({ type: 'A', name: '@', value: ipv4, ttl: null });
  if (ipv6) records.push({ type: 'AAAA', name: '@', value: ipv6, ttl: null });
  const context = getPublishingContext(values.name);
  const before = currentRecords.filter(({ type }) => ['A', 'AAAA'].includes(type));
  const patch = [];
  if (ipv4) patch.push({ type: context.addressTypes.ipv4, name: '@', value: ipv4 });
  if (ipv6) patch.push({ type: context.addressTypes.ipv6, name: '@', value: ipv6 });
  return {
    errors: [],
    records,
    publicationPatch: patch,
    publishingContext: context,
    changes: [{ section: `${context.label} website patch`, before, after: patch }],
  };
}

export function createProfileProposal(currentRecords, values = {}) {
  const errors = [];
  const updates = {};
  for (const { key } of PROFILE_FIELDS) {
    const value = String(values[key] || '').trim();
    const error = validateProfileField(key, value);
    if (error) errors.push(error);
    if (value) updates[key] = value;
  }
  if (!Object.keys(updates).length) errors.push('Add at least one profile field.');
  if (errors.length) return { errors, records: cloneRecords(currentRecords), changes: [] };

  const updatedKeys = new Set(Object.keys(updates));
  const kept = cloneRecords(currentRecords).filter((record) => {
    if (record.type !== 'TXT') return true;
    const match = String(record.value).match(/^([a-z0-9_-]+)\s*[:=]/i);
    return !match || !updatedKeys.has(match[1].toLowerCase());
  });
  const added = Object.entries(updates).map(([key, value]) => ({ type: 'TXT', name: '@', value: `${key}:${value}`, ttl: null }));
  const before = currentRecords.filter((record) => record.type === 'TXT' && (() => {
    const match = String(record.value).match(/^([a-z0-9_-]+)\s*[:=]/i);
    return match && updatedKeys.has(match[1].toLowerCase());
  })());
  const context = getPublishingContext(values.__name);
  const patch = added.map((record) => context.id === 'handshake-onchain'
    ? { type: 'TXT', txt: [record.value] }
    : record);
  return {
    errors: [],
    records: [...kept, ...added],
    publicationPatch: patch,
    publishingContext: context,
    changes: [{ section: `${context.label} profile patch`, before, after: patch.map((record) => record.txt ? { type: 'TXT', name: '@', value: record.txt[0] } : record) }],
  };
}

export function buildExport({ name, resolver, currentRecords, proposal, mode, canonicalResourceHex = null }) {
  return {
    version: 'learnhns-activate-0.1',
    name,
    mode,
    generatedAt: new Date().toISOString(),
    resolver,
    publishingContext: proposal.publishingContext,
    warning: proposal.publishingContext?.id === 'handshake-onchain'
      ? 'This patch is not a standalone Handshake UPDATE payload. A trusted wallet must decode the canonical resource, merge this patch, and show the complete resource before signing.'
      : 'Apply this patch in the authoritative DNS or registry manager, preserving unrelated zone records.',
    canonicalOnchainResourceHex: canonicalResourceHex,
    observedDnsRecords: cloneRecords(currentRecords),
    desiredDnsRecords: cloneRecords(proposal.records),
    publicationPatch: cloneRecords(proposal.publicationPatch || []),
    changes: proposal.changes,
  };
}

export function formatRecord(record) {
  return `${record.name || '@'} ${record.type} ${record.value}`;
}
