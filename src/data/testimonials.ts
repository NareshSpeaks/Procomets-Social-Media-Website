export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "Procomets didn't just grow our following; they completely redefined how we present ourselves digitally. Their creative vision is unmatched.",
    author: 'Sarah Jenkins',
    role: 'CMO',
    company: 'Nova App'
  },
  {
    id: 't2',
    quote: "The ROI we've seen since partnering with Procomets has been staggering. They understand the intersection of beautiful creative and hard performance data.",
    author: 'Marcus Chen',
    role: 'Founder',
    company: 'Echo Electronics'
  },
  {
    id: 't3',
    quote: "A true extension of our team. Their agility, proactive strategy, and flawless execution have made them an indispensable partner.",
    author: 'Elena Rodriguez',
    role: 'VP of Marketing',
    company: 'Luna Beauty'
  }
];
