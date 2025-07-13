import React, { useState, useEffect } from 'react';
import SimpleProductCard from './SimpleProductCard';
import { smoothScrollTo } from '../utils/smoothScroll';
import './Suggestion.css';

const Suggestion = ({ 
  currentProduct, 
  allProducts, 
  favorites, 
  onViewDetails, 
  onToggleFavorite, 
  showToast,
  onCloseModal
}) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false); // Thêm state

  useEffect(() => {
    if (currentProduct && allProducts.length > 0) {
      generateSuggestions();
    }
  }, [currentProduct, allProducts]);

  const generateSuggestions = () => {
    if (!currentProduct) return;

    let suggestions = [];

    // 1. Sản phẩm cùng category
    const sameCategory = allProducts.filter(product => 
      product.id !== currentProduct.id && 
      product.category === currentProduct.category
    );

    // 2. Sản phẩm có tags tương tự
    const similarTags = allProducts.filter(product => {
      if (product.id === currentProduct.id) return false;
      
      const commonTags = product.tags.filter(tag => 
        currentProduct.tags.includes(tag)
      );
      
      return commonTags.length > 0;
    });

    // 3. Sản phẩm có rating cao
    const highRating = allProducts.filter(product => 
      product.id !== currentProduct.id && 
      product.rating >= 4.5
    );

    // Kết hợp và loại bỏ duplicate
    const combined = [
      ...sameCategory.slice(0, 4),
      ...similarTags.slice(0, 3),
      ...highRating.slice(0, 2)
    ];

    // Loại bỏ duplicate và shuffle
    const unique = combined.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    const shuffled = unique.sort(() => 0.5 - Math.random());
    setSuggestedProducts(shuffled.slice(0, 5)); // Lấy 5 sản phẩm
  };

  // Hàm xử lý khi click "Xem thêm" - CẢI THIỆN
  const handleViewMore = () => {
    setIsNavigating(true); // Bắt đầu loading
    
    // Đóng modal với hiệu ứng
    if (onCloseModal) {
      onCloseModal();
    }
    
    // Smooth scroll với delay để modal đóng hoàn toàn
    setTimeout(() => {
      const productsSection = document.querySelector('.products-section');
      const searchSection = document.querySelector('.search-filter-section');
      
      // Ưu tiên scroll đến search section để user thấy filter
      const targetElement = searchSection || productsSection;
      
      if (targetElement) {
        smoothScrollTo(targetElement, 1000, 100);
        
        // Kết thúc loading sau khi scroll xong
        setTimeout(() => {
          setIsNavigating(false);
        }, 1000);
      } else {
        // Fallback: scroll về đầu trang
        window.scrollTo(0, 0);
        setIsNavigating(false);
      }
    }, 250); // Delay ngắn hơn để responsive hơn
  };

  if (suggestedProducts.length === 0) {
    return null;
  }

  return (
    <div className="suggestion-section">
      <div className="suggestion-header">
        <h3 className="suggestion-title">
          Gợi ý sản phẩm
        </h3>
      </div>

      <div className="suggestion-grid-horizontal">
        {suggestedProducts.map(product => (
          <SimpleProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
            showToast={showToast}
          />
        ))}
      </div>

      <div className="suggestion-footer">
        <button 
          className={`view-more-btn ${isNavigating ? 'loading' : ''}`}
          onClick={handleViewMore}
          disabled={isNavigating}
        >
          {isNavigating ? 'Đang chuyển...' : 'Xem thêm'}
        </button>
      </div>
    </div>
  );
};

export default Suggestion;