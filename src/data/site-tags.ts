/**
 * Third-party tag IDs for this site.
 *
 * These used to be injected by Netlify's "Snippet injection" feature, which
 * kept them out of the repo and invisible to anyone reading the code. Every
 * field is empty unless this site actually uses it.
 *
 * Deliberately separate from site.ts / seo-site.ts: those differ across the
 * fleet, this file does not.
 */
export const siteTags = {
  /** GA4 'G-...' or GTM 'GTM-...'. Leave empty if analytics lives elsewhere. */
  analyticsId: 'G-TDLVSB5SRY',
  /** A GTM container that runs ALONGSIDE a GA4 id in analyticsId. Some sites
   *  were injected with both, and one field cannot hold two. */
  gtmId: '',
  /** AdSense publisher, e.g. 'ca-pub-0000000000000000'. */
  adsenseClient: '',
  /** Attraction Funnel xero-data-name. */
  attractionFunnelId: '',
  /** Ahrefs analytics data-key. */
  ahrefsKey: '',
  /** Search Console / Meta domain verification tokens. */
  verifyGoogle: '',
  verifyFacebook: '',
};
