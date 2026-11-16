/**
 * Wedding Invitation Card Interactive Engine
 * Pure Vanilla JavaScript - No heavy external runtime needed
 */

// Wedding Default State & Settings
const WeddingState = {
  couple: {
    partner1: "Elena",
    partner2: "Alexander",
    monogram: "E & A",
    tagline: "We invite you to celebrate our union of love"
  },
  date: "2026-11-28T16:00:00",
  venue: {
    name: "The Grand Belmond Villa & Gardens",
    address: "742 Evergreen Botanical Way, Napa Valley, California",
    mapUrl: "https://maps.google.com/?q=Napa+Valley+California"
  },
  theme: "gold",
  audioPlaying: false
};

// Initialize State from LocalStorage if available
function loadSavedSettings() {
  const saved = localStorage.getItem("wedding_invitation_settings");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(WeddingState, parsed);
    } catch (e) {
      console.warn("Failed to load saved settings", e);
    }
  }
}

function saveCurrentSettings() {
  localStorage.setItem("wedding_invitation_settings", JSON.stringify(WeddingState));
}

// Sound Synthesizer via Web Audio API (Offline Romantic Ambient Piano Harp)
class RomanticAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.step = 0;
    
    // Romantic Arpeggio in D Major (Canon in D / Romantic cadence)
    // Frequencies in Hz: D4, F#4, A4, D5, A4, F#4, etc.
    this.chords = [
      [293.66, 369.99, 440.00, 587.33], // D Maj
      [220.00, 277.18, 329.63, 440.00], // A Maj
      [246.94, 293.66, 369.99, 493.88], // B min
      [185.00, 220.00, 277.18, 369.99], // F# min
      [196.00, 246.94, 293.66, 392.00], // G Maj
      [146.83, 220.00, 293.66, 369.99], // D Maj
      [196.00, 246.94, 293.66, 392.00], // G Maj
      [220.00, 277.18, 329.63, 440.00]  // A Maj
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, time, duration = 1.6, gainLevel = 0.08) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm, gentle acoustic timbre
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(350, time + duration);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(gainLevel, time + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  playSealBreakSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Crisp wax crackle & sparkle tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.4); // C6
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);

    // Complementary chime
    setTimeout(() => {
      if (this.ctx) {
        this.playNote(659.25, this.ctx.currentTime, 1.2, 0.08); // E5
        this.playNote(783.99, this.ctx.currentTime + 0.15, 1.4, 0.07); // G5
      }
    }, 150);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    let chordIdx = 0;
    let arpeggioNoteIdx = 0;

    const playSequence = () => {
      if (!this.isPlaying) return;
      const currentChord = this.chords[chordIdx];
      const freq = currentChord[arpeggioNoteIdx];
      const now = this.ctx.currentTime;

      // Gentle acoustic harp note
      this.playNote(freq, now, 2.2, 0.07);

      arpeggioNoteIdx++;
      if (arpeggioNoteIdx >= currentChord.length) {
        arpeggioNoteIdx = 0;
        chordIdx = (chordIdx + 1) % this.chords.length;
      }

      this.timer = setTimeout(playSequence, 580);
    };

    playSequence();
    updateMusicButtonState(true);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    updateMusicButtonState(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }
}

const synthAudio = new RomanticAudioSynthesizer();

function updateMusicButtonState(playing) {
  const btn = document.getElementById("music-toggle-btn");
  const icon = document.getElementById("music-icon");
  const text = document.getElementById("music-label");
  if (!btn) return;

  if (playing) {
    btn.classList.add("playing");
    if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M9 9H5a1 1 0 00-1 1v4a1 1 0 001 1h4l5 5V5L9 9z" />`;
    if (text) text.textContent = "Music Playing";
  } else {
    btn.classList.remove("playing");
    if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />`;
    if (text) text.textContent = "Muted";
  }
}

// Envelope Wax Seal Interaction
function setupEnvelope() {
  const envelopeScreen = document.getElementById("envelope-screen");
  const envelope = document.getElementById("interactive-envelope");
  const openSeal = document.getElementById("wax-seal-btn");
  const openBtn = document.getElementById("open-invitation-btn");
  const reopenBtn = document.getElementById("reopen-envelope-btn");

  function openEnvelope() {
    if (!envelope || envelope.classList.contains("animating")) return;
    synthAudio.playSealBreakSound();
    envelope.classList.add("animating");

    // Start background music automatically when guest opens their letter
    setTimeout(() => {
      synthAudio.start();
    }, 700);

    setTimeout(() => {
      if (envelopeScreen) {
        envelopeScreen.classList.add("opened");
      }
      triggerPetalBurst();
    }, 1200);
  }

  if (openSeal) openSeal.addEventListener("click", openEnvelope);
  if (openBtn) openBtn.addEventListener("click", openEnvelope);
  if (envelope) envelope.addEventListener("click", openEnvelope);

  if (reopenBtn) {
    reopenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (envelopeScreen && envelope) {
        envelope.classList.remove("animating");
        envelopeScreen.classList.remove("opened");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
}

// Live Countdown Timer
function setupCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");
  const dateDisplay = document.getElementById("wedding-date-formatted");

  function update() {
    const weddingDate = new Date(WeddingState.date).getTime();
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (dateDisplay) {
      const d = new Date(WeddingState.date);
      dateDisplay.textContent = d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// RSVP Storage & Submissions
const DEFAULT_RSVPS = [
  {
    id: "rsvp-1",
    name: "Lord Sterling & Lady Beatrice",
    email: "sterling@estate.co.uk",
    status: "attending",
    guests: 2,
    meal: "Prime Filet Mignon",
    dietary: "No shellfish",
    song: "Can't Help Falling in Love - Elvis Presley",
    message: "Dearest Elena & Alexander, our hearts overflow with joy for you both! Looking forward to celebrating this royal affair.",
    timestamp: "2026-11-10T14:32:00"
  },
  {
    id: "rsvp-2",
    name: "Dr. Clara Dupont",
    email: "clara.dupont@sorbonne.fr",
    status: "attending",
    guests: 1,
    meal: "Gourmet Truffle Risotto (V)",
    dietary: "Vegetarian",
    song: "La Vie En Rose - Édith Piaf",
    message: "Wishing you a lifetime of laughter, grand adventures, and everlasting devotion!",
    timestamp: "2026-11-12T09:15:00"
  },
  {
    id: "rsvp-3",
    name: "Julian & Marcus Vance",
    email: "vance.arch@studio.com",
    status: "attending",
    guests: 2,
    meal: "Herb-Crusted Salmon",
    dietary: "None",
    song: "At Last - Etta James",
    message: "Can't wait to dance the night away in Napa! Raising our glasses to your beautiful chapter.",
    timestamp: "2026-11-14T18:40:00"
  }
];

function getStoredRSVPs() {
  const data = localStorage.getItem("wedding_rsvps_list");
  if (!data) {
    localStorage.setItem("wedding_rsvps_list", JSON.stringify(DEFAULT_RSVPS));
    return DEFAULT_RSVPS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_RSVPS;
  }
}

function saveRSVP(rsvp) {
  const current = getStoredRSVPs();
  current.unshift(rsvp);
  localStorage.setItem("wedding_rsvps_list", JSON.stringify(current));
  renderGuestbook();
  renderAdminStats();
}

// RSVP Form Setup
function setupRSVP() {
  const form = document.getElementById("wedding-rsvp-form");
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  const attendingDetails = document.getElementById("attending-details-section");

  attendanceRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (attendingDetails) {
        if (e.target.value === "attending") {
          attendingDetails.classList.remove("hidden");
        } else {
          attendingDetails.classList.add("hidden");
        }
      }
    });
  });

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const status = formData.get("attendance") || "attending";
    const guests = parseInt(formData.get("guestCount") || "1", 10);
    const meal = formData.get("mealPreference") || "Herb-Crusted Salmon";
    const dietary = formData.get("dietary")?.trim() || "None";
    const song = formData.get("songRequest")?.trim() || "";
    const message = formData.get("message")?.trim() || "";

    if (!name || !email) {
      alert("Please fill in your name and email.");
      return;
    }

    const newRsvp = {
      id: "rsvp-" + Date.now(),
      name,
      email,
      status,
      guests: status === "attending" ? guests : 0,
      meal: status === "attending" ? meal : "N/A",
      dietary,
      song,
      message,
      timestamp: new Date().toISOString()
    };

    saveRSVP(newRsvp);
    triggerPetalBurst();
    form.reset();

    // Show Confirmation Pass Modal
    showVIPPassModal(newRsvp);
  });
}

// VIP Pass Modal with Canvas QR Code
function showVIPPassModal(rsvp) {
  const modal = document.getElementById("vip-pass-modal");
  if (!modal) return;

  const guestNameEl = document.getElementById("pass-guest-name");
  const guestStatusEl = document.getElementById("pass-guest-status");
  const guestCountEl = document.getElementById("pass-guest-count");
  const guestMealEl = document.getElementById("pass-guest-meal");
  const passCodeEl = document.getElementById("pass-unique-code");

  if (guestNameEl) guestNameEl.textContent = rsvp.name;
  if (guestStatusEl) {
    guestStatusEl.textContent = rsvp.status === "attending" ? "Confirmed Guest" : "Regrets Received";
    guestStatusEl.className = rsvp.status === "attending" 
      ? "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800"
      : "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800";
  }
  if (guestCountEl) guestCountEl.textContent = rsvp.status === "attending" ? `${rsvp.guests} Seat(s) Reserved` : "Sending Love From Afar";
  if (guestMealEl) guestMealEl.textContent = rsvp.status === "attending" ? `Entrée: ${rsvp.meal}` : "Best Wishes";
  
  const uniqueCode = "WED-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  if (passCodeEl) passCodeEl.textContent = uniqueCode;

  // Render QR Code onto Canvas
  drawQRCodeCanvas(rsvp.name + " | " + uniqueCode + " | " + WeddingState.couple.monogram);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeVIPPassModal() {
  const modal = document.getElementById("vip-pass-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Stylized Decorative Canvas QR Code
function drawQRCodeCanvas(text) {
  const canvas = document.getElementById("pass-qr-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Grid simulation with gold luxury aesthetics
  const grid = 21;
  const cellSize = size / grid;

  // Simple deterministic hash to draw recognizable QR-like pattern
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  ctx.fillStyle = "#2d2926";

  // Corner Position Marks
  const drawCorner = (r, c) => {
    ctx.fillRect(r * cellSize, c * cellSize, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect((r + 1) * cellSize, (c + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = "#2d2926";
    ctx.fillRect((r + 2) * cellSize, (c + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  };

  drawCorner(0, 0);
  drawCorner(grid - 7, 0);
  drawCorner(0, grid - 7);

  // Data modules
  for (let x = 0; x < grid; x++) {
    for (let y = 0; y < grid; y++) {
      if ((x < 8 && y < 8) || (x >= grid - 8 && y < 8) || (x < 8 && y >= grid - 8)) {
        continue;
      }
      const val = (Math.sin(x * 12.9898 + y * 78.233 + hash) * 43758.5453) % 1;
      if (Math.abs(val) > 0.48) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 0.5, cellSize - 0.5);
      }
    }
  }

  // Gold center badge
  const centerSize = 34;
  const centerOffset = (size - centerSize) / 2;
  ctx.fillStyle = "#c5a059";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, centerSize / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px Cormorant Garamond";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("E & A", size / 2, size / 2);
}

// Render Live Guestbook Wishes Wall
function renderGuestbook() {
  const container = document.getElementById("wishes-wall-container");
  if (!container) return;

  const rsvps = getStoredRSVPs();
  const wishes = rsvps.filter(r => r.message && r.message.trim().length > 0);

  if (wishes.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-stone-400 italic py-8">Be the first to leave your blessing for the happy couple.</p>`;
    return;
  }

  container.innerHTML = wishes.map((item, idx) => `
    <div class="glass-card p-6 flex flex-col justify-between relative group hover:border-[var(--primary)] transition duration-300">
      <div class="mb-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <span class="w-8 h-8 rounded-full bg-[var(--primary-light)] text-[var(--primary-dark)] font-serif font-bold text-sm flex items-center justify-center">
              ${escapeHtml(item.name.charAt(0))}
            </span>
            <div>
              <h4 class="font-serif font-bold text-base text-[var(--text-main)]">${escapeHtml(item.name)}</h4>
              <p class="text-xs text-stone-500">${formatDateAgo(item.timestamp)}</p>
            </div>
          </div>
          <button onclick="toggleWishHeart(this)" class="text-rose-400 hover:text-rose-600 transition flex items-center space-x-1 text-xs">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span class="like-count">1</span>
          </button>
        </div>
        <p class="font-serif italic text-base text-stone-700 leading-relaxed">
          "${escapeHtml(item.message)}"
        </p>
      </div>
      ${item.song ? `
        <div class="pt-3 border-t border-stone-200/60 flex items-center text-xs text-stone-500 space-x-1.5">
          <svg class="w-3.5 h-3.5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
          <span class="truncate">Requested: ${escapeHtml(item.song)}</span>
        </div>
      ` : ''}
    </div>
  `).join("");
}

function toggleWishHeart(btn) {
  const countSpan = btn.querySelector(".like-count");
  if (!countSpan) return;
  let count = parseInt(countSpan.textContent || "0", 10);
  if (btn.classList.contains("liked")) {
    btn.classList.remove("liked");
    countSpan.textContent = Math.max(0, count - 1);
  } else {
    btn.classList.add("liked");
    countSpan.textContent = count + 1;
    triggerPetalBurst(20);
  }
}

// RSVP Admin Dashboard
function renderAdminStats() {
  const list = getStoredRSVPs();
  const total = list.length;
  const attending = list.filter(r => r.status === "attending");
  const totalGuests = attending.reduce((sum, r) => sum + (r.guests || 1), 0);
  const declined = list.filter(r => r.status === "declined").length;

  const countTotalEl = document.getElementById("admin-total-rsvps");
  const countAttendingEl = document.getElementById("admin-total-attending");
  const countDeclinedEl = document.getElementById("admin-total-declined");
  const tableBody = document.getElementById("admin-rsvps-table-body");

  if (countTotalEl) countTotalEl.textContent = total;
  if (countAttendingEl) countAttendingEl.textContent = `${attending.length} (${totalGuests} seats)`;
  if (countDeclinedEl) countDeclinedEl.textContent = declined;

  if (tableBody) {
    if (list.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-stone-400">No RSVPs yet.</td></tr>`;
      return;
    }

    tableBody.innerHTML = list.map(item => `
      <tr class="border-b border-stone-100 hover:bg-stone-50/70 transition">
        <td class="py-3 px-4 font-medium text-stone-900">${escapeHtml(item.name)}</td>
        <td class="py-3 px-4 text-xs text-stone-500">${escapeHtml(item.email)}</td>
        <td class="py-3 px-4">
          <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold ${item.status === 'attending' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}">
            ${item.status === 'attending' ? `${item.guests} Attending` : 'Declined'}
          </span>
        </td>
        <td class="py-3 px-4 text-xs text-stone-700">${escapeHtml(item.meal || '—')}</td>
        <td class="py-3 px-4 text-xs text-stone-500 italic max-w-xs truncate">${escapeHtml(item.song || '—')}</td>
        <td class="py-3 px-4 text-xs text-stone-400">${new Date(item.timestamp).toLocaleDateString()}</td>
      </tr>
    `).join("");
  }
}

function exportRSVPsToCSV() {
  const list = getStoredRSVPs();
  if (list.length === 0) {
    alert("No RSVPs to export.");
    return;
  }

  const headers = ["Name", "Email", "Status", "Total Seats", "Meal Choice", "Dietary Needs", "Song Request", "Message", "Timestamp"];
  const rows = list.map(r => [
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${(r.email || '').replace(/"/g, '""')}"`,
    `"${r.status || ''}"`,
    r.guests || 0,
    `"${(r.meal || '').replace(/"/g, '""')}"`,
    `"${(r.dietary || '').replace(/"/g, '""')}"`,
    `"${(r.song || '').replace(/"/g, '""')}"`,
    `"${(r.message || '').replace(/"/g, '""')}"`,
    `"${r.timestamp || ''}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Wedding_RSVP_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Add to Calendar Integration (.ics + Google Calendar)
function setupCalendarButtons() {
  const googleBtn = document.getElementById("add-to-google-cal");
  const icsBtn = document.getElementById("add-to-apple-cal");

  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      const start = new Date(WeddingState.date);
      const end = new Date(start.getTime() + 6 * 60 * 60 * 1000); // 6 hours celebration

      const fmt = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const title = encodeURIComponent(`The Wedding of ${WeddingState.couple.partner1} & ${WeddingState.couple.partner2}`);
      const details = encodeURIComponent("Join us in celebrating our wedding ceremony and dinner reception!");
      const location = encodeURIComponent(`${WeddingState.venue.name}, ${WeddingState.venue.address}`);

      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${location}`;
      window.open(url, "_blank");
    });
  }

  if (icsBtn) {
    icsBtn.addEventListener("click", () => {
      const start = new Date(WeddingState.date);
      const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
      const fmt = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Wedding Invitation//EN",
        "BEGIN:VEVENT",
        `SUMMARY:The Wedding of ${WeddingState.couple.partner1} & ${WeddingState.couple.partner2}`,
        `DESCRIPTION:Join us in celebrating our wedding day!`,
        `LOCATION:${WeddingState.venue.name}, ${WeddingState.venue.address}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `${WeddingState.couple.partner1}_and_${WeddingState.couple.partner2}_Wedding.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// Lightbox Gallery Setup
function setupGallery() {
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");

  items.forEach(item => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-full");
      if (src && lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add("active");
      }
    });
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  }

  // Filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active-filter", "bg-[var(--primary)]", "text-white"));
      btn.classList.add("active-filter", "bg-[var(--primary)]", "text-white");
      const category = btn.getAttribute("data-filter");

      items.forEach(item => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// FAQ Accordion Setup
function setupAccordion() {
  const toggles = document.querySelectorAll(".faq-toggle");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector(".faq-icon");
      const isOpen = !content.classList.contains("hidden");

      // Close all
      document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
      document.querySelectorAll(".faq-icon").forEach(i => i.classList.remove("rotate-180"));

      if (!isOpen) {
        content.classList.remove("hidden");
        if (icon) icon.classList.add("rotate-180");
      }
    });
  });
}

// Customizer Drawer (Live Edit Names, Date, Theme)
function setupCustomizer() {
  const openBtn = document.getElementById("open-customizer-btn");
  const closeBtn = document.getElementById("close-customizer-btn");
  const drawer = document.getElementById("customizer-drawer");
  const form = document.getElementById("customizer-form");

  if (openBtn && drawer) {
    openBtn.addEventListener("click", () => {
      drawer.classList.remove("translate-x-full");
      // Populate fields
      document.getElementById("cust-partner1").value = WeddingState.couple.partner1;
      document.getElementById("cust-partner2").value = WeddingState.couple.partner2;
      document.getElementById("cust-date").value = WeddingState.date.slice(0, 16);
      document.getElementById("cust-venue").value = WeddingState.venue.name;
      document.getElementById("cust-address").value = WeddingState.venue.address;
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", () => {
      drawer.classList.add("translate-x-full");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      WeddingState.couple.partner1 = document.getElementById("cust-partner1").value.trim() || "Elena";
      WeddingState.couple.partner2 = document.getElementById("cust-partner2").value.trim() || "Alexander";
      WeddingState.couple.monogram = `${WeddingState.couple.partner1.charAt(0)} & ${WeddingState.couple.partner2.charAt(0)}`;
      WeddingState.date = document.getElementById("cust-date").value || WeddingState.date;
      WeddingState.venue.name = document.getElementById("cust-venue").value.trim() || WeddingState.venue.name;
      WeddingState.venue.address = document.getElementById("cust-address").value.trim() || WeddingState.venue.address;

      saveCurrentSettings();
      applyWeddingStateToDOM();
      drawer.classList.add("translate-x-full");
      triggerPetalBurst(30);
    });
  }

  // Color Theme Selector
  const themeButtons = document.querySelectorAll(".theme-select-btn");
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme-name");
      setTheme(theme);
    });
  });
}

function setTheme(theme) {
  WeddingState.theme = theme;
  saveCurrentSettings();
  if (theme === "gold") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

// Update DOM elements with current WeddingState
function applyWeddingStateToDOM() {
  document.querySelectorAll(".couple-partner1").forEach(el => el.textContent = WeddingState.couple.partner1);
  document.querySelectorAll(".couple-partner2").forEach(el => el.textContent = WeddingState.couple.partner2);
  document.querySelectorAll(".couple-monogram").forEach(el => el.textContent = WeddingState.couple.monogram);
  document.querySelectorAll(".venue-name-display").forEach(el => el.textContent = WeddingState.venue.name);
  document.querySelectorAll(".venue-address-display").forEach(el => el.textContent = WeddingState.venue.address);
  
  if (WeddingState.theme && WeddingState.theme !== "gold") {
    document.documentElement.setAttribute("data-theme", WeddingState.theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

// Particle Blossom & Stardust Canvas Physics
function setupParticleCanvas() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = Math.min(35, Math.floor(window.innerWidth / 35));

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 5 + Math.random() * 8,
      speedX: -0.5 + Math.random() * 1,
      speedY: 0.6 + Math.random() * 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: -1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.45,
      type: Math.random() > 0.4 ? "petal" : "star"
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of petals) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.type === "petal") {
        ctx.fillStyle = `rgba(235, 185, 195, ${p.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(p.size, -p.size, p.size * 2, 0);
        ctx.quadraticCurveTo(p.size, p.size, 0, 0);
        ctx.fill();
      } else {
        // Gold stardust sparkle
        ctx.fillStyle = `rgba(218, 180, 110, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

// Interactive Petal / Confetti Burst for RSVP and interactions
function triggerPetalBurst(amount = 40) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "100000";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);

  const particles = [];
  const colors = ["#dfba73", "#eed8ae", "#c97d8b", "#f7e1e6", "#ffffff", "#c5a059"];

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: w / 2,
      y: h / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12
    });
  }

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, w, h);
    frames++;

    let alive = 0;
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.alpha -= 0.015;
      p.rotation += p.vRot;

      if (p.alpha > 0) {
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      }
    }

    if (alive > 0 && frames < 120) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }

  animate();
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function formatDateAgo(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch (e) {
    return "";
  }
}

// Global Exports for button onclicks
window.closeVIPPassModal = closeVIPPassModal;
window.toggleWishHeart = toggleWishHeart;
window.exportRSVPsToCSV = exportRSVPsToCSV;

// Main App Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  loadSavedSettings();
  applyWeddingStateToDOM();
  setupEnvelope();
  setupCountdown();
  setupRSVP();
  setupCalendarButtons();
  setupGallery();
  setupAccordion();
  setupCustomizer();
  setupParticleCanvas();
  renderGuestbook();
  renderAdminStats();

  // Music toggle button
  const musicBtn = document.getElementById("music-toggle-btn");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      synthAudio.toggle();
    });
  }

  // Admin Dashboard toggle
  const adminToggleBtn = document.getElementById("toggle-admin-btn");
  const adminModal = document.getElementById("admin-dashboard-modal");
  const closeAdminBtn = document.getElementById("close-admin-modal");

  if (adminToggleBtn && adminModal) {
    adminToggleBtn.addEventListener("click", () => {
      renderAdminStats();
      adminModal.classList.remove("hidden");
      adminModal.classList.add("flex");
    });
  }

  if (closeAdminBtn && adminModal) {
    closeAdminBtn.addEventListener("click", () => {
      adminModal.classList.add("hidden");
      adminModal.classList.remove("flex");
    });
  }
});

