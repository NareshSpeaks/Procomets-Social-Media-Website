import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';

import { Footer } from './sections/Footer';
import { X, ArrowRight } from 'lucide-react';
import { AnimatedRoutes } from './components/AnimatedRoutes';
export const App: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-[#0C0C0C] font-navigation relative selection:bg-black selection:text-white">
        {/* Main Routes with 3.5s cinematic transitions */}
        <AnimatedRoutes onGetInTouchClick={() => setContactModalOpen(true)} />

        <Footer onGetInTouchClick={() => setContactModalOpen(true)} />

        {/* "GET IN TOUCH" Editorial Modal Drawer */}
        {contactModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => {
              setContactModalOpen(false);
              setSubmitted(false);
            }}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full p-8 sm:p-10 shadow-2xl relative border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setContactModalOpen(false);
                  setSubmitted(false);
                }}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-black rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close Contact Modal"
              >
                <X size={22} />
              </button>

              <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500 font-bold">
                PROCOMETS CREATIVE AGENCY
              </span>

              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-black">
                Let's Create <br /> Something Iconic.
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-stone-600 font-medium">
                We lead with content. We scale with digital. Tell us about your brand goals.
              </p>

              {submitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto text-lg font-bold">
                    ✓
                  </div>
                  <h4 className="text-base font-bold uppercase tracking-wide text-black">Message Dispatched</h4>
                  <p className="text-xs text-stone-600">Our creative directors will connect within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Project Scope
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Commercial video, 3D CGI, branding, or digital campaign..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-full bg-black text-white font-cta font-bold text-xs tracking-[0.14em] uppercase text-center shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 group active:scale-98"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
