import type {Metadata} from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import './custom.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-dmsans' });

export const metadata: Metadata = {
  title: 'Orphans World Foundation',
  description: 'Nous finançons des destins - Protection des droits de l\'enfant',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
