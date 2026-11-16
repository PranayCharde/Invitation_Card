import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Sun, Heart, PartyPopper, Check } from 'lucide-react';

export default function EventsSection({ events, onAddCalendar }) {
  // Mobile Events data matching Mockup Screen 5
  const mobileEvents = [
    {
      id: "haldi",
      name: "Haldi",
      date: "07 Feb 2027",
      timeVenue: "10:00 AM | Home",
      icon: "🥣"
    },
    {
      id: "mehendi",
      name: "Mehendi",
      date: "07 Feb 2027",
      timeVenue: "04:00 PM | Home",
      icon: "🪷"
    },
    {
      id: "wedding",
      name: "Wedding",
      date: "09 Feb 2027",
      timeVenue: "11:30 AM | Nagpur",
      icon: "🔥"
    },
    {
      id: "reception",
      name: "Reception",
      date: "09 Feb 2027",
      timeVenue: "07:00 PM | Nagpur",
      icon: "🥂"
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />;
      case 'party-popper':
        return <PartyPopper className="w-6 h-6 text-purple-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-royalGold" />;
    }
  };

  return (
    <section id="events" className="py-20 sm:py-24 px-4 bg-[#23050C] text-[#FFF8EF] relative overflow-hidden">
      
      {/* MOBILE EVENTS VIEW (Matches User Mockup Screen 5) */}
      <div className="sm:hidden max-w-sm mx-auto relative z-10 py-6">
        {/* Background from user asset 5 */}
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-3xl opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/images/mobile/mobile-events-bg.jpg')` }}
        />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="font-script text-4xl text-[#FFF2D6] tracking-wide">
            Wedding Events
          </h2>
          <div className="flex items-center justify-center space-x-2 my-2 text-[#D4AF65]">
            <div className="w-8 h-px bg-[#D4AF65]/70" />
            <span className="text-sm">💍</span>
            <div className="w-8 h-px bg-[#D4AF65]/70" />
          </div>
        </div>

        {/* 4 Burgundy Gold-Bordered Event Cards */}
        <div className="space-y-4 relative z-10">
          {mobileEvents.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-4 rounded-2xl bg-[#360914]/90 border border-[#D4AF65]/50 flex items-center space-x-4 shadow-xl hover:border-[#D4AF65] transition"
            >
              {/* Event Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#4A101B] border border-[#D4AF65]/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                <span>{item.icon}</span>
              </div>

              {/* Event Info */}
              <div className="flex-1">
                <h4 className="font-display font-bold text-lg text-[#FFF2D6]">
                  {item.name}
                </h4>
                <p className="text-xs text-[#D4AF65] font-sans font-semibold mt-0.5">
                  {item.date}
                </p>
                <p className="text-[11px] text-stone-300 font-sans mt-0.5">
                  {item.timeVenue}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DESKTOP EVENTS VIEW */}
      <div className="hidden sm:block max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-burgundy-700 font-sans font-bold block mb-1">
            Sacred Auspicious Celebrations
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-burgundy-900">
            Wedding Itinerary & Events
          </h2>
          <p className="font-serif italic text-stone-600 mt-2 text-base sm:text-lg">
            Join us in each auspicious milestone of laughter, music, and divine blessings
          </p>
          <div className="w-20 h-0.5 bg-royalGold mx-auto mt-4"></div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative rounded-3xl p-6 sm:p-8 bg-white border shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                ev.isMain ? 'border-2 border-royalGold ring-2 ring-royalGold/20' : 'border-royalGold/30 hover:border-royalGold'
              }`}
            >
              
              {/* Highlight Badge for Main Ceremony */}
              {ev.isMain && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-royalGold to-royalGold-400 text-burgundy-900 text-[10px] uppercase font-sans font-extrabold tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm">
                  Main Ceremony • Shubh Vivah
                </div>
              )}

              <div>
                {/* Header with Icon & Timing */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF8EF] border border-royalGold/40 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {getEventIcon(ev.icon)}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-burgundy-900 leading-tight">
                      {ev.name}
                    </h3>
                    <p className="font-script text-xl text-royalGold-700 leading-tight">
                      {ev.subName}
                    </p>
                  </div>
                </div>

                {/* Event Details Pills */}
                <div className="space-y-2.5 my-4 bg-[#FFF8EF] p-4 rounded-2xl border border-royalGold/20 text-xs sm:text-sm font-sans text-stone-700">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-royalGold-700 flex-shrink-0" />
                    <span className="font-semibold text-burgundy-900">{ev.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-royalGold-700 flex-shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-royalGold-700 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-stone-800">{ev.venue}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-serif italic text-stone-600 text-sm leading-relaxed mb-6">
                  {ev.description}
                </p>
              </div>

              {/* Footer with Dress Code and Add to Calendar */}
              <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-stone-400 uppercase tracking-widest text-[9px] font-sans font-bold block">Dress Code</span>
                  <span className="font-sans font-semibold text-burgundy-800">{ev.dressCode}</span>
                </div>

                <button
                  onClick={() => onAddCalendar(ev)}
                  className="px-4 py-2 rounded-full border border-royalGold/60 hover:bg-royalGold hover:text-burgundy-900 text-royalGold-800 text-xs font-sans uppercase tracking-wider font-semibold transition flex items-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

