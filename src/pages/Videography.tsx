import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { videographyProjects, VideographyProject } from '../data/videography';

import { Navbar } from '../components/Navbar';
import { VideoTile } from '../components/VideoTile';
import { VideoModal } from '../components/VideoModal';

type FilterType = 'all' | 'products-accessories';

interface TransitionState {
  outgoingProjects: VideographyProject[];
  incomingProjects: VideographyProject[];
  key: number;
}

interface VideographyProps {
  onGetInTouchClick: () => void;
}

export const Videography: React.FC<VideographyProps> = ({ onGetInTouchClick }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [displayedFilter, setDisplayedFilter] = useState<FilterType>('all');
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);
  const [stageMinHeight, setStageMinHeight] = useState<number | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const transitionIdRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getProjectsForCategory = (category: FilterType) => {
    return videographyProjects.filter(project => {
      if (category === 'all') return true;
      return project.category === category;
    });
  };

  const handleCategoryChange = (newCat: FilterType) => {
    if (newCat === activeFilter && !transitionState) return;

    // 1. Instantly trigger active state transfer for button styling (450ms smooth transition)
    setActiveFilter(newCat);

    // 2. Measure current stage height to keep stage stationary and prevent layout shifts
    const currentHeight = stageRef.current ? stageRef.current.offsetHeight : 0;
    
    // Outgoing projects: current snapshot
    const outgoing = transitionState 
      ? transitionState.incomingProjects 
      : getProjectsForCategory(displayedFilter);
    const incoming = getProjectsForCategory(newCat);

    // Calculate columns based on viewport to ensure incoming cards fit during cross-dissolve
    let cols = 3;
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) cols = 1;
      else if (window.innerWidth < 1024) cols = 2;
    }
    const currentRows = Math.max(1, Math.ceil(outgoing.length / cols));
    const nextRows = Math.max(1, Math.ceil(incoming.length / cols));
    const rowHeight = currentHeight > 0 ? currentHeight / currentRows : 450;
    const targetHeight = rowHeight * nextRows;
    const lockedMinHeight = Math.max(currentHeight, targetHeight);

    if (lockedMinHeight > 0) {
      setStageMinHeight(lockedMinHeight);
    }

    // 3. Increment transition ID to cancel previous animations cleanly (prevent rapid click races)
    const currentId = ++transitionIdRef.current;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 4. Mount both layers simultaneously for cross-dissolve
    setTransitionState({
      outgoingProjects: outgoing,
      incomingProjects: incoming,
      key: currentId
    });

    // 5. Complete transition cleanly at 650ms (Section 6 target timing)
    timeoutRef.current = setTimeout(() => {
      if (transitionIdRef.current === currentId) {
        setDisplayedFilter(newCat);
        setTransitionState(null);
        setTimeout(() => {
          if (transitionIdRef.current === currentId) {
            setStageMinHeight(null);
          }
        }, 50);
      }
    }, 650);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Existing Procomets Header */}
      <Navbar onGetInTouchClick={onGetInTouchClick} />
      
      <main className="min-h-screen pt-[140px] pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Header - completely stationary */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB706]"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">
              VISUAL STORIES IN MOTION
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB706]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-display uppercase tracking-tight text-[#0C0C0C] leading-none m-0">
            OUR VIDEOGRAPHY
          </h1>
        </div>

        {/* Filters - stationary position & dimensions, smooth 450ms color transfer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-[30px] border border-stone-900 text-stone-900 text-base md:text-xl font-display uppercase tracking-tight transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeFilter === 'all' 
                ? 'bg-[#FFB706]' 
                : 'bg-white hover:bg-[#FFB706]'
            }`}
          >
            ALL VIDEOS
          </button>
          <button
            onClick={() => handleCategoryChange('products-accessories')}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-[30px] border border-stone-900 text-stone-900 text-base md:text-xl font-display uppercase tracking-tight transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeFilter === 'products-accessories' 
                ? 'bg-[#FFB706]' 
                : 'bg-white hover:bg-[#FFB706]'
            }`}
          >
            PRODUCTS AND ACCESSORIES
          </button>
        </div>

        {/* Video Grid Stage */}
        <div 
          ref={stageRef}
          className="video-grid-stage relative w-full"
          style={{
            minHeight: stageMinHeight ? `${stageMinHeight}px` : undefined,
            transition: stageMinHeight ? 'none' : 'min-height 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {transitionState ? (
            <>
              {/* Layer 1: Outgoing Grid (0–500ms opacity 1 -> 0, soft lift into white midpoint) */}
              <motion.div
                key={`outgoing-${transitionState.key}`}
                className="current-grid absolute inset-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pointer-events-none z-10"
                initial={{ opacity: 1, filter: 'brightness(1)' }}
                animate={{ opacity: 0, filter: 'brightness(1.12)' }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                {transitionState.outgoingProjects.map((project) => (
                  <VideoTile 
                    key={`out-${project.id}`} 
                    project={project}
                    onClick={() => {}}
                  />
                ))}
              </motion.div>

              {/* Layer 2: Incoming Grid (100–650ms opacity 0 -> 1, emerging from soft light) */}
              <motion.div
                key={`incoming-${transitionState.key}`}
                className="next-grid absolute inset-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 z-20 pointer-events-auto"
                initial={{ opacity: 0, filter: 'brightness(1.12)' }}
                animate={{ opacity: 1, filter: 'brightness(1)' }}
                transition={{ 
                  duration: 0.55, 
                  delay: 0.1, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                {transitionState.incomingProjects.map((project) => (
                  <VideoTile 
                    key={`in-${project.id}`} 
                    project={project}
                    onClick={() => {
                      if (project.youtubeId) {
                        setActiveVideoId(project.youtubeId);
                      }
                    }}
                  />
                ))}
              </motion.div>
            </>
          ) : (
            /* Stable In-Flow Grid */
            <div className="current-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
              {getProjectsForCategory(displayedFilter).map((project) => (
                <VideoTile 
                  key={project.id} 
                  project={project}
                  onClick={() => {
                    if (project.youtubeId) {
                      setActiveVideoId(project.youtubeId);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Video Modal */}
      <VideoModal 
        isOpen={!!activeVideoId}
        youtubeId={activeVideoId || ''}
        onClose={() => setActiveVideoId(null)}
      />
    </div>
  );
};
