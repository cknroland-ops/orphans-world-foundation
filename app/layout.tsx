import type {Metadata} from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import './custom.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-dmsans' });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orphansworldfoundation.org';

export const metadata: Metadata = {
  title: 'Orphans World Foundation | Aide aux Orphelins & Dons Humanitaires',
  description: "Soutenez Orphans World Foundation. Ensemble, changeons la vie des enfants orphelins et vulnérables par des dons, des parrainages et des actions concrètes sur le terrain. Faites un impact dès aujourd'hui.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'Orphans World Foundation | Aide aux Orphelins & Dons Humanitaires',
    description: "Soutenez Orphans World Foundation. Ensemble, changeons la vie des enfants orphelins et vulnérables par des dons, des parrainages et des actions concrètes sur le terrain. Faites un impact dès aujourd'hui.",
    url: BASE_URL,
    siteName: 'Orphans World Foundation',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Orphans World Foundation – Aide aux enfants orphelins et vulnérables' }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orphans World Foundation | Aide aux Orphelins & Dons Humanitaires',
    description: "Soutenez Orphans World Foundation. Ensemble, changeons la vie des enfants orphelins et vulnérables par des dons, des parrainages et des actions concrètes sur le terrain.",
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.jpg', type: 'image/jpeg', sizes: '32x32' },
    ],
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
