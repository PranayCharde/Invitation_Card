import React from 'react';
import { Heart, Share2, ArrowUp, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FooterSection({ couple, date, location, social }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `${social.whatsappShareText} ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#2E0A11] text-stone-300 py-16 px-4 border-t-2 border-royalGold/40 relative overflow-hidden">
      
      {/* Background Indian Motif */}
      <div className="absolute inset-0 bg-jaali-pattern opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Monogram Crest */}
        <div className="w-16 h-16 rounded-full border border-royalGold mx-auto flex items-center justify-center bg-gradient-to-br from-[#4A101B] to-[#1E050B] shadow-lg">
          <span className="font-script text-3xl text-royalGold gold-text-gradient">
            {couple.monogram}
          </span>
        </div>

        {/* Closing Greetings */}
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-royalGold font-sans font-bold block mb-1">
            With Love & Blessings
          </span>
          <h3 className="font-display text-3xl sm:text-5xl font-bold text-white gold-text-gradient">
            {couple.groom.name} & {couple.bride.name}
          </h3>
          <p className="font-serif italic text-stone-300 text-base sm:text-lg mt-2 max-w-md mx-auto">
            "Thank you for being part of our special journey and blessing us with your presence."
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-royalGold-300 font-sans mt-3">
            {date.displayDate} • {location.city}, {location.state}
          </p>
        </div>

        {/* Social Sharing & Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-sans uppercase tracking-wider font-semibold transition flex items-center space-x-2 shadow-lg"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Share Invitation via WhatsApp</span>
          </button>

          {/* Instagram */}
          <a
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full border border-royalGold/50 hover:bg-royalGold/20 text-royalGold-300 hover:text-white text-xs font-sans uppercase tracking-wider font-semibold transition flex items-center space-x-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {couple.hashtag}</span>
          </a>

          {/* Back To Top */}
          <button
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-royalGold/30 text-stone-300 hover:text-royalGold text-xs font-sans uppercase tracking-wider transition flex items-center space-x-1.5"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright & Blessings note */}
        <div className="pt-8 border-t border-royalGold/20 text-xs text-stone-400 font-sans space-y-1">
          <p>
            Shubh Vivah of Prajwal Deshmukh & Pratiksha Patil • Celebrated with Family & Friends
          </p>
          <p className="text-[11px] text-royalGold-400/60 font-serif italic">
            "ॐ श्री गणेशाय नमः • सदा सौभाग्यवती भव"
          </p>
        </div>

      </div>
    </footer>
  );
}

