import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Về Tempo',
      links: [
        { name: 'Giới thiệu', action: () => onNavigate('about') },
        { name: 'Đội ngũ', action: () => onNavigate('about', 'team') },
        { name: 'Tầm nhìn & Sứ mệnh', action: () => onNavigate('about', 'mission') },
        { name: 'Tin tức', action: () => onNavigate('news') }
      ]
    },
    {
      title: 'Dịch vụ',
      links: [
        { name: 'Khóa học online', action: () => onNavigate('courses') },
        { name: 'Luyện thi IELTS', action: () => onNavigate('courses', 'ielts') },
        { name: 'Luyện thi TOEIC', action: () => onNavigate('courses', 'toeic') },
        { name: 'Tiếng Anh giao tiếp', action: () => onNavigate('courses', 'speaking') }
      ]
    },
    {
      title: 'Hỗ trợ',
      links: [
        { name: 'Liên hệ', action: () => onNavigate('contact') },
        { name: 'FAQ', action: () => onNavigate('faq') },
        { name: 'Hướng dẫn học', action: () => onNavigate('guide') },
        { name: 'Chính sách bảo mật', action: () => onNavigate('privacy') }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập đăng ký nhận tin
    const email = e.target.elements[0].value;
    if (email) {
      alert(`Cảm ơn bạn đã đăng ký nhận tin với email: ${email}`);
      e.target.reset();
    }
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo" onClick={() => onNavigate('home')}>
                <span className="logo-text">Tempo</span>
              </div>
              <p className="footer-description">
                Nền tảng học tiếng Anh trực tuyến hàng đầu với chất lượng giảng dạy 
                chuyên nghiệp và phương pháp học hiện đại.
              </p>
              
              {/* Contact Info */}
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Nguyễn Văn Cừ, Q.5, TP.HCM</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>(+84) 28 1234 5678</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>info@tempo.vn</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="footer-social">
                <span className="social-title">Theo dõi chúng tôi:</span>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      title={social.name}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="footer-section">
                <h3 className="footer-section-title">{section.title}</h3>
                <ul className="footer-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button 
                        onClick={link.action}
                        className="footer-link"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Section */}
            <div className="footer-newsletter">
              <h3 className="footer-section-title">Đăng ký nhận tin</h3>
              <p className="newsletter-description">
                Nhận thông tin về khóa học mới và các chương trình ưu đãi đặc biệt.
              </p>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="newsletter-input-group">
                  <input 
                    type="email" 
                    placeholder="Nhập email của bạn"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
              <p className="newsletter-note">
                * Chúng tôi cam kết bảo mật thông tin cá nhân của bạn
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Tempo. Tất cả quyền được bảo lưu.</p>
            </div>
            <div className="footer-bottom-links">
              <button onClick={() => onNavigate('terms')} className="bottom-link">Điều khoản sử dụng</button>
              <span className="separator">|</span>
              <button onClick={() => onNavigate('privacy')} className="bottom-link">Chính sách bảo mật</button>
              <span className="separator">|</span>
              <button onClick={() => onNavigate('cookies')} className="bottom-link">Cookie Policy</button>
            </div>
            <div className="footer-certification">
              <span className="cert-text">Chứng nhận bởi:</span>
              <div className="cert-badges">
                <span className="cert-badge">ISO 9001:2015</span>
                <span className="cert-badge">CAMBRIDGE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;