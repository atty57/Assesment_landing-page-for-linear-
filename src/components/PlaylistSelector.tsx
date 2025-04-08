// components/PlaylistSelector.tsx
import { useState } from 'react';
import { FaList, FaThLarge } from 'react-icons/fa';
import './PlaylistSelector.css';

interface Playlist {
  name: string;
  artist: string;
  year: number;
  tracks: any[];
}

interface PlaylistSelectorProps {
  playlists: Playlist[];
  currentPlaylistIndex: number;
  onPlaylistChange: (index: number) => void;
}

function PlaylistSelector({
  playlists,
  currentPlaylistIndex,
  onPlaylistChange
}: PlaylistSelectorProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="playlist-selector">
      <div className="playlist-header">
        <h2>Playlists</h2>
        <div className="playlist-view-toggle">
          <button 
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <FaThLarge />
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <FaList />
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="playlist-grid">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className={`playlist-card ${index === currentPlaylistIndex ? 'active' : ''}`}
              onClick={() => onPlaylistChange(index)}
            >
              <div className="playlist-image">
                <div className="placeholder"></div>
              </div>
              <div className="playlist-info">
                <h4 className="playlist-name">{playlist.name}</h4>
                <div className="playlist-meta">
                  <span>{playlist.artist}</span>
                  <span>{playlist.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="playlist-list">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className={`playlist-list-item ${index === currentPlaylistIndex ? 'active' : ''}`}
              onClick={() => onPlaylistChange(index)}
            >
              <div className="playlist-list-thumb">
                <div className="placeholder"></div>
              </div>
              <div className="playlist-list-info">
                <h4 className="playlist-list-name">{playlist.name}</h4>
                <div className="playlist-list-meta">
                  {playlist.artist} • {playlist.year} • {playlist.tracks.length} tracks
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistSelector;