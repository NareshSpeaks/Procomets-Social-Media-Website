import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Navbar } from '../components/Navbar';
import { HorizontalVideoTile, HorizontalVideoProject } from '../components/HorizontalVideoTile';
import { VerticalVideoTile, VerticalVideoProject } from '../components/VerticalVideoTile';
import { VideoModal } from '../components/VideoModal';

type FilterType = 'all' | 'short-form-social';

interface TransitionState {
  outgoingFilter: FilterType;
  incomingFilter: FilterType;
  key: number;
}

interface VideoEditingProps {
  onGetInTouchClick: () => void;
}

const videoEditingProjects: HorizontalVideoProject[] = [
  { id: '1', title: 'Video Placeholder 01', category: 'all', youtubeId: 'xCTAvYNoCWc' },
  { id: '2', title: 'Video Placeholder 02', category: 'all', youtubeId: 'ojxBv7bv82w' },
  { id: '3', title: 'Video Placeholder 03', category: 'all', youtubeId: '69JICTZzfwc' },
  { id: '4', title: 'Video Placeholder 04', category: 'all', youtubeId: 'YW4h-WbKQPk' },
  { id: '5', title: 'Video Placeholder 05', category: 'all', youtubeId: 'O6Gn4yL7cTU' },
  { id: '6', title: 'Video Placeholder 06', category: 'all', youtubeId: 'w0wWVHfleoE' },
  { id: '7', title: 'Video Placeholder 07', category: 'all', youtubeId: 'e38kF08Pkww' },
  { id: '8', title: 'Video Placeholder 08', category: 'all', youtubeId: 'HU5RRrh2Orc' },
  { id: '9', title: 'Video Placeholder 09', category: 'all', youtubeId: 'NP2dPNIrFiM' },
  { id: '10', title: 'Video Placeholder 10', category: 'all', youtubeId: 'yeWi6YdDOMM' },
  { id: '11', title: 'Video Placeholder 11', category: 'all', youtubeId: 'eiIEame-Yf4' },
  { id: '12', title: 'Video Placeholder 12', category: 'all', youtubeId: 'hmy_IZaM1Lg' },
  { id: '13', title: 'Video Placeholder 13', category: 'all', youtubeId: 'aD7j5ow5C3o' },
  { id: '14', title: 'Video Placeholder 14', category: 'all', youtubeId: 'eS7GM3JfFx0' },
  { id: '15', title: 'Video Placeholder 15', category: 'all', youtubeId: 'REUMGv659ms' },
  { id: '16', title: 'Video Placeholder 16', category: 'all', youtubeId: 'UNKSfU3vu2U' },
];

const shortFormProjects: VerticalVideoProject[] = [
  { id: 'sf-1', title: 'SHORT FORM VIDEO 01', platform: 'instagram', instagramId: 'DVlP4FEk2A1', officialUrl: 'https://www.instagram.com/reel/DVlP4FEk2A1/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-2', title: 'SHORT FORM VIDEO 02', platform: 'instagram', instagramId: 'DVbFwIIjCTt', officialUrl: 'https://www.instagram.com/reel/DVbFwIIjCTt/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-3', title: 'SHORT FORM VIDEO 03', platform: 'instagram', instagramId: 'DZFW3ZGyjLt', officialUrl: 'https://www.instagram.com/reel/DZFW3ZGyjLt/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-4', title: 'SHORT FORM VIDEO 04', platform: 'instagram', instagramId: 'DNlOSGBzcVH', officialUrl: 'https://www.instagram.com/reel/DNlOSGBzcVH/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-5', title: 'SHORT FORM VIDEO 05', platform: 'instagram', instagramId: 'C4A0B2RxsaH', officialUrl: 'https://www.instagram.com/reel/C4A0B2RxsaH/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-6', title: 'SHORT FORM VIDEO 06', platform: 'instagram', instagramId: 'DZure3AyLbW', officialUrl: 'https://www.instagram.com/reel/DZure3AyLbW/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-7', title: 'SHORT FORM VIDEO 07', platform: 'instagram', instagramId: 'DSCKpCakoqF', officialUrl: 'https://www.instagram.com/reel/DSCKpCakoqF/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-8', title: 'SHORT FORM VIDEO 08', platform: 'instagram', instagramId: 'DVbFwIIjCTt', officialUrl: 'https://www.instagram.com/reel/DVbFwIIjCTt/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-9', title: 'SHORT FORM VIDEO 09', platform: 'instagram', instagramId: 'DUshb6sjEgb', officialUrl: 'https://www.instagram.com/reel/DUshb6sjEgb/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-10', title: 'SHORT FORM VIDEO 10', platform: 'instagram', instagramId: 'Dc08OqphgGh', officialUrl: 'https://www.instagram.com/reel/Dc08OqphgGh/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-11', title: 'SHORT FORM VIDEO 11', platform: 'instagram', instagramId: 'DYoUmw8PZNY', officialUrl: 'https://www.instagram.com/reel/DYoUmw8PZNY/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-12', title: 'SHORT FORM VIDEO 12', platform: 'instagram', instagramId: 'DLFmi-JI10b', officialUrl: 'https://www.instagram.com/reel/DLFmi-JI10b/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-13', title: 'SHORT FORM VIDEO 13', platform: 'instagram', instagramId: 'C5dcdYURUXn', officialUrl: 'https://www.instagram.com/reel/C5dcdYURUXn/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==' },
  { id: 'sf-14', title: 'SHORT FORM VIDEO 14', platform: 'youtube', youtubeId: 'n0yMFILNP6g', officialUrl: 'https://youtube.com/shorts/n0yMFILNP6g?si=0aOsXrvkI0jM3Ari' },
  { id: 'sf-15', title: 'SHORT FORM VIDEO 15', platform: 'youtube', youtubeId: '7OJKhRIL-ao', officialUrl: 'https://youtube.com/shorts/7OJKhRIL-ao?si=V1IFjpq7_xqutPEB' },
];

export const VideoEditing: React.FC<VideoEditingProps> = ({ onGetInTouchClick }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [displayedFilter, setDisplayedFilter] = useState<FilterType>('all');
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);
  const [stageMinHeight, setStageMinHeight] = useState<number | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const transitionIdRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getProjectsForCategory = (category: FilterType) => {
    if (category === 'short-form-social') {
      return shortFormProjects;
    }
    return videoEditingProjects;
  };

  const getGridClasses = (category: FilterType) => {
    return category === 'short-form-social' 
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2';
  };

  const renderProject = (project: HorizontalVideoProject | VerticalVideoProject, category: FilterType) => {
    if (category === 'short-form-social') {
      const p = project as VerticalVideoProject;
      return (
        <VerticalVideoTile 
          key={p.id} 
          project={p}
          onClick={() => {
            if (p.youtubeId) setActiveVideoId(p.youtubeId);
          }}
        />
      );
    }
    const p = project as HorizontalVideoProject;
    return (
      <HorizontalVideoTile 
        key={p.id} 
        project={p}
        onClick={() => {
          if (p.youtubeId) setActiveVideoId(p.youtubeId);
        }}
      />
    );
  };

  const handleCategoryChange = (newCat: FilterType) => {
    if (newCat === activeFilter && !transitionState) return;

    setActiveFilter(newCat);

    const currentHeight = stageRef.current ? stageRef.current.offsetHeight : 0;
    
    const outgoingFilter = transitionState ? transitionState.incomingFilter : displayedFilter;
    const incomingFilter = newCat;

    const incoming = getProjectsForCategory(incomingFilter);

    // Calculate approx cols to estimate height
    let incomingCols = incomingFilter === 'short-form-social' ? 3 : 2;
    
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        incomingCols = incomingFilter === 'short-form-social' ? 2 : 1;
        if (window.innerWidth < 640) {
          incomingCols = 1;
        }
      }
    }
    
    const nextRows = Math.max(1, Math.ceil(incoming.length / incomingCols));
    const estimatedTargetHeight = (incomingFilter === 'short-form-social' ? 600 : 450) * nextRows; // very rough estimate
    
    // We just lock it to the max of current and estimated to avoid jump up before fade out
    const lockedMinHeight = Math.max(currentHeight, estimatedTargetHeight);

    if (lockedMinHeight > 0) {
      setStageMinHeight(lockedMinHeight);
    }

    const currentId = ++transitionIdRef.current;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTransitionState({
      outgoingFilter,
      incomingFilter,
      key: currentId
    });

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
      <Navbar onGetInTouchClick={onGetInTouchClick} />
      
      <main className="min-h-screen pt-[140px] pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB706]"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">
              VISUAL STORIES IN MOTION
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB706]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-display uppercase tracking-tight text-[#0C0C0C] leading-none m-0">
            OUR VIDEO EDITING
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-[30px] border border-stone-900 text-stone-900 text-base md:text-xl font-display uppercase tracking-tight transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeFilter === 'all' 
                ? 'bg-[#FFB706]' 
                : 'bg-white hover:bg-[#FFB706]'
            }`}
          >
            ALL EDITS
          </button>
          <button
            onClick={() => handleCategoryChange('short-form-social')}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-[30px] border border-stone-900 text-stone-900 text-base md:text-xl font-display uppercase tracking-tight transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeFilter === 'short-form-social' 
                ? 'bg-[#FFB706]' 
                : 'bg-white hover:bg-[#FFB706]'
            }`}
          >
            SHORT-FORM & SOCIAL
          </button>
        </div>

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
              <motion.div
                key={`outgoing-${transitionState.key}`}
                className={`current-grid absolute inset-0 w-full grid gap-6 md:gap-8 pointer-events-none z-10 ${getGridClasses(transitionState.outgoingFilter)}`}
                initial={{ opacity: 1, filter: 'brightness(1)' }}
                animate={{ opacity: 0, filter: 'brightness(1.12)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {getProjectsForCategory(transitionState.outgoingFilter).map((project) => 
                  renderProject(project, transitionState.outgoingFilter)
                )}
              </motion.div>

              <motion.div
                key={`incoming-${transitionState.key}`}
                className={`next-grid absolute inset-0 w-full grid gap-6 md:gap-8 z-20 pointer-events-auto ${getGridClasses(transitionState.incomingFilter)}`}
                initial={{ opacity: 0, filter: 'brightness(1.12)' }}
                animate={{ opacity: 1, filter: 'brightness(1)' }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {getProjectsForCategory(transitionState.incomingFilter).map((project) => 
                  renderProject(project, transitionState.incomingFilter)
                )}
              </motion.div>
            </>
          ) : (
            <div className={`current-grid grid gap-6 md:gap-8 w-full ${getGridClasses(displayedFilter)}`}>
              {getProjectsForCategory(displayedFilter).map((project) => 
                renderProject(project, displayedFilter)
              )}
            </div>
          )}
        </div>
      </main>

      <VideoModal 
        isOpen={!!activeVideoId}
        youtubeId={activeVideoId || ''}
        onClose={() => setActiveVideoId(null)}
      />
    </div>
  );
};
