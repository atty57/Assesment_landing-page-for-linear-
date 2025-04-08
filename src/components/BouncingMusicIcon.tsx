import React from 'react';
import { FaMusic } from 'react-icons/fa';
import './BouncingMusicIcon.css';

const BouncingMusicIcon: React.FC = () => {
  return (
    <div className="bouncing-music-icon" aria-hidden="true">
      <FaMusic className="music-icon" />
      <div className="sound-waves">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
}

export default BouncingMusicIcon;