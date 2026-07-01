import { getCollection } from 'astro:content';

/**
 * /llms.txt — the AI-facing index of the site. Static curated intro plus a
 * live list of every published blog post, so AI tools and crawlers have a
 * direct, always-current index of our articles. Regenerated on every build
 * (same cadence as the sitemap).
 */
export async function GET() {
  const SITE = 'https://learnhns.com';

  const oneLine = (s: unknown): string =>
    typeof s === 'string' ? s.replace(/\s+/g, ' ').trim() : '';

  const posts = (await getCollection('posts'))
    .sort((a, b) => {
      const ad = a.data.created_at ? new Date(a.data.created_at).getTime() : 0;
      const bd = b.data.created_at ? new Date(b.data.created_at).getTime() : 0;
      return bd - ad;
    });

  const blogLines = posts
    .map((post) => {
      const cf = (post.data.custom_fields ?? {}) as Record<string, unknown>;
      const url = post.data.seo?.canonical_url || `${SITE}/blog/${post.id}/`;
      const desc = oneLine(cf.seo_description) || oneLine(post.data.excerpt);
      return desc
        ? `- ${post.data.title} — ${url}\n  ${desc}`
        : `- ${post.data.title} — ${url}`;
    })
    .join('\n');

  const content = `# LearnHNS

LearnHNS is your gateway to exploring the future of decentralized domains. We curate the best resources and guides to help users understand and navigate Handshake (HNS), a revolutionary decentralized domain name system.

## Key Resources
- Homepage: ${SITE}/
- Get Started: ${SITE}/start/
- Learn Handshake: ${SITE}/learn/
- Educational Media: ${SITE}/media/
- Podcasts & Videos: ${SITE}/podcasts/
- Services & Wallets: ${SITE}/services/
- How DNS Works: ${SITE}/dns/
- Blog: ${SITE}/blog/
- Documentation: ${SITE}/docs/
- Privacy Policy: ${SITE}/privacy/

## Getting Started with Handshake
1. Download Bob Wallet (Desktop):
   - LearnHNS 2026 Version: https://bobwallet.org/download/bob-learnhns
   - 2024 Version: https://bobwallet.org/download/bob-wallet
2. Install Bob Extension (Chrome):
   - LearnHNS 2026 Version: https://bobwallet.org/extension/learnhns-wallet/
   - 2024 Version: https://bobwallet.org/extension/shake-wallet/
3. Trade on ShakeDex: ${SITE}/market/
4. Buy/Sell HNS at Liquidity Spot: https://liquidity.spot
5. Participate: https://github.com/handshake-org

## What is Handshake?
Handshake (HNS) is a decentralized, permissionless naming protocol where every peer is validating and in charge of managing the root DNS naming zone with the goal of creating an alternative to existing Certificate Authorities and naming systems.

## Blog Articles
Latest articles from LearnHNS on Handshake, decentralized DNS, and the future of internet naming.

${blogLines || '- (No published articles yet.)'}

## Contact & Maintainer
Site maintained by SkyInclude.
Contact: https://skyinclude.com/contact
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
