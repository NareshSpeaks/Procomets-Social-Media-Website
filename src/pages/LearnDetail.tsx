import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const LearnDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <main className="min-h-screen pt-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tight mb-4">
        Learn: {slug}
      </h1>
      <p className="text-stone-500 font-medium mb-8">This page is a placeholder for the full article.</p>
      <Link to="/" className="text-xs font-bold uppercase tracking-widest hover:text-stone-500 transition-colors">
        Back to Home
      </Link>
    </main>
  );
};
