import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from '../pages/Home';
import { WorkDetail } from '../pages/WorkDetail';
import { LearnDetail } from '../pages/LearnDetail';
import { Videography } from '../pages/Videography';
import { VideoEditing } from '../pages/VideoEditing';

interface AnimatedRoutesProps {
  onGetInTouchClick: () => void;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -60,
    scale: 1.02,
  },
};

const pageTransition = {
  duration: 3.5,
  ease: [0.22, 1, 0.36, 1], // Cinematic, smooth ease-in-out curve
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ onGetInTouchClick }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home onGetInTouchClick={onGetInTouchClick} /></PageWrapper>} />
        <Route path="/work/videography" element={<PageWrapper><Videography onGetInTouchClick={onGetInTouchClick} /></PageWrapper>} />
        <Route path="/work/video-editing" element={<PageWrapper><VideoEditing onGetInTouchClick={onGetInTouchClick} /></PageWrapper>} />
        <Route path="/work/videography/:slug" element={<PageWrapper><WorkDetail /></PageWrapper>} />
        <Route path="/work/:slug" element={<PageWrapper><WorkDetail /></PageWrapper>} />
        <Route path="/learn/:slug" element={<PageWrapper><LearnDetail /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};
