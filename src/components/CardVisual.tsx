import React from 'react';
import { HeroCardItem } from '../data/heroCards';

interface CardVisualProps {
  card: HeroCardItem;
}

export const CardVisual: React.FC<CardVisualProps> = ({ card }) => {
  switch (card.visualTheme) {
    case 'bakery':
      return (
        <div className="relative w-full h-full bg-[#EAE2D6] overflow-hidden flex flex-col justify-end p-5 select-none">
          {/* Background Kitchen Scene Warm Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B4C44] via-[#4F786C] to-[#EAE2D6] opacity-95" />

          {/* Shelves & Bunting Decor */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 opacity-80">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 bg-amber-400 rounded-sm transform rotate-45 inline-block" />
              <span className="w-3 h-3 bg-rose-400 rounded-sm transform rotate-45 inline-block" />
              <span className="w-3 h-3 bg-teal-400 rounded-sm transform rotate-45 inline-block" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200 bg-black/30 px-2 py-0.5 rounded-full">
              {card.tag}
            </span>
          </div>

          {/* Speech Bubble: "Fear not, I'm Gluten-Free!" */}
          <div className="absolute top-14 right-6 z-20 bg-white text-stone-900 rounded-2xl px-4 py-2.5 shadow-xl border border-stone-200 max-w-[190px]">
            <p className="font-extrabold text-[13px] leading-tight text-[#5B2117]">
              Fear not, <br />
              <span className="text-[#991B1B]">I'm Gluten-Free!</span>
            </p>
            {/* Bubble arrow */}
            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-stone-200" />
          </div>

          {/* 3D Bread Character Mascot Graphic */}
          <div className="relative z-10 mx-auto w-48 h-56 flex flex-col items-center justify-center">
            {/* Bread Body */}
            <div className="relative w-36 h-44 bg-[#E89E58] rounded-t-[50px] rounded-b-[30px] border-4 border-[#8C4A1E] shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Golden Crust highlights */}
              <div className="absolute inset-x-2 top-2 h-14 bg-[#FCD385] rounded-t-[40px] opacity-80" />

              {/* Bread Face Mask */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Hero Blue Eyemask */}
                <div className="w-24 h-8 bg-[#2563EB] rounded-full flex items-center justify-around px-3 shadow-md border border-blue-400">
                  <div className="w-2.5 h-3.5 bg-black rounded-full border-2 border-white" />
                  <div className="w-2.5 h-3.5 bg-black rounded-full border-2 border-white" />
                </div>
                {/* Cheerful Smile */}
                <div className="w-6 h-3 border-b-4 border-[#8C4A1E] rounded-b-full mt-2" />
              </div>

              {/* Red Hero Cape Tips */}
              <div className="absolute -bottom-1 -left-2 w-8 h-12 bg-[#DC2626] rounded-full transform -rotate-12" />
              <div className="absolute -bottom-1 -right-2 w-8 h-12 bg-[#DC2626] rounded-full transform rotate-12" />
            </div>
          </div>

          {/* Card Label Bottom */}
          <div className="relative z-20 mt-2 bg-black/40 backdrop-blur-md rounded-xl p-2.5 text-white border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider">{card.title}</h4>
            <p className="text-[10px] text-stone-300 tracking-wide">{card.category}</p>
          </div>
        </div>
      );

    case 'billboard':
      return (
        <div className="relative w-full h-full bg-[#1F2421] overflow-hidden flex flex-col justify-between p-5 select-none text-white">
          {/* Night Sky & Modern Facade */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#1E293B] to-[#0F172A]" />

          {/* Anamorphic 3D Corner Billboard Simulation */}
          <div className="relative z-10 w-full flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              {card.tag}
            </span>
            <span className="text-[10px] font-mono text-stone-400">{card.videoDuration}</span>
          </div>

          {/* 3D Billboard structure in perspective */}
          <div className="relative z-10 my-auto w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-black flex flex-col items-center justify-center p-3">
            {/* Glowing Neon Sign: THE IRISH HOUSE */}
            <div className="text-center">
              <div className="text-[11px] font-black tracking-widest text-emerald-400 uppercase drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                THE
              </div>
              <div className="text-2xl font-black tracking-tight text-emerald-300 uppercase drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]">
                IRISH HOUSE
              </div>
            </div>

            {/* Floating 3D Emerald Bottle with Golden Corona */}
            <div className="relative mt-2 w-14 h-28 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-700 rounded-t-sm rounded-b-xl border border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex flex-col items-center justify-center">
              <div className="w-3 h-5 bg-stone-300 rounded-t-xs -mt-6 border border-stone-400" />
              <div className="w-10 h-7 bg-amber-500 rounded-xs flex items-center justify-center">
                <span className="text-[7px] font-black text-black">CRAFT</span>
              </div>
            </div>
          </div>

          {/* Pedestrians & Ambient Street Lighting */}
          <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">{card.title}</h4>
            <p className="text-[10px] text-emerald-400/90 tracking-wide">{card.category}</p>
          </div>
        </div>
      );

    case 'watch':
      return (
        <div className="relative w-full h-full bg-[#09090B] overflow-hidden flex flex-col justify-between p-5 select-none text-white">
          {/* Luxury Midnight Vignette */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#18181B] via-[#09090B] to-[#000000]" />

          {/* Luxury Badge */}
          <div className="relative z-10 w-full flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full">
              {card.tag}
            </span>
            <span className="text-[10px] font-mono text-stone-400">{card.videoDuration}</span>
          </div>

          {/* Skeleton Tourbillon Dial Graphic */}
          <div className="relative z-10 my-auto mx-auto w-56 h-56 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] p-2 shadow-[0_0_40px_rgba(212,175,55,0.25)] flex items-center justify-center">
            {/* Inner Dial Cavity */}
            <div className="w-full h-full rounded-full bg-[#111113] border-4 border-[#2A2A2E] relative flex items-center justify-center overflow-hidden">
              {/* Gears and Jewels */}
              <div className="absolute w-32 h-32 rounded-full border border-stone-700/60 border-dashed animate-spin-slow" />
              <div className="absolute w-20 h-20 rounded-full border-2 border-amber-500/40 flex items-center justify-center">
                <div className="w-4 h-4 bg-ruby rounded-full bg-rose-600 shadow-[0_0_8px_#E11D48]" />
              </div>

              {/* Blued Steel Hands */}
              <div className="absolute w-1 h-20 bg-blue-600 rounded-full origin-bottom transform -rotate-45 shadow-sm" />
              <div className="absolute w-1.5 h-14 bg-amber-300 rounded-full origin-bottom transform rotate-60 shadow-sm" />

              {/* Brand Typography on dial */}
              <div className="absolute top-8 text-center">
                <span className="text-[9px] tracking-[0.25em] font-black uppercase text-stone-200">
                  britime
                </span>
                <span className="block text-[6px] tracking-widest text-stone-400 uppercase">
                  london
                </span>
              </div>
            </div>
          </div>

          {/* Card Label Bottom */}
          <div className="relative z-10 bg-white/5 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">{card.title}</h4>
            <p className="text-[10px] text-stone-400 tracking-wide">{card.category}</p>
          </div>
        </div>
      );

    case 'luggage':
      return (
        <div className="relative w-full h-full bg-[#FCE7F3] overflow-hidden flex flex-col justify-between p-5 select-none">
          {/* Soft Editorial Pastel Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FDA4AF] via-[#F472B6] to-[#FB7185]" />

          {/* Badge */}
          <div className="relative z-10 w-full flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full">
              {card.tag}
            </span>
            <span className="text-[10px] font-mono text-white/90">{card.videoDuration}</span>
          </div>

          {/* 3D Polycarbonate Ribbed Suitcase Graphic */}
          <div className="relative z-10 my-auto mx-auto w-44 h-64 rounded-3xl bg-gradient-to-b from-[#FB7185] via-[#E11D48] to-[#BE123C] p-3 shadow-2xl border-2 border-pink-300/40 flex flex-col justify-between">
            {/* Telescopic Handle */}
            <div className="w-16 h-8 -mt-7 mx-auto rounded-t-xl border-4 border-stone-200 bg-stone-300/60" />

            {/* Suitcase Horizontal Ribbing Texture */}
            <div className="space-y-2 py-4 flex-1 flex flex-col justify-center">
              <div className="h-1.5 bg-pink-300/50 rounded-full shadow-inner" />
              <div className="h-1.5 bg-pink-300/50 rounded-full shadow-inner" />
              <div className="h-1.5 bg-pink-300/50 rounded-full shadow-inner" />
              <div className="h-1.5 bg-pink-300/50 rounded-full shadow-inner" />
              <div className="h-1.5 bg-pink-300/50 rounded-full shadow-inner" />
            </div>

            {/* TSA Lock Accent */}
            <div className="w-7 h-4 bg-stone-900 rounded-sm self-end mb-2 border border-stone-600" />

            {/* 360 Hinomoto Spinner Wheels */}
            <div className="flex justify-between px-2 -mb-6">
              <div className="w-4 h-4 rounded-full bg-stone-900 border-2 border-stone-400" />
              <div className="w-4 h-4 rounded-full bg-stone-900 border-2 border-stone-400" />
            </div>
          </div>

          {/* Card Label Bottom */}
          <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-xl p-2.5 border border-pink-200 text-stone-900">
            <h4 className="text-xs font-bold uppercase tracking-wider">{card.title}</h4>
            <p className="text-[10px] text-stone-600 tracking-wide">{card.category}</p>
          </div>
        </div>
      );

    case 'city':
      return (
        <div className="relative w-full h-full bg-[#064E3B] overflow-hidden flex flex-col justify-between p-5 select-none text-white">
          {/* Golden Sunset & Emerald Horizon */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B] via-[#10B981] to-[#064E3B]" />

          {/* Badge */}
          <div className="relative z-10 w-full flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full">
              {card.tag}
            </span>
            <span className="text-[10px] font-mono text-white/90">{card.videoDuration}</span>
          </div>

          {/* Stylized Sunburst & Urban Skyline */}
          <div className="relative z-10 my-auto text-center">
            <div className="text-xs tracking-[0.2em] font-serif italic text-amber-200 mb-1">
              "See you soon..."
            </div>
            {/* Giant Sun Graphic */}
            <div className="w-36 h-36 mx-auto rounded-full bg-amber-400/90 shadow-[0_0_50px_rgba(245,158,11,0.6)] flex items-end justify-center overflow-hidden border-2 border-amber-300">
              {/* Skyline Silhouette */}
              <div className="w-full flex items-end justify-center gap-1 px-2 h-16 bg-emerald-950">
                <div className="w-3 h-14 bg-emerald-900 rounded-t-xs" />
                <div className="w-4 h-10 bg-emerald-900 rounded-t-xs" />
                <div className="w-3 h-12 bg-emerald-900 rounded-t-xs" />
                <div className="w-5 h-8 bg-emerald-900 rounded-t-xs" />
              </div>
            </div>
          </div>

          {/* Card Label Bottom */}
          <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider">{card.title}</h4>
            <p className="text-[10px] text-amber-200/80 tracking-wide">{card.category}</p>
          </div>
        </div>
      );

    case 'fashion':
    default:
      return (
        <div className="relative w-full h-full bg-[#18181B] overflow-hidden flex flex-col justify-between p-5 select-none text-white">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3B0764] via-[#581C87] to-[#1E1B4B]" />
          <div className="relative z-10 w-full flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest uppercase text-fuchsia-300 bg-purple-950/60 border border-fuchsia-500/30 px-2.5 py-1 rounded-full">
              {card.tag}
            </span>
            <span className="text-[10px] font-mono text-stone-400">{card.videoDuration}</span>
          </div>

          <div className="relative z-10 my-auto text-center">
            <div className="w-40 h-52 mx-auto rounded-2xl bg-black/40 border border-white/20 p-4 flex flex-col justify-between">
              <span className="text-[10px] tracking-widest uppercase text-fuchsia-400">PROCOMETS STUDIO</span>
              <div className="text-xl font-black uppercase tracking-tighter text-white">
                DIGITAL <br /> EDITORIAL
              </div>
              <span className="text-[9px] text-stone-400">AUTUMN / WINTER 26</span>
            </div>
          </div>

          <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider">{card.title}</h4>
            <p className="text-[10px] text-fuchsia-300 tracking-wide">{card.category}</p>
          </div>
        </div>
      );
  }
};
