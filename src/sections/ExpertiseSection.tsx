import React from 'react';
import { motion } from 'framer-motion';
import { expertise } from '../data/expertise';
import { ExpertiseCard } from '../components/ExpertiseCard';
import { ExpertiseCTA } from '../components/ExpertiseCTA';

interface ExpertiseSectionProps {
  onGetInTouchClick: () => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ onGetInTouchClick }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section id="services" className="bg-white py-16 md:py-32 overflow-x-hidden">
      <div className="relative z-20 w-[93vw] max-w-[1400px] mx-auto mb-12 md:mb-16 flex justify-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-[5.5rem] font-display uppercase tracking-tight text-[#2C2D2F] leading-none text-center"
        >
          Our Expertise
        </motion.h2>
      </div>

      <div 
        className="flex flex-col gap-4 md:gap-5"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {expertise.map((item, index) => (
          <ExpertiseCard 
            key={item.id} 
            expertise={item} 
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
          />
        ))}
      </div>

      <ExpertiseCTA onGetInTouchClick={onGetInTouchClick} />
    </section>
  );
};
