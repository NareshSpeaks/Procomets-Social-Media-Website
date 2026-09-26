import React, { useRef, useEffect, useCallback, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

// 9 media items — index 4 is the CENTER hero by default
const initialMediaItems = [
  { id: 'm1', type: 'video', youtubeId: 'YW4h-WbKQPk', alt: 'Media 1' },
  { id: 'm2', type: 'video', youtubeId: 'O6Gn4yL7cTU', alt: 'Media 2' },
  { id: 'm3', type: 'video', youtubeId: 'w0wWVHfleoE', alt: 'Media 3' },
  { id: 'm4', type: 'video', youtubeId: 'HU5RRrh2Orc', alt: 'Media 4' },
  { id: 'm5', type: 'video', youtubeId: 'e38kF08Pkww', alt: 'Center Hero' },
  { id: 'm6', type: 'video', youtubeId: 'ojxBv7bv82w', alt: 'Media 5' },
  { id: 'm7', type: 'video', youtubeId: 'xCTAvYNoCWc', alt: 'Media 6' },
  { id: 'm8', type: 'image', src: '/assets/media7.png', alt: 'Media 7' },
  { id: 'm9', type: 'video', youtubeId: '69JICTZzfwc', alt: 'Media 8' },
];

export const MediaShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // slots maps the array index to its visual position (0-8)
  const [slots, setSlots] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  const setupAnimation = useCallback(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return null;

    // Find the center card based on current slots mapping
    const centerCardIndex = slots.indexOf(4);
    const centerCard = cardRefs.current[centerCardIndex];
    if (!centerCard) return null;

    // Kill and revert any existing ScrollTriggers to clear inline styles
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === section) st.kill(true);
    });

    // Clear any lingering transforms or z-index applied by Flip or gsap.set
    cardRefs.current.forEach(card => {
       if (card) gsap.set(card, { clearProps: 'transform,zIndex,borderRadius' });
    });

    // ── Measure the center card's natural position relative to the grid ──
    const gridRect = grid.getBoundingClientRect();
    const centerRect = centerCard.getBoundingClientRect();

    const cardLeft = centerRect.left - gridRect.left;
    const cardTop = centerRect.top - gridRect.top;
    const cardW = centerRect.width;
    const cardH = centerRect.height;

    // Target: viewport-filling size (relative to the grid)
    const targetW = gridRect.width;
    const targetH = gridRect.height;

    const scaleX = targetW / cardW;
    const scaleY = targetH / cardH;
    const scale = Math.max(scaleX, scaleY);

    const cardCenterX = cardLeft + cardW / 2;
    const cardCenterY = cardTop + cardH / 2;
    const gridCenterX = gridRect.width / 2;
    const gridCenterY = gridRect.height / 2;
    const translateX = gridCenterX - cardCenterX;
    const translateY = gridCenterY - cardCenterY;

    const ctx = gsap.context(() => {
      gsap.set(centerCard, {
        scale: scale,
        x: translateX,
        y: translateY,
        borderRadius: '0px',
        zIndex: 50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: grid,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── SCROLL ANIMATION (0% → 100%): Fullscreen → Grid ──
      tl.fromTo(centerCard,
        {
          scale: scale,
          x: translateX,
          y: translateY,
          borderRadius: '0px',
        },
        {
          scale: 1,
          x: 0,
          y: 0,
          borderRadius: '12px',
          duration: 1,
          ease: 'power2.inOut',
          immediateRender: true,
        },
        0
      );

      // ── SURROUNDING CARDS ANIMATION ──
      cardRefs.current.forEach((card, i) => {
        const visualIndex = slots[i];
        if (visualIndex === 4 || !card) return; // Skip center card
        
        const col = visualIndex % 3;
        const row = Math.floor(visualIndex / 3);
        
        const xDir = col - 1; // -1 (left), 0 (center), 1 (right)
        const yDir = row - 1; // -1 (top), 0 (center), 1 (bottom)
        
        const pushX = (cardW * (scale - 1) / 2) * xDir;
        const pushY = (cardH * (scale - 1) / 2) * yDir;

        gsap.set(card, { zIndex: 1 });

        tl.fromTo(card,
          {
            scale: 1,
            x: pushX,
            y: pushY,
          },
          {
            scale: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power2.inOut',
            immediateRender: true,
          },
          0 
        );
      });

    }, section);

    return ctx;
  }, [slots]);

  useLayoutEffect(() => {
    let ctx: gsap.Context | null = null;
    
    // Allow DOM to settle, then rebuild ScrollTrigger and Flip
    const timer = setTimeout(() => {
      if (flipStateRef.current) {
        // Build new ScrollTrigger to get final transforms for current scroll position
        ctx = setupAnimation();
        
        // Animate the swap
        Flip.from(flipStateRef.current, {
          duration: 0.8,
          ease: 'power2.inOut',
          zIndex: 50,
          onComplete: () => {
            const st = ScrollTrigger.getAll().find(s => s.vars.trigger === sectionRef.current);
            if (st) {
               // Smoothly scroll to top so the new center expands
               window.scrollTo({ top: st.start, behavior: 'smooth' });
            }
          }
        });
        
        flipStateRef.current = null;
      } else {
        // Initial mount or resize
        ctx = setupAnimation();
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [slots, setupAnimation]);

  useEffect(() => {
    // Recalculate on resize
    const onResize = () => {
      setSlots(s => [...s]); 
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleCardClick = (itemIndex: number) => {
    const currentSlot = slots[itemIndex];
    if (currentSlot === 4) return; // Already center

    const centerItemIndex = slots.indexOf(4);
    
    // Capture state BEFORE updating slots
    flipStateRef.current = Flip.getState(cardRefs.current);
    
    const newSlots = [...slots];
    newSlots[itemIndex] = 4;
    newSlots[centerItemIndex] = currentSlot;
    
    setSlots(newSlots); // triggers re-render and useLayoutEffect
  };

  const renderMediaContent = (item: any) => {
    if (item.type === 'image') {
      return (
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      );
    }
  
    if (item.type === 'video') {
      return (
        <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3`}
            allow="autoplay; fullscreen"
            className="w-full h-full scale-[1.8] border-0 pointer-events-none"
            tabIndex={-1}
          />
          {/* Transparent overlay captures clicks for all videos, preventing native YouTube interaction */}
          <div className="absolute inset-0 bg-transparent z-10" />
        </div>
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '400vh' }}
    >
      <div
        ref={gridRef}
        className="w-full h-screen overflow-hidden relative"
        style={{ background: '#FFFFFF' }}
      >
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[6px] p-[6px]">
          {initialMediaItems.map((item, i) => {
            const visualIndex = slots[i];
            const isCenter = visualIndex === 4;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`relative overflow-hidden will-change-transform ${!isCenter ? 'cursor-pointer' : ''}`}
                style={{
                  order: visualIndex,
                  borderRadius: '12px',
                  transformOrigin: 'center center',
                }}
                onClick={() => handleCardClick(i)}
              >
                {renderMediaContent(item)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

