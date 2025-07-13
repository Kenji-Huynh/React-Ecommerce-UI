import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Loading from './Loading';
import './ProductList.css';

const ProductList = ({ 
  products, 
  onViewDetails, 
  favorites, 
  onToggleFavorite, 
  loading,
  showToast  // Thêm prop này
}) => {
  const [viewMode, setViewMode] = useState('grid');

  if (loading) {
    return <Loading text="Đang tải sản phẩm..." />;
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* View Controls */}
      <div className="list-controls">
        <div className="results-info">
          <span className="results-count">
            Hiển thị {products.length} sản phẩm
          </span>
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Xem dạng lưới"
          >
            ⊞
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Xem dạng danh sách"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Product Grid/List */}
      <div className={`product-list ${viewMode}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(product.id)}
            showToast={showToast}  // Truyền showToast xuống ProductCard
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;