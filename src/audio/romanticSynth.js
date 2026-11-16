/**
 * Indian Royal Wedding Melodic Synthesizer
 * Built via Web Audio API - Raga Yaman / Bilawal festive sitar and bansuri timbre
 * 100% offline, resilient, zero broken MP3 links
 */

class IndianWeddingAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.droneGain = null;
    this.masterGain = null;
    this.volume = 0.6;
    this.listeners = new Set();

    // Raga Yaman / Kalyani inspired festive celebration notes (Hz):
    // Sa: 261.63 (C4), Re: 293.66 (D4), Ga: 329.63 (E4), Ma': 369.99 (F#4), Pa: 392.00 (G4), Dha: 440.00 (A4), Ni: 493.88 (B4), Sa': 523.25 (C5)
    this.melody = [
      { note: 261.63, dur: 0.6, type: "sitar" }, // Sa
      { note: 329.63, dur: 0.8, type: "sitar" }, // Ga
      { note: 369.99, dur: 0.6, type: "flute" }, // Ma'
      { note: 392.00, dur: 1.2, type: "sitar" }, // Pa
      { note: 440.00, dur: 0.6, type: "flute" }, // Dha
      { note: 493.88, dur: 0.8, type: "sitar" }, // Ni
      { note: 523.25, dur: 1.4, type: "flute" }, // Sa'
      { note: 493.88, dur: 0.6, type: "sitar" }, // Ni
      { note: 440.00, dur: 0.6, type: "sitar" }, // Dha
      { note: 392.00, dur: 1.0, type: "flute" }, // Pa
      { note: 369.99, dur: 0.8, type: "sitar" }, // Ma'
      { note: 329.63, dur: 1.2, type: "flute" }, // Ga
      { note: 293.66, dur: 0.8, type: "sitar" }, // Re
      { note: 261.63, dur: 1.8, type: "sitar" }  // Sa
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.isPlaying, this.volume));
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  // Play Sitar plucked string with metallic resonance
  playSitarNote(freq, time, duration = 1.4) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Sawtooth harmonics for sitar buzz
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);

    // Filter creates the jawari (plucked string decay)
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq * 2.2, time);
    filter.Q.setValueAtTime(4.0, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 0.9, time + duration);

    // Fast pluck attack, gentle exponential decay
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.09, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Play Bansuri Flute note with soft warmth and gentle vibrato
  playFluteNote(freq, time, duration = 1.6) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Subtle natural vibrato
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, time); // 5Hz vibrato
    vibratoGain.gain.setValueAtTime(3.5, time);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(time);
    vibrato.stop(time + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.07, time + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Wax seal breaking sound & golden chime
  playSealBreakSound() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Wax crackle frequency sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.4);

    // Auspicious royal bell / temple chime
    setTimeout(() => {
      if (this.ctx && this.masterGain) {
        this.playSitarNote(523.25, this.ctx.currentTime, 2.0); // C5
        this.playFluteNote(659.25, this.ctx.currentTime + 0.15, 2.2); // E5
        this.playSitarNote(783.99, this.ctx.currentTime + 0.3, 2.4); // G5
      }
    }, 150);
  }

  // Tanpura drone in C
  startDrone() {
    if (!this.ctx || !this.masterGain || this.droneGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    // Root C (130.81 Hz) and Pa G (196.00 Hz)
    const osc1 = this.ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(130.81, this.ctx.currentTime);
    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = "lowpass";
    filter1.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc1.connect(filter1);
    filter1.connect(this.droneGain);
    osc1.start();
    this.droneOsc1 = osc1;

    const osc2 = this.ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(196.00, this.ctx.currentTime);
    osc2.connect(this.droneGain);
    osc2.start();
    this.droneOsc2 = osc2;
  }

  stopDrone() {
    if (this.droneOsc1) {
      try { this.droneOsc1.stop(); } catch (e) {}
      this.droneOsc1 = null;
    }
    if (this.droneOsc2) {
      try { this.droneOsc2.stop(); } catch (e) {}
      this.droneOsc2 = null;
    }
    this.droneGain = null;
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startDrone();
    this.notify();

    let step = 0;
    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const item = this.melody[step];
      const now = this.ctx.currentTime;

      if (item.type === "flute") {
        this.playFluteNote(item.note, now, item.dur * 1.5);
      } else {
        this.playSitarNote(item.note, now, item.dur * 1.4);
      }

      step = (step + 1) % this.melody.length;
      this.timer = setTimeout(playNext, item.dur * 1000 * 0.9);
    };

    playNext();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.stopDrone();
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }
}

export const indianSoundEngine = new IndianWeddingAudioEngine();
