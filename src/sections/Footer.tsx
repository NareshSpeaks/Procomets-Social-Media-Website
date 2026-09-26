import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';
import footerVisual from '../assets/portfolio/footer-visual.jpg'; 

interface FooterProps {
  onGetInTouchClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGetInTouchClick }) => {
  return (
    <footer className="w-full relative z-20 flex flex-col">
      {/* SOLID WHITE STRIP SEPARATOR */}
      <div className="w-full h-16 md:h-24 bg-white relative z-30" />
      
      {/* SECTION 1 - CONTACT CTA */}
      <section className="bg-[#E8EDE9] w-full pt-16 md:pt-24 px-4 md:px-8 relative overflow-hidden flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-end gap-12 md:gap-16 relative z-10">
          
          {/* Left Side Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-[50%] flex flex-col justify-between pt-12 md:pt-16 pb-16 md:pb-24 min-h-[500px] lg:min-h-[75vh]"
          >
            <h2 className="text-[6vw] sm:text-[28px] md:text-[36px] lg:text-[44px] xl:text-[50px] font-display uppercase tracking-tight text-[#1a1a1a] leading-[1.2] m-0 max-w-full">
              READY TO BRING YOUR VISION TO LIFE?
              <br className="hidden md:block"/>
              CONTACT PROCOMETS TODAY!
            </h2>

            <div className="flex flex-col mt-20 mb-16 md:my-auto w-full max-w-[340px]">
              <button 
                onClick={onGetInTouchClick}
                className="group flex items-center justify-between py-2 border-b border-[#1a1a1a]/30 hover:border-[#1a1a1a] transition-colors w-full text-left"
              >
                <span className="text-[15px] font-navigation text-[#1a1a1a]">
                  Get in touch
                </span>
                <ArrowRight size={18} className="text-[#1a1a1a] group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-[45%] flex items-end justify-center md:justify-end md:ml-auto h-[400px] md:h-[65vh] lg:h-[75vh] bg-[#E8EDE9]"
          >
            <div className="w-full h-full relative flex items-end bg-[#E8EDE9]">
              <img 
                src={footerVisual} 
                alt="Creative Collaboration" 
                className="w-full h-full object-cover object-bottom mix-blend-multiply"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - YELLOW FOOTER */}
      <section className="bg-[#FFC000] w-full pt-20 md:pt-28 pb-0 px-4 md:px-8 relative z-10 flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-24 md:gap-32">
          
          <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8">
            {/* Left: Agency Description */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/3 flex flex-col gap-10 md:gap-12"
            >
              <p className="text-[14px] md:text-[15px] text-[#1a1a1a] font-navigation max-w-[300px] leading-relaxed">
                A creative agency specializing in branding, web development, motion graphics, and art direction to bring ideas to life.
              </p>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-[#FFC000] transition-colors text-[#1a1a1a]"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </motion.div>

            {/* Right: Link Columns */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-[45%] flex flex-col sm:flex-row gap-16 sm:gap-32 md:justify-start"
            >
              {/* Quick Links */}
              <div className="flex flex-col gap-6 md:gap-8">
                <h5 className="text-[16px] md:text-[18px] font-display uppercase tracking-widest text-[#1a1a1a]">
                  QUICK LINKS
                </h5>
                <nav className="flex flex-col gap-4">
                  <Link to="/" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity">HOME</Link>
                  <Link to="/#about" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity">ABOUT</Link>
                  <button onClick={onGetInTouchClick} className="text-left text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity">CONTACT</button>
                  <Link to="/#services" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity">OUR SERVICES</Link>
                  <Link to="/#join" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity">JOIN US</Link>
                </nav>
              </div>

              {/* Explore */}
              <div className="flex flex-col gap-6 md:gap-8">
                <h5 className="text-[16px] md:text-[18px] font-display uppercase tracking-widest text-[#1a1a1a]">
                  EXPLORE
                </h5>
                <nav className="flex flex-col gap-4">
                  <Link to="/work/videography" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity uppercase">Videography</Link>
                  <Link to="/work/video-editing" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity uppercase">Video Editing</Link>
                  <Link to="/#graphic-design" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity uppercase">Graphic design</Link>
                  <Link to="/#website-development" className="text-[12px] md:text-[13px] font-navigation text-[#1a1a1a] hover:opacity-60 transition-opacity uppercase">Website design and development</Link>
                </nav>
              </div>
            </motion.div>
          </div>

          {/* Huge Brand Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-full flex"
          >
            <h2 className="text-[8vw] md:text-[9vw] lg:text-[90px] font-display uppercase tracking-normal text-[#1a1a1a] leading-none m-0 w-full text-left py-6">
              WE ARE PROCOMETS
            </h2>
          </motion.div>
          
        </div>
      </section>

      {/* SECTION 3 - COPYRIGHT BAR */}
      <section className="bg-[#0f0f0f] w-full py-5 px-4 md:px-8 z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] md:text-[12px] font-navigation text-stone-400">
            Copyright {new Date().getFullYear()} <span className="text-white font-medium">PROCOMETS</span>
          </p>
          <div className="flex items-center gap-6 text-[11px] md:text-[12px] font-navigation text-stone-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-stone-600">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

