import React from 'react';
import { clients } from '../data/clients';

export const ClientsStrip: React.FC = () => {
  return (
    <div className="w-full border-b border-stone-200 overflow-hidden bg-white pt-8 pb-6 md:pt-12 md:pb-10 flex flex-col items-center">
      <h3 className="text-xs md:text-sm tracking-[0.2em] font-bold text-stone-400 uppercase mb-6 md:mb-10 text-center">
        Trusted By Innovative Companies
      </h3>
      <div className="flex whitespace-nowrap animate-marquee w-full">
        {/* We map twice to ensure the marquee covers the screen during the -50% translation */}
        {[...clients, ...clients].map((client, index) => (
          <div 
            key={`${client.id}-${index}`} 
            className="flex items-center shrink-0"
          >
            <span className="text-lg md:text-2xl font-display uppercase tracking-widest text-stone-800 px-8 md:px-16">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
