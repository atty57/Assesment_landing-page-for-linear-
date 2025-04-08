// components/MediaPlayer.tsx
import { useRef, useEffect } from 'react';
import TrackList from './TrackList';
import PlayerControls from './PlayerControls';
import NowPlaying from './NowPlaying';
import ProgressBar from './ProgressBar';
import './MediaPlayer.css';
import VolumeControl from './VolumeControl';

interface Track {
  name: string;
  url: string;
  duration: number;
}

interface Playlist {
  name: string;
  artist: string;
  year: number;
  tracks: Track[];
}

interface MediaPlayerProps {
  playlist: Playlist;
  currentTrackIndex: number;
  isPlaying: boolean;
  onTrackChange: (index: number) => void;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

function MediaPlayer({
  playlist,
  currentTrackIndex,
  isPlaying,
  onTrackChange,
  onTogglePlay,
  onNextTrack,
  onPrevTrack
}: MediaPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    // Handle play/pause state changes
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  useEffect(() => {
    // Handle track changes
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      }
    }
  }, [currentTrackIndex, playlist, isPlaying]);
  
  const handleTrackEnd = () => {
    onNextTrack();
  };
  
  return (
    <div className="media-player">
      <audio
        ref={audioRef}
        src={playlist.tracks[currentTrackIndex]?.url}
        onEnded={handleTrackEnd}
      />
      
      <NowPlaying 
        playlist={playlist}
        track={playlist.tracks[currentTrackIndex]}
      />
      
      <ProgressBar 
        audioRef={audioRef}
        isPlaying={isPlaying}
      />

      <VolumeControl audioRef={audioRef} />

      <PlayerControls 
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onNextTrack={onNextTrack}
        onPrevTrack={onPrevTrack}
      />

      <TrackList 
        tracks={playlist.tracks}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={onTrackChange}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default MediaPlayer;
