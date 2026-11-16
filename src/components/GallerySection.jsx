import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

export default function GallerySection({ gallery }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'portrait', label: 'Royal Portraits' },
    { id: 'engagement', label: 'Ring Ceremony' },
    { id: 'moments', label: 'Candid Moments' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-[#FFF8EF] text-[#32151B] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-burgundy-700 font-sans font-bold block mb-1">
            Glimpses of Forever
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-burgundy-900">
            Royal Photo Gallery
          </h2>
          <p className="font-serif italic text-stone-600 mt-2 text-base sm:text-lg">
            A visual tapestry of our smiles, journeys, and vows of eternity
          </p>
          <div className="w-16 h-0.5 bg-royalGold mx-auto mt-4 mb-8"></div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center space-x-2 flex-wrap gap-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-royalGold via-royalGold-400 to-royalGold text-burgundy-900 shadow-md'
                    : 'bg-white border border-royalGold/40 text-stone-700 hover:border-royalGold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => openLightbox(idx)}
              className="cursor-pointer overflow-hidden rounded-3xl shadow-xl border-2 border-royalGold/30 group relative h-80 bg-stone-900"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-royalGold font-sans font-bold">
                  {photo.subtitle}
                </span>
                <h4 className="font-display text-xl font-bold text-white mt-0.5">
                  {photo.title}
                </h4>
                <div className="mt-3 flex items-center space-x-1 text-xs text-royalGold-300">
                  <Eye className="w-4 h-4" />
                  <span>Click to view photo</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image & Title Card */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={filteredPhotos[activeLightboxIndex].url}
                alt={filteredPhotos[activeLightboxIndex].title}
                className="max-w-[90vw] max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-royalGold/40"
              />
              <div className="mt-4 text-center text-white">
                <span className="text-xs uppercase tracking-widest text-royalGold font-sans font-bold">
                  {filteredPhotos[activeLightboxIndex].subtitle}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {filteredPhotos[activeLightboxIndex].title}
                </h3>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

