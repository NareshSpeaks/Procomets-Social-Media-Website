import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FinalCtaProps {
  onGetInTouchClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onGetInTouchClick }) => {
  return (
    <section className="py-32 md:py-48 bg-black text-white px-4 md:px-8 flex flex-col items-center text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-8 block">
          Ready to scale?
        </span>
        <h2 className="text-5xl md:text-8xl lg:text-9xl font-display uppercase tracking-tight text-white leading-[0.85] mb-12">
          Let's Build <br /> Your Empire.
        </h2>
        
        <button 
          onClick={onGetInTouchClick}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-full font-cta font-bold text-sm tracking-[0.14em] uppercase hover:bg-stone-200 transition-colors mx-auto group"
        >
          <span>Start a Project</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};
