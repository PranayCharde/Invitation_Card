import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Plane, Train, Car, Phone, Mail } from 'lucide-react';

export default function VenueSection({ location, contact }) {
  return (
    <section id="venue" className="py-20 sm:py-24 px-4 bg-[#FFF8EF] text-[#32151B] relative overflow-hidden">
      
      {/* MOBILE VENUE VIEW (Matches User Mockup Screen 7) */}
      <div className="sm:hidden max-w-sm mx-auto relative z-10 py-4 text-center">
        {/* Background from user asset 7 */}
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-3xl opacity-15 pointer-events-none"
          style={{ backgroundImage: `url('/images/mobile/mobile-venue-bg.jpg')` }}
        />

        {/* Header */}
        <div className="mb-6 relative z-10">
          <h2 className="font-script text-4xl text-[#4A101B] tracking-wide">
            Venue
          </h2>
          <div className="flex items-center justify-center space-x-2 my-2 text-[#D4AF65]">
            <div className="w-8 h-px bg-[#D4AF65]/70" />
            <span className="text-sm">💍</span>
            <div className="w-8 h-px bg-[#D4AF65]/70" />
          </div>
        </div>

        {/* Arched Venue Photograph */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF65]/60 mb-6 mx-auto h-64 relative group">
          <img
            src="/images/hero-mandap-bg.jpg"
            alt={location.venueName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 text-white text-left">
            <div>
              <span className="text-[10px] uppercase font-sans font-bold text-[#F3DCA5] tracking-widest block">
                The Royal Venue
              </span>
              <span className="font-display font-bold text-lg text-white">
                {location.venueName}
              </span>
            </div>
          </div>
        </div>

        {/* Location Name & Details */}
        <div className="mb-6 px-2">
          <div className="flex items-center justify-center space-x-1.5 text-[#4A101B] font-display font-bold text-xl">
            <MapPin className="w-5 h-5 text-[#caa34d] flex-shrink-0" />
            <span>{location.venueName}</span>
          </div>
          <p className="text-xs text-stone-600 font-sans mt-1">
            {location.address}
          </p>
          <p className="text-[11px] text-[#caa34d] font-sans font-semibold mt-0.5">
            Landmark: {location.landmark}
          </p>
        </div>

        {/* Get Directions Button (Matching Mockup 7) */}
        <a
          href={location.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#4A101B] hover:bg-[#681C2B] text-[#F3DCA5] border border-[#D4AF65]/80 font-sans text-xs uppercase tracking-widest font-extrabold shadow-xl transition-all"
        >
          <Navigation className="w-4 h-4 text-[#D4AF65]" />
          <span>Get Directions</span>
        </a>

        {/* Bottom Palace Arch Illustration */}
        <div className="mt-10 opacity-75">
          <div className="w-20 h-px bg-[#D4AF65]/50 mx-auto mb-2" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#826425] font-sans font-bold">
            Nagpur • Maharashtra
          </span>
        </div>
      </div>

      {/* DESKTOP VENUE VIEW */}
      <div className="hidden sm:block max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-burgundy-700 font-sans font-bold block mb-1">
            Destination & Destination Guide
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-burgundy-900">
            Venue & Royal Location
          </h2>
          <p className="font-serif italic text-stone-600 mt-2 text-base sm:text-lg">
            Nestled in the heart of Nagpur, a majestic palace to host our vows
          </p>
          <div className="w-16 h-0.5 bg-royalGold mx-auto mt-4"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Venue Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-royalGold/40 h-80 sm:h-96 relative group">
              <img
                src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80"
                alt={location.venueName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6 sm:p-8 text-white">
                <div>
                  <span className="text-xs uppercase tracking-widest text-royalGold font-sans font-bold">The Royal Venue</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">{location.venueName}</h3>
                  <p className="text-xs text-stone-300 mt-1">{location.address}</p>
                </div>
              </div>
            </div>

            {/* Travel Assistance Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-royalGold/30 text-center shadow-sm">
                <Plane className="w-5 h-5 text-royalGold mx-auto mb-1" />
                <span className="text-[10px] uppercase font-sans font-bold text-stone-400 block">Airport</span>
                <span className="text-xs font-semibold text-burgundy-900">5 Mins to NAG</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-royalGold/30 text-center shadow-sm">
                <Train className="w-5 h-5 text-royalGold mx-auto mb-1" />
                <span className="text-[10px] uppercase font-sans font-bold text-stone-400 block">Railways</span>
                <span className="text-xs font-semibold text-burgundy-900">20 Mins Station</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-royalGold/30 text-center shadow-sm">
                <Car className="w-5 h-5 text-royalGold mx-auto mb-1" />
                <span className="text-[10px] uppercase font-sans font-bold text-stone-400 block">Valet</span>
                <span className="text-xs font-semibold text-burgundy-900">Free Valet</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Address & Map Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-royalGold/40 shadow-xl space-y-5">
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8EF] border border-royalGold/40 text-royalGold-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-burgundy-900">
                    {location.venueName}
                  </h4>
                  <p className="font-serif italic text-sm text-stone-600 mt-1">
                    {location.address}
                  </p>
                  <p className="text-xs text-royalGold-800 font-sans font-medium mt-1">
                    Landmark: {location.landmark}
                  </p>
                </div>
              </div>

              {/* Embedded Map Representation */}
              <div className="rounded-2xl overflow-hidden border border-royalGold/30 shadow-inner h-48 bg-stone-100 relative flex items-center justify-center">
                <iframe
                  title="Venue Google Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Get Directions Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-royalGold via-royalGold-400 to-royalGold hover:brightness-110 text-burgundy-900 font-sans text-xs uppercase tracking-widest font-bold shadow-royal-gold transition flex items-center justify-center space-x-2 text-center"
                >
                  <Navigation className="w-4 h-4 text-burgundy-900" />
                  <span>Get Driving Directions on Google Maps</span>
                </a>
              </div>

              {/* Hospitality Desk Callout */}
              <div className="pt-4 border-t border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row justify-between gap-2">
                <div>
                  <span className="font-bold text-burgundy-900 block font-sans">{contact.name}</span>
                  <span>{contact.phone}</span>
                </div>
                <div>
                  <span className="font-bold text-burgundy-900 block font-sans">Assistance Email</span>
                  <span>{contact.email}</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

