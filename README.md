# TEMPO - Nền tảng Giáo dục Tiếng Anh Online

## 📖 Mô tả dự án
TEMPO là một nền tảng giáo dục tiếng Anh hiện đại, cung cấp các khóa học, tài liệu và sách tiếng Anh chất lượng cao. Website hỗ trợ đa ngôn ngữ (Tiếng Việt/English) với giao diện thân thiện và tính năng tương tác đa dạng.

## ✨ Tính năng chính
- 🌐 **Đa ngôn ngữ**: Hỗ trợ Tiếng Việt và English
- 🛒 **Giỏ hàng**: Thêm/xóa sản phẩm, quản lý số lượng
- ❤️ **Yêu thích**: Lưu sản phẩm yêu thích
- 🔍 **Tìm kiếm**: Tìm kiếm sản phẩm thông minh
- 📱 **Responsive**: Tương thích đa thiết bị
- 🌙 **Dark/Light Mode**: Chế độ sáng/tối
- 💬 **Chatbot AI**: Hỗ trợ tư vấn tự động
- 🔐 **Xác thực**: Đăng nhập/đăng ký
- 📧 **Liên hệ**: Form liên hệ và thông tin

## 🛠 Công nghệ sử dụng
- **Frontend**: React 19.1.0
- **Internationalization**: react-i18next
- **UI Components**: Custom CSS với responsive design
- **State Management**: React Context API
- **Routing**: React Router (có sẵn trong dependencies)
- **Notifications**: SweetAlert2
- **Build Tool**: Create React App

## 📋 Yêu cầu hệ thống
- Node.js >= 14.0.0
- npm >= 6.0.0 hoặc yarn >= 1.22.0
- Git
- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository
```bash
git clone https://github.com/your-company/tempo-education.git
cd tempo-education/my-app
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Kiểm tra dependencies
Đảm bảo các package sau đã được cài đặt:
```bash
npm list --depth=0
```

## 🎯 Hướng dẫn chạy ứng dụng

### Development Mode (Chế độ phát triển)
```bash
npm start
```
- Ứng dụng sẽ chạy tại: http://localhost:3000
- Tự động reload khi có thay đổi code
- Hiển thị lỗi trong console

### Production Build (Build sản xuất)
```bash
npm run build
```
- Tạo folder `build/` với files tối ưu
- Sẵn sàng để deploy lên server

### Chạy tests
```bash
npm test
```
- Chạy test suite trong interactive mode
- Hiển thị coverage report

### Serve Production Build (Chạy bản build)
```bash
npx serve -s build -l 3000
```
- Chạy bản build tại http://localhost:3000
- Mô phỏng môi trường production

## 📁 Cấu trúc thư mục
```
my-app/
├── public/                 # Static files
│   ├── images/            # Hình ảnh sản phẩm
│   └── index.html         # HTML template
├── src/
│   ├── components/        # React components
│   │   ├── Header.js      # Navigation header
│   │   ├── ProductCard.js # Thẻ sản phẩm
│   │   ├── Cart.js        # Giỏ hàng
│   │   └── ...
│   ├── contexts/          # React Context
│   │   └── CartContext.js # Quản lý giỏ hàng
│   ├── data/              # Mock data
│   │   └── mockData.js    # Dữ liệu sản phẩm
│   ├── locales/           # i18n translations
│   │   ├── en/            # English translations
│   │   └── vi/            # Vietnamese translations
│   ├── styles/            # Global styles
│   └── App.js             # Main component
├── build/                 # Production build
└── package.json          # Dependencies
```

## 🔧 Configuration

### Environment Variables
Tạo file `.env.local` trong thư mục root:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

### Đa ngôn ngữ
- Thêm translations trong `src/locales/`
- Sử dụng hook `useTranslation()` trong components
- Format: `t('namespace.key')`

## 🚢 Deployment

### Deploy lên Netlify
```bash
npm run build
# Drag & drop folder build/ vào Netlify
```

### Deploy lên Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy lên GitHub Pages
```bash
npm install --save-dev gh-pages
# Thêm vào package.json: "homepage": "https://username.github.io/repo-name"
npm run build
npm run deploy
```

## 📱 Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Theme Variables
```css
/* Light Theme */
--primary-color: #3498db
--secondary-color: #2c3e50
--success-color: #27ae60
--error-color: #e74c3c

/* Dark Theme */
--bg-primary: #1a1a1a
--bg-secondary: #2d2d2d
--text-primary: #ffffff
```

## 🔍 Troubleshooting

### Lỗi npm install
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Lỗi port đã được sử dụng
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Lỗi build fails
```bash
npm run build -- --verbose
# Kiểm tra console errors
```

## 👥 Team Development

### Code Style
- Sử dụng ESLint configuration
- Prettier cho code formatting
- Commit message format: `type: description`

### Git Workflow
```bash
git checkout -b feature/ten-tinh-nang
git add .
git commit -m "feat: thêm tính năng xyz"
git push origin feature/ten-tinh-nang
```

## 📞 Hỗ trợ
- **Email**: dev@tempo.vn
- **Documentation**: [Link internal docs]
- **Issues**: [GitHub Issues]

## 📄 License
© 2025 TEMPO Education. All rights reserved.
