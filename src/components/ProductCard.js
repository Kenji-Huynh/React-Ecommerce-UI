import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails, onToggleFavorite, isFavorite, showToast }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'course':
        return '🎓';
      case 'book':
        return '📚';
      case 'document':
        return '📄';
      default:
        return '📖';
    }
  };

  const getCategoryLabel = () => {
    return t(`products.${product.category}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(t('cart.addedToCart', { productName: product.name }), 'success');
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(product)}
    >
      {/* Product Image */}
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        
        {/* Category Badge */}
        <div className="category-badge">
          <span className="category-icon">{getCategoryIcon()}</span>
          <span className="category-text">{getCategoryLabel()}</span>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="discount-badge">
            -{calculateDiscount()}%
          </div>
        )}

        {/* Favorite Button */}
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
          title={isFavorite ? t('products.removeFromFavorites') : t('products.addToFavorites')}
        >
          <span className="heart-icon">♥</span>
        </button>
      </div>
      
      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>
        
        <p className="product-description">
          {product.description}
        </p>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span 
                key={index} 
                className={`star ${index < Math.floor(product.rating) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
            <span className="rating-number">({product.rating})</span>
          </div>
          <span className="reviews-count">{product.reviews} {t('products.reviews')}</span>
        </div>

        {/* Product Details */}
        <div className="product-details">
          {product.category === 'course' && (
            <>
              <div className="detail-item">
                <span className="detail-icon">⏱️</span>
                <span>{product.duration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📊</span>
                <span>{product.level}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">👨‍🏫</span>
                <span>{product.instructor}</span>
              </div>
            </>
          )}

          {product.category === 'book' && (
            <>
              <div className="detail-item">
                <span className="detail-icon">✍️</span>
                <span>{product.author}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📄</span>
                <span>{product.pages} {t('products.pages')}</span>
              </div>
            </>
          )}

          {product.category === 'document' && (
            <>
              <div className="detail-item">
                <span className="detail-icon">📁</span>
                <span>{product.format}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📄</span>
                <span>{product.pages} {t('products.pages')}</span>
              </div>
              {product.downloadable && (
                <div className="detail-item">
                  <span className="detail-icon">⬇️</span>
                  <span>{t('products.downloadable')}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tags */}
        <div className="product-tags">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="tag more">+{product.tags.length - 3}</span>
          )}
        </div>

        {/* Price */}
        <div className="product-price">
          <div className="current-price">
            {formatPrice(product.price)}
          </div>
          {product.originalPrice && (
            <div className="original-price">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="product-actions">
          <button 
            className="btn btn-view-details"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            {t('products.viewDetails')}
          </button>
          <button 
            className="btn btn-add-cart"
            onClick={handleAddToCart}
          >
            {t('products.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;