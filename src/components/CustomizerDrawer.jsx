import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function CustomizerDrawer({ isOpen, onClose, data, onUpdate }) {
  const [formData, setFormData] = useState({
    partner1: data.couple.partner1,
    partner2: data.couple.partner2,
    monogram: data.couple.monogram,
    date: data.date.slice(0, 16),
    venueName: data.venue.name,
    venueAddress: data.venue.address,
    theme: data.theme || 'ivory-embossed'
  });

  const themes = [
    { id: 'ivory-embossed', label: 'Ivory Floral (Pinterest)', color: '#c5a059' },
    { id: 'rose', label: 'Rose Quartz & Blush', color: '#c97d8b' },
    { id: 'emerald', label: 'Royal Emerald & Gold', color: '#1e4d3f' },
    { id: 'midnight', label: 'Midnight Glamour', color: '#0d131f' },
    { id: 'terracotta', label: 'Tuscan Terracotta', color: '#b85d43' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...data,
      couple: {
        ...data.couple,
        partner1: formData.partner1,
        partner2: formData.partner2,
        monogram: formData.monogram || `${formData.partner1.charAt(0)} & ${formData.partner2.charAt(0)}`,
      },
      date: formData.date ? new Date(formData.date).toISOString() : data.date,
      venue: {
        ...data.venue,
        name: formData.venueName,
        address: formData.venueAddress
      },
      theme: formData.theme
    });

    // Update root document data-theme
    if (formData.theme === 'ivory-embossed') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', formData.theme);
    }

    onClose();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 sm:w-96 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-l border-stone-200 overflow-y-auto ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">Live Studio</span>
            <h3 className="font-serif text-xl font-bold text-stone-900">Customize Invitation</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1 font-sans">
              Partner 1 Name
            </label>
            <input
              type="text"
              value={formData.partner1}
              onChange={e => setFormData({ ...formData, partner1: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-gold-500 font-serif"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1 font-sans">
              Partner 2 Name
            </label>
            <input
              type="text"
              value={formData.partner2}
              onChange={e => setFormData({ ...formData, partner2: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-gold-500 font-serif"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1 font-sans">
              Wax Seal Monogram
            </label>
            <input
              type="text"
              value={formData.monogram}
              onChange={e => setFormData({ ...formData, monogram: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-gold-500 font-script text-xl"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1 font-sans">
              Wedding Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1 font-sans">
              Venue Name
            </label>
            <input
              type="text"
              value={formData.venueName}
              onChange={e => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-gold-500 font-serif"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1 font-sans">
              Venue City / Address
            </label>
            <input
              type="text"
              value={formData.venueAddress}
              onChange={e => setFormData({ ...formData, venueAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:border-gold-500"
            />
          </div>

          {/* Theme Palette */}
          <div className="pt-3 border-t border-stone-200">
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-2 font-sans">
              Palette & Aesthetic
            </label>
            <div className="space-y-2">
              {themes.map(t => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setFormData({ ...formData, theme: t.id })}
                  className={`w-full p-2 rounded-lg border flex items-center justify-between text-xs transition ${
                    formData.theme === t.id ? 'border-gold-500 bg-gold-50 font-bold' : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }}></span>
                    <span>{t.label}</span>
                  </div>
                  {formData.theme === t.id && <Sparkles className="w-3.5 h-3.5 text-gold-600" />}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-sans uppercase tracking-widest font-semibold transition shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="pt-4 border-t border-stone-200 text-center">
        <span className="text-[10px] text-stone-400">Settings save automatically to browser storage.</span>
      </div>
    </div>
  );
}

