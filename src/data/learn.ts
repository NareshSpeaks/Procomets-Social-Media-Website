export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  thumbnail: string;
}

export const articles: Article[] = [
  {
    id: 'a1',
    slug: 'future-of-short-form',
    title: 'The Future of Short-Form Video',
    excerpt: 'Why TikTok and Reels are fundamentally changing how brands communicate, and how to adapt your strategy for 2025.',
    category: 'Trends',
    date: 'Oct 12, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'a2',
    slug: 'authentic-community-building',
    title: 'Building Authentic Communities',
    excerpt: 'Move beyond vanity metrics. Here is how to cultivate a dedicated, engaged audience that genuinely cares about your brand.',
    category: 'Strategy',
    date: 'Sep 28, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'a3',
    slug: 'data-driven-creative',
    title: 'Data-Driven Creative Decisions',
    excerpt: 'Stop guessing. Learn how to use analytics to inform your creative direction and guarantee better campaign performance.',
    category: 'Analytics',
    date: 'Sep 15, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop'
  }
];
