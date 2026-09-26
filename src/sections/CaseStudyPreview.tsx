import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CaseStudyPreview: React.FC = () => {
  return (
    <section className="py-24 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-square md:aspect-[21/9] rounded-[2rem] overflow-hidden group"
        >
          {/* Background Media */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-700 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2694&auto=format&fit=crop" 
            alt="Flagship Case Study" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1]"
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-16">
            <div className="flex justify-between items-start">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Flagship Case Study
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight text-white mb-4">
                  Redefining the <br /> Modern Lifestyle.
                </h3>
                <p className="text-white/80 font-navigation font-medium max-w-md">
                  How we launched a global streetwear brand into the stratosphere using a multi-layered influencer strategy.
                </p>
              </div>

              <Link 
                to="/work/streetwear-launch"
                className="inline-flex items-center justify-center gap-3 w-fit px-8 py-4 bg-white text-black rounded-full font-cta font-bold text-xs tracking-[0.14em] uppercase hover:bg-stone-200 transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
