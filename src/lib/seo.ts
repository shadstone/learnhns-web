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
  if (args.tags && args.tags.length > 0) schema.keywords = args.tags.join(', ');
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
