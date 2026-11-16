import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishesSection({ initialWishes }) {
  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem('wedding_wishes_nagpur');
    return saved ? JSON.parse(saved) : initialWishes;
  });

  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newWish = {
      id: 'wish-' + Date.now(),
      name: author.trim(),
      message: message.trim(),
      date: 'Just now',
      hearts: 1
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes_nagpur', JSON.stringify(updated));

    // Confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF65', '#681C2B', '#EAB308']
    });

    setAuthor('');
    setMessage('');
  };

  const handleLike = (id) => {
    if (likedIds.has(id)) return;
    const newLiked = new Set(likedIds);
    newLiked.add(id);
    setLikedIds(newLiked);

    const updated = wishes.map(w => w.id === id ? { ...w, hearts: w.hearts + 1 } : w);
    setWishes(updated);
    localStorage.setItem('wedding_wishes_nagpur', JSON.stringify(updated));
  };

  return (
    <section id="wishes" className="py-24 px-4 bg-gradient-to-b from-[#FFF8EF] via-[#FDF3E5] to-[#FFF8EF] text-[#32151B] relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-burgundy-700 font-sans font-bold block mb-1">
            Words of Love & Blessings
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-burgundy-900">
            Royal Guestbook
          </h2>
          <p className="font-serif italic text-stone-600 mt-2 text-base sm:text-lg">
            Leave your warm wishes and blessings for Prajwal & Pratiksha
          </p>
          <div className="w-16 h-0.5 bg-royalGold mx-auto mt-4"></div>
        </div>

        {/* Input Form for New Wish */}
        <div className="mb-14 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-royalGold/40 shadow-xl">
          <h3 className="font-display text-xl font-bold text-burgundy-900 mb-4 flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-royalGold-700" />
            <span>Send a Blessing to the Couple</span>
          </h3>

          <form onSubmit={handleAddWish} className="space-y-4">
            <div>
              <input
                type="text"
                required
                placeholder="Your Name (e.g. Ramesh & Sneha Patil)"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-royalGold bg-[#FFF8EF]/50 font-serif text-stone-800 text-sm"
              />
            </div>
            <div>
              <textarea
                rows={3}
                required
                placeholder="Write your heartfelt blessings, memories, or wishes..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-royalGold bg-[#FFF8EF]/50 font-serif text-stone-800 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-royalGold via-royalGold-400 to-royalGold hover:brightness-110 text-burgundy-900 font-sans text-xs uppercase tracking-widest font-bold shadow-md transition flex items-center space-x-2"
            >
              <span>Post Your Blessing</span>
              <Send className="w-3.5 h-3.5 text-burgundy-900" />
            </button>
          </form>
        </div>

        {/* Wishes Display Wall */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white border border-royalGold/30 shadow-lg flex flex-col justify-between group hover:border-royalGold hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#681C2B] to-[#4A101B] text-royalGold font-serif font-bold text-sm flex items-center justify-center shadow-sm">
                      {item.name.charAt(0)}
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-burgundy-900 leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-stone-400 font-sans">{item.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center space-x-1 text-xs text-rose-500 hover:scale-110 transition-transform p-1"
                    title="Send Love"
                  >
                    <Heart className={`w-4 h-4 ${likedIds.has(item.id) ? 'fill-rose-500' : 'text-rose-400'}`} />
                    <span className="text-xs font-semibold">{item.hearts}</span>
                  </button>
                </div>

                <p className="font-serif italic text-stone-700 text-sm leading-relaxed mt-2">
                  "{item.message}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 mt-4 flex items-center justify-between text-[10px] text-royalGold-700 font-sans uppercase tracking-widest">
                <span>✦ Divine Blessing</span>
                <span>Nagpur 2027</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

