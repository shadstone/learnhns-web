/**
 * SEO / schema.org helpers. Pure functions — return plain JSON-LD objects
 * to pass to BaseLayout's `schema` prop.
 */

const SITE_URL = 'https://learnhns.com';
const SITE_NAME = 'LearnHNS';
const SITE_TAGLINE = 'Your gateway to understanding Handshake.';
const SITE_DESCRIPTION =
  'LearnHNS curates the best guides, wallets, tutorials, and community resources for the Handshake decentralized naming protocol.';
const LOGO_URL = `${SITE_URL}/learnhnsicon-dark.svg`;
const SOCIAL_LINKS = ['https://x.com/learnhns', 'https://github.com/learnhns'];

/** Absolute URL helper — accepts a path or full URL. */
export const abs = (urlOrPath: string): string =>
  urlOrPath.startsWith('http') ? urlOrPath : `${SITE_URL}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`;

/** Organization (the publisher entity). */
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
  },
  sameAs: SOCIAL_LINKS,
  description: SITE_DESCRIPTION,
});

/** WebSite with on-site search action. */
export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_TAGLINE,
  publisher: { '@id': `${SITE_URL}/#organization` },
});

/** Breadcrumb list. Pass items as [{name, path}, ...] in trail order. */
export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

/**
 * Parse WDD's `crawler_signal` custom field into standard structured-data
 * hints. The field is a human-authored pipe-delimited string, e.g.
 *   "TOPIC: X | TECH: Y | USE CASE: Z | AUDIENCE: A | KEYWORD: k1, k2"
 * We deliberately do NOT render the raw string (that reads as keyword
 * stuffing) — instead we map it onto schema.org `keywords` + `about`, which
 * search engines and AI actually consume.
 */
export const parseCrawlerSignal = (
  signal: unknown,
): { keywords: string[]; about: string[] } => {
  const out = { keywords: [] as string[], about: [] as string[] };
  if (typeof signal !== 'string' || !signal.trim()) return out;

  for (const seg of signal.split('|')) {
    const idx = seg.indexOf(':');
    if (idx === -1) continue;
    const key = seg.slice(0, idx).trim().toUpperCase();
    const val = seg.slice(idx + 1).trim();
    if (!val) continue;
    const parts = val.split(',').map((s) => s.trim()).filter(Boolean);
    if (key === 'KEYWORD' || key === 'KEYWORDS') {
      out.keywords.push(...parts);
    } else if (key === 'TOPIC' || key === 'TECH' || key === 'USE CASE' || key === 'AUDIENCE') {
      out.about.push(...parts);
    }
  }
  return out;
};

/** Blog/Article schema for a single post. */
export interface BlogPostingArgs {
  title: string;
  description: string;
  url: string;
  image?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  category?: string;
  tags?: string[];
  /** Extra keywords (e.g. parsed from crawler_signal), merged with tags. */
  keywords?: string[];
  /** schema.org `about` — the things this article is about. */
  about?: string[];
}

export const blogPostingSchema = (args: BlogPostingArgs) => {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': args.url },
    url: args.url,
    author: args.authorName
      ? { '@type': 'Person', name: args.authorName }
      : { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
  if (args.image) schema.image = [abs(args.image)];
  if (args.datePublished) schema.datePublished = args.datePublished;
  if (args.dateModified || args.datePublished) {
    schema.dateModified = args.dateModified || args.datePublished;
  }
  if (args.category) schema.articleSection = args.category;

  const keywords = Array.from(
    new Set([...(args.tags ?? []), ...(args.keywords ?? [])].map((k) => k.trim()).filter(Boolean)),
  );
  if (keywords.length > 0) schema.keywords = keywords.join(', ');

  if (args.about && args.about.length > 0) {
    const about = Array.from(new Set(args.about.map((a) => a.trim()).filter(Boolean)));
    if (about.length > 0) schema.about = about.map((name) => ({ '@type': 'Thing', name }));
  }
  return schema;
};

/** Collection page (used for blog index, resource directory pages). */
export const collectionPageSchema = (args: { title: string; description: string; url: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: args.title,
  description: args.description,
  url: args.url,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});

/** WebPage — generic schema for standard pages. */
export const webPageSchema = (args: { title: string; description: string; url: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: args.title,
  description: args.description,
  url: args.url,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});
