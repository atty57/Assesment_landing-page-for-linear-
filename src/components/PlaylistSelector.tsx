// components/PlaylistSelector.tsx
import './PlaylistSelector.css';

interface Playlist {
  name: string;
  artist: string;
  year: number;
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
  return (
    <div className="playlist-selector">
      <h2>Playlists</h2>
      <div className="playlist-tabs">
        {playlists.map((playlist, index) => (
          <button
            key={index}
            className={index === currentPlaylistIndex ? 'active' : ''}
            onClick={() => onPlaylistChange(index)}
          >
            {playlist.name} ({playlist.year})
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlaylistSelector;
