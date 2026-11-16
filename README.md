# 💍 Danielle & Alexander — Luxury Digital Wedding Invitation (React + Vite)

Inspired by the Pinterest design ([pin.it/7B3Nw0qVq](https://pin.it/7B3Nw0qVq)), this project is a digital wedding invitation featuring a 3D floral embossed envelope with an ivory wax seal monogram, realistic unboxing animations, ambient audio, live RSVP tracking, and a live customizer.

---

## 📸 The Pinterest Aesthetic Recreated

- **3D Embossed Floral Envelope**: Replicates the signature bas-relief peony blooms and lace foliage etched into the ivory cream flaps.
- **Ivory & Gold Monogram Wax Seal**: A realistic ivory wax stamp (`D & A`) in the center with golden calligraphy and realistic depth.
- **Two Viewing Modes**:
  1. 📱 **Phone Frame Mockup View**: Recreates the exact Pinterest pin video showcase (held in hand with phone frame, dynamic island, and mobile browser bar).
  2. 🖥️ **Full Responsive Web View**: Expands into an editorial wedding website.
- **Interactive Wax Seal Crackle**: Tapping the seal plays a realistic crackle chime, triggers a golden stardust burst, folds open the 3D flap, and slides out the invitation card.

---

## 🛠️ Tech Stack

- **React 18** (Modern hooks, state management, modular components)
- **Vite 5** (Fast build tool & HMR)
- **Tailwind CSS 3** (Custom typography, luxury color palettes, drop-shadow relief filters)
- **Lucide React** (Icons)
- **Canvas Confetti** (Celebratory particle physics on RSVP)
- **Web Audio API** (Built-in acoustic harp synthesizer playing Canon in D chords — works 100% offline without broken audio URLs)

---

## 📂 Project Architecture

```
Invitation/
├── src/
│   ├── audio/
│   │   └── romanticSynth.js      # Web Audio romantic harp/piano engine & wax seal sounds
│   ├── components/
│   │   ├── EmbossedEnvelope.jsx  # 3D floral bas-relief envelope & ivory wax seal (Pinterest pin)
│   │   ├── InvitationCard.jsx    # Full wedding invitation, itinerary, RSVP, gallery, & FAQs
│   │   ├── CustomizerDrawer.jsx  # Live editor for couple names, date, venue, & 5 themes
│   │   └── MusicPlayer.jsx       # Floating audio player with animated sound waves
│   ├── data/
│   │   └── weddingData.js        # Default wedding itinerary, story, menu, & guestbook data
│   ├── App.jsx                   # View mode switcher (Phone Frame vs. Full Web)
│   ├── index.css                 # 3D perspective transforms, bas-relief effects, themes
│   └── main.jsx
├── dist/                         # Production-ready build
├── index.html                    # Root HTML template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 How to Run Locally

### Start Development Server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production:
```bash
npm run build
```
The output will be in the `dist/` directory, ready to deploy to Netlify, Vercel, or GitHub Pages.

---

## 🌟 Key Features

1. **Wax Seal & Unboxing Animation**: Click the wax seal to hear the chime and watch the envelope unfold.
2. **Real-Time Countdown**: Live days, hours, minutes, and seconds countdown.
3. **Interactive RSVP with VIP Pass**:
   - Accepts/Declines selector.
   - Entrée preferences: *Prime Filet Mignon*, *Pacific King Salmon*, *Truffle Risotto*, or *Vegan Medley*.
   - Song request for the DJ and heartfelt wishes.
   - Generates a **Personalized Digital VIP Pass** with dynamic QR code & print capability.
4. **Live Guestbook Wall**: Real-time wishes wall with interactive heart reactions.
5. **Organizer Suite**: Review attendee headcount, meal counts, and **export to CSV spreadsheet** for your wedding planner.
6. **Live Customizer Studio**: Edit names, date, venue, and switch between 5 palettes:
   - 🏆 *Ivory Floral (Pinterest)*
   - 🌸 *Rose Quartz & Blush*
   - 🌿 *Royal Emerald & Gold*
   - 🌌 *Midnight Glamour*
   - 🏺 *Tuscan Terracotta*
