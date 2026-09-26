import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export interface HorizontalVideoProject {
  id: string;
  title: string;
  youtubeId?: string;
  category: 'all' | 'short-form-social';
}

interface HorizontalVideoTileProps {
  project: HorizontalVideoProject;
  onClick: () => void;
}

export const HorizontalVideoTile: React.FC<HorizontalVideoTileProps> = ({ project, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play by default
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isPlaying && iframeRef.current && isLoaded) {
              iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
          } else {
            if (iframeRef.current && isLoaded) {
              iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPlaying, isLoaded]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal
    e.preventDefault();
    if (iframeRef.current && isLoaded) {
      if (isPlaying) {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setIsPlaying(false);
      } else {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setIsPlaying(true);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video rounded-[24px] overflow-hidden bg-stone-900 cursor-pointer group shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* YouTube IFrame */}
      {project.youtubeId ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]">
           <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${project.youtubeId}?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&playsinline=1&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3`}
            className={`w-full h-full object-cover scale-[1.35] transition-transform duration-700 ${isHovered ? 'scale-[1.37]' : ''} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            allow="autoplay; encrypted-media"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-200 text-stone-400 font-display text-xl uppercase tracking-widest">
          {project.title}
        </div>
      )}
      
      {/* Subtle overlay on hover */}
      <div className={`absolute inset-0 bg-black/5 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* PLAY VIDEO Pill */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ 
              duration: isHovered ? 0.3 : 0.2, 
              ease: isHovered ? "easeOut" : "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 hidden md:flex"
          >
            <div className="bg-white/95 text-stone-900 px-6 py-2.5 rounded-[100px] text-xs font-bold uppercase tracking-widest shadow-sm">
              PLAY VIDEO
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause Control */}
      {project.youtubeId && (
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause size={14} fill="currentColor" className="stroke-none" />
          ) : (
            <Play size={14} fill="currentColor" className="stroke-none ml-0.5" />
          )}
        </button>
      )}
    </div>
  );
};
