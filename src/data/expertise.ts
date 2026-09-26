import img1 from '../assets/portfolio/portfolio-01.png';
import img2 from '../assets/portfolio/portfolio-02.png';
import img3 from '../assets/portfolio/portfolio-03.png';
import img4 from '../assets/portfolio/portfolio-04.png';
import img5 from '../assets/portfolio/portfolio-05.png';
import img6 from '../assets/portfolio/portfolio-06.png';

export interface Expertise {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export const expertise: Expertise[] = [
  {
    id: 'e1',
    title: 'VIDEOGRAPHY',
    description: 'Cinematic video production that captures attention and tells your brand story with strong visual impact.',
    images: [img1, img2, img3]
  },
  {
    id: 'e2',
    title: 'VIDEO EDITING',
    description: 'Sharp, engaging edits built around pacing, storytelling and attention — from short-form content to polished campaigns.',
    images: [img4, img5, img6]
  },
  {
    id: 'e3',
    title: 'GRAPHIC DESIGN',
    description: 'Visual identities and creative assets designed to make brands clear, distinctive and memorable.',
    images: [img3, img4, img1]
  },
  {
    id: 'e4',
    title: 'WEBSITE DESIGN & DEVELOPMENT',
    description: 'Premium digital experiences that combine strong visual design, clarity and seamless functionality.',
    images: [img6, img2, img5]
  }
];
