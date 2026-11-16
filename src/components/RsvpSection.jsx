import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, Send, Download, X, Printer, User, Users, Mail, MessageSquare } from 'lucide-react';

export default function RsvpSection({ couple, date, location, onRsvpSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    attendance: 'accepted', // 'accepted' | 'declined'
    dietary: 'Pure Vegetarian',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedPass, setSubmittedPass] = useState(null);
  const qrCanvasRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepared for Firebase Firestore or REST API endpoint:
      // Example: await addDoc(collection(db, "rsvps"), { ...formData, createdAt: new Date() });
      
      const newRsvp = {
        id: 'RSVP-' + Date.now(),
        ...formData,
        timestamp: new Date().toISOString()
      };

      // Save locally to localStorage so RSVPs persist reliably
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps_nagpur') || '[]');
      existing.unshift(newRsvp);
      localStorage.setItem('wedding_rsvps_nagpur', JSON.stringify(existing));

      if (onRsvpSuccess) {
        onRsvpSuccess(newRsvp);
      }

      // Confetti celebration
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF65', '#681C2B', '#F3DCA5', '#EAB308', '#FFFFFF']
      });

      setSubmittedPass(newRsvp);
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: 2,
        attendance: 'accepted',
        dietary: 'Pure Vegetarian',
        message: ''
      });
    } catch (err) {
      console.error('RSVP submission error:', err);
      setErrorMsg('There was an issue recording your response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render QR Code onto Canvas for VIP Pass
  useEffect(() => {
    if (submittedPass && qrCanvasRef.current) {
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const size = canvas.width;
      ctx.clearRect(0, 0, size, size);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      const grid = 21;
      const cellSize = size / grid;

      // Stylized QR pattern
      ctx.fillStyle = '#4A101B';
      const drawCorner = (r, c) => {
        ctx.fillRect(r * cellSize, c * cellSize, 7 * cellSize, 7 * cellSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect((r + 1) * cellSize, (c + 1) * cellSize, 5 * cellSize, 5 * cellSize);
        ctx.fillStyle = '#4A101B';
        ctx.fillRect((r + 2) * cellSize, (c + 2) * cellSize, 3 * cellSize, 3 * cellSize);
      };

      drawCorner(0, 0);
      drawCorner(grid - 7, 0);
      drawCorner(0, grid - 7);

      for (let x = 0; x < grid; x++) {
        for (let y = 0; y < grid; y++) {
          if ((x < 8 && y < 8) || (x >= grid - 8 && y < 8) || (x < 8 && y >= grid - 8)) continue;
          if (Math.sin(x * 12.3 + y * 43.1) > 0.08) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize - 0.4, cellSize - 0.4);
          }
        }
      }

      // Center Gold Monogram Circle
      ctx.fillStyle = '#D4AF65';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4A101B';
      ctx.font = 'bold 10px Cormorant Garamond';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(couple.monogram, size / 2, size / 2);
    }
  }, [submittedPass, couple.monogram]);

  return (
    <section id="rsvp" className="py-20 sm:py-24 px-4 bg-[#23050C] text-[#FFF8EF] relative overflow-hidden">
      
      {/* MOBILE RSVP VIEW (Matches User Mockup Screen 8) */}
      <div className="sm:hidden max-w-sm mx-auto relative z-10 py-6">
        {/* Background Frame from User Asset 8 */}
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-3xl opacity-25 pointer-events-none"
          style={{ backgroundImage: `url('/images/mobile/mobile-rsvp-bg.jpg')` }}
        />

        <div className="relative z-10 text-center">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-script text-4xl text-[#FFF2D6] tracking-wide">
              RSVP
            </h2>
            <p className="text-xs text-[#F3DCA5]/90 font-serif italic mt-1">
              Will you be joining us for our special day?
            </p>
            <div className="w-16 h-px bg-[#D4AF65]/60 mx-auto mt-2" />
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-900/60 border border-rose-400 text-rose-200 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Guest Name */}
            <div className="relative">
              <User className="w-4 h-4 text-[#D4AF65] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-[#3B0C15]/90 border border-[#D4AF65]/60 text-white placeholder-stone-400 text-xs focus:outline-none focus:border-[#D4AF65]"
                required
              />
            </div>

            {/* Number of Guests */}
            <div className="relative">
              <Users className="w-4 h-4 text-[#D4AF65] absolute left-3.5 top-3.5" />
              <input
                type="number"
                min="1"
                max="10"
                placeholder="Number of Guests"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-[#3B0C15]/90 border border-[#D4AF65]/60 text-white placeholder-stone-400 text-xs focus:outline-none focus:border-[#D4AF65]"
                required
              />
            </div>

            {/* Personal Message */}
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-[#D4AF65] absolute left-3.5 top-3.5" />
              <textarea
                rows="3"
                placeholder="Leave a message (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#3B0C15]/90 border border-[#D4AF65]/60 text-white placeholder-stone-400 text-xs focus:outline-none focus:border-[#D4AF65] resize-none"
              />
            </div>

            {/* Radio Choice Buttons */}
            <div className="space-y-2 pt-1 text-xs font-sans">
              <label 
                onClick={() => setFormData({ ...formData, attendance: 'accepted' })}
                className="flex items-center space-x-2.5 cursor-pointer text-stone-200"
              >
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.attendance === 'accepted' ? 'border-[#D4AF65] bg-[#D4AF65]' : 'border-stone-400'}`}>
                  {formData.attendance === 'accepted' && <span className="w-1.5 h-1.5 rounded-full bg-[#3B0C15]" />}
                </span>
                <span>Accept with Pleasure</span>
              </label>

              <label 
                onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                className="flex items-center space-x-2.5 cursor-pointer text-stone-300"
              >
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.attendance === 'declined' ? 'border-[#D4AF65] bg-[#D4AF65]' : 'border-stone-400'}`}>
                  {formData.attendance === 'declined' && <span className="w-1.5 h-1.5 rounded-full bg-[#3B0C15]" />}
                </span>
                <span>Regretfully Decline</span>
              </label>
            </div>

            {/* Send RSVP Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF65] via-[#F3DCA5] to-[#D4AF65] hover:brightness-110 text-[#32151B] font-sans text-xs uppercase tracking-widest font-extrabold shadow-lg transition flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Recording...' : 'Send RSVP'}</span>
                <Send className="w-3.5 h-3.5 fill-[#32151B]" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* DESKTOP RSVP VIEW */}
      <div className="hidden sm:block max-w-3xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-burgundy-700 font-sans font-bold block mb-1">
            Your Presence Is Our Blessing
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-burgundy-900">
            Kindly RSVP
          </h2>
          <p className="font-serif italic text-stone-600 mt-2 text-base sm:text-lg">
            Please honor us with your response by 15 December 2026
          </p>
          <div className="w-16 h-0.5 bg-royalGold mx-auto mt-4"></div>
        </div>

        {/* RSVP Card Frame */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-royalGold/40 shadow-2xl relative overflow-hidden">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Attendance Choice Buttons */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-semibold mb-3 text-center">
                Will you be attending the celebrations? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'accepted' })}
                  className={`p-4 rounded-2xl border text-center transition flex items-center justify-center space-x-2.5 ${
                    formData.attendance === 'accepted'
                      ? 'border-royalGold bg-amber-50 text-burgundy-900 font-bold ring-2 ring-royalGold/30 shadow-md'
                      : 'border-stone-300 bg-white text-stone-600 hover:border-royalGold'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${formData.attendance === 'accepted' ? 'text-royalGold-700' : 'text-stone-400'}`} />
                  <span className="font-display text-lg">Accept with Pleasure</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                  className={`p-4 rounded-2xl border text-center transition flex items-center justify-center space-x-2.5 ${
                    formData.attendance === 'declined'
                      ? 'border-stone-500 bg-stone-100 text-stone-900 font-bold ring-2 ring-stone-300 shadow-md'
                      : 'border-stone-300 bg-white text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <XCircle className={`w-5 h-5 ${formData.attendance === 'declined' ? 'text-stone-800' : 'text-stone-400'}`} />
                  <span className="font-display text-lg">Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Guest Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-semibold mb-1.5">
                  Guest Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-royalGold-700 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-royalGold bg-[#FFF8EF]/50 font-serif text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-semibold mb-1.5">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-royalGold bg-[#FFF8EF]/50 font-serif text-stone-800"
                />
              </div>
            </div>

            {/* Conditional Attending Fields */}
            {formData.attendance === 'accepted' && (
              <div className="space-y-6 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-semibold mb-1.5">
                      Number of Guests Attending
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-royalGold-700 absolute left-3.5 top-3.5" />
                      <select
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-royalGold bg-[#FFF8EF]/50 font-serif text-stone-800"
                      >
                        <option value={1}>1 Guest (Solo)</option>
                        <option value={2}>2 Guests (Couple)</option>
                        <option value={3}>3 Guests (Family)</option>
                        <option value={4}>4 Guests (Family)</option>
                        <option value={5}>5+ Guests (Full Family)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-semibold mb-1.5">
                      Dietary Preferences
                    </label>
                    <select
                      value={formData.dietary}
                      onChange={e => setFormData({ ...formData, dietary: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-royalGold bg-[#FFF8EF]/50 font-serif text-stone-800"
                    >
                      <option value="Pure Vegetarian">Royal Pure Vegetarian Banquet</option>
                      <option value="Jain Vegetarian">Strict Jain Vegetarian (No Onion/Garlic)</option>
                      <option value="Vegan">Vegan & Gluten-Friendly</option>
                      <option value="No Restrictions">Standard Multi-Cuisine Feast</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Personal Message */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-semibold mb-1.5">
                Personal Blessing / Message for Prajwal & Pratiksha
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Share your warm thoughts, blessings, or favorite memories..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-royalGold bg-[#FFF8EF]/50 font-serif text-stone-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-royalGold via-royalGold-400 to-royalGold hover:brightness-110 text-burgundy-900 font-sans text-xs uppercase tracking-[0.25em] font-bold shadow-royal-gold transition-all duration-300 flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Recording RSVP...' : 'Submit RSVP Confirmation'}</span>
                <Send className="w-4 h-4 text-burgundy-900" />
              </button>
              <p className="text-[11px] text-stone-400 mt-2 font-serif italic">
                You will receive your personalized VIP Access Pass immediately
              </p>
            </div>

          </form>
        </div>

      </div>

      {/* VIP PASS CONFIRMATION MODAL */}
      <AnimatePresence>
        {submittedPass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-[#FFF8EF] rounded-3xl overflow-hidden shadow-2xl border-2 border-royalGold p-6 sm:p-8 text-center relative"
            >
              <button
                onClick={() => setSubmittedPass(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-14 h-14 rounded-full border border-royalGold mx-auto flex items-center justify-center font-script text-2xl text-royalGold-800 bg-amber-50 mb-2">
                {couple.monogram}
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-burgundy-800 font-sans font-bold block mb-1">
                Official Royal Wedding Access Pass
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-burgundy-900">
                {submittedPass.name}
              </h3>

              <div className="my-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  submittedPass.attendance === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                }`}>
                  {submittedPass.attendance === 'accepted' ? 'Confirmed Royal Guest' : 'Regrets Received'}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-royalGold/30 my-4 text-xs space-y-1.5 font-serif text-stone-700 text-left shadow-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400 font-sans uppercase text-[10px]">Auspicious Date:</span>
                  <span className="font-bold text-burgundy-900">{date.displayDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-sans uppercase text-[10px]">Venue:</span>
                  <span className="font-bold text-burgundy-900 truncate max-w-[200px]">{location.venueName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-sans uppercase text-[10px]">Seats Reserved:</span>
                  <span className="font-bold text-burgundy-900">
                    {submittedPass.attendance === 'accepted' ? `${submittedPass.guests} Guests` : '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-sans uppercase text-[10px]">Banquet:</span>
                  <span className="font-bold text-burgundy-900">{submittedPass.dietary}</span>
                </div>
              </div>

              {/* Dynamic QR Canvas */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="p-2 bg-white rounded-xl shadow border border-royalGold/30">
                  <canvas ref={qrCanvasRef} width={130} height={130} />
                </div>
                <span className="text-[10px] text-royalGold-800 font-mono mt-1 font-bold">
                  PASS-PRAJWAL-PRATIKSHA-{submittedPass.id.slice(-6)}
                </span>
              </div>

              <div className="flex items-center space-x-3 mt-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-full border border-royalGold/60 hover:bg-royalGold/10 text-xs font-sans uppercase tracking-wider text-burgundy-900 font-semibold transition flex items-center justify-center space-x-1"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pass</span>
                </button>
                <button
                  onClick={() => setSubmittedPass(null)}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-royalGold via-royalGold-400 to-royalGold text-burgundy-900 text-xs font-sans uppercase tracking-wider font-bold shadow-md transition"
                >
                  Done
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

