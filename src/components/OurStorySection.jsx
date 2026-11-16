import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function OurStorySection({ story }) {
  // Mobile Story milestones from User Mockup 4
  const mobileMilestones = [
    {
      id: "met",
      title: "How We Met",
      text: "A chance meeting that changed everything.",
      icon: "🤎"
    },
    {
      id: "beginning",
      title: "The Beginning",
      text: "From friendship to something more special.",
      icon: "🌿"
    },
    {
      id: "journey",
      title: "The Journey",
      text: "Growing together, through every high and low.",
      icon: "💍"
    },
    {
      id: "forever",
      title: "Forever Starts Here",
      text: "Now, we begin a lifetime together.",
      icon: "♾️"
    }
  ];

  return (
    <section id="story" className="py-20 sm:py-24 px-4 bg-[#FFF8EF] text-[#32151B] relative overflow-hidden">
      
      {/* Background Indian Floral Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,101,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* MOBILE STORY VIEW (Matches User Mockup Screen 4) */}
      <div className="sm:hidden max-w-sm mx-auto relative z-10 py-6">
        {/* Background from user asset 4 */}
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-3xl opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/images/mobile/mobile-story-bg.jpg')` }}
        />

        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <h2 className="font-script text-4xl font-normal text-[#4A101B] tracking-wide">
            Our Story
          </h2>
          <div className="flex items-center justify-center space-x-2 my-2 text-[#D4AF65]">
            <div className="w-8 h-px bg-[#D4AF65]/70" />
            <span className="text-sm">💍</span>
            <div className="w-8 h-px bg-[#D4AF65]/70" />
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="relative pl-6 space-y-8">
          {/* Vertical Golden Connecting Line */}
          <div className="absolute left-11 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#D4AF65]/40 via-[#D4AF65] to-[#D4AF65]/40" />

          {mobileMilestones.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start space-x-4 relative"
            >
              {/* Circular Gold Icon Node */}
              <div className="w-10 h-10 rounded-full border-2 border-[#D4AF65] bg-[#3B0C15] text-[#F3DCA5] flex items-center justify-center text-base flex-shrink-0 shadow-md relative z-10">
                <span>{item.icon}</span>
              </div>

              {/* Text Card */}
              <div className="pt-0.5">
                <h4 className="font-display font-bold text-base text-[#4A101B]">
                  {item.title}
                </h4>
                <p className="font-serif italic text-xs text-stone-600 mt-0.5 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Floral & Palace Arch Illustration from Mockup 4 */}
        <div className="mt-12 text-center opacity-85">
          <div className="w-20 h-px bg-[#D4AF65]/60 mx-auto mb-2" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#826425] font-sans font-bold">
            Chapter of Eternity
          </span>
        </div>
      </div>

      {/* DESKTOP STORY VIEW (Wide Timeline with Photos) */}
      <div className="hidden sm:block max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-burgundy-700 font-sans font-bold block mb-1">
            Our Journey of Love
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-burgundy-800">
            Every Love Story is Beautiful
          </h2>
          <p className="font-serif italic text-stone-600 mt-2 text-base sm:text-lg">
            "But ours is our absolute favorite."
          </p>
          <div className="w-16 h-0.5 bg-royalGold mx-auto mt-4"></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Vertical Golden Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-royalGold/20 via-royalGold to-royalGold/20" />

          <div className="space-y-12 md:space-y-20">
            {story.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Image Card */}
                  <div className="w-full md:w-1/2">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-royalGold/40 group bg-white p-2">
                      <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                          <span className="text-royalGold text-xs font-sans font-semibold uppercase tracking-widest bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-royalGold/30">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Central Timeline Milestone Node */}
                  <div className="hidden md:flex flex-col items-center justify-center relative z-20">
                    <div className="w-12 h-12 rounded-full border-2 border-royalGold bg-[#4A101B] text-royalGold flex items-center justify-center shadow-lg">
                      <Heart className="w-5 h-5 fill-royalGold text-royalGold" />
                    </div>
                  </div>

                  {/* Story Narrative Text Card */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-royalGold/30 shadow-lg relative group hover:border-royalGold transition-all">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-royalGold-700 font-sans font-bold block mb-1">
                        {item.chapter}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-burgundy-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="font-script text-2xl text-royalGold-700 mb-3">
                        {item.subtitle}
                      </p>
                      <p className="font-serif italic text-stone-700 text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

