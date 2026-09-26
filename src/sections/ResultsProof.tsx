import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '500M+', label: 'Organic Impressions' },
  { value: '12x', label: 'Average ROAS' },
  { value: '45%', label: 'Avg Engagement Lift' },
  { value: 'Global', label: 'Campaign Reach' }
];

export const ResultsProof: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight leading-none text-white max-w-xl">
            We don't just create noise. We deliver impact.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-white/20 pt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-4xl md:text-6xl lg:text-7xl font-display text-white">
                {stat.value}
              </h4>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
