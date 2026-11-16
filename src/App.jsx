import React, { useState } from 'react';
import { weddingData } from './data/weddingData';
import InteractiveEnvelopeOpening from './components/InteractiveEnvelopeOpening';
import FloatingPetalsCanvas from './components/FloatingPetalsCanvas';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import OurStorySection from './components/OurStorySection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import VenueSection from './components/VenueSection';
import RsvpSection from './components/RsvpSection';
import WishesSection from './components/WishesSection';
import FooterSection from './components/FooterSection';
import MusicController from './components/MusicController';
import { ChevronDown, Mail, Calendar, HelpCircle } from 'lucide-react';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Calendar helpers for main wedding date
  const handleSaveMainDate = () => {
    const start = new Date(weddingData.date.weddingDate);
    const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
    const fmt = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const title = encodeURIComponent(`The Royal Wedding of ${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}`);
    const details = encodeURIComponent(`${weddingData.couple.shloka} - We cordially invite you to celebrate our Shubh Vivah!`);
    const location = encodeURIComponent(`${weddingData.location.venueName}, ${weddingData.location.address}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${location}`, '_blank');
  };

  const handleAddEventCalendar = (event) => {
    const title = encodeURIComponent(`${event.name} - ${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}'s Wedding`);
    const details = encodeURIComponent(`${event.description} | Dress Code: ${event.dressCode}`);
    const location = encodeURIComponent(`${event.venue}, Nagpur, Maharashtra`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#32151B] font-sans relative selection:bg-royalGold/30 selection:text-burgundy-900">

      {/* Floating Marigold & Rose Petals Canvas */}
      <FloatingPetalsCanvas />

      {/* Opening 3D Envelope Experience Overlay */}
      {!isEnvelopeOpen && (
        <InteractiveEnvelopeOpening
          data={weddingData}
          onOpenComplete={() => setIsEnvelopeOpen(true)}
          onSkip={() => setIsEnvelopeOpen(true)}
        />
      )}

      {/* Main Unfolded Wedding Experience */}
      {isEnvelopeOpen && (
        <div className="relative z-10 animate-fadeIn">

          {/* 1. Hero Section (Matches User Image 1: Navigation, Couple Visual, & Bottom Event/Countdown Banner) */}
          <HeroSection
            data={weddingData}
            onSaveDateClick={handleSaveMainDate}
            onReopenEnvelope={() => setIsEnvelopeOpen(false)}
          />

          {/* 2. Our Love Story Section */}
          <OurStorySection
            story={weddingData.story}
          />

          {/* 3. Events & Itinerary Section */}
          <EventsSection
            events={weddingData.events}
            onAddCalendar={handleAddEventCalendar}
          />

          {/* 4. The Big Day Countdown Section (Matches Mockup 6) */}
          <CountdownSection
            targetDate={weddingData.date.weddingDate}
            muhurat={weddingData.date.muhurat}
            auspiciousTithi={weddingData.date.auspiciousTithi}
          />

          {/* 5. Photo Gallery Section */}
          <GallerySection
            gallery={weddingData.gallery}
          />

          {/* 6. Venue & Location Section */}
          <VenueSection
            location={weddingData.location}
            contact={weddingData.hospitalityContact}
          />

          {/* 7. Interactive RSVP Section */}
          {/* <RsvpSection
            couple={weddingData.couple}
            date={weddingData.date}
            location={weddingData.location}
          /> */}

          {/* 8. Wedding Wishes & Guestbook Section */}
          {/* <WishesSection
            initialWishes={weddingData.initialWishes}
          /> */}

          {/* 9. FAQs Section */}
          {/* <section id="faqs" className="py-24 px-4 bg-[#FFF8EF] text-[#32151B]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-[0.35em] text-burgundy-700 font-sans font-bold block mb-1">
                  Helpful Information
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-burgundy-900">
                  Frequently Asked Questions
                </h2>
                <div className="w-16 h-0.5 bg-royalGold mx-auto mt-4"></div>
              </div>

              <div className="space-y-4">
                {weddingData.faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl bg-white border border-royalGold/30 shadow-md overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-display text-lg sm:text-xl font-bold text-burgundy-900 hover:text-royalGold-700 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-royalGold-700 transition-transform duration-300 flex-shrink-0 ml-3 ${
                        openFaqIndex === idx ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-5 sm:px-6 pb-6 text-stone-700 font-serif italic text-sm sm:text-base leading-relaxed border-t border-stone-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* 10. Footer Section */}
          <FooterSection
            couple={weddingData.couple}
            date={weddingData.date}
            location={weddingData.location}
            social={weddingData.social}
          />

          {/* Persistent Indian Wedding Music Controller */}
          <MusicController />

        </div>
      )}

    </div>
  );
}
