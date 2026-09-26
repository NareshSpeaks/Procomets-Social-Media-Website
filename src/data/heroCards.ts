export interface HeroCardItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  accentColor: string;
  videoDuration?: string;
  // A dedicated SVG/graphic theme identifier to render bespoke creative art
  visualTheme: 'bakery' | 'billboard' | 'watch' | 'luggage' | 'city' | 'fashion' | 'sound' | 'botanical';
}

export const HERO_CARDS: HeroCardItem[] = [
  {
    id: 'card-1',
    title: "Fear Not, I'm Gluten-Free!",
    category: 'Character CGI & Brand Identity',
    tag: '3D ANIMATION',
    accentColor: '#2D6A4F',
    videoDuration: '0:30',
    visualTheme: 'bakery',
  },
  {
    id: 'card-2',
    title: 'The Irish House — Outdoor Reimagined',
    category: 'Experiential & Anamorphic Billboard',
    tag: 'COMMERCIAL',
    accentColor: '#1B4332',
    videoDuration: '0:45',
    visualTheme: 'billboard',
  },
  {
    id: 'card-3',
    title: 'Britime London — Chronograph Series',
    category: 'Haute Horlogerie 3D CGI',
    tag: 'LUXURY CGI',
    accentColor: '#1E3A8A',
    videoDuration: '0:20',
    visualTheme: 'watch',
  },
  {
    id: 'card-4',
    title: 'Solaris Aerolight Suitcase',
    category: 'Industrial Design & Product Motion',
    tag: 'PRODUCT FILM',
    accentColor: '#E11D48',
    videoDuration: '0:35',
    visualTheme: 'luggage',
  },
  {
    id: 'card-5',
    title: 'All Roads Lead To Tomorrow',
    category: 'Urban Mobility & Brand Anthem',
    tag: 'CAMPAIGN',
    accentColor: '#059669',
    videoDuration: '1:00',
    visualTheme: 'city',
  },
  {
    id: 'card-6',
    title: 'Aura Studio Monitors',
    category: 'Acoustic Engineering & Minimalist Motion',
    tag: 'HARDWARE LAUNCH',
    accentColor: '#4F46E5',
    videoDuration: '0:40',
    visualTheme: 'sound',
  },
  {
    id: 'card-7',
    title: 'Veloce Botanica — Bioactive Care',
    category: 'Packaging Design & Organic 3D',
    tag: 'BRANDING',
    accentColor: '#D97706',
    videoDuration: '0:25',
    visualTheme: 'botanical',
  },
  {
    id: 'card-8',
    title: 'Kinetics Haute Couture',
    category: 'Fashion Week Digital Runway',
    tag: 'EDITORIAL',
    accentColor: '#9333EA',
    videoDuration: '0:50',
    visualTheme: 'fashion',
  },
];
