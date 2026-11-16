import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../audio/romanticSynth';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(soundEngine.isPlaying);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const toggle = () => {
    soundEngine.toggle();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2">
      {isPlaying && (
        <div className="hidden sm:flex items-center space-x-1 bg-white/90 backdrop-blur-md border border-stone-200/80 px-3 py-1.5 rounded-full shadow-lg text-[11px] text-stone-600 font-serif italic">
          <div className="flex items-center space-x-0.5 mr-1.5 text-gold-600">
            <span className="w-1 bg-gold-600 rounded soundwave-bar"></span>
            <span className="w-1 bg-gold-600 rounded soundwave-bar"></span>
            <span className="w-1 bg-gold-600 rounded soundwave-bar"></span>
            <span className="w-1 bg-gold-600 rounded soundwave-bar"></span>
          </div>
          <span>Canon in D (Romantic Harp)</span>
        </div>
      )}

      <button
        onClick={toggle}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border ${
          isPlaying 
            ? 'bg-gradient-to-r from-stone-900 to-stone-800 text-gold-300 border-gold-500 scale-105' 
            : 'bg-white/90 backdrop-blur-md text-stone-600 border-stone-200 hover:border-gold-500'
        }`}
        title={isPlaying ? 'Mute Music' : 'Play Romantic Music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-gold-400" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

