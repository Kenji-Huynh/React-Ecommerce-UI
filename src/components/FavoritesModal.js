import React from 'react';
import { useCart } from '../contexts/CartContext';
import './FavoritesModal.css';

const FavoritesModal = ({ isOpen, onClose, favorites, allProducts, onViewDetails, onToggleFavorite, showToast }) => {
  const { addToCart } = useCart();
  
  // Lọc sản phẩm yêu thích từ danh sách toàn bộ sản phẩm
  const favoriteProducts = allProducts.filter(product => favorites.includes(product.id));
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="favorites-overlay" onClick={onClose}>
      <div className="favorites-modal" onClick={(e) => e.stopPropagation()}>
        <div className="favorites-header">
          <h2>Sản phẩm yêu thích <span className="heart-icon">♥</span></h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="favorites-content">
          {favoriteProducts.length === 0 ? (
            <div className="favorites-empty">
              <div className="empty-icon">♥</div>
              <p>Bạn chưa có sản phẩm yêu thích nào</p>
              <p className="empty-subtitle">Hãy thêm các sản phẩm bạn yêu thích để dễ dàng theo dõi!</p>
              <button 
                className="browse-products-btn" 
                onClick={() => {
                  onClose();
                  // Nếu có hàm để navigate đến trang sản phẩm thì gọi ở đây
                }}
              >
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            <>
              <div className="favorites-list">
                {favoriteProducts.map(product => (
                  <div key={product.id} className="favorite-item">
                    <div className="favorite-image" onClick={() => {
                      onClose();
                      onViewDetails(product);
                    }}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    
                    <div className="favorite-details">
                      <h3 className="favorite-name" onClick={() => {
                        onClose();
                        onViewDetails(product);
                      }}>
                        {product.name}
                      </h3>
                      
                      <div className="favorite-category">
                        {product.category === 'course' && '🎓 Khóa học'}
                        {product.category === 'book' && '📚 Sách'}
                        {product.category === 'document' && '📄 Tài liệu'}
                      </div>
                      
                      <div className="favorite-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="favorite-actions">
                      <button 
                        className="btn-remove-favorite" 
                        onClick={() => {
                          onToggleFavorite(product.id); // Chỉ gọi onToggleFavorite, không gọi showToast
                        }}
                        title="Xóa khỏi yêu thích"
                      >
                        <span className="remove-icon">×</span>
                      </button>
                      
                      <button 
                        className="btn-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <span className="cart-icon">🛒</span>
                      </button>
                      
                      <button 
                        className="btn-view-details"
                        onClick={() => {
                          onClose();
                          onViewDetails(product);
                        }}
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="favorites-footer">
                <button 
                  className="clear-favorites"
                  onClick={() => {
                    // Xóa tất cả khỏi danh sách yêu thích
                    favoriteProducts.forEach(product => {
                      onToggleFavorite(product.id); // Chỉ gọi onToggleFavorite
                    });
                    // Chỉ 1 toast cho action xóa tất cả
                    showToast('Đã xóa tất cả sản phẩm khỏi danh sách yêu thích', 'info');
                  }}
                >
                  Xóa tất cả
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;