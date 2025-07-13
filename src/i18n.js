import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các file ngôn ngữ
import vi from './locales/vi/translation.json';
import en from './locales/en/translation.json';

const resources = {
  vi: {
    translation: vi
  },
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'vi', // Ngôn ngữ dự phòng
    
    interpolation: {
      escapeValue: false // React đã escape
    },
    
    // Cấu hình để phát hiện ngôn ngữ
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;