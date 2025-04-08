import React, { useState, useEffect, useCallback, useMemo } from 'react';
import playlistsData from './data/playlists.json';
import MediaPlayer from './components/MediaPlayer';
import PlaylistSelector from './components/PlaylistSelector';
import ParticlesBackground from './components/ParticlesBackground';
import BouncingMusicIcon from './components/BouncingMusicIcon';
import './App.css';

// Types for our data structure
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

function App() {
  // Load initial state from localStorage with fallback
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentPlaylistIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const savedTrackIndex = localStorage.getItem('currentTrackIndex');
    return savedTrackIndex ? parseInt(savedTrackIndex, 10) : 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Save playlist and track indices to localStorage
  useEffect(() => {
    localStorage.setItem('currentPlaylistIndex', currentPlaylistIndex.toString());
    localStorage.setItem('currentTrackIndex', currentTrackIndex.toString());
  }, [currentPlaylistIndex, currentTrackIndex]);
  
  // Load playlists data
  useEffect(() => {
    setPlaylists(playlistsData.playlists);
  }, []);
  
  // Memoize current playlist to improve performance
  const currentPlaylist = useMemo(() => 
    playlists[currentPlaylistIndex] || { name: '', artist: '', year: 0, tracks: [] }, 
    [playlists, currentPlaylistIndex]
  );
  
  // Memoized track change handler
  const handleTrackChange = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, []);
  
  // Playlist change handler
  const handlePlaylistChange = useCallback((index: number) => {
    setCurrentPlaylistIndex(index);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  }, []);
  
  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
  
  // Next track handler
  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(prev => 
      prev < currentPlaylist.tracks.length - 1 ? prev + 1 : 0
    );
    setIsPlaying(true);
  }, [currentPlaylist]);
  
  // Previous track handler
  const prevTrack = useCallback(() => {
    setCurrentTrackIndex(prev => 
      prev > 0 ? prev - 1 : currentPlaylist.tracks.length - 1
    );
    setIsPlaying(true);
  }, [currentPlaylist]);
  
  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          nextTrack();
          break;
        case 'ArrowLeft':
          prevTrack();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextTrack, prevTrack]);
  
  return (
    <div className="app" role="application" aria-label="Linear Media Player">
      <ParticlesBackground/>
      <header className="app-header">
        <div className="header-content">
          <h1>Linear Media Player</h1>
          <BouncingMusicIcon />
        </div>
      </header>
      
      <main className="app-main">
        {playlists.length > 0 ? (
          <>
            <PlaylistSelector 
              playlists={playlists}
              currentPlaylistIndex={currentPlaylistIndex}
              onPlaylistChange={handlePlaylistChange}
            />
            
            <MediaPlayer 
              playlist={currentPlaylist}
              currentTrackIndex={currentTrackIndex}
              isPlaying={isPlaying}
              onTrackChange={handleTrackChange}
              onTogglePlay={togglePlay}
              onNextTrack={nextTrack}
              onPrevTrack={prevTrack}
            />
          </>
        ) : (
          <p>Loading playlists...</p>
        )}
      </main>
    </div>
  );
}

export default App;