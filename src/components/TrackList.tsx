// components/TrackList.tsx
import './TrackList.css';

interface Track {
  name: string;
  duration: number;
}

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function TrackList({
  tracks,
  currentTrackIndex,
  onTrackSelect
}: TrackListProps) {
  return (
    <div className="track-list">
      <h3>Tracks</h3>
      <ul>
        {tracks.map((track, index) => (
          <li 
            key={index}
            className={index === currentTrackIndex ? 'active' : ''}
            onClick={() => onTrackSelect(index)}
          >
            <span className="track-number">{index + 1}.</span>
            <span className="track-name">{track.name}</span>
            <span className="track-duration">{formatTime(track.duration)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
