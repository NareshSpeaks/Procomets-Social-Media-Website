export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'nova-rebrand',
    title: 'Nova Rebrand & Campaign',
    client: 'Nova App',
    category: 'Branding & Social',
    description: 'A complete brand overhaul and social media rollout for the premier productivity application.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    tags: ['Branding', 'Strategy', 'Video Production']
  },
  {
    id: 'p2',
    slug: 'echo-launch',
    title: 'Echo Global Launch',
    client: 'Echo Electronics',
    category: 'Product Launch',
    description: 'Driving 50M+ views through an influencer-led global product launch.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
    tags: ['Influencer Marketing', 'Social Content', 'Paid Media']
  },
  {
    id: 'p3',
    slug: 'luna-digital',
    title: 'Luna Digital Transformation',
    client: 'Luna Beauty',
    category: 'Content Strategy',
    description: 'Transforming an established beauty brand into a digital-first powerhouse.',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop',
    tags: ['Content Strategy', 'Social Management', 'Creative Direction']
  }
];
