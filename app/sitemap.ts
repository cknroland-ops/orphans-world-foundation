import type { MetadataRoute } from 'next';
import { blogs as staticBlogs } from '../lib/blogs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orphansworldfoundation.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/#about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/#programmes`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/#causes`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/#blog`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/#contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    const res = await fetch(`${BASE_URL}/api/articles`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const articles: { slug?: string; id?: string; created_at?: string }[] = await res.json();
      if (Array.isArray(articles) && articles.length > 0) {
        const dynamicRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
          url: `${BASE_URL}/blog/${a.slug ?? a.id}`,
          lastModified: a.created_at ? new Date(a.created_at) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }));
        return [...staticRoutes, ...dynamicRoutes];
      }
    }
  } catch {
    // fallback ci-dessous
  }

  const fallbackBlogRoutes: MetadataRoute.Sitemap = staticBlogs.map((_, i) => ({
    url: `${BASE_URL}/blog/article-${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...fallbackBlogRoutes];
}
