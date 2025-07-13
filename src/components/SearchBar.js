import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearchChange, searchQuery = '', placeholder = "Tìm kiếm khóa học, sách, tài liệu..." }) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search để tránh gọi API quá nhiều
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [inputValue, onSearchChange]);

  // Sync với prop searchQuery từ bên ngoài
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleClear = () => {
    setInputValue('');
    onSearchChange('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        
        {inputValue && (
          <button 
            className="search-clear-btn"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        )}
        
        <div className="search-icon">
          {isSearching ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            '🔍'
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;