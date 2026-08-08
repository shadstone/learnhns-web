/**
 * Build Telegram pin text from community-resources data.
 *
 * - plain (compact): bare https:// URLs in parentheses — under Telegram’s
 *   4096-char limit so you can paste into Edit message. Telegram auto-links URLs.
 * - plain (full): longer labels/notes — may exceed 4096; good for review only.
 * - html: Bot API parse_mode=HTML (hyperlinked titles; visible text under limit).
 *
 * Note: only the original author can edit a human-posted pin. A bot can only
 * edit messages it sent — re-post via bot once if you want automation later.
 */

import {
  banPolicy,
  communityMeta,
  communitySections,
  isInactive,
  type CommunityLink,
} from '../data/community-resources';

const SITE = 'https://learnhns.com';
export const TELEGRAM_MSG_LIMIT = 4096;

export type PlainMode = 'compact' | 'full';

export function absoluteUrl(href: string, originalUrl?: string): string | null {
  if (originalUrl) return originalUrl;
  if (!href || href === '#') return null;
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('tg:')) {
    return href;
  }
  if (href.startsWith('/')) return `${SITE}${href}`;
  return href;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Shorter titles so plain paste with full URLs stays under 4096 */
const COMPACT_TITLES: Record<string, string> = {
  'Beginner guides and documentation': 'Beginner guides',
  'Maintained ecosystem directory': 'Ecosystem directory',
  'Bob LearnHNS 2026 desktop build': 'Bob LearnHNS 2026',
  'FireWallet HSD frontend': 'FireWallet',
  'Namebase registrar/registry': 'Namebase (closed)',
  'Previous Namebase migration': 'Namebase migration',
  'Name lookup and management': 'Name lookup (HNS.ID)',
  'HSD developer documentation': 'HSD docs',
  'HSD API documentation': 'HSD API',
  'FireHSD public API source': 'FireHSD',
  'Handshake Improvement Proposals': 'HIPs',
  'Handshake GitHub organization': 'handshake-org',
  'HNS DANE Browser for Android': 'HNS DANE Browser Android',
  'Fingertip desktop resolver and DANE': 'Fingertip',
  'HNSDoH community resolver': 'HNSDoH',
  'Easy HNS resolver and setup guides': 'Easy HNS',
  'Self-hosted resolver guide': 'Self-hosted resolver',
  'DANE/TLSA record generator': 'DANE generator',
  'HNS Live domain directory': 'HNS Live',
  'HNS network topology visualization': 'HNS topology',
  'LearnHNS hosting guide': 'Hosting guide',
  'Supply and network statistics': 'Network stats',
  'Halvings and emission schedule': 'Halvings',
  'SkyInclude news and guides': 'SkyInclude',
  'SkyInclude desktop browser': 'SkyInclude browser',
  'HNSGo Android SPV resolver': 'HNSGo',
};

function statusSuffix(link: CommunityLink, mode: PlainMode): string {
  if (mode === 'compact') {
    // Status folded into compact titles where needed (e.g. Namebase closed)
    if (link.status === 'beta') return ' (beta)';
    if (link.status === 'closed' && !COMPACT_TITLES[link.title]?.includes('closed')) {
      return ' (closed)';
    }
    return '';
  }
  if (link.status === 'beta') return ' (beta)';
  if (link.status === 'experimental') return ' (experimental)';
  if (link.status === 'prerelease') return ' (pre-release)';
  if (link.status === 'legacy') return ' (experimental/legacy)';
  if (link.status === 'closed') return ' (closed)';
  if (link.status === 'offline') return ' (offline)';
  return '';
}

function fullExtra(link: CommunityLink): string {
  const status = statusSuffix(link, 'full');
  if (link.note && /some entries are outdated/i.test(link.note)) {
    return ' (some entries are outdated)';
  }
  if (status) return status;
  if (
    link.note &&
    link.note.length <= 90 &&
    /privacy-focused|decentralized hosting|IPFS/i.test(link.note)
  ) {
    return ` - ${link.note}`;
  }
  return '';
}

function displayTitle(link: CommunityLink, mode: PlainMode): string {
  if (mode === 'compact') return COMPACT_TITLES[link.title] ?? link.title;
  return link.title;
}

function linkUrl(link: CommunityLink): string | null {
  // Closed Namebase: point at sunset page when compact
  if (link.status === 'closed' && link.originalUrl) {
    if (link.title.includes('Namebase') && link.title.includes('registrar')) {
      return 'https://sunset.namebase.io/';
    }
    return link.originalUrl;
  }
  return absoluteUrl(link.href, isInactive(link.status) ? link.originalUrl : undefined);
}

function formatLinkPlain(link: CommunityLink, mode: PlainMode): string {
  const url = linkUrl(link);
  const title = displayTitle(link, mode);

  if (mode === 'full' && (link.title === 'HSD' || link.title === 'handshake-node' || link.title === 'HNSD')) {
    const label =
      link.title === 'HSD'
        ? 'JavaScript full/SPV node and wallet'
        : link.title === 'handshake-node'
          ? 'Go full-node release candidate'
          : 'C SPV resolver/light client';
    const tail = link.title === 'handshake-node' ? '; no wallet' : '';
    if (url) return `• ${link.title} - ${label} (${url})${tail}`;
    return `• ${link.title} - ${label}${tail}`;
  }

  const extra = mode === 'compact' ? statusSuffix(link, 'compact') : fullExtra(link);
  if (url) return `• ${title} (${url})${extra}`;
  return `• ${title}${extra}`;
}

function formatLinkHtml(link: CommunityLink): string {
  const url = linkUrl(link);
  const extra = fullExtra(link);
  const extraHtml = escapeHtml(extra);

  if (link.title === 'HSD' || link.title === 'handshake-node' || link.title === 'HNSD') {
    const label =
      link.title === 'HSD'
        ? 'JavaScript full/SPV node and wallet'
        : link.title === 'handshake-node'
          ? 'Go full-node release candidate'
          : 'C SPV resolver/light client';
    const tail = link.title === 'handshake-node' ? '; no wallet' : '';
    if (url) {
      return `• ${escapeHtml(link.title)} - <a href="${escapeHtml(url)}">${escapeHtml(label)}</a>${escapeHtml(tail)}`;
    }
    return `• ${escapeHtml(link.title)} - ${escapeHtml(label)}${escapeHtml(tail)}`;
  }

  if (url) {
    return `• <a href="${escapeHtml(url)}">${escapeHtml(link.title)}</a>${extraHtml}`;
  }
  return `• ${escapeHtml(link.title)}${extraHtml}`;
}

function sectionHeadingPlain(emoji: string, title: string, mode: PlainMode): string {
  const t =
    mode === 'compact' && title.toLowerCase().startsWith('regional')
      ? 'Regional'
      : title.toUpperCase();
  return `${emoji} ${t}`;
}

/**
 * Plain text for manual Telegram edit.
 * Default compact mode targets ≤4096 characters with full URLs (auto-linked).
 */
export function formatTelegramPlain(mode: PlainMode = 'compact'): string {
  const shortDisclaimer =
    mode === 'compact'
      ? 'Handshake is decentralized. No single official foundation, company, or website. Projects below are independent.'
      : communityMeta.disclaimer;

  const banBody =
    mode === 'compact'
      ? 'Scams, impersonation, spam, unsolicited DMs, OTC, harassment, or persistent disruption.'
      : banPolicy.body;

  const parts: string[] = [
    '🤝 HANDSHAKE (HNS) GENERAL CHAT - START HERE',
    `Last audited: ${communityMeta.lastAuditedLabel} from ${communityMeta.auditedBy}`,
  ];

  if (communityMeta.lastEditedLabel && communityMeta.lastEditedBy) {
    parts.push(
      `Last edited: ${communityMeta.lastEditedLabel} from ${communityMeta.lastEditedBy}`,
    );
  }

  parts.push('');
  parts.push(shortDisclaimer);
  parts.push('');
  parts.push('⚠️ SECURITY');
  parts.push(
    'Admins and support will never DM first, request remote access, or offer an OTC trade.',
  );
  parts.push('Never share your seed phrase, private key, password, or API key.');
  parts.push(
    'Verify domains, repositories, release signatures/checksums, and app publishers before installing software or sending funds.',
  );
  parts.push('');

  if (mode === 'compact') {
    parts.push(`Living list + suggest edits: ${SITE}/community/`);
    parts.push('');
  }

  for (const section of communitySections) {
    parts.push(sectionHeadingPlain(section.emoji, section.title, mode));
    for (const link of section.links) {
      // Compact: skip redundant Namebase migration if registrar row already points at sunset
      if (
        mode === 'compact' &&
        link.title === 'Previous Namebase migration' &&
        communitySections.some((s) =>
          s.links.some((l) => l.title === 'Namebase registrar/registry' && l.status === 'closed'),
        )
      ) {
        continue;
      }
      parts.push(formatLinkPlain(link, mode));
    }
    if (section.lede && mode === 'full') {
      parts.push(section.lede);
    }
    parts.push('');
  }

  parts.push(`🚫 ${banPolicy.title.toUpperCase()}`);
  parts.push(banBody);
  parts.push('');
  parts.push(
    mode === 'compact'
      ? 'Keep support discussions public. Report broken/unsafe links to admins.'
      : 'Keep support discussions public. Report broken or unsafe links to the admins, or suggest edits at https://learnhns.com/community/',
  );

  return parts.join('\n').trim() + '\n';
}

/**
 * HTML for Telegram Bot API (parse_mode=HTML).
 * Hyperlinked titles — shorter visible text; only works if the bot authored the message.
 */
export function formatTelegramHtml(): string {
  const parts: string[] = [
    '<b><u>🤝 HANDSHAKE (HNS) GENERAL CHAT - START HERE</u></b>',
    `<i>Last audited: ${escapeHtml(communityMeta.lastAuditedLabel)}</i> from ${escapeHtml(communityMeta.auditedBy)}`,
  ];
  if (communityMeta.lastEditedLabel && communityMeta.lastEditedBy) {
    parts.push(
      `<i>Last edited: ${escapeHtml(communityMeta.lastEditedLabel)}</i> from ${escapeHtml(communityMeta.lastEditedBy)}`,
    );
  }
  parts.push('');
  parts.push(escapeHtml(communityMeta.disclaimer));
  parts.push('');
  parts.push('<b>⚠️ SECURITY</b>');
  parts.push(
    'Admins and support will <s>DM first</s> <b>never DM first</b>, request remote access, or offer an OTC trade.',
  );
  parts.push(escapeHtml('Never share your seed phrase, private key, password, or API key.'));
  parts.push(
    escapeHtml(
      'Verify domains, repositories, release signatures/checksums, and app publishers before installing software or sending funds.',
    ),
  );
  parts.push('');
  parts.push(
    `Living list + suggest edits: <a href="${SITE}/community/">learnhns.com/community</a>`,
  );
  parts.push('');

  for (const section of communitySections) {
    parts.push(
      `<b><u>${escapeHtml(section.emoji)} ${escapeHtml(section.title.toUpperCase())}</u></b>`,
    );
    for (const link of section.links) {
      parts.push(formatLinkHtml(link));
    }
    if (section.lede) {
      parts.push(`<i>${escapeHtml(section.lede)}</i>`);
    }
    parts.push('');
  }

  parts.push(`<b><u>🚫 ${escapeHtml(banPolicy.title.toUpperCase())}</u></b>`);
  parts.push(escapeHtml(banPolicy.body));
  parts.push('');
  parts.push(
    '<b>Keep support discussions public.</b> Report broken or unsafe links to the admins, or suggest edits at <a href="https://learnhns.com/community/">learnhns.com/community</a>.',
  );

  return parts.join('\n').trim() + '\n';
}

export function telegramExportStats(text: string) {
  const length = [...text].length; // code points (emoji-safe enough for limit checks)
  return {
    length,
    limit: TELEGRAM_MSG_LIMIT,
    overLimit: length > TELEGRAM_MSG_LIMIT,
    remaining: TELEGRAM_MSG_LIMIT - length,
  };
}
