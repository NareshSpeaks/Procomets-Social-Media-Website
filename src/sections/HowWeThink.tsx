import React from 'react';
import { motion } from 'framer-motion';

export const HowWeThink: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 block">
            Our Methodology
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-black leading-[1.1] mb-8">
            The era of purely aesthetic creative is over. Content must perform.
          </h2>
          <p className="text-stone-500 font-navigation text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We bridge the gap between creative studios that don't understand algorithms, and performance agencies that can't produce culture-defining content. Every asset we create is engineered for engagement, conversion, and brand elevation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
