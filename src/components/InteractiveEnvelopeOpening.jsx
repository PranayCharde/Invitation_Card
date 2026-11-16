import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { indianSoundEngine } from '../audio/romanticSynth';
import { Volume2, VolumeX, FastForward, Play, ChevronRight, ArrowRight } from 'lucide-react';

export default function InteractiveEnvelopeOpening({ data, onOpenComplete, onSkip }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Play auspicious wax crackle & royal chime
    if (!isAudioMuted) {
      indianSoundEngine.playSealBreakSound();
      setTimeout(() => {
        indianSoundEngine.start();
      }, 700);
    }

    // Golden & rose confetti burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#D4AF65', '#F3DCA5', '#681C2B', '#EAB308', '#FFFFFF']
    });
  };

  const handleEnterCelebration = () => {
    onOpenComplete();
  };

  const handleToggleSound = (e) => {
    e.stopPropagation();
    if (isAudioMuted) {
      setIsAudioMuted(false);
      indianSoundEngine.start();
    } else {
      setIsAudioMuted(true);
      indianSoundEngine.stop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#1D050B] text-white select-none">

      {/* Top Floating Controls on Right Side */}
      <div className="absolute top-4 sm:top-5 right-4 sm:right-6 flex items-center space-x-2.5 z-50">
        {/* Small circular Sound Toggle on right side */}
        <button
          onClick={handleToggleSound}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[#D4AF65]/70 text-[#F3DCA5] transition shadow-xl"
          title={isAudioMuted ? 'Play Royal Music' : 'Mute Music'}
          aria-label="Toggle Royal Music"
        >
          {isAudioMuted ? (
            <VolumeX className="w-4 h-4 text-stone-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#D4AF65] animate-pulse" />
          )}
        </button>

        {/* Skip Animation Option */}
        <button
          onClick={onSkip}
          className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/60 hover:bg-[#D4AF65]/30 backdrop-blur-md border border-[#D4AF65]/60 text-[#F3DCA5] hover:text-white text-[11px] sm:text-xs font-sans uppercase tracking-wider transition shadow-2xl font-bold"
        >
          <span>Skip</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Image Stage: Seamlessly switches between Image 4 (Closed) and Image 3 (Open) */}
      <div className="relative w-full h-full flex items-center justify-center">

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE (Matches Mockup Screen 2 on Mobile) */
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full flex flex-col justify-between items-center text-center p-4 sm:p-0 select-none cursor-pointer"
              onClick={handleOpen}
            >
              {/* Mobile Background: Dedicated Portrait Envelope from user asset */}
              <div
                className="absolute inset-0 sm:hidden bg-cover bg-center"
                style={{ backgroundImage: `url('/images/mobile/mobile-envelope-closed.jpg')` }}
              >
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>

              {/* Desktop Background: Wide Landscape Envelope */}
              <div
                className="absolute inset-0 hidden sm:block bg-cover bg-center"
                style={{ backgroundImage: `url('/images/envelope-closed.jpg')` }}
              >
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>

              {/* Top Text Content (Matching Mockup 2 on mobile) */}
              <div className="relative z-20 pt-8 sm:pt-12 px-4 flex flex-col items-center">
                <span className="font-script text-3xl sm:text-4xl text-[#F3DCA5] drop-shadow-md">
                  P<span className="text-xl">♥</span>P
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-[#F3DCA5]/90 tracking-wider mt-1 drop-shadow">
                  Together with our families
                </p>
              </div>

              {/* Interactive Wax Seal Click Target (positioned right over the wax seal in the photo) */}
              <div
                onClick={handleOpen}
                className="absolute top-[42%] sm:top-[67%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full cursor-pointer z-30 group"
                title="Click to break seal & open invitation"
              >
                <div className="w-full h-full rounded-full border-2 border-[#D4AF65]/0 group-hover:border-[#D4AF65]/90 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(212,175,101,0.8)] transition-all duration-300" />
              </div>

              {/* Bottom Invitation Invitation & Button (Matching Mockup 2) */}
              <div className="relative z-20 pb-8 sm:pb-10 px-4 w-full max-w-sm flex flex-col items-center">
                {/* <p className="text-[10px] sm:text-xs text-[#F3DCA5]/90 font-sans uppercase tracking-[0.2em] mb-1 drop-shadow">
                  You are cordially invited to celebrate the wedding of
                </p>
                <h2 className="font-script text-3xl sm:text-5xl text-[#FFF2D6] my-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  Prajwal & Pratiksha
                </h2> */}
                <div className="flex items-center space-x-2 my-2 text-[#D4AF65]">
                  <div className="w-8 h-px bg-[#D4AF65]/70" />
                  <span className="text-sm">💍</span>
                  <div className="w-8 h-px bg-[#D4AF65]/70" />
                </div>

                <button
                  onClick={handleOpen}
                  className="mt-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF65] via-[#F3DCA5] to-[#D4AF65] hover:brightness-110 text-[#32151B] font-sans text-xs sm:text-sm uppercase tracking-[0.25em] font-extrabold shadow-[0_10px_35px_rgba(212,175,101,0.6)] transition-all duration-300 flex items-center space-x-2.5 animate-pulse"
                >
                  <span>OPEN YOUR INVITATION</span>
                  <Play className="w-3.5 h-3.5 fill-[#32151B] text-[#32151B]" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* OPENED ENVELOPE (Matches Mockup Screen 3 on Mobile) */
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full flex flex-col justify-end items-center text-center p-6 sm:p-0 select-none cursor-pointer"
              onClick={handleEnterCelebration}
            >
              {/* Mobile Background: Dedicated Portrait Opened Envelope */}
              <div
                className="absolute inset-0 sm:hidden bg-cover bg-center"
                style={{ backgroundImage: `url('/images/mobile/mobile-envelope-opened.jpg')` }}
              >
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>

              {/* Desktop Background: Wide Landscape Opened Envelope */}
              <div
                className="absolute inset-0 hidden sm:block bg-cover bg-center"
                style={{ backgroundImage: `url('/images/envelope-opened.jpg')` }}
              >
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>

              {/* Bottom Action: ENTER WEDDING CELEBRATION */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative z-20 pb-8 sm:pb-12 px-4 w-full max-w-sm flex flex-col items-center"
              >
                <button
                  onClick={handleEnterCelebration}
                  className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF65] via-[#F3DCA5] to-[#D4AF65] hover:brightness-110 text-[#32151B] font-sans text-xs sm:text-sm uppercase tracking-[0.25em] font-extrabold shadow-[0_10px_40px_rgba(212,175,101,0.7)] transition-all duration-300 flex items-center space-x-2.5 group"
                >
                  <span>ENTER WEDDING CELEBRATION</span>
                  <ArrowRight className="w-4 h-4 text-[#32151B] group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-[#F3DCA5]/90 font-serif italic mt-2 drop-shadow">
                  Welcome to the royal celebrations of Prajwal & Pratiksha
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
