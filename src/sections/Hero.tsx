import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeroHeadline } from '../components/HeroHeadline';
import { HeroMediaRail } from '../components/HeroMediaRail';

interface HeroSectionProps {
  onGetInTouchClick?: () => void;
}

export const Hero: React.FC<HeroSectionProps> = ({ onGetInTouchClick: _onGetInTouchClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const railWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Short, polished entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineWrapperRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.15,
      }).from(
        railWrapperRef.current,
        {
          opacity: 0,
          y: 70,
          duration: 1.1,
        },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-white flex flex-col pt-[clamp(110px,15vh,150px)] pb-0 overflow-hidden"
    >
      {/* Upper Viewport: Central Massive Animated Headline & Supporting Statement */}
      <div
        ref={headlineWrapperRef}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 flex-shrink-0"
      >
        <HeroHeadline />
      </div>

      {/* Lower Viewport: Continuous Diagonal Media Card Stream */}
      <div
        ref={railWrapperRef}
        className="w-full relative z-10 mt-[clamp(24px,4vh,48px)]"
      >
        <HeroMediaRail />
      </div>
    </section>
  );
};
