// components/NowPlaying.tsx
import './NowPlaying.css';

interface Track {
  name: string;
  duration: number;
}

interface Playlist {
  name: string;
  artist: string;
  year: number;
}

interface NowPlayingProps {
  playlist: Playlist;
  track: Track;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function NowPlaying({
  playlist,
  track
}: NowPlayingProps) {
  if (!track) return <div className="now-playing">No track selected</div>;
  
  return (
    <div className="now-playing">
      <div className="track-info">
        <h2 className="track-name">{track.name}</h2>
        <p className="track-details">
          From <strong>{playlist.name}</strong> by <strong>{playlist.artist}</strong> ({playlist.year})
        </p>
        <p className="track-duration">Duration: {formatTime(track.duration)}</p>
      </div>
    </div>
  );
}

export default NowPlaying;
