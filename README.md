# Cúc Quy — Landing Page

Landing page tĩnh (Next.js 14 App Router, static export) cho Tiệm bánh Cúc Quy. Tối ưu SEO: HTML có sẵn nội dung, metadata đầy đủ, JSON-LD `Bakery`, sitemap & robots.

## Phát triển

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static export)

```bash
npm run build      # tạo thư mục ./out chứa index.html tĩnh
```

Output là HTML tĩnh thuần trong `out/`, có thể serve bằng bất kỳ static host nào.

## Deploy bằng Docker (nginx)

```bash
docker build -t cucquy-landing .
docker run -p 8080:80 cucquy-landing   # http://localhost:8080
```

## Cấu trúc

- `app/layout.tsx` — Server Component: metadata SEO + JSON-LD structured data.
- `app/page.tsx` — Server Component: render các section theo thứ tự.
- `app/globals.css` — toàn bộ CSS thuần (cq2-*) của landing.
- `components/` — các section đã port từ bản React/Vite.
  - Server Components (nội dung vào HTML tĩnh): Story, Process, Occasions, Testimonials, HowToOrder, Instagram, CTA, GiftSets, Footer, MarqueeSection.
  - Client Components (`'use client'`, có tương tác): LandingShell (theme), Hero, Stats, Founder, ProductShowcase, FAQ, Newsletter, Shared (Reveal/SpotlightCursor/MagBtn/ThemeToggle).
- `app/sitemap.ts`, `public/robots.txt` — SEO.

Các nút "Đặt ngay/Đăng nhập" trỏ tới app quản trị/đặt hàng tại `https://admin.cucquy.site`.
