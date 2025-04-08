import { useRef, useEffect, useState } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function ProgressBar({ audioRef, isPlaying }: ProgressBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      if (progressValueRef.current && audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressValueRef.current.style.width = `${percentage}%`;
      }
    };

    const loadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', loadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', loadedMetadata);
    };
  }, [audioRef]);

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      if (progressValueRef.current && audioRef.current.duration) {
        const percentage = (newTime / audioRef.current.duration) * 100;
        progressValueRef.current.style.width = `${percentage}%`;
      }
    }
  };

  return (
    <div className="progress-container">
      <span className="time-elapsed">{formatTime(currentTime)}</span>
      <div className="progress-bar-wrapper">
        <div 
          ref={progressValueRef} 
          className="progress-value" 
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
        <input
          ref={progressBarRef}
          type="range"
          className="progress-bar"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
        />
      </div>
      <span className="time-duration">{formatTime(duration)}</span>
    </div>
  );
}

export default ProgressBar;
