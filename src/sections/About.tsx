import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section className="py-24 bg-white px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[45%]"
        >
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-100">
            <img 
              src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2000&auto=format&fit=crop" 
              alt="Procomets Team" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[55%]"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 block">
            About Procomets
          </span>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black leading-none mb-8">
            Digital Natives. <br /> Creative Obsessives.
          </h2>
          <p className="text-stone-600 font-navigation text-base md:text-lg leading-relaxed mb-8">
            Founded on the belief that traditional advertising models are broken, Procomets operates at the intersection of cultural velocity and measurable ROI. We are a team of strategists, creators, and analysts who refuse to compromise on aesthetics or data.
          </p>
          
          <div className="flex gap-12">
            <div>
              <span className="block text-3xl font-display uppercase text-black mb-1">05</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Years Active</span>
            </div>
            <div>
              <span className="block text-3xl font-display uppercase text-black mb-1">HQ</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">London, UK</span>
            </div>
            <div>
              <span className="block text-3xl font-display uppercase text-black mb-1">20+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Core Team</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
