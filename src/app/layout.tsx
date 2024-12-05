import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';

import { HOST_URL } from '@/configs';
import { cn } from '@/lib/utils';
import AppProvider from '@/providers/index';
import { SpeedInsights } from "@vercel/speed-insights/next"

const popins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

export const meta = {
  title: 'LaLaLa - Premium Hotels Booking Platform',
  description:
    'Affordable Travel Bookings | Lalala - Your Trusted Online Travel Agency  ',
  image: `/lalala.svg`,
};

export const metadata: Metadata = {
  metadataBase: new URL(HOST_URL || 'https://sb.lalala.travel'),
  title: {
    template: '%s',
    default: meta.title,
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: '/',
    locale: 'en-US',
    siteName: meta.title,
    type: 'website',
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: `/`,
  },
  icons: {
    icon: [
      {
        url: meta.image,
        type: 'image/png',
      },
      {
        url: meta.image,
        media: '(prefers-color-scheme: dark)',
        type: 'image/png',
      },
      {
        url: meta.image,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: meta.image,
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: [meta.image],
    apple: [
      { url: meta.image },
      {
        url: meta.image,
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: meta.image,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: `/manifest.json`,
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['tronghientran18@gmail.com', 'https://teknix-lalala.vercel.app/'],
    },
  },
  appLinks: {
    web: {
      url: '/',
      should_fallback: true,
    },
  },
  archives: ['/'],
  assets: ['/public/assets'],
  bookmarks: ['/'],
  category: 'Booking platform',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(popins.className)}>
        <AppProvider>{children}</AppProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
