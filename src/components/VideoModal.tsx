import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  youtubeId: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, youtubeId, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/90 cursor-pointer"
            onClick={onClose}
          />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>

          {/* Content Container */}
          <div className="relative z-10 w-full max-w-[400px] mx-4 flex flex-col items-center">
            {/* Video Container (Portrait 9:16) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-full aspect-[9/16] bg-black shadow-2xl rounded-xl overflow-hidden relative"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </motion.div>

            {/* Fallback */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <span className="text-white/60 text-sm font-medium">Video unavailable here?</span>
              <a 
                href={`https://youtube.com/shorts/${youtubeId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-[30px] border border-white/30 text-white hover:bg-white hover:text-black transition-colors text-xs font-bold uppercase tracking-widest"
              >
                Watch on YouTube
              </a>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
