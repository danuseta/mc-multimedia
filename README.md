# EduLearn - Platform Pembelajaran Multimedia

Platform pembelajaran interaktif yang menggabungkan video, audio, dan animasi untuk pengalaman belajar yang tak terlupakan.

## 🚀 Fitur Utama

### 🎥 **Video Pembelajaran HD**
- Video player custom dengan kontrol lengkap
- Support fullscreen dan kualitas HD
- Progress bar interaktif
- Auto-pause dan resume

### 🎵 **Audio Narasi Berkualitas**
- Audio player dengan visualizer
- Kontrol volume dan mute
- Skip forward/backward 10 detik
- Kualitas audio studio

### ✨ **Animasi Interaktif**
- Animasi halus menggunakan Framer Motion
- Hover effects dan micro-interactions
- Loading animations dan transitions
- Scroll-triggered animations

### 🎮 **Quiz & Assessment**
- Quiz interaktif dengan sistem scoring
- Feedback real-time
- Progress tracking
- Berbagai tipe pertanyaan

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## 📱 Fitur Responsif

- Desktop-first design
- Mobile-friendly navigation
- Adaptive video player
- Responsive grid layouts

## 🚀 Cara Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

3. **Build untuk Production**
   ```bash
   npm run build
   ```

4. **Preview Build**
   ```bash
   npm run preview
   ```

## 📁 Struktur Project

```
src/
├── components/           # Komponen reusable
│   ├── Navbar.tsx       # Navigation bar
│   ├── Footer.tsx       # Footer
│   ├── VideoPlayer.tsx  # Custom video player
│   ├── AudioPlayer.tsx  # Custom audio player
│   └── AnimatedCard.tsx # Animated card wrapper
├── pages/               # Halaman utama
│   ├── HomePage.tsx     # Landing page
│   ├── CoursePage.tsx   # Detail kursus
│   └── LessonPage.tsx   # Halaman lesson interaktif
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```
