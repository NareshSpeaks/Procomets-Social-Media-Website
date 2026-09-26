import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HEADLINE_WORDS = ['STRATEGY.', 'CREATIVITY.', 'CONTENT.', 'DIGITAL.'];

export const HeroHeadline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLHeadingElement>(null);
  const nextWordRef = useRef<HTMLHeadingElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextWord, setNextWord] = useState('');

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsPaused(true);
    const handleEnd = () => setIsPaused(false);
    
    window.addEventListener('hero-transition-start', handleStart);
    window.addEventListener('hero-transition-end', handleEnd);
    
    return () => {
      window.removeEventListener('hero-transition-start', handleStart);
      window.removeEventListener('hero-transition-end', handleEnd);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return; // Freeze headline changes

    // 1. WORD HOLD: 2.7s + TRANSITION: 0.8s = 3.5s total interval
    const interval = setInterval(() => {
      const nextIdx = (currentIndex + 1) % HEADLINE_WORDS.length;
      const incomingWord = HEADLINE_WORDS[nextIdx];
      setNextWord(incomingWord);
      setIsTransitioning(true);

      const currentEl = currentWordRef.current;
      const nextEl = nextWordRef.current;

      if (!currentEl || !nextEl) {
        setCurrentIndex(nextIdx);
        setIsTransitioning(false);
        return;
      }

      // Prepare incoming element positioned ABOVE the viewport
      gsap.set(nextEl, {
        xPercent: -50,
        yPercent: -160,
        opacity: 1,
      });

      // Create smooth kinetic timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(nextIdx);
          setIsTransitioning(false);
          gsap.set(currentEl, { clearProps: 'all' });
          gsap.set(nextEl, { clearProps: 'all' });
        },
      });

      // Outgoing word moves vertically DOWN and out
      tl.to(
        currentEl,
        {
          duration: 0.65,
          yPercent: 60,
          xPercent: -50,
          ease: 'power3.inOut',
        },
        0
      );

      // Incoming word moves vertically DOWN into center
      tl.to(
        nextEl,
        {
          duration: 0.65,
          yPercent: -50,
          xPercent: -50,
          ease: 'power3.inOut',
        },
        0
      );
    }, 2650);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center text-center select-none pt-4 sm:pt-8 pb-2"
    >
      {/* 
        Fixed-size Headline Viewport 
        Masking window for the kinetic typography transition
      */}
      <div className="relative h-[1.15em] overflow-hidden w-full text-[11vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[100px] xl:text-[120px]">
        {/* Active Headline Word */}
        <h1
          ref={currentWordRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[#29292B] font-black uppercase tracking-[-0.01em] leading-[0.9] will-change-transform pointer-events-none whitespace-nowrap"
        >
          {HEADLINE_WORDS[currentIndex]}
        </h1>

        {/* Incoming Headline Word */}
        {isTransitioning && (
          <h1
            ref={nextWordRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[#29292B] font-black uppercase tracking-[-0.01em] leading-[0.9] will-change-transform pointer-events-none whitespace-nowrap"
          >
            {nextWord}
          </h1>
        )}
      </div>

      {/* Supporting Hero Statement: COMPLETELY INDEPENDENT AND STATIONARY */}
      <div className="mt-2 sm:mt-3 md:mt-4 px-4">
        <p className="font-supporting font-bold text-xs sm:text-sm md:text-base lg:text-[1.125rem] tracking-[0.14em] text-[#0C0C0C] uppercase">
          WE LEAD WITH CONTENT. WE SCALE WITH DIGITAL.
        </p>
      </div>
    </div>
  );
};
