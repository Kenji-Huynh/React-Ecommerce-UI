import React from 'react';
import { useTranslation } from 'react-i18next';
import './HeroSection.css';

const HeroSection = ({ onExplore }) => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {t('hero.title')}
            </h1>
            
            <ul className="hero-features">
              <li className="feature-item">
                {t('hero.feature1')}
              </li>
              <li className="feature-item">
                {t('hero.feature2')}
              </li>
              <li className="feature-item">
                {t('hero.feature3')}
              </li>
            </ul>
            
            <div className="hero-cta">
              <button className="hero-btn" onClick={onExplore}>
                {t('hero.exploreButton')}
              </button>
            </div>
          </div>
          
          <div className="hero-image">
            <img 
              src="/hero-image.jpg" 
              alt={t('hero.title')} 
              className="hero-img"
            />
            <div className="language-bubbles">
              <div className="bubble bubble-1">IELTS</div>
              <div className="bubble bubble-2">TOEIC</div>
              <div className="bubble bubble-3">Hello</div>
              <div className="bubble bubble-4">{t('products.course')}</div>
              <div className="bubble bubble-5">Bonjour</div>
              <div className="bubble bubble-6">Speaking</div>
              <div className="bubble bubble-7">Grammar</div>
              <div className="bubble bubble-8">Ngữ pháp</div>
              <div className="bubble bubble-9">Business</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;