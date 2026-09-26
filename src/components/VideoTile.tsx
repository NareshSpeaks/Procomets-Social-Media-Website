import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { VideographyProject } from '../data/videography';

interface VideoTileProps {
  project: VideographyProject;
  onClick: () => void;
}

export const VideoTile: React.FC<VideoTileProps> = ({ project, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default to true as they should auto-play
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video if it's supposed to be playing
            if (isPlaying && videoRef.current) {
              videoRef.current.play().catch(() => {
                // Ignore autoplay policy errors
              });
            }
          } else {
            // Pause video when out of view to save resources
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    e.preventDefault();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fallback Image or Poster */}
      {project.previewVideo ? (
        <video
          ref={videoRef}
          src={project.previewVideo}
          poster={project.image}
          style={{ objectPosition: project.objectPosition || 'center center' }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <img 
          src={project.image} 
          alt={project.title} 
          style={{ objectPosition: project.objectPosition || 'center center' }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
        />
      )}
      
      {/* Subtle overlay on hover (optional as per request "subtle behavior") */}
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

      {/* Play/Pause Control (only if it has a video) */}
      {project.previewVideo && (
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
