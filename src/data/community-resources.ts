/**
 * Community "Start Here" resource list — web mirror of the pinned
 * message in the main Handshake Telegram group:
 * https://t.me/handshake_hns/156540
 *
 * Suggest edits via GitHub PR/issue or the form on /community/.
 * Security-sensitive additions need maintainer review before merge.
 */

export type ResourceStatus =
  | 'active'
  | 'offline'
  | 'closed'
  | 'experimental'
  | 'legacy'
  | 'beta'
  | 'pilot'
  | 'prerelease';

export type CommunityLink = {
  title: string;
  href: string;
  note?: string;
  status?: ResourceStatus;
  /** Shown when status is offline/closed so the original URL remains visible */
  originalUrl?: string;
};

export type CommunitySection = {
  id: string;
  emoji: string;
  title: string;
  lede?: string;
  links: CommunityLink[];
};

export const communityMeta = {
  title: 'Handshake HNS — start here',
  lastAudited: '2026-09-29',
  lastAuditedLabel: 'September 29, 2026',
  auditedBy: 'Jaron',
  lastEdited: undefined,
  lastEditedLabel: undefined,
  lastEditedBy: undefined,
  sourceTelegram: 'https://t.me/handshake_hns/156540',
  sourceTelegramLabel: 'Pinned message in @handshake_hns',
  githubRepo: 'https://github.com/shadstone/learnhns-web',
  dataFilePath: 'src/data/community-resources.ts',
  disclaimer:
    'Handshake is decentralized. No single organization speaks for it. Projects below are independent.',
} as const;

export const communityAnnouncement = {
  title: 'HandyCon 2027',
  dateLabel: 'March 10–12, 2027',
  href: 'https://handycon.xyz/',
} as const;

export const securityBullets = [
  'Admins and support never DM first, request remote access, or offer OTC trades.',
  'Never share seed phrases, private keys, API keys, passwords, or session cookies.',
  'Verify publishers, URLs, and downloads before installing software or sending funds.',
] as const;

export const banPolicy = {
  title: 'Ban / remove',
  body: 'Scams, impersonation, spam, unsolicited DMs, OTC trades, repeated promotion, harassment, disrespect, or off-topic disruption.',
  note: 'Keep support public. Report unsafe or broken links to admins.',
  editCta: 'To make edits to this post, please visit https://learnhns.com/community/',
} as const;

export const communitySections: CommunitySection[] = [
  {
    id: 'start-here',
    emoji: '📚',
    title: 'Start here',
    links: [
      { title: 'Guides', href: '/start/', note: 'Beginner guides and documentation' },
      { title: 'Ecosystem directory', href: '/services/', note: 'Wallets, exchanges, pools, resolvers, and tools' },
    ],
  },
  {
    id: 'wallets',
    emoji: '💼',
    title: 'Wallets • name management',
    links: [
      { title: 'Bob LearnHNS', href: 'https://bobwallet.org/download/', note: 'Desktop HNS wallet and name manager' },
      { title: 'Shakescape', href: 'https://shakescape.com/', note: 'Dual-root browser with native HNS wallet features' },
      { title: 'Namebase', href: 'https://www.namebase.io/', note: 'Handshake name platform' },
      {
        title: 'Namehold',
        href: 'https://github.com/DimazzzZ/namehold-wallet',
        status: 'beta',
        note: 'Non-custodial HNS wallet and TLD manager',
      },
      {
        title: 'FireWallet',
        href: 'https://github.com/Nathanwoodburn/firewalletbrowser',
        status: 'experimental',
        note: 'HSD wallet frontend',
      },
    ],
  },
  {
    id: 'access',
    emoji: '🧭',
    title: 'DNS • DANE',
    links: [
      { title: 'HNSGo', href: 'https://github.com/Acktarius/HNSGo', note: 'Android SPV resolver' },
      { title: 'Fingertip', href: 'https://github.com/imperviousinc/fingertip', note: 'Desktop resolver and DANE support' },
      { title: 'HNSDNS', href: 'https://hnsdns.com/', note: 'Privacy-focused Handshake resolver' },
      { title: 'HNSDoH', href: 'https://welcome.hnsdoh.com/', note: 'Community DNS-over-HTTPS resolver' },
      { title: 'Easy HNS', href: 'https://easyhns.com/', note: 'Resolver and setup guides' },
      { title: 'Self-hosted resolver', href: 'https://github.com/HNSDNS/service-info', note: 'Run your own resolver' },
      { title: 'TLSA generator', href: 'https://hns.denuoweb.com/dane-generator/', note: 'Create DANE/TLSA records' },
    ],
  },
  {
    id: 'development',
    emoji: '🖥',
    title: 'Development',
    links: [
      { title: 'HSD', href: 'https://github.com/handshake-org/hsd', note: 'JavaScript node and wallet' },
      { title: 'HSRD', href: 'https://github.com/handshake-rs/hns-node-rs', note: 'Rust node and wallet ecosystem' },
      { title: 'handshake-node', href: 'https://github.com/blinklabs-io/handshake-node', note: 'Go node; no wallet' },
      { title: 'HNSD', href: 'https://github.com/handshake-org/hnsd', note: 'C SPV resolver' },
      { title: 'hs-client', href: 'https://github.com/handshake-org/hs-client', note: 'REST, WebSocket, and RPC client for HSD' },
      { title: 'FireHSD', href: 'https://github.com/Nathanwoodburn/firehsd', note: 'Public HSD API implementation' },
      {
        title: 'cDNSd',
        href: 'https://github.com/blinklabs-io/cdnsd',
        status: 'experimental',
        note: 'Decentralized DNS daemon with Handshake support',
      },
    ],
  },
  {
    id: 'hosting',
    emoji: '🌍',
    title: 'Hosting',
    links: [
      { title: 'Pinner', href: 'https://pinner.xyz/host', note: 'Decentralized IPFS hosting for Handshake names' },
      { title: 'Hosting guide', href: '/host/', note: 'LearnHNS hosting options and setup guidance' },
      {
        title: 'Handout',
        href: '/handout/',
        status: 'pilot',
        note: 'Authoritative DNS, DNSSEC, DANE/TLSA, and web hosting',
      },
      { title: 'HNSHosting', href: 'https://hnshosting.au/', note: 'Managed WordPress hosting for Handshake names' },
    ],
  },
  {
    id: 'explorers',
    emoji: '🔎',
    title: 'Explorers • mining',
    links: [
      { title: 'ShakeShift Explorer', href: 'https://shakeshift.com/', note: 'Blocks, names, network stats, and mining pools' },
      { title: 'HNSFans explorer', href: 'https://e.hnsfans.com/', note: 'Community explorer' },
    ],
  },
  {
    id: 'media',
    emoji: '📰',
    title: 'Media',
    links: [
      { title: 'LearnHNS', href: 'https://learnhns.com/', note: 'Guides, docs, and ecosystem hub' },
      { title: 'SkyInclude', href: 'https://skyinclude.com/', note: 'Handshake news and guides' },
      { title: 'Own The Dot', href: 'https://ownthedot.com/', note: 'Podcast and media' },
    ],
  },
  {
    id: 'community',
    emoji: '💬',
    title: 'Community',
    links: [
      { title: 'Telegram', href: 'https://t.me/handshake_hns', note: 'Main public chat' },
      { title: 'Discord', href: 'https://handshake.org/discord', note: 'Handshake Discord' },
      { title: 'Reddit', href: 'https://www.reddit.com/r/handshake', note: 'r/handshake' },
      { title: 'IRC', href: 'https://web.libera.chat/#handshake', note: 'Libera #handshake' },
    ],
  },
  {
    id: 'regional',
    emoji: '🌍',
    title: 'Regional',
    lede: 'Activity varies by community.',
    links: [
      { title: 'Australia', href: 'https://hns.au/' },
      { title: 'Canada', href: 'https://hnscanada.ca/' },
      { title: 'China', href: 'https://hnsfans.com/' },
      { title: 'Italian', href: 'https://t.me/handshake_hns_italia' },
      { title: 'German', href: 'https://t.me/handshake_de' },
      { title: 'Spanish', href: 'https://t.me/HNSes' },
      { title: 'Vietnamese', href: 'https://t.me/hnsvietnamese' },
      { title: 'Russian', href: 'https://t.me/handshake_hns_RU' },
    ],
  },
];

/** Pre-filled GitHub issue for resource suggestions */
export function suggestEditIssueUrl(): string {
  const title = encodeURIComponent('Community resource update');
  const body = encodeURIComponent(
    [
      '## What kind of change?',
      '- [ ] Add a link',
      '- [ ] Fix a broken link',
      '- [ ] Remove a link',
      '- [ ] Update description / note',
      '- [ ] Security concern',
      '',
      '## Section',
      '<!-- e.g. Wallets, DNS/DANE, Community -->',
      '',
      '## Current URL (if fixing/removing)',
      '',
      '## Proposed title / URL / note',
      '',
      '## Why / evidence',
      '',
      '## Contact (optional)',
      '<!-- Telegram handle or other -->',
      '',
    ].join('\n'),
  );
  return `${communityMeta.githubRepo}/issues/new?title=${title}&body=${body}&labels=community-resources`;
}

export function editDataFileUrl(): string {
  return `${communityMeta.githubRepo}/edit/main/${communityMeta.dataFilePath}`;
}

export function statusLabel(status?: ResourceStatus): string | null {
  if (!status || status === 'active') return null;
  const map: Record<Exclude<ResourceStatus, 'active'>, string> = {
    offline: 'Offline',
    closed: 'Closed',
    experimental: 'Experimental',
    legacy: 'Legacy',
    beta: 'Beta',
    pilot: 'Pilot',
    prerelease: 'Pre-release',
  };
  return map[status];
}

export function isInactive(status?: ResourceStatus): boolean {
  return status === 'offline' || status === 'closed';
}
