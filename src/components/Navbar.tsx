import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import logoImg from '../assets/procomets-logo-transparent.png';

interface NavbarProps {
  onGetInTouchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetInTouchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const scrollToServices = () => {
      const el = document.getElementById('services');
      if (el) {
        // Adjust for fixed header height
        const headerOffset = window.innerWidth >= 768 ? 72 : 60;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (location.pathname === '/') {
      scrollToServices();
    } else {
      navigate('/');
      // Wait for page transition / mount
      setTimeout(() => {
        scrollToServices();
      }, 100);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all duration-300">
      <div className="w-full px-6 md:px-12 lg:px-20 h-[60px] md:h-[72px] flex items-center justify-between">
        
        {/* LEFT: Official Procomets Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group transition-transform duration-300 hover:opacity-80 active:scale-95"
          aria-label="Procomets Homepage"
        >
          <img
            src={logoImg}
            alt="Procomets Logo"
            className="h-8 md:h-[38px] lg:h-[42px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="sr-only">PROCOMETS | DIGITAL MARKETING & CREATIVE AGENCY</span>
        </Link>

        {/* CENTER: Desktop Navigation (Absolute True Center) */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-9 lg:space-x-11">
          {/* OUR WORK with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setWorkDropdownOpen(true)}
            onMouseLeave={() => setWorkDropdownOpen(false)}
          >
            <a
              href="/#work"
              className="nav-link cursor-pointer"
            >
              <span>OUR WORK</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 stroke-[2.5] ${
                  workDropdownOpen ? 'rotate-180 text-black' : 'text-stone-600'
                }`}
              />
            </a>

            {/* Mega Dropdown Preview */}
            {workDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-max min-w-[280px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 space-y-1">
                  <Link
                    to="/work/videography"
                    className="block px-4 py-3 rounded-xl hover:bg-[#FFC000] transition-colors group"
                  >
                    <div className="text-[13px] md:text-[14px] text-stone-900 group-hover:text-black uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>
                      VIDEOGRAPHY
                    </div>
                  </Link>
                  <Link
                    to="/work/video-editing"
                    className="block px-4 py-3 rounded-xl hover:bg-[#FFC000] transition-colors group"
                  >
                    <div className="text-[13px] md:text-[14px] text-stone-900 group-hover:text-black uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>
                      VIDEO EDITING
                    </div>
                  </Link>
                  <a
                    href="/#graphic-design"
                    className="block px-4 py-3 rounded-xl hover:bg-[#FFC000] transition-colors group"
                  >
                    <div className="text-[13px] md:text-[14px] text-stone-900 group-hover:text-black uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>
                      GRAPHIC DESIGN
                    </div>
                  </a>
                  <a
                    href="/#website-design"
                    className="block px-4 py-3 rounded-xl hover:bg-[#FFC000] transition-colors group"
                  >
                    <div className="text-[13px] md:text-[14px] text-stone-900 group-hover:text-black uppercase tracking-wide whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>
                      WEBSITE DESIGN & DEVELOPMENT
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="/#services" onClick={handleServicesClick} className="nav-link">
            OUR SERVICES
          </a>

          <a href="/#learn" className="nav-link">
            LEARN
          </a>

          <a href="/#about" className="nav-link">
            ABOUT US
          </a>
        </nav>

        {/* RIGHT: CTA Pill Button & Mobile Hamburger */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onGetInTouchClick}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-stone-300 text-stone-900 font-cta font-bold text-xs tracking-[0.12em] uppercase transition-all duration-300 hover:border-black hover:bg-black hover:text-white active:scale-95 shadow-sm hover:shadow-md"
          >
            <span>GET IN TOUCH</span>
          </button>
        </div>

        {/* MOBILE: Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-800 hover:text-black rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE: Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-6 pt-3 pb-8 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <a
            href="/#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl tracking-wide text-stone-900 hover:text-black py-2 border-b border-stone-100"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
          >
            OUR WORK
          </a>
          <a
            href="/#services"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleServicesClick(e);
            }}
            className="block text-xl tracking-wide text-stone-900 hover:text-black py-2 border-b border-stone-100"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
          >
            OUR SERVICES
          </a>
          <a
            href="/#learn"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl tracking-wide text-stone-900 hover:text-black py-2 border-b border-stone-100"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
          >
            LEARN
          </a>
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl tracking-wide text-stone-900 hover:text-black py-2 border-b border-stone-100"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
          >
            ABOUT US
          </a>
          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetInTouchClick?.();
              }}
              className="w-full py-3 rounded-full border border-black bg-black text-white font-cta font-bold text-xs tracking-[0.14em] uppercase text-center shadow-md active:scale-95 transition-transform"
            >
              GET IN TOUCH
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
