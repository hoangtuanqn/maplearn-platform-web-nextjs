# MapLearn - Nền tảng học tập trực tuyến dành cho học sinh THPT

## Giới thiệu

**MapLearn** là một hệ sinh thái học tập trực tuyến hoàn chỉnh được xây dựng bằng **Next.js 15**, **React 19**, và **TypeScript**, mang đến giải pháp học tập toàn diện và hiện đại cho học sinh Trung học Phổ thông. Hệ thống không chỉ đơn thuần là nơi xem video bài giảng, mà còn tích hợp đầy đủ các tính năng từ quản lý khóa học có cấu trúc, hệ thống thi trắc nghiệm trực tuyến với chống gian lận, thanh toán tự động, cấp chứng chỉ điện tử, đến trợ lý AI thông minh hỗ trợ học tập 24/7.

Đây là đồ án học kỳ 2 của nhóm sinh viên Aptech FPT, đã được nhà trường đánh giá cao và vinh danh trên **[blog chính thức của Aptech FPT](https://aptech.fpt.edu.vn/maplearn-edu-nen-tang-hoc-tap-truc-tuyen-danh-cho-hoc-sinh-thpt.html)** - một minh chứng cho chất lượng và tính ứng dụng thực tế của dự án.

### Demo & Links quan trọng

- **Website trực tiếp**: [https://maplearn.htuanqn.id.vn/](https://maplearn.htuanqn.id.vn/)
- **Video demo chi tiết**: [https://youtu.be/tpkcZAqdP0o?si=aHccOsdD29jahqed](https://youtu.be/tpkcZAqdP0o?si=aHccOsdD29jahqed)
- **Backend API Repository**: [https://github.com/hoangtuanqn/maplearn-platform-api](https://github.com/hoangtuanqn/maplearn-platform-api)
- **Bài viết trên blog Aptech**: [MapLearn trên Aptech FPT](https://aptech.fpt.edu.vn/maplearn-edu-nen-tang-hoc-tap-truc-tuyen-danh-cho-hoc-sinh-thpt.html)

![Hình ảnh minh họa](https://i.ibb.co/fVW9tfSH/2025-12-09-090407.png)
![Hình ảnh minh họa](https://i.ibb.co/fVW9tfSH/2025-12-09-090407.png)
![Hình ảnh minh họa](https://i.ibb.co/m53WkjDz/1.png)
![Hình ảnh minh họa](https://i.ibb.co/Lh9PLcsW/2.png)
![Hình ảnh minh họa](https://i.ibb.co/Nnr3dm20/3.png)

---

### Điểm nổi bật của MapLearn

**MapLearn** không chỉ là một nền tảng học tập thông thường, mà là một giải pháp công nghệ giáo dục toàn diện với:

- **Hệ thống 3 vai trò**: Học sinh, Giảng viên, và Quản trị viên - mỗi vai trò có dashboard và chức năng riêng biệt
- **AI Integration**: Tích hợp Google Gemini 2.0 Flash cho chatbot tư vấn và tạo lộ trình học tập cá nhân hóa
- **Real-time**: Sử dụng Pusher.js cho thông báo và cập nhật thời gian thực
- **Payment Gateway**: Hệ thống thanh toán tự động với mã QR và xác nhận giao dịch
- **Anti-Cheating**: Hệ thống chống gian lận tiên tiến khi làm bài thi trực tuyến
- **Certificate System**: Tự động cấp chứng chỉ điện tử với mã xác thực sau khi hoàn thành khóa học
- **Advanced Video Player**: Player video tùy chỉnh với tracking tiến độ xem và bookmark
- **Responsive Design**: Giao diện hoàn hảo trên mọi thiết bị từ desktop đến mobile

---

## Thành viên nhóm

Dự án được phát triển bởi nhóm sinh viên Aptech FPT:

- **Phạm Hoàng Tuấn** - Team Leader
- **Lâm Hoàng An**
- **Trần Hoàng Anh**

---

## Tính năng nổi bật

### Dành cho Học sinh

#### Xác thực & Bảo mật

- **Đăng ký tài khoản** với xác minh email tự động
- **Đăng nhập đa nền tảng**: Facebook, Google, Discord
- **Xác thực 2 yếu tố (2FA)** tăng cường bảo mật tài khoản
- **Quên mật khẩu** và đặt lại mật khẩu qua email
- **Quản lý phiên đăng nhập** với JWT Token & Refresh Token

#### Học tập thông minh

- **Kho khóa học đa dạng** theo từng môn học và cấp độ
- **Video bài giảng chất lượng cao** với player tùy chỉnh (Plyr)
- **Theo dõi tiến độ học tập** chi tiết từng bài học
- **Đánh dấu bài học yêu thích** để học lại sau
- **Lưu lịch sử học tập** tự động với thời gian xem video
- **Giỏ hàng thông minh** cho phép thêm/xóa khóa học
- **Thanh toán đa dạng** (chuyển khoản, ví điện tử) với mã QR tự động
- **Chứng chỉ hoàn thành** được cấp sau khi hoàn thành khóa học
- **Tìm kiếm & lọc khóa học** theo danh mục, giá, đánh giá

#### Hệ thống thi cử

- **Ngân hàng đề thi phong phú** theo từng môn và chủ đề
- **Thi online với bộ đếm thời gian** chính xác
- **Đề thi đa cấp độ**: Dễ, Trung bình, Khó, Rất khó
- **Đề thi bảo mật** với mật khẩu (nếu cần)
- **Chống gian lận**: Phát hiện chuyển tab, thoát trình duyệt
- **Chấm điểm tự động** và hiển thị kết quả chi tiết
- **Bảng xếp hạng** theo từng đề thi
- **Lịch sử làm bài** và phân tích kết quả
- **Xem lại đáp án** sau khi hoàn thành

#### Trợ lý AI thông minh

- **Chatbot AI tư vấn** hỗ trợ 24/7 (Google Gemini 2.0)
- **Tạo lộ trình học tập cá nhân hóa** với AI
- **Giải thích bài tập** và trả lời thắc mắc học thuật
- **Gợi ý khóa học phù hợp** dựa trên hành vi học tập

#### Cộng đồng & Tài liệu

- **Blog kiến thức** với bài viết chuyên sâu
- **Thông tin giảng viên** chi tiết và đánh giá
- **Đánh giá & nhận xét** khóa học
- **Thông báo real-time** (Pusher.js)
- **Responsive hoàn hảo** trên mọi thiết bị

### Dành cho Giảng viên

- **Dashboard thống kê** doanh thu, học viên, khóa học
- **Tạo và quản lý khóa học** với editor WYSIWYG
- **Quản lý chương trình học**: Chapters & Lessons
- **Upload video bài giảng** (Cloudinary integration)
- **Tạo và quản lý đề thi** với nhiều dạng câu hỏi
- **Theo dõi tiến độ học viên** theo từng khóa học
- **Quản lý doanh thu** từ các khóa học

### Dành cho Quản trị viên

- **Dashboard tổng quan** hệ thống với biểu đồ trực quan
- **Quản lý người dùng**: Học viên, Giảng viên
- **Quản lý toàn bộ khóa học** và nội dung
- **Quản lý đề thi** và ngân hàng câu hỏi
- **Quản lý thanh toán** và giao dịch
- **Báo cáo thống kê** chi tiết theo khoảng thời gian
- **Phân quyền hệ thống** và kiểm soát truy cập
- **Export dữ liệu** ra Excel (xlsx)

---

## Công nghệ sử dụng

### Core Technologies

- **[Next.js 15.4.7](https://nextjs.org/)** - Framework React với App Router & Server Components
- **[React 19.1.1](https://react.dev/)** - Thư viện UI với React Compiler
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management & Data Fetching

- **[@reduxjs/toolkit](https://redux-toolkit.js.org/)** - State management cho user & app state
- **[@tanstack/react-query](https://tanstack.com/query/latest)** - Server state management & caching
- **[Axios](https://axios-http.com/)** - HTTP client với interceptors

### UI Components & Styling

- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built on Radix
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton)** - Loading placeholders
- **[Swiper](https://swiperjs.com/)** - Touch slider

### Form Handling & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolver

### Media & Rich Content

- **[Plyr](https://plyr.io/)** - Video player
- **[KaTeX](https://katex.org/)** & **[React KaTeX](https://github.com/MatejBransky/react-katex)** - Math equations rendering
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Remark Math](https://github.com/remarkjs/remark-math)** - Math support for Markdown
- **[Rehype KaTeX](https://github.com/remarkjs/rehype-katex)** - KaTeX transformer
- **[Cloudinary](https://cloudinary.com/)** - Media management & optimization

### Charts & Visualization

- **[Recharts](https://recharts.org/)** - Composable charting library
- **[React Circular Progressbar](https://github.com/kevinsqi/react-circular-progressbar)** - Progress circles
- **[React Vertical Timeline](https://github.com/stephane-monnot/react-vertical-timeline)** - Timeline component

### Utilities

- **[Lodash](https://lodash.com/)** - JavaScript utility library
- **[date-fns](https://date-fns.org/)** - Date manipulation
- **[UUID](https://github.com/uuidjs/uuid)** - Unique identifier generation
- **[File Saver](https://github.com/eligrey/FileSaver.js/)** - File downloading
- **[XLSX](https://sheetjs.com/)** - Excel file handling
- **[HTML to Image](https://github.com/bubkoo/html-to-image)** - Certificate generation

### Real-time & Notifications

- **[Pusher.js](https://pusher.com/)** - Real-time notifications
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[@mycv/f8-notification](https://www.npmjs.com/package/@mycv/f8-notification)** - Notification sounds
- **[Howler.js](https://howlerjs.com/)** - Audio library

### Authentication & Security

- **JWT Tokens** - Access & refresh token mechanism
- **2FA Support** - Two-factor authentication với QR code
- **[React QR Code](https://github.com/rosskhanas/react-qr-code)** - QR code generation

### Developer Experience

- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - Code linting & formatting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler (dev mode)
- **[@tanstack/eslint-plugin-query](https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query)** - React Query ESLint rules

### AI Integration

- **[Google Gemini 2.0 Flash](https://ai.google.dev/)** - AI chatbot & learning roadmap generation

### Other Notable Libraries

- **[Driver.js](https://driverjs.com/)** - Product tours & feature highlights
- **[NProgress](https://ricostacruz.com/nprogress/)** - Top loading bar
- **[React Day Picker](https://react-day-picker.js.org/)** - Date picker
- **[Input OTP](https://github.com/guilhermerodz/input-otp)** - OTP input component
- **[React Rating](https://github.com/smastrom/react-rating)** - Star rating component
- **[React Tooltip](https://react-tooltip.com/)** - Tooltips
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

---

## Hướng dẫn cài đặt

### Yêu cầu hệ thống

- **Node.js**: >= 18.x
- **npm** hoặc **yarn** hoặc **pnpm**
- **Git**

### Các bước cài đặt

#### 1. Clone repository

```bash
git clone https://github.com/hoangtuanqn/maplearn-platform-web-nextjs.git
cd maplearn-platform-web-nextjs
```

#### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

#### 3. Cấu hình môi trường

Sao chép file `.env.example` thành `.env` và điều chỉnh các giá trị:

```bash
cp .env.example .env
```

Cập nhật các thông tin sau trong file `.env`:

```env
# App Information
NEXT_PUBLIC_APP_NAME="MapLearn - Định vị tri thức - dẫn lối tư duy"
NEXT_PUBLIC_APP_ENV=development
APP_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Pusher (Real-time notifications)
NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_app_key
NEXT_PUBLIC_PUSHER_APP_CLUSTER=ap1

# AI Configuration
NEXT_PUBLIC_MODEL_AI=gemini-2.0-flash
API_GEMINI=your_gemini_api_key

# Cloudinary (Media storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Lưu ý**: Bạn cần đăng ký và lấy API keys từ:

- [Pusher](https://pusher.com/) cho real-time notifications
- [Google AI Studio](https://ai.google.dev/) cho Gemini API
- [Cloudinary](https://cloudinary.com/) cho media storage

#### 4. Chạy ứng dụng

##### Development mode

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

##### Production build

```bash
npm run build
npm run start
```

#### 5. Cài đặt Backend API

Frontend này cần kết nối với Backend API. Vui lòng cài đặt backend từ repository:

**[MapLearn Backend API](https://github.com/hoangtuanqn/maplearn-platform-api)**

---

## Demo & Deployment

### Website Production

**[https://maplearn.htuanqn.id.vn/](https://maplearn.htuanqn.id.vn/)**

### Tài khoản demo

#### Học sinh

- Bạn có thể tự tạo được tài khoản học sinh mới qua trang đăng ký.

#### Giảng viên

- **Username**: `nguyen_anh_phong_2`
- **Password**: `Aptech@123`

#### Quản trị viên

- **Email**: `vu_ngoc_anh_1`
- **Password**: `Aptech@123`

**Lưu ý**: Đây là tài khoản demo. Vui lòng không thay đổi thông tin quan trọng.

---

## Scripts

```bash
# Chạy development server với Turbopack
npm run dev

# Build production
npm run build

# Chạy production server
npm run start

---

## Roadmap

### Phiên bản hiện tại (v1.0.0)

- Hệ thống xác thực & phân quyền
- Quản lý khóa học & bài giảng
- Hệ thống thi trực tuyến
- Thanh toán & chứng chỉ
- AI Chatbot & Roadmap Generator
- Dashboard cho Admin & Teacher

### Phiên bản tương lai (v2.0.0)

- Live streaming cho bài giảng
- Forum thảo luận giữa học viên
- Gamification: Điểm, huy hiệu, xếp hạng
- Mobile App (React Native)
- Offline mode cho video đã tải
- Tích hợp Zoom/Google Meet
- AI grading cho bài tự luận
- Social learning features
- Hệ thống gợi ý học tập nâng cao với AI
