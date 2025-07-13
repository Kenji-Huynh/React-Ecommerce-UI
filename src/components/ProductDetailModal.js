import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Suggestion from './Suggestion';
import './ProductDetailModal.css';

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  isFavorite, 
  showToast,
  allProducts,
  favorites
}) => {
  const { addToCart } = useCart();

  // Đóng modal khi nhấn Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Ngăn scroll background
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(product.id);
    
    // ❌ XÓA TOAST Ở ĐÂY - để App.js xử lý
    // if (isFavorite) {
    //   showToast(`Đã xóa "${product.name}" khỏi danh sách yêu thích`, 'info');
    // } else {
    //   showToast(`Đã thêm "${product.name}" vào danh sách yêu thích ❤️`, 'success');
    // }
  };

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
    switch (product.category) {
      case 'course':
        return 'Khóa học';
      case 'book':
        return 'Sách';
      case 'document':
        return 'Tài liệu';
      default:
        return 'Sản phẩm';
    }
  };

  const getDetailedDescription = () => {
    switch (product.category) {
      case 'course':
        return `Khóa học ${product.name} được thiết kế dành cho học viên có trình độ ${product.level.toLowerCase()}. 
        Với thời lượng ${product.duration}, bạn sẽ được học trực tiếp với ${product.instructor} - một giảng viên 
        có nhiều năm kinh nghiệm trong việc giảng dạy tiếng Anh. Khóa học bao gồm đầy đủ các kỹ năng 
        nghe, nói, đọc, viết và được thiết kế theo chuẩn quốc tế.`;
      
      case 'book':
        return `${product.name} được xuất bản bởi ${product.publisher}, tác giả ${product.author}. 
        Cuốn sách gồm ${product.pages} trang với nội dung được biên soạn khoa học, phù hợp cho việc 
        tự học và được sử dụng rộng rãi trong các trường đại học và trung tâm giáo dục trên toàn thế giới.`;
      
      case 'document':
        return `Tài liệu ${product.name} cung cấp ${product.pages} trang nội dung chất lượng cao 
        ở định dạng ${product.format}. ${product.downloadable ? 'Bạn có thể tải xuống ngay sau khi mua để học bất cứ lúc nào.' : ''} 
        Đây là tài liệu thiết yếu cho việc chuẩn bị thi và nâng cao trình độ tiếng Anh.`;
      
      default:
        return product.description;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Product Info Container */}
          <div className="product-info-container">
            {/* Image Section */}
            <div className="modal-image-section">
              <div className="modal-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="modal-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                
                {/* Category Badge */}
                <div className="modal-category-badge">
                  <span className="category-icon">{getCategoryIcon()}</span>
                  <span className="category-text">{getCategoryLabel()}</span>
                </div>

                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="modal-discount-badge">
                    -{calculateDiscount()}%
                  </div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="modal-info-section">
              <div className="modal-title-section">
                <h2 className="modal-title">{product.name}</h2>
                
                {/* Favorite button */}
                <button 
                  className={`modal-favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={handleToggleFavorite}
                  title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                >
                  <span className="heart-icon">♥</span>
                  {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
                </button>
              </div>

              {/* Rating */}
              <div className="modal-rating">
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
                <span className="reviews-count">{product.reviews} đánh giá</span>
              </div>

              {/* Price */}
              <div className="modal-price">
                <div className="current-price">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="original-price">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="modal-description">
                <h3>Mô tả chi tiết</h3>
                <p>{getDetailedDescription()}</p>
              </div>

              {/* Product Details */}
              <div className="modal-details">
                <h3>Thông tin chi tiết</h3>
                <div className="details-grid">
                  {product.category === 'course' && (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">⏱️ Thời lượng:</span>
                        <span className="detail-value">{product.duration}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">📊 Trình độ:</span>
                        <span className="detail-value">{product.level}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">👨‍🏫 Giảng viên:</span>
                        <span className="detail-value">{product.instructor}</span>
                      </div>
                    </>
                  )}

                  {product.category === 'book' && (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">✍️ Tác giả:</span>
                        <span className="detail-value">{product.author}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">📄 Số trang:</span>
                        <span className="detail-value">{product.pages} trang</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">🏢 Nhà xuất bản:</span>
                        <span className="detail-value">{product.publisher}</span>
                      </div>
                    </>
                  )}

                  {product.category === 'document' && (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">📁 Định dạng:</span>
                        <span className="detail-value">{product.format}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">📄 Số trang:</span>
                        <span className="detail-value">{product.pages} trang</span>
                      </div>
                      {product.downloadable && (
                        <div className="detail-row">
                          <span className="detail-label">⬇️ Tải xuống:</span>
                          <span className="detail-value">Có thể tải ngay</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="modal-tags">
                <h3>Từ khóa</h3>
                <div className="tags-container">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="modal-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="modal-actions">
                <button 
                  className="btn btn-add-cart-modal"
                  onClick={handleAddToCart}
                >
                  🛒 Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>

          {/* Suggestion Section - Full Width */}
          <Suggestion
            currentProduct={product}
            allProducts={allProducts}
            favorites={favorites}
            onViewDetails={(suggestedProduct) => {
              // Đóng modal hiện tại và mở modal mới với sản phẩm được gợi ý
              onClose();
              setTimeout(() => {
                // Trigger view details cho sản phẩm mới
                window.dispatchEvent(new CustomEvent('viewProductDetails', {
                  detail: suggestedProduct
                }));
              }, 300);
            }}
            onToggleFavorite={onToggleFavorite}
            showToast={showToast}
            onCloseModal={onClose}  // Truyền function đóng modal
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;