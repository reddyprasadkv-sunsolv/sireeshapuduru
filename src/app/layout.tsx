import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ClientProtectionGuard } from '@/components/security/ClientProtectionGuard';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reddyprasadkv-sunsolv.github.io/sireeshapuduru'),
  title: 'Sireesha Puduru | The Art of Loving Academy — Healing, Self-Love & Transformation',
  description: 'Guiding you to reconnect with your heart, heal your emotions, and live a life of peace, prosperity, and purpose. Experience Louise Hay mirror work, 2-day immersive workshops, and 1-to-1 personal coaching with Sireesha Puduru.',
  keywords: 'Sireesha Puduru, Art of Loving Academy, Heal Your Life, Louise Hay, Mirror Work, Self-Love, Emotional Healing, Personal Transformation, Spiritual Life Coach India',
  authors: [{ name: 'Sireesha Puduru' }],
  openGraph: {
    title: 'Sireesha Puduru | Space of Healing, Love & Transformation',
    description: 'Guiding you to reconnect with your heart, heal your emotions, and live a life of peace, prosperity, and purpose.',
    images: ['assets/images/sireesha-portrait.jpg'],
    type: 'website',
  },
  icons: {
    icon: 'assets/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dawn" className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body>
        <ThemeProvider>
          <ClientProtectionGuard />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
