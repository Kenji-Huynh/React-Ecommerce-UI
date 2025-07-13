import React from 'react';
import './FavoritesIcon.css';

const FavoritesIcon = ({ onClick, favoritesCount }) => {
  return (
    <button className="favorites-icon" onClick={onClick}>
      <span className="favorites-symbol">♥</span>
      {favoritesCount > 0 && (
        <span className="favorites-badge">{favoritesCount}</span>
      )}
    </button>
  );
};

export default FavoritesIcon;