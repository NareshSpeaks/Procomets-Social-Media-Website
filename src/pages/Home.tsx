import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { OrangeTransition } from '../sections/OrangeTransition';
import { ClientsStrip } from '../sections/ClientsStrip';
import { ExpertiseSection } from '../sections/ExpertiseSection';
import { MediaShowcase } from '../sections/MediaShowcase';

interface HomeProps {
  onGetInTouchClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onGetInTouchClick }) => {
  return (
    <main id="main-content" className="relative">
      {/* 
        Hero is placed first and uses sticky positioning.
        This ensures it remains fully visible and locked in place while the user scrolls down,
        allowing the subsequent transition section to physically slide up over it.
      */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <Navbar onGetInTouchClick={onGetInTouchClick} />
        <Hero onGetInTouchClick={onGetInTouchClick} />
      </div>

      {/* 
        OrangeTransition starts below the Hero (at 100vh).
        When the user scrolls, this layer moves up and covers the Hero.
      */}
      <div className="relative z-10 bg-transparent">
        <OrangeTransition onGetInTouchClick={onGetInTouchClick} />
      </div>
      
      <div className="relative z-10 bg-white">
        <ClientsStrip />
        <ExpertiseSection onGetInTouchClick={onGetInTouchClick} />
      </div>

      {/* Scroll-driven media showcase: center → fullscreen → 3×3 grid */}
      <div className="relative z-10 bg-white">
        <MediaShowcase />
      </div>
    </main>
  );
};
