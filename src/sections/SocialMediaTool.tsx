import React from 'react';
import { motion } from 'framer-motion';

export const SocialMediaTool: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row gap-12 md:gap-24 items-center"
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-black leading-[0.9] mb-6">
              Social is not a <br /> broadcasting channel.
            </h2>
            <p className="text-stone-600 font-navigation text-base leading-relaxed mb-6">
              It is the most powerful business intelligence and customer acquisition engine ever built. We leverage social platforms to map audience sentiment, test product viability, and drive scalable revenue.
            </p>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-black">
              <li className="flex items-center gap-4">
                <span className="flex-shrink-0 w-8 h-px bg-black" />
                Audience Mapping & Research
              </li>
              <li className="flex items-center gap-4">
                <span className="flex-shrink-0 w-8 h-px bg-black" />
                Direct Revenue Attribution
              </li>
              <li className="flex items-center gap-4">
                <span className="flex-shrink-0 w-8 h-px bg-black" />
                Cultural Relevance Engineering
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2000&auto=format&fit=crop" 
                alt="Social Media as a Tool" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
