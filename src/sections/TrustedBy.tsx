import React from 'react';

const companies = [
  "STRATOS",
  "GLOBAL",
  "ACME CORP",
  "NEXUS",
  "JOB HUB PRO",
  "SRI JOTHI MOULDING WORKS",
  "THINK LITMUS",
  "ZENITH",
  "FORGIT",
  "QELANTO",
  "WISPR FLOW",
  "MANIAC FASHION CLOTHING"
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="bg-white py-6 md:py-8 overflow-hidden">
      <div className="relative w-full overflow-hidden flex items-center h-full">
        {/* 
          The w-max utility ensures the container is as wide as its content.
          The animate-marquee translates it by -50% of its own width,
          creating a mathematically perfect seamless loop.
        */}
        <div className="flex w-max animate-marquee">
          {/* First set of companies */}
          <div className="flex gap-16 md:gap-32 px-8 md:px-16 items-center">
            {companies.map((company, index) => (
              <span 
                key={`company-1-${index}`}
                className="whitespace-nowrap text-xl md:text-2xl font-display font-bold text-[#D9DDE3] select-none uppercase tracking-widest"
              >
                {company}
              </span>
            ))}
          </div>

          {/* Second identical set of companies for seamless looping */}
          <div className="flex gap-16 md:gap-32 px-8 md:px-16 items-center">
            {companies.map((company, index) => (
              <span 
                key={`company-2-${index}`}
                className="whitespace-nowrap text-xl md:text-2xl font-display font-bold text-[#D9DDE3] select-none uppercase tracking-widest"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
