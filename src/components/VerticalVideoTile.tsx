import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export interface VerticalVideoProject {
  id: string;
  title: string;
  youtubeId?: string;
  instagramId?: string;
  platform?: 'instagram' | 'youtube';
  officialUrl?: string;
}

interface VerticalVideoTileProps {
  project: VerticalVideoProject;
  onClick: () => void;
}

export const VerticalVideoTile: React.FC<VerticalVideoTileProps> = ({ project, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isPlaying && isLoaded) {
              if (project.platform === 'youtube' || project.youtubeId) {
                iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
              } else if (project.instagramId) {
                videoRef.current?.play().catch(() => {});
              }
            }
          } else {
            if (isLoaded) {
              if (project.platform === 'youtube' || project.youtubeId) {
                iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
              } else if (project.instagramId) {
                videoRef.current?.pause();
              }
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
  }, [isPlaying, isLoaded, project.platform, project.youtubeId, project.instagramId]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isPlaying) {
      if (project.platform === 'youtube' || project.youtubeId) {
        iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else if (project.instagramId) {
        videoRef.current?.pause();
      }
      setIsPlaying(false);
    } else {
      if (project.platform === 'youtube' || project.youtubeId) {
        iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } else if (project.instagramId) {
        videoRef.current?.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    if (project.officialUrl) {
      e.stopPropagation();
      window.open(project.officialUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[9/16] rounded-[24px] overflow-hidden bg-stone-900 cursor-pointer group shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* YouTube / Instagram IFrame */}
      {project.youtubeId ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]">
           <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${project.youtubeId}?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&playsinline=1&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3`}
            loading="lazy"
            className={`w-full h-full object-cover scale-[1.35] transition-transform duration-700 ${isHovered ? 'scale-[1.37]' : ''} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            allow="autoplay; encrypted-media"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      ) : project.instagramId ? (
        <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none">
          <video
            ref={videoRef}
            src={`/videos/${project.instagramId}.mp4`}
            loop
            muted={true}
            playsInline
            preload="metadata"
            onLoadedMetadata={() => setIsLoaded(true)}
            onCanPlay={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-[1.02]' : 'scale-100'} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-200 text-stone-400 font-display text-xl text-center uppercase tracking-widest px-4 transition-transform duration-700 group-hover:scale-[1.02]">
          {project.title}
        </div>
      )}
      
      {/* Subtle overlay on hover */}
      <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Social Proof Link */}
      {project.officialUrl && (
        <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
          <button 
            onClick={handleSocialClick}
            className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5"
          >
            {project.platform === 'instagram' ? 'VIEW ON INSTAGRAM' : 'WATCH ON YOUTUBE'}
            <span className="text-[12px] leading-none mb-[2px]">↗</span>
          </button>
        </div>
      )}

      {/* PLAY VIDEO Pill */}
      {(project.youtubeId || project.instagramId) && (
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
      )}

      {/* Play/Pause Control */}
      {(project.youtubeId || project.instagramId) && (
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
