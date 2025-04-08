import { useState, useEffect } from 'react';
import playlistsData from './data/playlists.json';
import MediaPlayer from './components/MediaPlayer';
import PlaylistSelector from './components/PlaylistSelector';
import ParticlesBackground from './components/ParticlesBackground';
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
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Load playlists data
    setPlaylists(playlistsData.playlists);
  }, []);
  
  const currentPlaylist = playlists[currentPlaylistIndex] || { name: '', artist: '', year: 0, tracks: [] };
  const currentTrack = currentPlaylist.tracks[currentTrackIndex];
  
  const handlePlaylistChange = (index: number) => {
    setCurrentPlaylistIndex(index);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  };
  
  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextTrack = () => {
    if (currentTrackIndex < currentPlaylist.tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // Loop back to first track
      setCurrentTrackIndex(0);
    }
    setIsPlaying(true);
  };
  
  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else {
      // Go to last track
      setCurrentTrackIndex(currentPlaylist.tracks.length - 1);
    }
    setIsPlaying(true);
  };
  
  return (
    <div className="app">
    <ParticlesBackground/>
      <header className="app-header">
        <h1>Linear Media Player</h1>
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
