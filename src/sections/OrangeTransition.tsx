import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

interface OrangeTransitionProps {
  onGetInTouchClick: () => void;
}

export const OrangeTransition: React.FC<OrangeTransitionProps> = ({ onGetInTouchClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedLayerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();
  const transitionState = useRef<'page1' | 'transitioning-forward' | 'page2' | 'transitioning-reverse'>('page1');
  const accumulatedDelta = useRef(0);
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    // Sync state if loaded halfway down
    if (window.scrollY >= window.innerHeight / 2) {
      transitionState.current = 'page2';
    }

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

      gsap.set(fixedLayerRef.current, { backgroundColor: 'transparent' });

      // 2. Main ScrollTimeline
      tl.current = gsap.timeline({
        paused: true
      });

      // Phase 1: The geometric yellow panel rotates and expands SIMULTANEOUSLY.
      tl.current.to(shapeRef.current, {
        scale: 1,
        rotationZ: 0,
        yPercent: 0,
        duration: 1.2, 
        ease: 'power3.inOut' 
      }, 0);

      // Swap to solid background instantly once panel fully covers screen
      tl.current.set(fixedLayerRef.current, { backgroundColor: '#FFB706' }, 1.2);
      tl.current.set(shapeRef.current, { opacity: 0 }, 1.2);

      // Phase 2: Content settles in
      tl.current.to(headingLine1Ref.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.0);
      tl.current.to(headingLine2Ref.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.1);
      tl.current.to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.2);
      tl.current.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.3);

      // Sync GSAP timeline with initial load position
      if (transitionState.current === 'page2') {
        tl.current.progress(1);
      }

      function playForward() {
        if (transitionState.current !== 'page1') return;
        
        transitionState.current = 'transitioning-forward';
        lenis?.stop();
        window.dispatchEvent(new CustomEvent('hero-transition-start'));

        // Make the inner layer physically fixed over the viewport
        gsap.set(fixedLayerRef.current, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 50 });

        tl.current!.timeScale(1.0).play().then(() => {
          // Once animation is fully complete, snap scroll to page 2 seamlessly
          window.scrollTo(0, window.innerHeight);
          lenis?.scrollTo(window.innerHeight, { immediate: true });
          
          // Revert fixed positioning (it's now absolute over the scrolled area, so visually identical)
          gsap.set(fixedLayerRef.current, { clearProps: 'position,top,left,width,height,zIndex' });
          
          transitionState.current = 'page2';
          lenis?.start();
          window.dispatchEvent(new CustomEvent('hero-transition-end'));
        });
      }

      function playReverse() {
        if (transitionState.current !== 'page2') return;
        
        transitionState.current = 'transitioning-reverse';
        lenis?.stop();
        window.dispatchEvent(new CustomEvent('hero-transition-start'));

        // Make the inner layer physically fixed over the viewport again
        gsap.set(fixedLayerRef.current, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 50 });
        
        // Jump the native scroll instantly back to the top (Hero page) behind the fixed transition layer
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true });

        tl.current!.timeScale(1.2).reverse().then(() => {
          gsap.set(fixedLayerRef.current, { clearProps: 'position,top,left,width,height,zIndex' });
          transitionState.current = 'page1';
          lenis?.start();
          window.dispatchEvent(new CustomEvent('hero-transition-end'));
        });
      }

      // 4. Input Interception (Debounced delta accumulation)
      function handleWheel(e: WheelEvent) {
        if (transitionState.current === 'transitioning-forward' || transitionState.current === 'transitioning-reverse') {
          e.preventDefault();
          return;
        }

        const y = window.scrollY;
        const isAtTop = y <= 5;
        const isAtPage2 = Math.abs(y - window.innerHeight) <= 5;

        if (isAtTop) {
          if (e.deltaY > 0) {
            e.preventDefault(); // Stop native scrolling from occurring while accumulating threshold
            accumulatedDelta.current += e.deltaY;
            if (accumulatedDelta.current > 40) {
              accumulatedDelta.current = 0;
              playForward();
            }
          } else {
            accumulatedDelta.current = 0;
          }
        } else if (isAtPage2) {
          if (e.deltaY < 0) {
            e.preventDefault();
            accumulatedDelta.current += e.deltaY;
            if (accumulatedDelta.current < -40) {
              accumulatedDelta.current = 0;
              playReverse();
            }
          } else {
            accumulatedDelta.current = 0;
          }
        } else {
          accumulatedDelta.current = 0;
        }
      }

      let touchStartY = 0;
      function handleTouchStart(e: TouchEvent) {
        touchStartY = e.touches[0].clientY;
      }

      function handleTouchMove(e: TouchEvent) {
        if (transitionState.current === 'transitioning-forward' || transitionState.current === 'transitioning-reverse') {
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
        if (transitionState.current === 'transitioning-forward' || transitionState.current === 'transitioning-reverse') {
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

      function checkScrollPosition() {
        if (transitionState.current === 'transitioning-forward' || transitionState.current === 'transitioning-reverse') return;
        
        const y = window.scrollY;
        const h = window.innerHeight;

        if (y > 5 && y < h - 5) {
          if (transitionState.current === 'page1') {
            playForward();
          } else if (transitionState.current === 'page2') {
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
        tl.current?.kill();
        lenis?.start();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, containerRef);

    return () => ctx.revert();
  }, []); // Only run once on mount

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen"
      style={{ overflowX: 'clip', overflowY: 'visible' }}
    >
      {/* Inner layer that becomes FIXED during transition */}
      <div 
        ref={fixedLayerRef} 
        className="absolute inset-0 bg-transparent"
        style={{ overflowX: 'clip', overflowY: 'visible' }}
      >
        <div 
          ref={shapeRef}
          className="absolute z-10 bg-[#FFB706] pointer-events-none origin-center"
          style={{
            width: '250vmax',
            height: '250vmax',
            left: '50%',
            top: '50%',
            marginLeft: '-125vmax',
            marginTop: '-125vmax',
            willChange: 'transform'
          }}
        />
        <div 
          ref={contentRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
        >
          <div className="max-w-5xl w-full flex flex-col items-center text-center pointer-events-auto mt-16 md:mt-0">
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
            
            <p 
              ref={paragraphRef}
              className="mt-6 md:mt-8 text-sm md:text-[15px] font-supporting font-normal text-[#2C2D2F] max-w-[560px] leading-[1.6] text-center px-4 opacity-90"
            >
              We're a digital marketing team that specializes in providing end-to-end services to help businesses get the required task DONE. With a wide range of expertise, including content creation, brand development, performance marketing, website design and development, graphic design, photography, videography, and 3D animation, we offer a comprehensive suite of services to meet the diverse needs of it's clients under one roof.
            </p>

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
    </div>
  );
};
