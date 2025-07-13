import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState(''); // '', 'loading', 'success', 'error'

  // Thông tin liên hệ
  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Địa chỉ',
      details: ['123 Nguyễn Văn Cừ, Quận 5', 'TP. Hồ Chí Minh, Việt Nam']
    },
    {
      icon: 'fas fa-phone',
      title: 'Điện thoại',
      details: ['(+84) 28 1234 5678', '0909 123 456']
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: ['info@tempo.vn', 'support@tempo.vn']
    },
    {
      icon: 'fas fa-clock',
      title: 'Giờ làm việc',
      details: ['Thứ 2 - Thứ 6: 8:00 - 21:00', 'Thứ 7 - CN: 9:00 - 18:00']
    }
  ];

  // Các options cho dropdown subject
  const subjectOptions = [
    { value: 'general', label: 'Thông tin chung' },
    { value: 'courses', label: 'Tư vấn khóa học' },
    { value: 'support', label: 'Hỗ trợ kỹ thuật' },
    { value: 'business', label: 'Hợp tác kinh doanh' },
    { value: 'feedback', label: 'Góp ý dịch vụ' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    // Giả lập API call
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset form sau 5 giây
      setTimeout(() => {
        setFormStatus('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'general',
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Hero Section - Redesigned */}
      <section className="contact-hero">
        <div className="hero-decoration hero-decoration-1"></div>
        <div className="hero-decoration hero-decoration-2"></div>
        
        <div className="contact-hero-container">
          <div className="contact-hero-content">
            <div className="hero-badge">
              <svg className="hero-badge-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Hỗ trợ 24/7
            </div>
            
            <h1 className="contact-hero-title">
              Liên hệ với <span className="hero-title-highlight">TEMPO</span>
            </h1>
            
            <p className="contact-hero-subtitle">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong hành trình học tiếng Anh. 
              Hãy để lại thông tin, chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">24h</span>
                <span className="hero-stat-label">Thời gian phản hồi</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">1000+</span>
                <span className="hero-stat-label">Học viên tin tưởng</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">99%</span>
                <span className="hero-stat-label">Độ hài lòng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="info-icon">
                  <i className={info.icon}></i>
                </div>
                <h3 className="info-title">{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-form-section">
        <div className="contact-container">
          <div className="contact-content-grid">
            {/* Form */}
            <div className="form-container">
              <div className="form-header">
                <h2 className="form-title">Gửi tin nhắn cho chúng tôi</h2>
                <p className="form-subtitle">
                  Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại trong vòng 24 giờ.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                {formStatus === 'success' && (
                  <div className="success-message">
                    <div className="success-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="success-content">
                      <h4>Gửi thành công!</h4>
                      <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                    </div>
                  </div>
                )}

                {formStatus !== 'success' && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Họ và tên <span className="required">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Nhập họ và tên của bạn"
                          required
                          disabled={formStatus === 'loading'}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@domain.com"
                          required
                          disabled={formStatus === 'loading'}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0912 345 678"
                          disabled={formStatus === 'loading'}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="subject">Chủ đề <span className="required">*</span></label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          disabled={formStatus === 'loading'}
                          className="form-control"
                        >
                          {subjectOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Nội dung tin nhắn <span className="required">*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
                        rows="6"
                        required
                        disabled={formStatus === 'loading'}
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className={`submit-btn ${formStatus === 'loading' ? 'loading' : ''}`}
                        disabled={formStatus === 'loading'}
                      >
                        {formStatus === 'loading' ? (
                          <>
                            <span className="spinner"></span>
                            <span>Đang gửi...</span>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane"></i>
                            <span>Gửi tin nhắn</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>

            {/* Map Section - Thay thế bằng Google Maps iframe */}
            <div className="map-container">
              <div className="map-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7028029579615!2d106.68201777591747!3d10.757372589390263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b2cd4a717%3A0x1406ab379e92708f!2zMTIzIE5ndXnhu4VuIFbEg24gQ-G7qywgUGjGsOG7nW5nIDIsIFF14bqtbiA1LCBI4buTIENow60gTWluaCA4MDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1752244542731!5m2!1svi!2s" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Trung tâm TEMPO"
                  className="google-map"
                ></iframe>
                
                <div className="map-actions">
                  <a 
                    href="https://www.google.com/maps?ll=10.758,106.685082&z=16&t=m&hl=vi&gl=US&mapclient=embed&q=123+Nguy%E1%BB%85n+V%C4%83n+C%E1%BB%AB+Ph%C6%B0%E1%BB%9Dng+2+Qu%E1%BA%ADn+5+H%E1%BB%93+Ch%C3%AD+Minh+800000" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="map-btn"
                  >
                    <i className="fas fa-directions"></i>
                    <span>Chỉ đường</span>
                  </a>
                </div>
              </div>
              
              {/* FAQ Section - giữ nguyên phần này */}
              <div className="faq-section">
                <h3 className="faq-title">Câu hỏi thường gặp</h3>
                <div className="faq-item">
                  <h4 className="faq-question">Làm thế nào để đăng ký khóa học?</h4>
                  <p className="faq-answer">
                    Bạn có thể đăng ký trực tuyến thông qua website hoặc liên hệ trực tiếp với chúng tôi qua số hotline.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">Phương thức thanh toán nào được chấp nhận?</h4>
                  <p className="faq-answer">
                    Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, thẻ tín dụng và ví điện tử phổ biến.
                  </p>
                </div>
                <a href="#" className="view-all-faq">
                  Xem tất cả câu hỏi
                  <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;