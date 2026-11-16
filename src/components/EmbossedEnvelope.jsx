import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../audio/romanticSynth';

export default function EmbossedEnvelope({ couple, date, onOpen, isOpen }) {
  const [animating, setAnimating] = useState(false);

  const handleOpen = () => {
    if (animating || isOpen) return;
    setAnimating(true);
    soundEngine.playSealCrackle();

    // Trigger golden stardust confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#dfba73', '#eed8ae', '#caa34d', '#ffffff', '#e8d5b5']
    });

    // Start ambient romantic music
    setTimeout(() => {
      soundEngine.start();
    }, 600);

    setTimeout(() => {
      onOpen();
      setAnimating(false);
    }, 1200);
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[580px] w-full px-4 py-8">
      
      {/* Intro Header */}
      <div className="text-center mb-6">
        <span className="text-[11px] uppercase tracking-[0.35em] text-[#aa8644] font-medium block mb-1">
          Formal Wedding Invitation
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-800 tracking-wide">
          {couple.partner1} & {couple.partner2}
        </h2>
        <p className="text-xs text-stone-500 font-serif italic mt-1">
          {formattedDate} • Napa Valley
        </p>
      </div>

      {/* 3D Envelope Wrapper */}
      <div 
        className={`relative w-[340px] sm:w-[420px] h-[520px] rounded-2xl shadow-2xl overflow-hidden envelope-3d-stage cursor-pointer group transition-transform duration-500 ${
          animating || isOpen ? 'envelope-opened' : 'hover:-translate-y-1'
        }`}
        style={{
          backgroundColor: '#faf6ee',
          boxShadow: '0 25px 60px -15px rgba(80, 60, 30, 0.28), 0 0 0 1px rgba(210, 190, 160, 0.4)'
        }}
        onClick={handleOpen}
      >
        
        {/* Subtle Paper Linen Texture Background */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#caa34d 0.75px, transparent 0.75px)`,
            backgroundSize: '16px 16px'
          }}
        />

        {/* Inner Card Preview (Sliding out on open) */}
        <div 
          className={`absolute inset-4 rounded-xl bg-white border border-stone-200/80 p-6 flex flex-col items-center justify-center text-center shadow-md transition-all duration-1000 ${
            animating || isOpen ? '-translate-y-12 scale-105 opacity-100' : 'translate-y-0 opacity-70'
          }`}
          style={{ zIndex: 1 }}
        >
          <div className="w-12 h-12 rounded-full border border-gold-300 flex items-center justify-center mb-2">
            <span className="font-script text-2xl text-gold-600">{couple.monogram}</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-stone-400 font-sans">Wedding Celebration</span>
          <h3 className="font-serif text-2xl text-stone-900 font-bold mt-1">
            {couple.partner1} & {couple.partner2}
          </h3>
          <div className="w-10 h-px bg-gold-400 my-2"></div>
          <p className="text-xs font-serif italic text-stone-600">
            Request the honor of your presence
          </p>
        </div>

        {/* Left Side Flap with Embossed Floral Lace */}
        <div 
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden pointer-events-none"
          style={{
            zIndex: 10,
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            background: 'linear-gradient(135deg, #f7f2e7 0%, #ede5d3 100%)',
            boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.05)'
          }}
        >
          <svg className="w-full h-full opacity-45 embossed-relief" viewBox="0 0 200 400" fill="none" stroke="#ba9d73" strokeWidth="1.2">
            <path d="M 20,40 Q 50,120 180,200 Q 50,280 20,360" strokeDasharray="3 3"/>
            <circle cx="50" cy="120" r="14" fill="#faf6ee" />
            <circle cx="50" cy="120" r="8" stroke="#caa34d" />
            <path d="M 40,110 C 30,90 70,90 60,110" />
            <path d="M 40,130 C 30,150 70,150 60,130" />
            <circle cx="50" cy="280" r="14" fill="#faf6ee" />
            <circle cx="50" cy="280" r="8" stroke="#caa34d" />
            <path d="M 40,270 C 30,250 70,250 60,270" />
            <path d="M 40,290 C 30,310 70,310 60,290" />
            <path d="M 10,180 Q 70,200 120,200" />
            <circle cx="120" cy="200" r="5" fill="#caa34d" />
          </svg>
        </div>

        {/* Right Side Flap with Embossed Floral Lace */}
        <div 
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden pointer-events-none"
          style={{
            zIndex: 10,
            clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
            background: 'linear-gradient(225deg, #f7f2e7 0%, #ede5d3 100%)',
            boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.05)'
          }}
        >
          <svg className="w-full h-full opacity-45 embossed-relief" viewBox="0 0 200 400" fill="none" stroke="#ba9d73" strokeWidth="1.2">
            <path d="M 180,40 Q 150,120 20,200 Q 150,280 180,360" strokeDasharray="3 3"/>
            <circle cx="150" cy="120" r="14" fill="#faf6ee" />
            <circle cx="150" cy="120" r="8" stroke="#caa34d" />
            <path d="M 160,110 C 170,90 130,90 140,110" />
            <path d="M 160,130 C 170,150 130,150 140,130" />
            <circle cx="150" cy="280" r="14" fill="#faf6ee" />
            <circle cx="150" cy="280" r="8" stroke="#caa34d" />
            <path d="M 160,270 C 170,250 130,250 140,270" />
            <path d="M 160,290 C 170,310 130,310 140,290" />
            <path d="M 190,180 Q 130,200 80,200" />
            <circle cx="80" cy="200" r="5" fill="#caa34d" />
          </svg>
        </div>

        {/* Bottom Flap with Upward Peony Floral Lace */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden pointer-events-none"
          style={{
            zIndex: 15,
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            background: 'linear-gradient(to top, #ede3cf 0%, #f9f5ec 100%)',
            boxShadow: '0 -4px 10px rgba(0,0,0,0.04)'
          }}
        >
          {/* Peony & Floral Garland SVG on Bottom Flap */}
          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <svg className="w-64 h-48 opacity-60 embossed-relief" viewBox="0 0 240 180" fill="none">
              {/* Central Peony bloom */}
              <circle cx="120" cy="110" r="22" fill="#faf6ee" stroke="#caa34d" strokeWidth="1.5" />
              <circle cx="120" cy="110" r="14" stroke="#d5be8d" strokeWidth="1.2" />
              <circle cx="120" cy="110" r="6" fill="#caa34d" />
              {/* Petals */}
              <path d="M 100,100 C 95,85 110,80 120,90 C 130,80 145,85 140,100" stroke="#caa34d" strokeWidth="1.2" fill="#faf6ee" />
              <path d="M 95,115 C 80,110 85,130 105,125" stroke="#caa34d" strokeWidth="1.2" />
              <path d="M 145,115 C 160,110 155,130 135,125" stroke="#caa34d" strokeWidth="1.2" />
              {/* Leaves & vines */}
              <path d="M 80,120 Q 50,135 30,150" stroke="#ba9d73" strokeWidth="1.2" />
              <path d="M 160,120 Q 190,135 210,150" stroke="#ba9d73" strokeWidth="1.2" />
              <circle cx="60" cy="130" r="3" fill="#caa34d" />
              <circle cx="180" cy="130" r="3" fill="#caa34d" />
            </svg>
          </div>
        </div>

        {/* Top Triangular Flap (The Embossed Masterpiece from the Pin!) */}
        <div 
          className="flap-top absolute inset-x-0 top-0 h-[280px] overflow-hidden pointer-events-none"
          style={{
            zIndex: 25,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            background: 'linear-gradient(to bottom, #fdfbf7 0%, #f4eee2 85%, #ebdcc5 100%)',
            boxShadow: '0 8px 16px rgba(90, 70, 40, 0.14)'
          }}
        >
          {/* Detailed Bas-Relief Peony & Lace Motif from Pinterest pin */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-3">
            <svg className="w-72 h-60 opacity-75 embossed-relief" viewBox="0 0 280 220" fill="none">
              {/* Flourish Crown */}
              <path d="M 140,25 Q 110,45 80,45 Q 60,45 40,30" stroke="#ba9d73" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M 140,25 Q 170,45 200,45 Q 220,45 240,30" stroke="#ba9d73" strokeWidth="1.3" strokeLinecap="round" />
              
              {/* Grand Central Peony Flower (Embossed look) */}
              <g transform="translate(0, 10)">
                <circle cx="140" cy="90" r="28" fill="#fdfaf3" stroke="#caa34d" strokeWidth="1.8" />
                <circle cx="140" cy="90" r="18" stroke="#d8c292" strokeWidth="1.3" />
                <circle cx="140" cy="90" r="8" fill="#caa34d" />

                {/* Overlapping Petals */}
                <path d="M 115,80 C 110,60 130,55 140,68 C 150,55 170,60 165,80" fill="#fefdfb" stroke="#caa34d" strokeWidth="1.4" />
                <path d="M 110,95 C 90,88 95,110 118,105" fill="#fefdfb" stroke="#caa34d" strokeWidth="1.4" />
                <path d="M 170,95 C 190,88 185,110 162,105" fill="#fefdfb" stroke="#caa34d" strokeWidth="1.4" />
                <path d="M 125,115 C 130,128 150,128 155,115" fill="#fefdfb" stroke="#caa34d" strokeWidth="1.4" />

                {/* Elaborate Foliage & Lace Vines extending to the sides */}
                <path d="M 110,75 Q 70,60 45,70 Q 25,78 15,95" stroke="#caa34d" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M 170,75 Q 210,60 235,70 Q 255,78 265,95" stroke="#caa34d" strokeWidth="1.4" strokeLinecap="round" />

                {/* Delicate Leaflets */}
                <ellipse cx="65" cy="62" rx="8" ry="4" transform="rotate(-20 65 62)" stroke="#caa34d" strokeWidth="1.2" fill="#faf5eb" />
                <ellipse cx="90" cy="68" rx="7" ry="4" transform="rotate(15 90 68)" stroke="#caa34d" strokeWidth="1.2" fill="#faf5eb" />
                <ellipse cx="215" cy="62" rx="8" ry="4" transform="rotate(20 215 62)" stroke="#caa34d" strokeWidth="1.2" fill="#faf5eb" />
                <ellipse cx="190" cy="68" rx="7" ry="4" transform="rotate(-15 190 68)" stroke="#caa34d" strokeWidth="1.2" fill="#faf5eb" />

                {/* Stippling / dotted lace accents */}
                <circle cx="140" cy="140" r="3" fill="#caa34d" />
                <circle cx="130" cy="148" r="2.5" fill="#caa34d" />
                <circle cx="150" cy="148" r="2.5" fill="#caa34d" />
                <circle cx="140" cy="158" r="2" fill="#caa34d" />
              </g>
            </svg>
          </div>
        </div>

        {/* The Exact Ivory Wax Seal in Center (Pin recreation!) */}
        <div 
          className="wax-seal-realistic absolute top-[280px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center z-30 cursor-pointer select-none"
          title="Click to break seal"
        >
          {/* Textured Outer Wavy Lip */}
          <div className="absolute inset-1.5 rounded-full border border-[#d9c7ab]/80 wax-seal-inner-ring flex items-center justify-center bg-gradient-to-br from-[#fffefc] via-[#f7f0e4] to-[#ebdcc8]">
            
            {/* Subtle Dotted Rim */}
            <div className="w-[72px] h-[72px] rounded-full border border-dashed border-[#caa34d]/50 flex flex-col items-center justify-center p-1">
              
              {/* Gold Calligraphic Monogram */}
              <span className="font-script text-3xl font-bold tracking-normal text-gold-600 gold-text-shimmer leading-none -mt-0.5">
                {couple.monogram}
              </span>
              
              <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#9b7b3b] font-sans font-semibold mt-0.5 opacity-80">
                OPEN
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Prompt */}
      <div className="mt-8 text-center">
        <button
          onClick={handleOpen}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-stone-900 to-stone-800 hover:from-gold-600 hover:to-gold-700 text-gold-200 hover:text-white text-xs uppercase tracking-[0.25em] font-sans font-semibold transition-all duration-300 shadow-xl flex items-center space-x-2 mx-auto"
        >
          <span>Tap Wax Seal to Unseal</span>
          <span className="text-base">✨</span>
        </button>
        <p className="text-[11px] text-stone-400 mt-2 font-serif italic">
          Turn your volume on for romantic ambient audio
        </p>
      </div>

    </div>
  );
}

