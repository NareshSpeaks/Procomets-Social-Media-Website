import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroImages } from '../data/heroImages';

export const HeroMediaRail: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // We render 3 identical sequences of the images to guarantee the viewport is covered
  // and we can loop back seamlessly.
  const displayImages = [...heroImages, ...heroImages, ...heroImages];

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ctx: gsap.Context;

    const initLoop = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (cards.length < heroImages.length * 3) return;

      // Card 0 is the start of Sequence 1
      // Card N is the start of Sequence 2
      const firstCard = cards[0];
      const sequenceStartCard = cards[heroImages.length]; 
      
      // Calculate the exact pixel width of exactly one sequence.
      // This relies on the browser's layout engine to factor in gaps and negative margins.
      const sequenceWidth = sequenceStartCard.offsetLeft - firstCard.offsetLeft;

      ctx = gsap.context(() => {
        // Animate the track to the right by exactly one sequence width,
        // then reset to -sequenceWidth seamlessly.
        gsap.fromTo(
          track,
          { x: -sequenceWidth },
          {
            x: 0,
            duration: sequenceWidth / 50, // Constant ~50px/sec movement
            ease: 'none',
            repeat: -1,
          }
        );
      }, trackRef);
    };

    // Small delay ensures fonts, images, and flex layout are fully painted before measuring
    const timeout = setTimeout(initLoop, 150);

    const resizeObserver = new ResizeObserver(() => {
      if (ctx) ctx.revert();
      initLoop();
    });
    resizeObserver.observe(document.body);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full select-none pointer-events-none mt-2 md:mt-6 lg:mt-8 h-[550px] md:h-[700px] lg:h-[800px] flex items-center">
      {/* 
        3D Perspective wrapper.
      */}
      <div className="w-full h-full" style={{ perspective: '1600px' }}>
        {/* 
          The Angled Plane:
          rotateZ(-12deg) creates the diagonal.
          rotateY(20deg) pushes the right side into the background.
          rotateX(5deg) subtly tilts the top edge away.
        */}
        <div 
          className="w-[150%] -ml-[25%] h-full flex items-center origin-center"
          style={{ 
            transform: 'rotateZ(-12deg) rotateY(20deg) rotateX(5deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center -space-x-4 sm:-space-x-6 md:-space-x-8 lg:-space-x-10 w-max"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {displayImages.map((src, index) => {
              const i = index % heroImages.length;
              
              // Subtle organic lean, but largely sitting flat on the 3D plane
              const rotations = [-2, -4, -3, -5, -4, -2];
              const rotateZ = rotations[i];
              
              return (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ 
                    transform: `rotateZ(${rotateZ}deg) translateZ(0)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card Container with portrait aspect ratio */}
                  <div className="media-card-shell w-[280px] h-[400px] sm:w-[320px] sm:h-[460px] md:w-[360px] md:h-[520px] lg:w-[400px] lg:h-[580px] bg-stone-900 rounded-[24px] md:rounded-[32px] relative overflow-hidden shadow-2xl">
                    <img 
                      src={src} 
                      alt={`Portfolio Piece ${i + 1}`} 
                      className="w-full h-full object-cover" 
                      loading={index < 8 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] border border-white/15" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
