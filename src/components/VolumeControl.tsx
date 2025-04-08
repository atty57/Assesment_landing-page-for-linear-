// VolumeControl.tsx
import { useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import './VolumeControl.css';

interface VolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

function VolumeControl({ audioRef }: VolumeControlProps) {
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, audioRef]);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <FaVolumeMute />;
    } else if (volume < 50) {
      return <FaVolumeDown />;
    } else {
      return <FaVolumeUp />;
    }
  };
  
  return (
    <div className="volume-control">
      <button className="volume-button" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
        {getVolumeIcon()}
      </button>
      <div className="volume-slider-container">
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          title={`Volume: ${isMuted ? 0 : volume}%`}
        />
      </div>
    </div>
  );
}

export default VolumeControl;