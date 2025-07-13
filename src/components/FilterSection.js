import React, { useState } from 'react';
import { categories, priceRanges } from '../data/mockData';
import './FilterSection.css';

const FilterSection = ({ 
  onFilterChange, 
  activeFilters = {}, 
  onClearFilters 
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // Thay đổi từ true thành false

  const handleCategoryChange = (categoryId) => {
    const newFilters = {
      ...activeFilters,
      category: categoryId === 'all' ? null : categoryId
    };
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (priceRangeId) => {
    const selectedRange = priceRanges.find(range => range.id === priceRangeId);
    const newFilters = {
      ...activeFilters,
      priceRange: priceRangeId === 'all' ? null : {
        id: priceRangeId,
        min: selectedRange.min,
        max: selectedRange.max,
        label: selectedRange.label
      }
    };
    onFilterChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.category) count++;
    if (activeFilters.priceRange) count++;
    return count;
  };

  const hasActiveFilters = getActiveFiltersCount() > 0;

  return (
    <div className="filter-section">
      {/* Filter Header */}
      <div className="filter-header">
        <div className="filter-title-section">
          <h3 className="filter-title">
            🔧 Bộ lọc
            {hasActiveFilters && (
              <span className="filter-count">({getActiveFiltersCount()})</span>
            )}
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="filter-toggle"
            title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            <span className={`toggle-arrow ${isExpanded ? 'expanded' : ''}`}>
              ▼
            </span>
          </button>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="clear-filters-btn"
            title="Xóa tất cả bộ lọc"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="active-filters">
          {activeFilters.category && (
            <div className="filter-chip">
              <span className="chip-label">Loại:</span>
              <span className="chip-value">
                {categories.find(cat => cat.id === activeFilters.category)?.name}
              </span>
              <button
                onClick={() => handleCategoryChange('all')}
                className="chip-remove"
              >
                ×
              </button>
            </div>
          )}
          
          {activeFilters.priceRange && (
            <div className="filter-chip">
              <span className="chip-label">Giá:</span>
              <span className="chip-value">
                {activeFilters.priceRange.label}
              </span>
              <button
                onClick={() => handlePriceRangeChange('all')}
                className="chip-remove"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter Content */}
      <div className={`filter-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {/* Category Filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">📚 Loại sản phẩm</h4>
          <div className="filter-options">
            {categories.map((category) => (
              <label key={category.id} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={(activeFilters.category || 'all') === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="filter-radio"
                />
                <span className="filter-option-content">
                  <span className="option-name">{category.name}</span>
                  <span className="option-count">({category.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">💰 Khoảng giá</h4>
          <div className="filter-options">
            {priceRanges.map((priceRange) => (
              <label key={priceRange.id} className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  value={priceRange.id}
                  checked={(activeFilters.priceRange?.id || 'all') === priceRange.id}
                  onChange={() => handlePriceRangeChange(priceRange.id)}
                  className="filter-radio"
                />
                <span className="filter-option-content">
                  <span className="option-name">{priceRange.label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;