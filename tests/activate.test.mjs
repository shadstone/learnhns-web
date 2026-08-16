import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeRecords,
  buildDnsWireQuery,
  createProfileProposal,
  createWebsiteProposal,
  getPublishingContext,
  normalizeName,
  parseDnsJsonResponse,
  parseDnsWireResponse,
  parseTxtValue,
  validateProfileField,
} from '../src/lib/activate.mjs';

test('normalizes HNS names and rejects paths or invalid labels', () => {
  assert.deepEqual(normalizeName('HNS://München/'), { displayName: 'münchen', asciiName: 'xn--mnchen-3ya' });
  assert.deepEqual(normalizeName('mike.agent.'), { displayName: 'mike.agent', asciiName: 'mike.agent' });
  assert.throws(() => normalizeName('bad name'), /valid Handshake name/);
});

test('parses and joins quoted TXT chunks', () => {
  assert.equal(parseTxtValue('"name:Mike" " the builder"'), 'name:Mike the builder');
  assert.equal(parseTxtValue('bio:Hello'), 'bio:Hello');
});

test('validates resolver question provenance', () => {
  const response = {
    Status: 0,
    Question: [{ name: 'mike.agent.', type: 1 }],
    Answer: [{ name: 'mike.agent.', type: 1, TTL: 60, data: '203.0.113.9' }],
  };
  assert.equal(parseDnsJsonResponse(response, 'mike.agent', 'A')[0].value, '203.0.113.9');
  assert.throws(() => parseDnsJsonResponse(response, 'other.agent', 'A'), /did not match/);
});

test('builds and validates a binary DoH response', () => {
  const query = buildDnsWireQuery('skyinclude', 'A', 0x1234);
  const question = query.slice(12);
  const answer = Uint8Array.from([0xc0, 0x0c, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x04, 203, 0, 113, 8]);
  const response = new Uint8Array(12 + question.length + answer.length);
  response.set([0x12, 0x34, 0x81, 0x80, 0x00, 0x01, 0x00, 0x01, 0, 0, 0, 0]);
  response.set(question, 12);
  response.set(answer, 12 + question.length);
  const parsed = parseDnsWireResponse(response, 'skyinclude', 'A', 0x1234);
  assert.deepEqual(parsed.records[0], { type: 'A', name: '@', value: '203.0.113.8', ttl: 60 });
});

test('detects website, profile, redirect, payment, and agent capabilities', () => {
  const result = analyzeRecords([
    { type: 'A', name: '@', value: '203.0.113.9' },
    { type: 'TXT', name: '@', value: 'name:Mike' },
    { type: 'TXT', name: '@', value: 'link:https://example.com' },
    { type: 'TXT', name: '@', value: 'hns:hs1abc' },
    { type: 'TXT', name: '@', value: 'agent-manifest:https://example.com/agent.json' },
  ]);
  assert.equal(result.capabilities.website, true);
  assert.equal(result.capabilities.profile, true);
  assert.equal(result.capabilities.redirect, true);
  assert.equal(result.capabilities.payment, true);
  assert.equal(result.capabilities.agent, true);
});

test('website proposal replaces only explicitly edited address types', () => {
  const current = [
    { type: 'A', name: '@', value: '192.0.2.1' },
    { type: 'TXT', name: '@', value: 'name:Preserve me' },
    { type: 'NS', name: '@', value: 'ns1.example.' },
  ];
  const proposal = createWebsiteProposal(current, { name: 'skyinclude', ipv4: '203.0.113.8' });
  assert.deepEqual(proposal.errors, []);
  assert.equal(proposal.records.some((record) => record.value === '192.0.2.1'), false);
  assert.equal(proposal.records.some((record) => record.value === 'name:Preserve me'), true);
  assert.equal(proposal.records.some((record) => record.type === 'NS'), true);
  assert.equal(proposal.publicationPatch[0].type, 'SYNTH4');
});

test('distinguishes on-chain TLD records from delegated zone records', () => {
  assert.equal(getPublishingContext('skyinclude').addressTypes.ipv4, 'SYNTH4');
  assert.equal(getPublishingContext('mike.agent').addressTypes.ipv4, 'A');
  const proposal = createWebsiteProposal([], { name: 'mike.agent', ipv4: '203.0.113.8' });
  assert.equal(proposal.publicationPatch[0].type, 'A');
});

test('profile proposal updates selected prefixes and preserves all other records', () => {
  const current = [
    { type: 'A', name: '@', value: '203.0.113.8' },
    { type: 'TXT', name: '@', value: 'name:Old name' },
    { type: 'TXT', name: '@', value: 'custom-record:keep' },
    { type: 'TXT', name: '@', value: 'agent-manifest:https://example.com/agent.json' },
  ];
  const proposal = createProfileProposal(current, { __name: 'example', name: 'New name', bio: 'Building on HNS' });
  assert.deepEqual(proposal.errors, []);
  assert.equal(proposal.records.some((record) => record.value === 'name:Old name'), false);
  assert.equal(proposal.records.some((record) => record.value === 'name:New name'), true);
  assert.equal(proposal.records.some((record) => record.value === 'custom-record:keep'), true);
  assert.equal(proposal.records.some((record) => record.type === 'A'), true);
});

test('invalid proposals cannot alter the current resource', () => {
  const current = [{ type: 'TXT', name: '@', value: 'name:Existing' }];
  const proposal = createWebsiteProposal(current, { ipv4: '999.1.1.1' });
  assert.ok(proposal.errors.length);
  assert.deepEqual(proposal.records, current);
});

test('rejects unsafe profile link schemes', () => {
  assert.match(validateProfileField('link', 'javascript://alert.example'), /HTTP or HTTPS/);
  assert.equal(validateProfileField('link', 'https://example.com/profile'), null);
  assert.equal(validateProfileField('link', 'example.com/profile'), null);
});
