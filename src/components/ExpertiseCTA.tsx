import React from 'react';
import { motion } from 'framer-motion';

interface ExpertiseCTAProps {
  onGetInTouchClick: () => void;
}

export const ExpertiseCTA: React.FC<ExpertiseCTAProps> = ({ onGetInTouchClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center mt-16 md:mt-24 pb-20 md:pb-32"
    >
      <button
        onClick={onGetInTouchClick}
        className="group flex items-center bg-[#FFB706] rounded-[12px] p-2 pr-8 md:pr-10 transition-all duration-300 hover:bg-transparent hover:ring-[6px] hover:ring-[#FFB706] hover:pr-2 border-[6px] border-transparent hover:border-transparent"
        style={{ boxSizing: 'border-box' }}
      >
        <div className="bg-[#EBEBEB] px-6 py-3 md:px-8 md:py-4 rounded-[8px] flex items-center justify-center shrink-0">
          <span className="font-display font-black text-[24px] md:text-[28px] uppercase text-[#1A1A1A] leading-none pt-1">
            CONTACT US
          </span>
        </div>
        <span className="ml-5 md:ml-6 font-medium text-[13px] md:text-[15px] uppercase tracking-wide text-[#1A1A1A] whitespace-nowrap overflow-hidden transition-all duration-300 group-hover:opacity-0 group-hover:w-0 group-hover:ml-0 hidden sm:block">
          LET'S CREATE SOMETHING TOGETHER
        </span>
      </button>
    </motion.div>
  );
};
