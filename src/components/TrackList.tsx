// TrackList.tsx
import { useState, useEffect } from 'react';
import { FaRandom, FaHeart, FaEllipsisH } from 'react-icons/fa';
import './TrackList.css';

interface Track {
  name: string;
  duration: number;
}

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
  isPlaying: boolean; // Added this prop
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function TrackList({
  tracks,
  currentTrackIndex,
  onTrackSelect,
  isPlaying
}: TrackListProps) {
  console.log('TrackList rendering with isPlaying:', isPlaying);
  console.log('Current track index:', currentTrackIndex);
  const [isFavorite, setIsFavorite] = useState<number[]>([]);
  const [displayedTracks, setDisplayedTracks] = useState<{ track: Track, originalIndex: number }[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);

  // Initialize displayed tracks with original indices
  useEffect(() => {
    const tracksWithIndices = tracks.map((track, index) => ({
      track,
      originalIndex: index
    }));
    setDisplayedTracks(tracksWithIndices);
  }, [tracks]);

  // Function to shuffle tracks
  const handleShuffle = () => {
    const tracksCopy = [...displayedTracks];

    // Fisher-Yates shuffle algorithm
    for (let i = tracksCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap tracks
      [tracksCopy[i], tracksCopy[j]] = [tracksCopy[j], tracksCopy[i]];
    }

    setDisplayedTracks(tracksCopy);
    setIsShuffled(true);
  };

  // Function to reset to original order
  const resetToOriginal = () => {
    const tracksCopy = [...displayedTracks];
    tracksCopy.sort((a, b) => a.originalIndex - b.originalIndex);
    setDisplayedTracks(tracksCopy);
    setIsShuffled(false);
  };

  const toggleFavorite = (originalIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite.includes(originalIndex)) {
      setIsFavorite(isFavorite.filter(i => i !== originalIndex));
    } else {
      setIsFavorite([...isFavorite, originalIndex]);
    }
  };

  return (
    <div className="track-list">
      <div className="track-list-header">
        <h3>Tracks</h3>
        <div className="track-list-controls">
          <button onClick={handleShuffle} title="Shuffle tracks">
            <FaRandom /> Shuffle
          </button>
          {isShuffled && (
            <button onClick={resetToOriginal} title="Reset to original order">
              Reset
            </button>
          )}
        </div>
      </div>
      <ul>
        {displayedTracks.map((item, index) => (
          <li
            key={item.originalIndex}
            className={item.originalIndex === currentTrackIndex ? 'active' : ''}
            onClick={() => onTrackSelect(item.originalIndex)}
          >
            <span className="track-number">{item.originalIndex + 1}</span>
            <span className="track-name">
              {item.track.name}
              {item.originalIndex === currentTrackIndex && isPlaying && (
                <span className="now-playing-indicator" style={{ marginLeft: '8px', display: 'inline-block' }}>
                  <span className="playing-bar" style={{ display: 'inline-block', width: '3px', height: '8px', backgroundColor: '#1db954', margin: '0 1px', animation: 'barHeight 1.2s ease-in-out infinite' }}></span>
                  <span className="playing-bar" style={{ display: 'inline-block', width: '3px', height: '4px', backgroundColor: '#1db954', margin: '0 1px', animation: 'barHeight 1.2s ease-in-out infinite 0.2s' }}></span>
                  <span className="playing-bar" style={{ display: 'inline-block', width: '3px', height: '10px', backgroundColor: '#1db954', margin: '0 1px', animation: 'barHeight 1.2s ease-in-out infinite 0.4s' }}></span>
                </span>
              )}
            </span>
            <span className="track-duration">{formatTime(item.track.duration)}</span>
            <div className="track-actions">
              <button
                onClick={(e) => toggleFavorite(item.originalIndex, e)}
                style={{ color: isFavorite.includes(item.originalIndex) ? '#1db954' : undefined }}
                title={isFavorite.includes(item.originalIndex) ? "Remove from favorites" : "Add to favorites"}
              >
                <FaHeart />
              </button>
              <button title="More options">
                <FaEllipsisH />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;