import { defineCollection, z } from 'astro:content';
import { fetchAllContent } from './lib/wdd';

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  parent_slug: z.string().nullable(),
});

const posts = defineCollection({
  loader: async () => {
    const items = await fetchAllContent({ type: 'post', status: 'published' });
    return items.map((post) => ({
      ...post,
      id: post.slug,
    }));
  },
  schema: z
    .object({
      title: z.string(),
      slug: z.string(),
      excerpt: z.string().nullable().optional().default(''),
      content_html: z.string().nullable().optional().default(''),
      featured_image_url: z.string().nullable().optional(),
      status: z.string().optional(),
      author: z
        .object({
          id: z.number().optional(),
          username: z.string().optional(),
          email: z.string().optional(),
        })
        .passthrough()
        .optional(),
      categories: z.array(categorySchema).default([]),
      primary_category: categorySchema.nullable().optional(),
      tags: z
        .array(z.object({ id: z.number(), name: z.string(), slug: z.string() }))
        .default([]),
      created_at: z.string().nullable().optional(),
      updated_at: z.string().nullable().optional(),
      og_meta: z.record(z.string()).optional(),
      seo: z
        .object({
          canonical_url: z.string().nullable().optional(),
          meta_title: z.string().optional(),
          meta_description: z.string().optional(),
        })
        .passthrough()
        .optional(),
    })
    .passthrough(),
});

export const collections = { posts };
