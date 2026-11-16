import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, MapPin, Clock, Heart, Music, Sparkles, 
  ChevronDown, Download, CheckCircle, X, Shield, ArrowRight, Share2 
} from 'lucide-react';

export default function InvitationCard({ data, onReopenEnvelope, onUpdateData }) {
  // RSVP State
  const [rsvps, setRsvps] = useState(() => {
    const saved = localStorage.getItem('wedding_rsvps_list_react');
    return saved ? JSON.parse(saved) : data.defaultRSVPs;
  });

  const [rsvpForm, setRsvpForm] = useState({
    attendance: 'attending',
    name: '',
    email: '',
    guestCount: 2,
    meal: 'Prime Filet Mignon',
    dietary: '',
    song: '',
    message: ''
  });

  // VIP Pass Modal
  const [activePass, setActivePass] = useState(null);
  const qrCanvasRef = useRef(null);

  // Gallery
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState(0);

  // Admin Dashboard
  const [showAdmin, setShowAdmin] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = new Date(data.date).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [data.date]);

  // Persist RSVPs
  useEffect(() => {
    localStorage.setItem('wedding_rsvps_list_react', JSON.stringify(rsvps));
  }, [rsvps]);

  // Handle RSVP Submit
  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name || !rsvpForm.email) return;

    const newEntry = {
      id: 'rsvp-' + Date.now(),
      name: rsvpForm.name,
      email: rsvpForm.email,
      status: rsvpForm.attendance,
      guests: rsvpForm.attendance === 'attending' ? Number(rsvpForm.guestCount) : 0,
      meal: rsvpForm.attendance === 'attending' ? rsvpForm.meal : 'N/A',
      dietary: rsvpForm.dietary || 'None',
      song: rsvpForm.song || '',
      message: rsvpForm.message || '',
      timestamp: new Date().toISOString()
    };

    setRsvps([newEntry, ...rsvps]);

    // Confetti
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#caa34d', '#e5cca0', '#ffffff', '#e8d5b5', '#c97d8b']
    });

    setActivePass(newEntry);
    setRsvpForm({
      attendance: 'attending',
      name: '',
      email: '',
      guestCount: 2,
      meal: 'Prime Filet Mignon',
      dietary: '',
      song: '',
      message: ''
    });
  };

  // Render QR Code onto Canvas for VIP Pass
  useEffect(() => {
    if (activePass && qrCanvasRef.current) {
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const size = canvas.width;
      ctx.clearRect(0, 0, size, size);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      const grid = 21;
      const cellSize = size / grid;

      // Stylized QR pattern
      ctx.fillStyle = '#26221f';
      const drawCorner = (r, c) => {
        ctx.fillRect(r * cellSize, c * cellSize, 7 * cellSize, 7 * cellSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect((r + 1) * cellSize, (c + 1) * cellSize, 5 * cellSize, 5 * cellSize);
        ctx.fillStyle = '#26221f';
        ctx.fillRect((r + 2) * cellSize, (c + 2) * cellSize, 3 * cellSize, 3 * cellSize);
      };

      drawCorner(0, 0);
      drawCorner(grid - 7, 0);
      drawCorner(0, grid - 7);

      for (let x = 0; x < grid; x++) {
        for (let y = 0; y < grid; y++) {
          if ((x < 8 && y < 8) || (x >= grid - 8 && y < 8) || (x < 8 && y >= grid - 8)) continue;
          if (Math.sin(x * 14.3 + y * 49.1) > 0.05) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize - 0.4, cellSize - 0.4);
          }
        }
      }

      // Center Gold Monogram Circle
      ctx.fillStyle = '#caa34d';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Cormorant Garamond';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.couple.monogram, size / 2, size / 2);
    }
  }, [activePass, data.couple.monogram]);

  // Calendar Helpers
  const addToGoogleCalendar = () => {
    const start = new Date(data.date);
    const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
    const fmt = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const title = encodeURIComponent(`The Wedding of ${data.couple.partner1} & ${data.couple.partner2}`);
    const details = encodeURIComponent('We invite you to celebrate our holy vows, dinner gala, and dancing!');
    const location = encodeURIComponent(`${data.venue.name}, ${data.venue.address}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${location}`, '_blank');
  };

  const downloadICS = () => {
    const start = new Date(data.date);
    const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
    const fmt = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:The Wedding of ${data.couple.partner1} & ${data.couple.partner2}`,
      'DESCRIPTION:Join us in celebrating our wedding day!',
      `LOCATION:${data.venue.name}, ${data.venue.address}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${data.couple.partner1}_${data.couple.partner2}_Wedding.ics`;
    link.click();
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Status', 'Seats', 'Meal Choice', 'Dietary', 'Song Request', 'Message', 'Date'];
    const rows = rsvps.map(r => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.status}"`,
      r.guests,
      `"${r.meal}"`,
      `"${r.dietary}"`,
      `"${r.song.replace(/"/g, '""')}"`,
      `"${r.message.replace(/"/g, '""')}"`,
      `"${r.timestamp}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encoded = encodeURI(csv);
    const link = document.createElement('a');
    link.href = encoded;
    link.download = `Wedding_Guest_List_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const filteredGallery = galleryFilter === 'all' 
    ? data.gallery 
    : data.gallery.filter(g => g.category === galleryFilter);

  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9] text-stone-800 animate-fadeIn">
      
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/60 transition-all">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-full border border-gold-400 bg-gold-50 flex items-center justify-center font-script text-xl text-gold-700">
              {data.couple.monogram}
            </span>
            <span className="font-serif tracking-widest text-xs uppercase font-semibold text-stone-900 hidden sm:inline-block">
              {data.couple.partner1} & {data.couple.partner2}
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-widest font-medium text-stone-600">
            <a href="#hero" className="hover:text-gold-600 transition">Invitation</a>
            <a href="#story" className="hover:text-gold-600 transition">Our Story</a>
            <a href="#schedule" className="hover:text-gold-600 transition">Schedule</a>
            <a href="#venue" className="hover:text-gold-600 transition">Venue</a>
            <a href="#gallery" className="hover:text-gold-600 transition">Gallery</a>
            <a href="#wishes" className="hover:text-gold-600 transition">Guestbook</a>
            <a href="#faq" className="hover:text-gold-600 transition">Q&A</a>
          </nav>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={onReopenEnvelope}
              className="px-3 py-1.5 rounded-full border border-stone-300 hover:border-gold-500 text-stone-600 hover:text-gold-700 text-[11px] font-sans uppercase tracking-wider transition flex items-center space-x-1"
              title="Return to the 3D Envelope Wax Seal"
            >
              <span>Envelope</span>
            </button>
            <a
              href="#rsvp"
              className="px-4 py-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-sans uppercase tracking-wider font-semibold shadow hover:opacity-95 transition"
            >
              RSVP
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="pt-10 pb-20 px-4 text-center max-w-4xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 shadow-2xl relative border-stone-200/80">
          
          <div className="w-16 h-16 rounded-full border border-gold-400/80 mx-auto flex items-center justify-center mb-4 bg-gradient-to-br from-amber-50 to-white shadow-sm">
            <span className="font-script text-3xl text-gold-600">{data.couple.monogram}</span>
          </div>

          <span className="text-[11px] uppercase tracking-[0.35em] text-stone-500 font-sans font-medium block mb-2">
            Together With Their Families
          </span>

          <div className="my-6">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-none">
              {data.couple.partner1}
            </h1>
            <div className="my-3 flex items-center justify-center space-x-4">
              <div className="w-12 h-px bg-gold-400"></div>
              <span className="font-script text-3xl sm:text-4xl text-gold-600 font-normal">&</span>
              <div className="w-12 h-px bg-gold-400"></div>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-none">
              {data.couple.partner2}
            </h1>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 max-w-lg mx-auto my-6 leading-relaxed">
            {data.couple.tagline}
          </p>

          <div className="my-8 py-5 border-y border-stone-200/80 max-w-md mx-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
              Save The Date
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              {formattedDate}
            </h3>
            <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">
              At Four O'Clock in the Afternoon
            </p>
            <p className="font-serif text-sm text-stone-700 mt-2 font-medium">
              {data.venue.name}
            </p>
            <p className="text-xs text-stone-500">
              {data.venue.address}
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="my-8 max-w-md mx-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block mb-3">
              Counting Down To The Moment
            </span>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/80 border border-stone-200/90 rounded-xl p-3 shadow-sm text-center">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 block leading-tight">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <a
              href="#rsvp"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--primary)] hover:opacity-95 text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold transition shadow-md"
            >
              Respond (RSVP)
            </a>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={addToGoogleCalendar}
                className="flex-1 sm:flex-none px-4 py-3.5 rounded-full border border-stone-300 hover:border-gold-500 bg-white text-stone-700 text-xs font-sans uppercase tracking-wider transition flex items-center justify-center space-x-1.5"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Google Cal</span>
              </button>
              <button
                onClick={downloadICS}
                className="flex-1 sm:flex-none px-4 py-3.5 rounded-full border border-stone-300 hover:border-gold-500 bg-white text-stone-700 text-xs font-sans uppercase tracking-wider transition flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-stone-600" />
                <span>iCal / Apple</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* OUR LOVE STORY */}
      <section id="story" className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
            The Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Our Love Story
          </h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.story.map((item) => (
            <div key={item.id} className="glass-panel rounded-2xl p-5 flex flex-col group hover:shadow-xl transition duration-300">
              <div className="w-full h-52 rounded-xl overflow-hidden mb-4 relative shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.period}
                </span>
              </div>
              <span className="font-script text-2xl text-gold-600 leading-tight">
                {item.subtitle}
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                {item.title}
              </h3>
              <p className="font-serif italic text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE OF EVENTS */}
      <section id="schedule" className="py-20 bg-stone-50/70 border-y border-stone-200/60 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
              Celebration Itinerary
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
              Wedding Events
            </h2>
            <div className="w-16 h-px bg-gold-400 mx-auto mt-4"></div>
          </div>

          <div className="space-y-6">
            {data.schedule.map((ev) => (
              <div 
                key={ev.id} 
                className={`glass-panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl transition ${
                  ev.isMain ? 'border-2 border-gold-400/80 bg-white' : ''
                }`}
              >
                <div className="flex items-start space-x-5">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-serif flex-shrink-0 shadow-sm ${
                    ev.isMain ? 'bg-gold-500 text-white' : 'bg-amber-100/70 text-amber-800'
                  }`}>
                    <span className="text-xs uppercase font-sans font-bold">{ev.day.slice(0, 3)}</span>
                    <span className="text-xl font-bold leading-none">{ev.dateNum}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-xs text-stone-500 font-sans flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-gold-600" /> {ev.time}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold-50 text-gold-800 border border-gold-200">
                        {ev.dressCode}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      {ev.title}
                    </h3>
                    <p className="font-serif italic text-sm text-stone-600 mt-1">
                      {ev.subtitle}
                    </p>
                    <div className="mt-2 text-xs text-stone-500 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-gold-600" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={data.venue.mapUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-stone-300 hover:border-gold-500 text-xs font-sans uppercase tracking-wider text-stone-700 hover:text-gold-700 transition flex items-center space-x-1.5 self-end md:self-center"
                >
                  <span>Map Directions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE & TRAVEL */}
      <section id="venue" className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
            Destination & Accommodations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Venue & Travel Guide
          </h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 h-80 sm:h-96 relative group">
            <img 
              src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80" 
              alt="Venue Estate" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-300 font-sans">The Wedding Estate</span>
                <h3 className="font-serif text-2xl font-bold">{data.venue.name}</h3>
                <p className="text-xs text-white/80">{data.venue.address}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel rounded-2xl p-6">
              <h4 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Hotel Room Blocks & Discounts
              </h4>
              <p className="font-serif italic text-sm text-stone-600 leading-relaxed">
                Preferred rates available at <strong>{data.venue.hotelBlock}</strong> with code <span className="font-mono font-bold text-gold-700 font-sans">{data.venue.code}</span>. Please reserve before August 15.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <h4 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Airport & Shuttle Service
              </h4>
              <p className="font-serif italic text-sm text-stone-600 leading-relaxed">
                Fly into San Francisco (SFO) or Oakland (OAK). Continuous luxury shuttle vans operate between partner hotels and the villa from 2:30 PM until 1:30 AM.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <h4 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Valet Parking
              </h4>
              <p className="font-serif italic text-sm text-stone-600 leading-relaxed">
                Complimentary white-glove valet service will be positioned at the main estate gate upon arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section id="gallery" className="py-20 bg-stone-50/70 border-y border-stone-200/60 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
              Visual Memories
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
              Photo Moments
            </h2>
            <div className="w-16 h-px bg-gold-400 mx-auto mt-4 mb-6"></div>

            <div className="flex items-center justify-center space-x-2 flex-wrap gap-y-2">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'proposal', label: 'The Proposal' },
                { id: 'travels', label: 'Travels' },
                { id: 'portraits', label: 'Portraits' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition ${
                    galleryFilter === tab.id 
                      ? 'bg-[var(--primary)] text-white shadow' 
                      : 'bg-white border border-stone-300 text-stone-700 hover:border-gold-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map(img => (
              <div 
                key={img.id}
                onClick={() => setLightboxImg(img.url)}
                className="cursor-pointer overflow-hidden rounded-2xl shadow-md group relative h-72"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-sans uppercase tracking-widest font-semibold border border-white/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    View Photo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP FORM */}
      <section id="rsvp" className="py-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
            Kindly Respond
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            R.S.V.P.
          </h2>
          <p className="font-serif italic text-stone-600 mt-2">
            Please let us know if you will celebrate with us by August 15, 2026.
          </p>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-4"></div>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl">
          <form onSubmit={handleRSVPSubmit} className="space-y-6">
            
            {/* Attendance Choice */}
            <div className="pb-6 border-b border-stone-200">
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-semibold mb-3 text-center">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRsvpForm({ ...rsvpForm, attendance: 'attending' })}
                  className={`p-4 rounded-xl border text-center transition flex items-center justify-center space-x-2 ${
                    rsvpForm.attendance === 'attending'
                      ? 'border-gold-500 bg-gold-50 text-gold-800 font-bold'
                      : 'border-stone-300 bg-white text-stone-700'
                  }`}
                >
                  <CheckCircle className={`w-5 h-5 ${rsvpForm.attendance === 'attending' ? 'text-gold-600' : 'text-stone-400'}`} />
                  <span className="font-serif text-lg">Joyfully Accepts</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpForm({ ...rsvpForm, attendance: 'declined' })}
                  className={`p-4 rounded-xl border text-center transition flex items-center justify-center space-x-2 ${
                    rsvpForm.attendance === 'declined'
                      ? 'border-stone-500 bg-stone-100 text-stone-800 font-bold'
                      : 'border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <X className={`w-5 h-5 ${rsvpForm.attendance === 'declined' ? 'text-stone-700' : 'text-stone-400'}`} />
                  <span className="font-serif text-lg">Regretfully Declines</span>
                </button>
              </div>
            </div>

            {/* Names & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-medium mb-1.5">
                  Full Name(s) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord & Lady Ashton"
                  value={rsvpForm.name}
                  onChange={e => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 bg-white font-serif"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-medium mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={rsvpForm.email}
                  onChange={e => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 bg-white font-serif"
                />
              </div>
            </div>

            {/* Attending Details */}
            {rsvpForm.attendance === 'attending' && (
              <div className="space-y-6 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-medium mb-1.5">
                      Party Size
                    </label>
                    <select
                      value={rsvpForm.guestCount}
                      onChange={e => setRsvpForm({ ...rsvpForm, guestCount: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 bg-white font-serif"
                    >
                      <option value={1}>1 Guest (Solo)</option>
                      <option value={2}>2 Guests (You & Plus One)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-medium mb-1.5">
                      Entrée Selection
                    </label>
                    <select
                      value={rsvpForm.meal}
                      onChange={e => setRsvpForm({ ...rsvpForm, meal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 bg-white font-serif"
                    >
                      <option value="Prime Filet Mignon">Prime Filet Mignon with Truffle Glaze</option>
                      <option value="Pacific King Salmon">Pacific King Salmon with Herb Crust</option>
                      <option value="Gourmet Truffle Risotto (V)">Gourmet Truffle & Wild Mushroom Risotto (V)</option>
                      <option value="Artisanal Vegan Medley">Artisanal Vegan Roasted Harvest Medley</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-medium mb-1.5">
                      Dietary Allergies / Restrictions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gluten-free, nut allergy, none"
                      value={rsvpForm.dietary}
                      onChange={e => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 bg-white font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-medium mb-1.5">
                      Song Request For DJ
                    </label>
                    <input
                      type="text"
                      placeholder="Song title & artist that gets you dancing"
                      value={rsvpForm.song}
                      onChange={e => setRsvpForm({ ...rsvpForm, song: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 bg-white font-serif"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Heartfelt Wish */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-sans font-medium mb-1.5">
                Heartfelt Blessing / Message For Danielle & Alexander
              </label>
              <textarea
                rows={3}
                placeholder="Share your warm thoughts or blessings..."
                value={rsvpForm.message}
                onChange={e => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 bg-white font-serif"
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-10 py-4 rounded-full bg-[var(--primary)] hover:opacity-95 text-white font-sans text-xs uppercase tracking-[0.25em] font-bold transition shadow-lg flex items-center justify-center space-x-2 mx-auto"
              >
                <span>Submit RSVP Confirmation</span>
                <Sparkles className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-stone-400 mt-2">
                Generates a personalized VIP Access Pass with QR code
              </p>
            </div>

          </form>
        </div>
      </section>

      {/* WISHES & GUESTBOOK */}
      <section id="wishes" className="py-20 bg-stone-50/70 border-y border-stone-200/60 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
              Words of Love
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
              Virtual Guestbook
            </h2>
            <div className="w-16 h-px bg-gold-400 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rsvps.filter(r => r.message && r.message.trim().length > 0).map((item) => (
              <div key={item.id} className="glass-panel rounded-2xl p-6 flex flex-col justify-between group hover:border-gold-500 transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-800 font-serif font-bold text-sm flex items-center justify-center">
                        {item.name.charAt(0)}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-stone-900">{item.name}</h4>
                        <span className="text-[10px] text-stone-400">
                          {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <span className="text-rose-400 flex items-center space-x-1 text-xs">
                      <Heart className="w-3.5 h-3.5 fill-rose-400" />
                    </span>
                  </div>
                  <p className="font-serif italic text-sm text-stone-700 leading-relaxed">
                    "{item.message}"
                  </p>
                </div>
                {item.song && (
                  <div className="pt-3 border-t border-stone-200/60 mt-4 flex items-center text-[11px] text-stone-500 space-x-1">
                    <Music className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span className="truncate">Requested: {item.song}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faq" className="py-20 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
            Questions & Answers
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-4"></div>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, idx) => (
            <div key={idx} className="glass-panel rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-serif text-lg font-bold text-stone-900"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold-600 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-stone-600 font-serif italic text-sm leading-relaxed border-t border-stone-200/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WISHING WELL / REGISTRY */}
      <section className="py-16 bg-stone-50/70 border-t border-stone-200/60 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 mx-auto mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-stone-900 mb-2">
            Wishing Well & Registry
          </h3>
          <p className="font-serif italic text-stone-600 mb-6 text-sm leading-relaxed">
            Your presence at our celebration is the greatest gift of all. If you wish to honor us with a gift, a wishing well box will be stationed at the ballroom for contributions toward our dream Amalfi Coast honeymoon.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-4 border-t border-stone-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="font-serif text-2xl text-gold-300 font-bold">
              {data.couple.partner1} & {data.couple.partner2}
            </h4>
            <p className="text-xs text-stone-400 mt-1">With gratitude and love for sharing our milestone.</p>
          </div>

          <div className="flex items-center space-x-6 text-xs uppercase tracking-widest text-stone-400">
            <a href="#hero" className="hover:text-gold-300 transition">Back to Top</a>
            <button
              onClick={() => setShowAdmin(true)}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Organizer Suite</span>
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-stone-800/80 text-center text-[11px] text-stone-500">
          Handcrafted with eternal love • Created for {data.couple.partner1} & {data.couple.partner2}
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <button className="absolute top-6 right-6 text-white/80 hover:text-white">
            <X className="w-8 h-8" />
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" />
        </div>
      )}

      {/* VIP PASS CONFIRMATION MODAL */}
      {activePass && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-400 relative p-6 sm:p-8 text-center animate-fadeIn">
            <button 
              onClick={() => setActivePass(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-12 h-12 rounded-full border border-gold-400 mx-auto flex items-center justify-center font-script text-xl text-gold-600 mb-2">
              {data.couple.monogram}
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-700 font-sans font-semibold">
              Official Wedding VIP Pass
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              {activePass.name}
            </h3>

            <div className="my-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                activePass.status === 'attending' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
              }`}>
                {activePass.status === 'attending' ? 'Confirmed Guest' : 'Regrets Received'}
              </span>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 my-4 text-xs space-y-1.5 font-serif text-stone-700 text-left">
              <div className="flex justify-between">
                <span className="text-stone-400 font-sans uppercase text-[10px]">Date:</span>
                <span className="font-bold">{new Date(data.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400 font-sans uppercase text-[10px]">Party Size:</span>
                <span className="font-bold">{activePass.status === 'attending' ? `${activePass.guests} Seats` : '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400 font-sans uppercase text-[10px]">Entrée:</span>
                <span className="font-bold">{activePass.meal}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center my-4">
              <div className="p-2 bg-white rounded-xl shadow border border-stone-200">
                <canvas ref={qrCanvasRef} width={130} height={130} />
              </div>
              <span className="text-[10px] text-stone-400 font-mono mt-1">WED-PASS-{activePass.id.slice(-6)}</span>
            </div>

            <div className="flex items-center space-x-3 mt-4">
              <button 
                onClick={() => window.print()} 
                className="flex-1 py-3 rounded-full border border-stone-300 hover:border-gold-500 text-xs font-sans uppercase tracking-wider text-stone-700 font-semibold"
              >
                Print Pass
              </button>
              <button 
                onClick={() => setActivePass(null)} 
                className="flex-1 py-3 rounded-full bg-[var(--primary)] text-white text-xs font-sans uppercase tracking-wider font-semibold shadow"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORGANIZER ADMIN MODAL */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">Bride & Groom Organizer Suite</span>
                <h3 className="font-serif text-2xl font-bold">Guest List & RSVP Tracker</h3>
              </div>
              <button onClick={() => setShowAdmin(false)} className="text-stone-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6 bg-stone-50 border-b border-stone-200 text-center">
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-500 uppercase tracking-wider block font-sans">Total Responses</span>
                <span className="font-serif text-2xl font-bold text-stone-900">{rsvps.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-200">
                <span className="text-xs text-emerald-600 uppercase tracking-wider block font-sans">Attending Seats</span>
                <span className="font-serif text-2xl font-bold text-emerald-700">
                  {rsvps.filter(r => r.status === 'attending').reduce((sum, r) => sum + r.guests, 0)}
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-400 uppercase tracking-wider block font-sans">Declined</span>
                <span className="font-serif text-2xl font-bold text-stone-600">
                  {rsvps.filter(r => r.status === 'declined').length}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <table className="w-full text-left text-sm text-stone-700">
                <thead className="bg-stone-100 text-xs uppercase font-sans text-stone-500 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Status / Seats</th>
                    <th className="py-3 px-4">Entrée</th>
                    <th className="py-3 px-4">Song Request</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map(r => (
                    <tr key={r.id} className="border-b border-stone-100 hover:bg-stone-50/70">
                      <td className="py-3 px-4 font-medium text-stone-900">{r.name}</td>
                      <td className="py-3 px-4 text-xs text-stone-500">{r.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          r.status === 'attending' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {r.status === 'attending' ? `${r.guests} Attending` : 'Declined'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs">{r.meal}</td>
                      <td className="py-3 px-4 text-xs text-stone-500 italic max-w-xs truncate">{r.song || '—'}</td>
                      <td className="py-3 px-4 text-xs text-stone-400">{new Date(r.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={exportCSV}
                className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-sans uppercase tracking-wider font-semibold transition flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV Spreadsheet</span>
              </button>
              <span className="text-xs text-stone-400 font-sans">Synced in browser memory</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

