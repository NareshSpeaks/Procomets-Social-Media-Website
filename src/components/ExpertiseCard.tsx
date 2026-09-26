import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Expertise } from '../data/expertise';
import { useNavigate } from 'react-router-dom';

interface ExpertiseCardProps {
  expertise: Expertise;
  index: number;
  isHovered: boolean;
  onHover: () => void;
}

export const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ expertise, index, isHovered, onHover }) => {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (expertise.title === 'VIDEOGRAPHY') {
      navigate('/work/videography');
    } else if (expertise.title === 'VIDEO EDITING') {
      navigate('/work/video-editing');
    }
  };

  useEffect(() => {
    const ease = 'power3.out';
    const duration = 0.5;

    if (isHovered) {
      gsap.to(layer1Ref.current, { y: -40, scale: 0.96, duration, ease });
      gsap.to(layer2Ref.current, { y: -24, scale: 0.98, duration, ease });
      gsap.to(layer3Ref.current, { y: -10, scale: 0.99, duration, ease });
    } else {
      gsap.to(layer1Ref.current, { y: 0, scale: 0.96, duration, ease, overwrite: true });
      gsap.to(layer2Ref.current, { y: 0, scale: 0.98, duration, ease, overwrite: true });
      gsap.to(layer3Ref.current, { y: 0, scale: 0.99, duration, ease, overwrite: true });
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-[90vw] max-w-[1400px] mx-auto min-h-[90px] md:h-[120px] ${(expertise.title === 'VIDEOGRAPHY' || expertise.title === 'VIDEO EDITING') ? 'cursor-pointer' : ''} mb-4`}
      style={{ zIndex: 10 - index }}
      onMouseEnter={onHover}
      onClick={handleClick}
    >
      {/* BACKGROUND LAYERS (hidden at rest, peek out on hover) */}
      <div className="absolute inset-0 z-[1] hidden md:block pointer-events-none">
        {/* Layer 1 - Blue */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 bg-[#0047FF] rounded-[6px]"
          style={{ transform: 'translateY(0px) scale(0.96)' }}
        />

        {/* Layer 2 - Image strip */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 rounded-[6px] overflow-hidden bg-[#0047FF]"
          style={{ transform: 'translateY(0px) scale(0.98)' }}
        >
          <img
            src={expertise.images[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Layer 3 - Black */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 bg-black rounded-[6px]"
          style={{ transform: 'translateY(0px) scale(0.99)' }}
        />
      </div>

      {/* YELLOW BAR */}
      <div
        className="absolute inset-0 z-[2] bg-[#FFB706] rounded-[6px] shadow-sm hidden md:block pointer-events-none"
      />

      {/* Mobile YELLOW BAR (No skew) */}
      <div
        className="absolute inset-0 z-[2] bg-[#FFB706] rounded-[16px] shadow-sm md:hidden pointer-events-none"
      />

      {/* CONTENT (Not skewed) */}
      <div className="relative z-[3] w-full h-full flex flex-col md:flex-row md:items-center justify-between px-6 py-5 md:px-12 md:py-0 gap-4 pointer-events-none">
        <h3 className="text-[28px] md:text-[42px] font-display font-black uppercase text-[#1A1A1A] leading-none m-0 pt-1">
          {expertise.title}
        </h3>

        <p className="text-[#1A1A1A] font-medium text-sm md:text-[15px] italic leading-tight m-0 md:max-w-[55%]">
          {expertise.description}
        </p>
      </div>
    </motion.div>
  );
};
