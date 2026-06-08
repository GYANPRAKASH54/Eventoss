import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Eventoss | Luxury & Premium Event Management Agency',
  description: 'Experience cinematic event execution with Eventoss. We design and curate luxury weddings, high-end corporate summits, live concerts, and premium product launches.',
  keywords: 'event management, luxury weddings, corporate events, product launches, event production, premium wedding planner, eventoss redesign',
  authors: [{ name: 'Eventoss Creative Team' }],
  metadataBase: new URL('https://eventoss-premium.example.com'),
  openGraph: {
    title: 'Eventoss | Luxury & Premium Event Management Agency',
    description: 'We orchestrate awe-inspiring experiences from concept to celebration. Explore our 3D stagings and premium planner.',
    url: 'https://eventoss-premium.example.com',
    siteName: 'Eventoss Redesign',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Eventoss Luxury Event Staging',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventoss | Luxury & Premium Event Management Agency',
    description: 'Cinematic event planning, interactive 3D stages, and luxury management.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rich Structured Data for SEO (Organization & Event Planner Business Schema)
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    'name': 'Eventoss Redesign',
    'image': 'https://eventoss-premium.example.com/og-image.jpg',
    '@id': 'https://eventoss-premium.example.com/#organization',
    'url': 'https://eventoss-premium.example.com',
    'telephone': '+1-800-555-0199',
    'priceRange': '$$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '777 Luxury Plaza, Suite 100',
      'addressLocality': 'Metropolis',
      'addressRegion': 'NY',
      'postalCode': '10001',
      'addressCountry': 'US',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 40.7128,
      'longitude': -74.006,
    },
    'sameAs': [
      'https://www.facebook.com/eventoss',
      'https://www.instagram.com/eventoss',
      'https://www.linkedin.com/company/eventoss',
    ],
  };

  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
