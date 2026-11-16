import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { indianSoundEngine } from '../audio/romanticSynth';

export default function MusicController() {
  const [isPlaying, setIsPlaying] = useState(indianSoundEngine.isPlaying);

  useEffect(() => {
    const unsubscribe = indianSoundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const toggleMusic = () => {
    indianSoundEngine.toggle();
  };

  return (
    <div className="fixed top-20 sm:top-auto sm:bottom-8 right-4 sm:right-6 z-50">
      <button
        onClick={toggleMusic}
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border backdrop-blur-md ${
          isPlaying
            ? 'bg-[#3B0C15]/95 border-[#D4AF65] text-[#F3DCA5] ring-2 ring-[#D4AF65]/40 scale-105'
            : 'bg-black/60 border-stone-400/50 text-stone-300 hover:border-[#D4AF65]'
        }`}
        title={isPlaying ? 'Mute Music' : 'Play Royal Wedding Instrumental'}
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3DCA5] animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
        )}
      </button>
    </div>
  );
}
