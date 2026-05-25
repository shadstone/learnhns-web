const RAW_API_BASE = import.meta.env.PUBLIC_CMS_API_BASE || 'https://my.webdesigndaddy.com';
const API_ORIGIN = new URL(RAW_API_BASE).origin;
const SITE_KEY = import.meta.env.PUBLIC_CMS_SITE_KEY;

export interface WDDCategory {
  id: number;
  name: string;
  slug: string;
  parent_slug: string | null;
}

export interface WDDTag {
  id: number;
  name: string;
  slug: string;
}

export interface WDDContent {
  id: number;
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  content_html?: string;
  featured_image_url: string | null;
  status: string;
  custom_fields: Record<string, unknown>;
  author: { id: number; username: string; email: string };
  categories: WDDCategory[];
  primary_category: WDDCategory | null;
  tags: WDDTag[];
  created_at: string | null;
  updated_at: string | null;
  og_meta: Record<string, string>;
  seo: {
    canonical_url: string | null;
    meta_title: string;
    meta_description: string;
  };
}

interface ListResponse {
  success: boolean;
  data: WDDContent[];
  meta: { total: number; limit: number; offset: number; count: number };
}

interface FetchParams {
  type?: 'post' | 'page' | 'podcast' | 'product' | 'event' | 'directory';
  status?: 'published' | 'draft' | 'pending';
  primary_category_slug?: string;
  category_slug?: string;
  limit?: number;
  offset?: number;
}

async function fetchPage(params: FetchParams): Promise<ListResponse> {
  if (!SITE_KEY) {
    return { success: true, data: [], meta: { total: 0, limit: 0, offset: 0, count: 0 } };
  }
  const url = new URL('/api/v1/content', API_ORIGIN);
  url.searchParams.set('site_key', SITE_KEY);
  if (params.type) url.searchParams.set('type', params.type);
  if (params.status) url.searchParams.set('status', params.status);
  if (params.primary_category_slug) url.searchParams.set('primary_category_slug', params.primary_category_slug);
  if (params.category_slug) url.searchParams.set('category_slug', params.category_slug);
  url.searchParams.set('limit', String(params.limit ?? 100));
  url.searchParams.set('offset', String(params.offset ?? 0));

  const res = await fetch(url, {
    headers: {
      // WDD sits behind Cloudflare, which blocks default Node/undici User-Agents
      // with error 1010. Identify as a known browser UA to get through.
      'User-Agent': 'Mozilla/5.0 (compatible; learnhns-astro/1.0; +https://learnhns.com)',
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`WDD API ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  return (await res.json()) as ListResponse;
}

export async function fetchAllContent(params: Omit<FetchParams, 'limit' | 'offset'> = {}): Promise<WDDContent[]> {
  if (!SITE_KEY) {
    console.warn('[WDD] PUBLIC_CMS_SITE_KEY is not set — returning empty content list. Set it in .env to fetch posts.');
    return [];
  }

  const all: WDDContent[] = [];
  const limit = 100;
  let offset = 0;

  while (true) {
    const page = await fetchPage({ ...params, limit, offset });
    all.push(...page.data);
    if (page.data.length < limit) break;
    offset += limit;
  }
  return all;
}
