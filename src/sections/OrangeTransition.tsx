import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface OrangeTransitionProps {
  onGetInTouchClick: () => void;
}

export const OrangeTransition: React.FC<OrangeTransitionProps> = ({ onGetInTouchClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(shapeRef.current, { 
        scale: 0.15,
        rotationZ: 25, 
        yPercent: 30, 
        opacity: 1
      });
      
      gsap.set([headingLine1Ref.current, headingLine2Ref.current, paragraphRef.current, ctaRef.current], {
        opacity: 0,
        y: 20
      });

      gsap.set(containerRef.current, { backgroundColor: 'transparent' });

      // 2. Main ScrollTimeline
      const tl = gsap.timeline({
        paused: true
      });

      // Phase 1: The geometric yellow panel rotates and expands SIMULTANEOUSLY.
      tl.to(shapeRef.current, {
        scale: 1,
        rotationZ: 0,
        yPercent: 0,
        duration: 1.2, 
        ease: 'power3.inOut' 
      }, 0);

      // 3. Perfect Scroll Sync Callback
      // When reversing, we only start moving the window back to Hero AFTER the text has faded out
      tl.add(() => {
        if ((window as any)._transitionState === 'transitioning-reverse') {
          gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            duration: 1.2 / tl.timeScale(),
            ease: 'power3.inOut',
          });
        }
      }, 1.2);

      // Swap to solid background instantly once panel fully covers screen
      tl.set(containerRef.current, { backgroundColor: '#FFB706' }, 1.2);
      tl.set(shapeRef.current, { opacity: 0 }, 1.2);

      // Phase 2: Content settles in
      tl.to(headingLine1Ref.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.0);
      tl.to(headingLine2Ref.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.1);
      tl.to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.2);
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.3);

      // 4. State Machine & Event Hijacking
      (window as any)._transitionState = window.scrollY < window.innerHeight / 2 ? 'page1' : 'page2';
      let isTransitioning = false;

      // Sync GSAP timeline with initial load position
      if ((window as any)._transitionState === 'page2') {
        tl.progress(1);
      }

      function playForward() {
        if (isTransitioning) return;
        (window as any)._transitionState = 'transitioning-forward';
        isTransitioning = true;
        window.dispatchEvent(new CustomEvent('hero-transition-start'));
        
        // Force start position exactly at top
        window.scrollTo(0, 0);

        tl.timeScale(1.0).play();

        // Animate window scroll alongside Phase 1
        gsap.to(window, {
          scrollTo: { y: window.innerHeight, autoKill: false },
          duration: 1.2,
          ease: 'power3.inOut',
        });
      }

      function playReverse() {
        if (isTransitioning) return;
        (window as any)._transitionState = 'transitioning-reverse';
        isTransitioning = true;
        window.dispatchEvent(new CustomEvent('hero-transition-start'));
        
        // Force start position exactly at Page 2
        window.scrollTo(0, window.innerHeight);

        tl.timeScale(1.2).reverse();
        // The window scroll back to 0 is handled by the tl.add() callback at 1.2s
      }

      tl.eventCallback('onComplete', () => {
        (window as any)._transitionState = 'page2';
        isTransitioning = false;
        window.dispatchEvent(new CustomEvent('hero-transition-end'));
      });

      tl.eventCallback('onReverseComplete', () => {
        (window as any)._transitionState = 'page1';
        isTransitioning = false;
        window.dispatchEvent(new CustomEvent('hero-transition-end'));
      });

      // 5. Input Interception
      function handleWheel(e: WheelEvent) {
        if (isTransitioning) {
          e.preventDefault();
          return;
        }
        const y = window.scrollY;
        const isAtTop = y <= 5;
        const isAtPage2 = Math.abs(y - window.innerHeight) <= 5;

        if (isAtTop && e.deltaY > 0) {
          e.preventDefault();
          playForward();
        } else if (isAtPage2 && e.deltaY < 0) {
          e.preventDefault();
          playReverse();
        }
      }

      let touchStartY = 0;
      function handleTouchStart(e: TouchEvent) {
        touchStartY = e.touches[0].clientY;
      }

      function handleTouchMove(e: TouchEvent) {
        if (isTransitioning) {
          e.preventDefault();
          return;
        }
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const y = window.scrollY;
        const isAtTop = y <= 5;
        const isAtPage2 = Math.abs(y - window.innerHeight) <= 5;

        if (isAtTop && deltaY > 10) {
          e.preventDefault();
          playForward();
        } else if (isAtPage2 && deltaY < -10) {
          e.preventDefault();
          playReverse();
        }
      }

      function handleKeyDown(e: KeyboardEvent) {
        if (isTransitioning) {
          if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
            e.preventDefault();
          }
          return;
        }
        const y = window.scrollY;
        const isAtTop = y <= 5;
        const isAtPage2 = Math.abs(y - window.innerHeight) <= 5;

        if (isAtTop && ['Space', 'ArrowDown', 'PageDown'].includes(e.code)) {
          e.preventDefault();
          playForward();
        } else if (isAtPage2 && ['ArrowUp', 'PageUp', 'Home'].includes(e.code)) {
          e.preventDefault();
          playReverse();
        }
      }

      // Safety Net: Catch trackpad momentum or scrollbar dragging that bypasses wheel events
      function checkScrollPosition() {
        if (isTransitioning) return;
        const y = window.scrollY;
        const h = window.innerHeight;

        if (y > 5 && y < h - 5) {
          if ((window as any)._transitionState === 'page1') {
            playForward();
          } else if ((window as any)._transitionState === 'page2') {
            playReverse();
          }
        }
      }

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('keydown', handleKeyDown, { passive: false });
      window.addEventListener('scroll', checkScrollPosition, { passive: true });

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('scroll', checkScrollPosition);
        tl.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-transparent"
      style={{ overflowX: 'clip', overflowY: 'visible' }} // Allow shape to spill vertically over hero
    >

      {/* 
        LAYER 1: The Geometric Yellow Transition Panel
        Oversized to ensure complete coverage without white gaps when rotated.
      */}
      <div 
        ref={shapeRef}
        className="absolute z-10 bg-[#FFB706] pointer-events-none origin-center"
        style={{
          width: '250vmax', // Massively oversized to cover viewport even when rotated
          height: '250vmax',
          left: '50%',
          top: '50%',
          marginLeft: '-125vmax',
          marginTop: '-125vmax',
          willChange: 'transform'
        }}
      />

      {/* 
        LAYER 2: Text Content
        Always stays upright. Does not rotate.
      */}
      <div 
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
      >
        <div className="max-w-5xl w-full flex flex-col items-center text-center pointer-events-auto mt-16 md:mt-0">
          
          {/* Headline */}
          <h2 
            className="flex flex-col items-center justify-center uppercase text-[#2C2D2F]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 'bold', letterSpacing: '-0.03em', lineHeight: 0.85 }}
          >
            <span 
              ref={headingLine1Ref} 
              className="block text-[15vw] sm:text-[110px] md:text-[150px] lg:text-[180px] transform-gpu"
            >
              WE GET THE
            </span>
            <span 
              ref={headingLine2Ref} 
              className="block text-[15vw] sm:text-[110px] md:text-[150px] lg:text-[180px] transform-gpu"
            >
              JOB DONE
            </span>
          </h2>
          
          {/* Paragraph */}
          <p 
            ref={paragraphRef}
            className="mt-6 md:mt-8 text-sm md:text-[15px] font-supporting font-normal text-[#2C2D2F] max-w-[560px] leading-[1.6] text-center px-4 opacity-90"
          >
            We're a digital marketing team that specializes in providing end-to-end services to help businesses get the required task DONE. With a wide range of expertise, including content creation, brand development, performance marketing, website design and development, graphic design, photography, videography, and 3D animation, we offer a comprehensive suite of services to meet the diverse needs of it's clients under one roof.
          </p>

          {/* CTA - Final Intended Size */}
          <div 
            ref={ctaRef}
            className="mt-12 md:mt-16 w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#DE421E] text-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 shadow-xl pointer-events-auto shrink-0"
            onClick={onGetInTouchClick}
          >
            <span className="font-supporting text-[10px] md:text-[11px] tracking-[0.2em] font-bold uppercase text-center leading-snug">
              OUR<br/>BRAND<br/>SOLUTIONS
            </span>
            <span className="text-lg mt-1 leading-none">→</span>
          </div>
          
        </div>
      </div>

    </div>
  );
};

