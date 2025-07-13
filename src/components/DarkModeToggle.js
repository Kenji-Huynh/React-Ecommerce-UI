import React from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button 
      className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`} 
      onClick={onToggle}
      aria-label="Toggle dark mode"
      title={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
    >
      <div className="toggle-thumb">
        {isDarkMode ? '🌙' : '☀️'}
      </div>
    </button>
  );
};

export default DarkModeToggle;