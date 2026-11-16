import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Play } from 'lucide-react';
import { FaWineGlassAlt } from 'react-icons/fa';

export default function HeroSection({ data, onSaveDateClick, onReopenEnvelope }) {
  // Live Countdown to 09 February 2027
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculate() {
      const diff = new Date(data.date.weddingDate).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [data.date.weddingDate]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between text-white overflow-hidden bg-[#1E050B]">
      
      {/* Desktop Background: Royal Couple on right, Wide Mandap Scenery */}
      <div 
        className="absolute inset-0 hidden sm:block bg-cover bg-no-repeat transition-transform duration-1000"
        style={{ 
          backgroundImage: `url('/images/hero-couple-full.jpg')`,
          backgroundPosition: 'right 20%'
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(31, 6, 13, 0.85) 0%, rgba(31, 6, 13, 0.5) 40%, transparent 70%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Mobile Background: Dedicated Portrait Royal Couple Mandap from user asset */}
      <div 
        className="absolute inset-0 sm:hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/mobile/mobile-hero-bg.jpg')`
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(31, 6, 13, 0.6) 0%, rgba(31, 6, 13, 0.1) 35%, rgba(31, 6, 13, 0.7) 70%, #1F060D 100%)'
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        
        {/* Logo Monogram */}
        <div className="flex items-center space-x-2">
          <span className="font-script text-3xl sm:text-4xl text-[#F3DCA5] drop-shadow-md">
            P<span className="text-xl">♥</span>P
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-semibold text-[#F3DCA5]/90">
          <a href="#hero" className="hover:text-white transition border-b-2 border-[#D4AF65] pb-0.5 text-white">Home</a>
          <a href="#story" className="hover:text-white transition">Our Story</a>
          <a href="#events" className="hover:text-white transition">Events</a>
          <a href="#gallery" className="hover:text-white transition">Gallery</a>
          <a href="#venue" className="hover:text-white transition">Location</a>
          <a href="#rsvp" className="hover:text-white transition">RSVP</a>
        </nav>

        {/* Right: Save the Date & Envelope Reopen */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          <button
            onClick={onReopenEnvelope}
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#D4AF65]/60 hover:bg-[#D4AF65]/20 text-[#F3DCA5] text-[11px] sm:text-xs font-sans uppercase tracking-wider transition"
            title="Replay Envelope Unboxing"
          >
            Envelope
          </button>

          <button
            onClick={onSaveDateClick}
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#D4AF65]/80 hover:bg-[#D4AF65] hover:text-[#32151B] text-[#F3DCA5] text-[11px] sm:text-xs font-sans uppercase tracking-wider font-semibold transition flex items-center space-x-1.5 shadow-lg bg-black/40 backdrop-blur-md"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Save the Date</span>
          </button>
        </div>
      </header>

      {/* Hero Content: Centered on Mobile (matching Mockup 1), Left-Aligned on Desktop */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-16 sm:pt-12 pb-8 sm:py-12 flex-1 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl w-full flex flex-col items-center sm:items-start"
        >
          {/* Subtitle Header */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#F3DCA5] font-sans font-bold mb-2 sm:mb-3 drop-shadow">
            YOU ARE CORDIALLY INVITED TO THE WEDDING OF
          </p>

          {/* Grand Cursive Names */}
          <h1 className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#FFF2D6] leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] my-1 tracking-wide">
            {data.couple.groom.name} & {data.couple.bride.name}
          </h1>

          {/* Floral Sprig & Intertwined Rings Motif */}
          <div className="my-3 sm:my-4 flex items-center justify-center sm:justify-start space-x-3 text-[#D4AF65]">
            <div className="w-12 sm:w-16 h-px bg-[#D4AF65]/80"></div>
            <span className="text-lg sm:text-xl">💍</span>
            <div className="w-12 sm:w-16 h-px bg-[#D4AF65]/80"></div>
          </div>

          {/* Tagline */}
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#F3DCA5] font-sans font-semibold mb-5 sm:mb-6 drop-shadow">
            TWO HEARTS • ONE JOURNEY • FOREVER
          </p>

          {/* Two Info Badges (Date & Venue) */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-6 mb-6 sm:mb-8 text-xs sm:text-sm font-sans w-full sm:w-auto">
            {/* Date Badge */}
            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#D4AF65]/60 shadow-xl">
              <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF65] flex-shrink-0" />
              <div>
                <span className="font-bold text-white block leading-tight">09 February 2027</span>
                <span className="text-[11px] text-[#F3DCA5]/90 font-medium">Tuesday</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#D4AF65]/50"></div>

            {/* Location Badge */}
            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#D4AF65]/60 shadow-xl">
              <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF65] flex-shrink-0" />
              <div>
                <span className="font-bold text-white block leading-tight">Nagpur, Maharashtra</span>
                <span className="text-[11px] text-[#F3DCA5]/90 font-medium">India</span>
              </div>
            </div>
          </div>

          {/* Two Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
            <a
              href="#events"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF65] via-[#F3DCA5] to-[#D4AF65] hover:brightness-110 text-[#32151B] text-xs font-sans uppercase tracking-widest font-extrabold shadow-[0_6px_20px_rgba(212,175,101,0.5)] transition flex items-center justify-center space-x-2"
            >
              <span>View Invitation</span>
              <Play className="w-3.5 h-3.5 fill-[#32151B]" />
            </a>

            <button
              onClick={onSaveDateClick}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-[#D4AF65]/80 text-[#F3DCA5] hover:text-white text-xs font-sans uppercase tracking-widest font-semibold transition flex items-center justify-center space-x-2 backdrop-blur-md shadow-xl"
            >
              <Calendar className="w-4 h-4 text-[#D4AF65]" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM RIBBON BANNER (Mobile-Responsive Event Cards & Countdown) */}
      <div id="itinerary-banner" className="relative z-30 w-full bg-[#FFFBF5] text-[#32151B] border-t-2 border-[#D4AF65] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] py-4 sm:py-5 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Left: 4 Arch Event Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full lg:w-auto">
            
            {/* Haldi */}
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#D4AF65]/50 text-center shadow-sm hover:shadow-md hover:border-[#D4AF65] transition group">
              <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-[#caa34d] mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <h4 className="font-display font-bold text-xs sm:text-base text-[#4A101B]">Haldi</h4>
              <span className="text-[10px] sm:text-[11px] text-stone-600 font-sans font-medium block mt-0.5">07 Feb 2027</span>
            </div>

            {/* Mehendi */}
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#D4AF65]/50 text-center shadow-sm hover:shadow-md hover:border-[#D4AF65] transition group">
              <div className="w-4 sm:w-5 h-4 sm:h-5 mx-auto mb-1 text-emerald-700 flex items-center justify-center font-bold text-sm sm:text-base group-hover:scale-110 transition-transform">
                🪷
              </div>
              <h4 className="font-display font-bold text-xs sm:text-base text-[#4A101B]">Mehendi</h4>
              <span className="text-[10px] sm:text-[11px] text-stone-600 font-sans font-medium block mt-0.5">07 Feb 2027</span>
            </div>

            {/* Wedding */}
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF8EF] border-2 border-[#D4AF65] text-center shadow-md hover:shadow-lg transition group">
              <div className="w-4 sm:w-5 h-4 sm:h-5 mx-auto mb-1 text-[#caa34d] flex items-center justify-center font-bold text-sm sm:text-base group-hover:scale-110 transition-transform">
                💍
              </div>
              <h4 className="font-display font-bold text-xs sm:text-base text-[#4A101B]">Wedding</h4>
              <span className="text-[10px] sm:text-[11px] text-[#caa34d] font-sans font-bold block mt-0.5">09 Feb 2027</span>
            </div>

            {/* Reception */}
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#D4AF65]/50 text-center shadow-sm hover:shadow-md hover:border-[#D4AF65] transition group">
              <FaWineGlassAlt className="w-4 sm:w-5 h-4 sm:h-5 text-purple-700 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <h4 className="font-display font-bold text-xs sm:text-base text-[#4A101B]">Reception</h4>
              <span className="text-[10px] sm:text-[11px] text-stone-600 font-sans font-medium block mt-0.5">09 Feb 2027</span>
            </div>

          </div>

          {/* Vertical Divider Line on Desktop */}
          <div className="hidden lg:block w-px h-14 bg-[#D4AF65]/50"></div>

          {/* Right: THE BIG DAY Countdown Boxes */}
          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#826425] font-sans font-bold mb-1.5 sm:mb-2">
              <span>✤</span>
              <span>THE BIG DAY</span>
              <span>✤</span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center w-full sm:w-auto">
              {[
                { val: timeLeft.days, label: 'Days' },
                { val: timeLeft.hours, label: 'Hours' },
                { val: timeLeft.minutes, label: 'Minutes' },
                { val: timeLeft.seconds, label: 'Seconds' }
              ].map((item, idx) => (
                <div key={idx} className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#D4AF65]/60 shadow-sm min-w-0 sm:w-20">
                  <span className="font-display text-lg sm:text-2xl font-bold text-[#4A101B] block leading-none">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[10px] uppercase text-stone-600 font-sans font-bold block mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
