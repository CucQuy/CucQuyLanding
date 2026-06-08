import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cucquy.site'),
  title: 'Tiệm bánh Cúc Quy — Cookies, Brownies & Set quà handmade tươi mỗi ngày',
  description:
    'Cúc Quy — tiệm bánh handmade tại Huế. Cookies lạnh signature, brownies đậm đà và set quà tặng gói trọn yêu thương. Nướng tươi mỗi ngày, đặt bánh giao tận nơi.',
  keywords: [
    'bánh handmade',
    'cookies',
    'cookies lạnh',
    'brownies',
    'set quà tặng',
    'đặt bánh',
    'tiệm bánh Cúc Quy',
    'bánh quy Huế',
    'quà tặng handmade',
    'bánh tươi mỗi ngày',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tiệm bánh Cúc Quy — Ngọt ngào handmade mỗi ngày',
    description:
      'Cookies lạnh, brownies & set quà handmade tươi mỗi ngày. Gửi yêu thương qua từng chiếc bánh cùng Cúc Quy.',
    url: 'https://cucquy.site',
    siteName: 'Tiệm bánh Cúc Quy',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tiệm bánh Cúc Quy — Cookies, Brownies & Set quà handmade',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiệm bánh Cúc Quy — Ngọt ngào handmade mỗi ngày',
    description:
      'Cookies lạnh, brownies & set quà handmade tươi mỗi ngày. Gửi yêu thương qua từng chiếc bánh cùng Cúc Quy.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'Tiệm bánh Cúc Quy',
  description:
    'Tiệm bánh handmade tại Huế — cookies lạnh signature, brownies đậm đà và set quà tặng. Nướng tươi mỗi ngày.',
  url: 'https://cucquy.site',
  image: 'https://cucquy.site/og-image.png',
  telephone: '+84776750418',
  servesCuisine: ['Cookies', 'Brownies', 'Bánh ngọt handmade'],
  priceRange: '9.000đ — 200.000đ',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Huế',
    addressCountry: 'VN',
  },
  sameAs: [
    'https://facebook.com/cucquy.bakery',
    'https://instagram.com/cucquy.bakery',
    'https://tiktok.com/@cucquy.bakery',
    'https://zalo.me/0776750418',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
