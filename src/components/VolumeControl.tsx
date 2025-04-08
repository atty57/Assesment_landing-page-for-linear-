// VolumeControl.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaVolumeUp, 
  FaVolumeDown, 
  FaVolumeMute, 
  FaVolumeOff 
} from 'react-icons/fa';
import './VolumeControl.css';

interface VolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

function VolumeControl({ audioRef }: VolumeControlProps) {
  // Retrieve initial volume from localStorage with fallback
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('playerVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.7; // Default to 70%
  });
  
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  // Effect to update audio volume and localStorage
  useEffect(() => {
    if (audioRef.current) {
      // Set volume, respecting mute state
      audioRef.current.volume = isMuted ? 0 : volume;
      
      // Save volume to localStorage if not muted
      if (!isMuted) {
        localStorage.setItem('playerVolume', volume.toString());
      }
    }
  }, [volume, isMuted, audioRef]);

  // Memoized volume change handler
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // Unmute if volume is increased
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Memoized mute toggle
  const toggleMute = useCallback(() => {
    if (isMuted) {
      // Unmute and restore previous volume
      setIsMuted(false);
      setVolume(previousVolume);
    } else {
      // Mute and save current volume
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  }, [isMuted, volume, previousVolume]);

  // Dynamic volume icon selection
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <FaVolumeOff />;
    if (volume < 0.3) return <FaVolumeMute />;
    if (volume < 0.6) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  return (
    <div className="volume-control" aria-label="Volume Control">
      <button 
        className="volume-toggle" 
        onClick={toggleMute} 
        aria-pressed={isMuted}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      <div className="volume-slider-container">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume Slider"
          title={`Volume: ${Math.round(volume * 100)}%`}
        />
      </div>
      
      {/* Optional volume percentage display */}
      <span className="volume-percentage" aria-live="polite">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
}

export default React.memo(VolumeControl);