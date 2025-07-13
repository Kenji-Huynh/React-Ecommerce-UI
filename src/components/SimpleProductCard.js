import React from 'react';
import { useCart } from '../contexts/CartContext';
import './SimpleProductCard.css';

const SimpleProductCard = ({ product, onViewDetails, showToast, onToggleFavorite, isFavorite }) => {
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
    // ❌ KHÔNG THÊM TOAST Ở ĐÂY - để App.js xử lý
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  return (
    <div className="simple-product-card" onClick={() => onViewDetails(product)}>
      {/* Product Image */}
      <div className="simple-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="simple-product-image"
        />
        
        {/* Discount Badge */}
        {product.originalPrice && calculateDiscount() > 0 && (
          <div className="simple-discount-badge">
            -{calculateDiscount()}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="simple-product-info">
        {/* Product Name */}
        <h4 className="simple-product-name">{product.name}</h4>
        
        {/* Price */}
        <div className="simple-price-section">
          <div className="simple-current-price">
            {formatPrice(product.price)}
          </div>
          {product.originalPrice && (
            <div className="simple-original-price">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>
      </div>

      {/* Nếu có nút favorite trong SimpleProductCard */}
      <button 
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={handleToggleFavorite}
      >
        ♥
      </button>
    </div>
  );
};

export default SimpleProductCard;