/**
 * Community "Start Here" resource list — web mirror of the pinned
 * message in the main Handshake Telegram group:
 * https://t.me/handshake_hns/156540
 *
 * Suggest edits via GitHub PR/issue or the form on /community/.
 * Security-sensitive additions need maintainer review before merge.
 */

export type ResourceStatus = 'active' | 'offline' | 'closed' | 'experimental' | 'legacy' | 'beta' | 'prerelease';

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
  title: 'Handshake community — start here',
  lastAudited: '2026-07-15',
  lastAuditedLabel: 'July 15, 2026',
  auditedBy: 'Jaron',
  sourceTelegram: 'https://t.me/handshake_hns/156540',
  sourceTelegramLabel: 'Pinned message in @handshake_hns',
  githubRepo: 'https://github.com/shadstone/learnhns-web',
  dataFilePath: 'src/data/community-resources.ts',
  disclaimer:
    'Handshake is decentralized. There is no single official foundation, company, spokesperson, website, or permanent canonical repository. Community projects below are independent.',
} as const;

export const securityBullets = [
  'Admins and support will never DM first, request remote access, or offer an OTC trade.',
  'Never share your seed phrase, private key, password, or API key.',
  'Verify domains, repositories, release signatures/checksums, and app publishers before installing software or sending funds.',
] as const;

export const banPolicy = {
  title: 'Ban / remove',
  body: 'Scams, impersonation, spam, unsolicited DMs, OTC buying/selling, repeated promotion, harassment, disrespect, or persistent off-topic disruption.',
  note: 'Keep support discussions public. Report broken or unsafe links to the admins, or suggest an edit on this page.',
} as const;

export const communitySections: CommunitySection[] = [
  {
    id: 'start-here',
    emoji: '📚',
    title: 'Start here',
    links: [
      { title: 'Project homepage', href: 'https://handshake.org/', note: 'handshake.org' },
      { title: 'Beginner guides and documentation', href: 'https://learnhns.com/', note: 'LearnHNS' },
      { title: 'Maintained ecosystem directory', href: '/services/', note: 'Wallets, exchanges, pools, resolvers' },
      {
        title: 'Legacy FAQ archive',
        href: 'https://handypedia.org/en/faq',
        note: 'Some entries are outdated',
      },
    ],
  },
  {
    id: 'wallets',
    emoji: '💼',
    title: 'Wallets and name management',
    links: [
      {
        title: 'Bob LearnHNS 2026 desktop build',
        href: 'https://bobwallet.org/download/',
        status: 'beta',
        note: 'Primary desktop wallet for HNS and names',
      },
      { title: 'Bob source', href: 'https://github.com/bob-wallet/bob-wallet', note: 'Open-source repository' },
      { title: 'Bob support', href: 'https://t.me/bobwallet', note: 'Telegram support channel' },
      {
        title: 'Ledger HNS app',
        href: 'https://github.com/handshake-org/ledger-app-hns',
        note: 'Hardware wallet support',
      },
      {
        title: 'FireWallet HSD frontend',
        href: 'https://github.com/Nathanwoodburn/firewalletbrowser',
        status: 'experimental',
        note: 'Web frontend for HSD',
      },
      {
        title: 'Namebase registrar/registry',
        href: '#',
        status: 'closed',
        note: 'Closed June 2026',
        originalUrl: 'https://www.namebase.io/',
      },
      {
        title: 'Previous Namebase migration',
        href: 'https://sunset.namebase.io/',
        note: 'Sunset / migration info',
      },
      {
        title: 'LearnHNS name market',
        href: 'https://market.learnhns.com/',
        note: 'Buy and sell Handshake names',
      },
      {
        title: 'Name lookup and management',
        href: 'https://hns.id/',
        note: 'HNS.ID',
      },
    ],
  },
  {
    id: 'nodes',
    emoji: '🖥',
    title: 'Nodes, protocol, and development',
    links: [
      {
        title: 'HSD',
        href: 'https://github.com/handshake-org/hsd',
        note: 'JavaScript full/SPV node and wallet',
      },
      {
        title: 'handshake-node',
        href: 'https://github.com/blinklabs-io/handshake-node',
        note: 'Go full-node release candidate; no wallet',
      },
      {
        title: 'HNSD',
        href: 'https://github.com/handshake-org/hnsd',
        note: 'C SPV resolver / light client',
      },
      { title: 'HSD developer documentation', href: 'https://hsd-dev.org/', note: 'Protocol and node guides' },
      { title: 'HSD API documentation', href: 'https://hsd-dev.org/api-docs/', note: 'RPC and REST reference' },
      {
        title: 'FireHSD public API source',
        href: 'https://github.com/Nathanwoodburn/firehsd',
        note: 'Public API implementation',
      },
      {
        title: 'Handshake Improvement Proposals',
        href: 'https://github.com/handshake-org/HIPs',
        note: 'HIPs repository',
      },
      {
        title: 'Handshake GitHub organization',
        href: 'https://github.com/handshake-org',
        note: 'Core org',
      },
      { title: 'Developer chat', href: 'https://t.me/hns_tech', note: 'Telegram' },
      { title: 'GitHub activity feed', href: 'https://t.me/handshake_github', note: 'Telegram' },
    ],
  },
  {
    id: 'access',
    emoji: '🌐',
    title: 'Access, DNS, and DANE',
    links: [
      {
        title: 'HNS DANE Browser for Android',
        href: 'https://play.google.com/store/apps/details?id=com.denuoweb.hnsdane',
        note: 'Play Store',
      },
      {
        title: 'HNS DANE Browser source',
        href: 'https://github.com/Denuo-Web/hns-dane-browser-android',
        note: 'Open source',
      },
      {
        title: 'SkyInclude desktop browser',
        href: 'https://skyinclude.com/browser/',
        status: 'prerelease',
        note: 'Mac, Windows, Linux',
      },
      {
        title: 'HNSGo Android SPV resolver',
        href: 'https://github.com/Acktarius/HNSGo',
        status: 'experimental',
        note: 'Android light resolver',
      },
      {
        title: 'Fingertip desktop resolver and DANE',
        href: 'https://github.com/imperviousinc/fingertip',
        status: 'legacy',
        note: 'Experimental / legacy',
      },
      {
        title: 'HNSDoH community resolver',
        href: 'https://welcome.hnsdoh.com/',
        note: 'DNS-over-HTTPS for Handshake',
      },
      {
        title: 'Easy HNS resolver and setup guides',
        href: 'https://easyhns.com/',
        note: 'Resolver + setup',
      },
      {
        title: 'Self-hosted resolver guide',
        href: 'https://github.com/HNSDNS/service-info',
        note: 'Run your own',
      },
      {
        title: 'DANE/TLSA record generator',
        href: 'https://hns.denuoweb.com/dane-generator/',
        note: 'DANE tooling',
      },
      {
        title: 'HNS Live domain directory',
        href: 'https://hns.denuoweb.com/hns-live/',
        note: 'Live names directory',
      },
      {
        title: 'HNS network topology visualization',
        href: 'https://hns.denuoweb.com/hns-topology/',
        note: 'Network map',
      },
    ],
  },
  {
    id: 'explorers',
    emoji: '🔎',
    title: 'Explorers, stats, and mining',
    links: [
      { title: 'ShakeShift explorer', href: 'https://shakeshift.com/', note: 'Block and name explorer' },
      {
        title: 'Supply and network statistics',
        href: 'https://shakeshift.com/stats',
        note: 'Network stats',
      },
      {
        title: 'Halvings and emission schedule',
        href: 'https://shakeshift.com/halvings',
        note: 'Emission timeline',
      },
      { title: 'Pools and hashrate', href: 'https://shakeshift.com/pools', note: 'Mining pools' },
      { title: 'HNSFans explorer', href: 'https://e.hnsfans.com/', note: 'Community explorer' },
    ],
  },
  {
    id: 'learning',
    emoji: '📰',
    title: 'Learning and media',
    links: [
      { title: 'LearnHNS', href: 'https://learnhns.com/', note: 'Guides, docs, and ecosystem hub' },
      { title: 'SkyInclude news and guides', href: 'https://skyinclude.com/', note: 'News and tutorials' },
      { title: 'Own The Dot', href: 'https://ownthedot.com/', note: 'Podcast and media' },
    ],
  },
  {
    id: 'community',
    emoji: '💬',
    title: 'Community',
    links: [
      { title: 'General Telegram', href: 'https://t.me/handshake_hns', note: 'Main public chat' },
      { title: 'Discord', href: 'https://handshake.org/discord', note: 'Discord invite' },
      { title: 'Reddit', href: 'https://www.reddit.com/r/handshake', note: 'r/handshake' },
      { title: 'IRC', href: 'https://web.libera.chat/#handshake', note: 'Libera #handshake' },
      {
        title: 'Matrix bridge',
        href: 'https://matrix.to/#/#handshake:libera.chat',
        note: 'Matrix ↔ IRC',
      },
    ],
  },
  {
    id: 'regional',
    emoji: '🌍',
    title: 'Regional and language communities',
    lede: 'Activity varies by community.',
    links: [
      { title: 'Australia', href: 'https://hns.au/' },
      { title: 'Canada', href: 'https://hnscanada.ca/' },
      { title: 'China / HNSFans', href: 'https://hnsfans.com/' },
      { title: 'Italian Telegram', href: 'https://t.me/handshake_hns_italia' },
      { title: 'German Telegram', href: 'https://t.me/handshake_de' },
      { title: 'Spanish Telegram', href: 'https://t.me/HNSes' },
      { title: 'Vietnamese Telegram', href: 'https://t.me/hnsvietnamese' },
      { title: 'Russian Telegram', href: 'https://t.me/handshake_hns_RU' },
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
      '<!-- e.g. Wallets, Access/DNS, Community -->',
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
    prerelease: 'Pre-release',
  };
  return map[status];
}

export function isInactive(status?: ResourceStatus): boolean {
  return status === 'offline' || status === 'closed';
}
