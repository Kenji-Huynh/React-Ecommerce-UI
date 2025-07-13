import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CartIcon from './CartIcon';
import FavoritesIcon from './FavoritesIcon';
import DarkModeToggle from './DarkModeToggle';
import AuthModal from './AuthModal';
import './Header.css';

const Header = ({ 
  onCartClick, 
  currentPage, 
  onNavigate, 
  favoritesCount,
  onFavoritesClick,
  isDarkMode,
  onToggleDarkMode
}) => {
  const { t, i18n } = useTranslation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language === 'en' ? 'EN' : 'VI');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // State cho tab hiện tại
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Thêm state cho mobile menu

  // Kiểm tra user đã đăng nhập chưa
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleNavigation = (page) => {
    onNavigate(page);
  };

  const handleLanguageChange = (lang) => {
    const languageCode = lang === 'EN' ? 'en' : 'vi';
    i18n.changeLanguage(languageCode);
    setCurrentLanguage(lang);
    setIsLanguageOpen(false);
    console.log('Language changed to:', languageCode); // Debug log
  };

  // SỬA HÀM NÀY - Đảm bảo tab được set đúng và modal mở
  const handleAuthClick = (tab) => {
    console.log('Auth click:', tab); // Debug log
    setAuthTab(tab); // Set tab trước
    setIsAuthModalOpen(true); // Mở modal sau
  };

  // SỬA HÀM ĐÓNG MODAL - Reset tab về login khi đóng
  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    // Không reset authTab ngay, để lần sau mở vẫn nhớ tab cuối
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    alert('Đăng xuất thành công!');
  };

  // Hàm toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo-container" onClick={() => handleNavigation('home')}>
            <img src="/logo.png" alt="TEMPO Logo" className="logo-image" />
          </div>

          {/* Navigation */}
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <button 
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavigation('home')}
                >
                  {t('nav.home')}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                  onClick={() => handleNavigation('about')}
                >
                  {t('nav.about')}
                </button>
              </li>
              <li 
                className="nav-item dropdown"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="nav-link">
                  {t('nav.courses')}
                  <span className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
                </button>
                <ul className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                  <li>
                    <button 
                      className="dropdown-link"
                      onClick={() => {
                        handleNavigation('home');
                        setTimeout(() => {
                          const productsSection = document.getElementById('products');
                          if (productsSection) {
                            productsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                        setIsServicesOpen(false);
                      }}
                    >
                      🎓 {t('nav.onlineCourses')}
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-link"
                      onClick={() => {
                        handleNavigation('home');
                        setTimeout(() => {
                          const productsSection = document.getElementById('products');
                          if (productsSection) {
                            productsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                        setIsServicesOpen(false);
                      }}
                    >
                      📚 {t('nav.allProducts')}
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-link"
                      onClick={() => {
                        alert(t('nav.freeResourcesAlert'));
                        setIsServicesOpen(false);
                      }}
                    >
                      📄 {t('nav.freeResources')}
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNavigation('contact')}
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </nav>

          {/* Right Section */}
          <div className="header-right">
            {/* Dark Mode Toggle */}
            <DarkModeToggle 
              isDarkMode={isDarkMode}
              onToggle={onToggleDarkMode}
            />
            
            {/* Language Selector */}
            <div 
              className="language-selector"
              onMouseEnter={() => setIsLanguageOpen(true)}
              onMouseLeave={() => setIsLanguageOpen(false)}
            >
              <button className="language-btn">
                {currentLanguage}
                <span className={`dropdown-arrow ${isLanguageOpen ? 'open' : ''}`}>▼</span>
              </button>
              <ul className={`language-menu ${isLanguageOpen ? 'show' : ''}`}>
                <li>
                  <button 
                    onClick={() => handleLanguageChange('VI')}
                    className={`language-option ${currentLanguage === 'VI' ? 'active' : ''}`}
                  >
                    🇻🇳 Tiếng Việt
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLanguageChange('EN')}
                    className={`language-option ${currentLanguage === 'EN' ? 'active' : ''}`}
                  >
                    🇺🇸 English
                  </button>
                </li>
              </ul>
            </div>

            <div className="auth-buttons">
              <FavoritesIcon 
                onClick={onFavoritesClick}
                favoritesCount={favoritesCount}
              />
              <CartIcon onClick={onCartClick} />
              
              {user ? (
                // User đã đăng nhập
                <div 
                  className="user-menu"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button className="user-avatar">
                    <span className="avatar-text">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="user-name">{user.name}</span>
                    <span className={`dropdown-arrow ${isUserMenuOpen ? 'open' : ''}`}>▼</span>
                  </button>
                  <ul className={`user-dropdown ${isUserMenuOpen ? 'show' : ''}`}>
                    <li><button className="dropdown-link logout" onClick={handleLogout}>🚪 Đăng xuất</button></li>
                  </ul>
                </div>
              ) : (
                // User chưa đăng nhập - SỬA PHẦN NÀY
                <>
                  <button 
                    className="btn btn-register"
                    onClick={() => {
                      console.log('Register button clicked'); // Debug log
                      handleAuthClick('register');
                    }}
                  >
                    {t('auth.register')}
                  </button>
                  <button 
                    className="btn btn-login"
                    onClick={() => {
                      console.log('Login button clicked'); // Debug log
                      handleAuthClick('login');
                    }}
                  >
                    {t('auth.login')}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <button 
                className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => {
                  handleNavigation('home');
                  setIsMobileMenuOpen(false);
                }}
              >
                {t('nav.home')}
              </button>
            </li>
            <li className="mobile-nav-item">
              <button 
                className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => {
                  handleNavigation('about');
                  setIsMobileMenuOpen(false);
                }}
              >
                {t('nav.about')}
              </button>
            </li>
            <li className="mobile-nav-item">
              <button className="mobile-nav-link">
                {t('nav.courses')}
              </button>
              <ul className="mobile-submenu">
                <li>
                  <button 
                    className="mobile-submenu-link"
                    onClick={() => {
                      handleNavigation('home');
                      // Scroll đến products section và filter theo course
                      setTimeout(() => {
                        const productsSection = document.getElementById('products');
                        if (productsSection) {
                          productsSection.scrollIntoView({ behavior: 'smooth' });
                          // TODO: Trigger filter cho category 'course'
                        }
                      }, 100);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    🎓 {t('nav.onlineCourses')}
                  </button>
                </li>
                <li>
                  <button 
                    className="mobile-submenu-link"
                    onClick={() => {
                      handleNavigation('home');
                      // Scroll đến products section
                      setTimeout(() => {
                        const productsSection = document.getElementById('products');
                        if (productsSection) {
                          productsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    📚 {t('nav.allProducts')}
                  </button>
                </li>
                <li>
                  <button 
                    className="mobile-submenu-link"
                    onClick={() => {
                      // Mở modal tài liệu miễn phí
                      alert(t('nav.freeResourcesAlert'));
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    📄 {t('nav.freeResources')}
                  </button>
                </li>
              </ul>
            </li>
            <li className="mobile-nav-item">
              <button 
                className={`mobile-nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => {
                  handleNavigation('contact');
                  setIsMobileMenuOpen(false);
                }}
              >
                {t('nav.contact')}
              </button>
            </li>
            
            {/* Mobile Auth Buttons */}
            <li className="mobile-nav-item mobile-auth">
              {user ? (
                <button 
                  className="mobile-nav-link logout"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  🚪 {t('auth.logout')}
                </button>
              ) : (
                <div className="mobile-auth-buttons">
                  <button 
                    className="mobile-btn mobile-btn-register"
                    onClick={() => {
                      handleAuthClick('register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t('auth.register')}
                  </button>
                  <button 
                    className="mobile-btn mobile-btn-login"
                    onClick={() => {
                      handleAuthClick('login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t('auth.login')}
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </header>

      {/* Auth Modal - SỬA PROPS */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        initialTab={authTab} // Truyền tab hiện tại
      />
    </>
  );
};

export default Header;