import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import './PlayerControls.css';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

function PlayerControls({
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack
}: PlayerControlsProps) {
  return (
    <div className="player-controls">
      <button className="prev-button" onClick={onPrevTrack}>
        <FaStepBackward /> Previous
      </button>
      
      <button className="play-pause-button" onClick={onTogglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />} {isPlaying ? 'Pause' : 'Play'}
      </button>
      
      <button className="next-button" onClick={onNextTrack}>
        Next <FaStepForward />
      </button>
    </div>
  );
}

export default PlayerControls;
