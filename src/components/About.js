import React from 'react';
import './About.css';

// Dữ liệu mẫu
const missionData = {
  mission: "Sứ mệnh của chúng tôi là phá bỏ rào cản ngôn ngữ, trao quyền cho mỗi cá nhân thông qua việc cung cấp giáo dục tiếng Anh chất lượng cao, dễ tiếp cận và hiệu quả.",
  vision: "Tầm nhìn của chúng tôi là trở thành nền tảng giáo dục tiếng Anh hàng đầu, nơi công nghệ và chuyên môn sư phạm kết hợp để tạo ra những trải nghiệm học tập đột phá."
};

const approachPillars = [
  {
    icon: '🎯',
    title: 'Lộ trình cá nhân hóa',
    description: 'Mỗi học viên được xây dựng một lộ trình học tập riêng biệt, phù hợp với mục tiêu và trình độ đầu vào.'
  },
  {
    icon: '👩‍🏫',
    title: 'Giảng viên chuyên môn',
    description: 'Đội ngũ giảng viên được tuyển chọn kỹ lưỡng, có kinh nghiệm và chứng chỉ quốc tế.'
  },
  {
    icon: '💡',
    title: 'Ứng dụng thực tiễn',
    description: 'Chương trình học tập trung vào các tình huống giao tiếp thực tế trong công việc và cuộc sống.'
  }
];

const teamMembers = [
  {
    name: 'Dr. Anna Petrova',
    role: 'Founder & Head of Academics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces' // Đã thay đổi hình ảnh
  },
  {
    name: 'Johnathan Lee',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces'
  },
  {
    name: 'Sophia Chen',
    role: 'Student Success Lead',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces'
  }
];

const About = () => {
  return (
    <div className="about-pro">
      {/* HERO SECTION */}
      <header className="about-pro-hero">
        <div className="about-pro-container">
          <div className="hero-content-wrapper">
            <div className="hero-text-content">
              <span className="hero-tagline">Về Tempo</span>
              <h1 className="hero-main-title">
                Trao quyền cho tương lai thông qua giáo dục tiếng Anh
              </h1>
              <p className="hero-description">
                Chúng tôi tin rằng việc thành thạo tiếng Anh là chìa khóa mở ra cánh cửa tri thức, cơ hội và kết nối toàn cầu.
              </p>
              <a href="#approach" className="btn btn-primary-pro">
                Khám phá phương pháp của chúng tôi
              </a>
            </div>
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop" 
                alt="Students collaborating" 
                className="hero-main-image"
              />
            </div>
          </div>
        </div>
      </header>

      {/* MISSION & VISION SECTION */}
      <section className="about-pro-mission">
        <div className="about-pro-container mission-grid">
          <div className="mission-card">
            <h2 className="mission-title">Sứ mệnh</h2>
            <p className="mission-text">{missionData.mission}</p>
          </div>
          <div className="mission-card">
            <h2 className="mission-title">Tầm nhìn</h2>
            <p className="mission-text">{missionData.vision}</p>
          </div>
        </div>
      </section>

      {/* OUR APPROACH SECTION */}
      <section id="approach" className="about-pro-approach">
        <div className="about-pro-container">
          <div className="section-header">
            <span className="section-tagline">Phương pháp của chúng tôi</span>
            <h2 className="section-title">Ba trụ cột tạo nên sự khác biệt</h2>
            <p className="section-subtitle">
              Chúng tôi xây dựng trải nghiệm học tập dựa trên nền tảng vững chắc, đảm bảo hiệu quả và sự tiến bộ cho mỗi học viên.
            </p>
          </div>
          <div className="approach-grid">
            {approachPillars.map((pillar, index) => (
              <div key={index} className="pillar-card">
                <div className="pillar-icon">{pillar.icon}</div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="about-pro-team">
        <div className="about-pro-container">
          <div className="section-header">
            <span className="section-tagline">Đội ngũ</span>
            <h2 className="section-title">Những con người tâm huyết</h2>
            <p className="section-subtitle">
              Gặp gỡ những chuyên gia đầu ngành đang nỗ lực mỗi ngày vì sự thành công của bạn.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <img src={member.image} alt={member.name} className="team-member-image" />
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="about-pro-cta">
        <div className="about-pro-container cta-container">
          <h2 className="cta-title">Sẵn sàng cho bước tiến mới?</h2>
          <p className="cta-subtitle">
            Hãy để Tempo trở thành người bạn đồng hành đáng tin cậy trên hành trình chinh phục tiếng Anh của bạn.
          </p>
          <div className="cta-buttons">
            <a href="/courses" className="btn btn-primary-pro">Bắt đầu học ngay</a>
            <a href="/contact" className="btn btn-secondary-pro">Liên hệ tư vấn</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;