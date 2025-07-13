import React, { useState, useEffect, useCallback } from 'react';
import './i18n'
import { CartProvider } from './contexts/CartContext';
import AuthModal from './components/AuthModal';
import { useToast } from './hooks/useToast';
import { smoothScrollTo } from './utils/smoothScroll';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList'; // Thay đổi từ ProductSection sang ProductList
import About from './components/About';
import Contact from './components/Contact';
import ProductDetailModal from './components/ProductDetailModal';
import Cart from './components/Cart';
import FavoritesModal from './components/FavoritesModal';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import Toast from './components/Toast';
import { mockProducts } from './data/mockData';
import Chatbot from './components/Chatbot';
import './App.css';
import './styles/theme.css'; // Import theme CSS

function App() {
  const [allProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Khởi tạo từ localStorage hoặc theo preferenceMedia
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    } else {
      // Kiểm tra preference của hệ thống
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  // Áp dụng dark mode khi state thay đổi
  useEffect(() => {
    // Lưu vào localStorage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Thêm hoặc xóa class dark-mode từ body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Hàm toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const { toasts, showToast, removeToast } = useToast();

  // Giả lập việc tải dữ liệu
  useEffect(() => {
    const loadProducts = () => {
      setLoading(true);
      setTimeout(() => {
        setFilteredProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };

    loadProducts();

    // Load favorites từ localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Filter và Search logic
  const filterProducts = useCallback(() => {
    let filtered = [...allProducts];

    // Lọc theo search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (product.author && product.author.toLowerCase().includes(query)) ||
        (product.instructor && product.instructor.toLowerCase().includes(query))
      );
    }

    // Lọc theo category
    if (activeFilters.category && activeFilters.category !== 'all') {
      filtered = filtered.filter(product => product.category === activeFilters.category);
    }

    // Lọc theo price range
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    // Lọc theo rating
    if (activeFilters.rating) {
      filtered = filtered.filter(product => 
        product.rating >= activeFilters.rating
      );
    }

    // Lọc theo level (cho courses)
    if (activeFilters.level) {
      filtered = filtered.filter(product => 
        product.level === activeFilters.level
      );
    }

    setFilteredProducts(filtered);
  }, [allProducts, searchQuery, activeFilters]);

  // Áp dụng filter khi có thay đổi
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  // Toggle favorite
  const handleToggleFavorite = (productId) => {
    const isCurrentlyFavorite = favorites.includes(productId);
    const product = allProducts.find(p => p.id === productId);
    
    if (isCurrentlyFavorite) {
      // Xóa khỏi yêu thích
      setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId));
      showToast(`Đã xóa "${product?.name}" khỏi danh sách yêu thích`, 'info');
    } else {
      // Thêm vào yêu thích
      setFavorites(prevFavorites => [...prevFavorites, productId]);
      showToast(`Đã thêm "${product?.name}" vào danh sách yêu thích ❤️`, 'success');
    }
  };

  // View product details
  const handleViewDetails = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    setActiveFilters({});
    showToast('Đã xóa tất cả bộ lọc', 'info');
  }, [showToast]);

  // Thêm event listener cho suggestion
  useEffect(() => {
    const handleViewProductDetails = (event) => {
      const product = event.detail;
      handleViewDetails(product);
    };

    window.addEventListener('viewProductDetails', handleViewProductDetails);

    return () => {
      window.removeEventListener('viewProductDetails', handleViewProductDetails);
    };
  }, [handleViewDetails]);

  // Handle navigation
  const handleNavigate = useCallback((page, section = null) => {
    setCurrentPage(page);
    
    // Nếu có section, scroll đến section đó sau khi chuyển trang
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  const handleExploreClick = useCallback(() => {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
      smoothScrollTo(productsSection, 800, 80);
    }
  }, []);

  // Dark mode đã được cấu hình ở đầu file

  // Render current page based on state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return (
          <>
            <HeroSection onExplore={handleExploreClick} />
            <div id="products" className="products-section">
              <div className="products-container">
                <div className="section-header">
                  <h2 className="section-title">Sản phẩm học tiếng Anh</h2>
                  <p className="section-subtitle">
                    Khám phá bộ sưu tập khóa học, sách và tài liệu chất lượng cao
                  </p>
                </div>

                <div className="search-filter-section">
                  <SearchBar 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    placeholder="Tìm kiếm khóa học, sách, tài liệu..."
                  />
                  
                  <FilterSection 
                    activeFilters={activeFilters}
                    onFilterChange={setActiveFilters}
                    onClearFilters={handleClearFilters}
                    products={allProducts}
                  />
                </div>

                <ProductList
                  products={filteredProducts}
                  onViewDetails={handleViewDetails}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  loading={loading}
                  showToast={showToast}
                />
              </div>
            </div>
          </>
        );
    }
  };

  // Thêm debug code trong App.js để kiểm tra localStorage
  useEffect(() => {
    // Debug localStorage
    const savedCart = localStorage.getItem('cart');
    console.log("localStorage cart:", savedCart ? JSON.parse(savedCart) : []);
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          favoritesCount={favorites.length}
          onFavoritesClick={() => setIsFavoritesModalOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        
        {renderCurrentPage()}

        <Footer onNavigate={handleNavigate} />

        {/* Modals */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
          showToast={showToast}
          allProducts={allProducts}
          favorites={favorites}
        />

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          showToast={showToast}
        />

        <FavoritesModal
          isOpen={isFavoritesModalOpen}
          onClose={() => setIsFavoritesModalOpen(false)}
          favorites={favorites}
          allProducts={allProducts}
          onViewDetails={handleViewDetails}
          onToggleFavorite={handleToggleFavorite}
          showToast={showToast}
        />

        {/* Chatbot */}
        {isChatbotOpen ? (
          <Chatbot
            allProducts={allProducts}
            onProductSelect={handleViewDetails}
            onClose={() => setIsChatbotOpen(false)}
          />
        ) : (
          <button
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 9998,
              background: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 56,
              height: 56,
              fontSize: 28,
              boxShadow: '0 4px 16px rgba(52,152,219,0.18)',
              cursor: 'pointer'
            }}
            onClick={() => setIsChatbotOpen(true)}
            title="Chat với AI"
          >
            🤖
          </button>
        )}

        {/* Toast Container */}
        <div className="toast-container">
          {toasts.map(toast => (
            <Toast 
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onRemove={removeToast}
            />
          ))}
        </div>
      </div>
    </CartProvider>
  );
}

export default App;