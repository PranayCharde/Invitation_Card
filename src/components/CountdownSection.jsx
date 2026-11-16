import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

export default function CountdownSection({ targetDate, muhurat, auspiciousTithi }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculateCountdown() {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-20 px-4 bg-[#1A050A] text-white relative overflow-hidden flex flex-col justify-center items-center min-h-[550px]">
      
      {/* Background from Mockup 6: Mandap walkway with lanterns and petals */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('/images/mobile/mobile-countdown-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A050A]/75 via-[#1A050A]/45 to-[#1A050A]/85 pointer-events-none" />
      </div>

      <div className="max-w-md w-full mx-auto text-center relative z-10 py-6">
        
        {/* Section Heading (Matching Mockup 6) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <span className="font-serif italic text-sm text-[#F3DCA5] block mb-1">
            The Big Day
          </span>
          <h2 className="font-script text-4xl sm:text-5xl text-[#FFF2D6] drop-shadow-md">
            Countdown
          </h2>
          <div className="w-16 h-px bg-[#D4AF65]/60 mx-auto mt-2" />
        </motion.div>

        {/* 4 Animated Countdown Boxes in 2x2 Grid (Matching Mockup 6) */}
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          {units.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-[#D4AF65]/60 shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center hover:border-[#D4AF65] transition"
            >
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#FFF2D6] block leading-none drop-shadow">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase text-[#D4AF65] font-sans font-bold tracking-wider mt-2">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Auspicious Muhurat Footnote */}
        <div className="mt-8 inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#D4AF65]/40 text-xs font-sans text-stone-200">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF65]" />
          <span>{muhurat}</span>
        </div>

      </div>
    </section>
  );
}

