import type { Metadata, Viewport } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import '@/styles/globals.css';
import axios from 'axios';
import Layout from '@/pages/Layout';
import type { ProfileType } from '@/types';
import { cn } from '@/utils';

const robotSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  const response = process.env.NEXT_PUBLIC_PROFILE_URL
    ? await axios.get<ProfileType>(process.env.NEXT_PUBLIC_PROFILE_URL)
    : { data: undefined };

  if (!response.data) {
    return {
      title: 'My Profile',
      description: 'My experience and skills',
      icons: {
        icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`,
      },
    };
  }

  return {
    title: response.data.name,
    description: response.data.slogan,
    icons: {
      icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`,
    },
    keywords: 'resume, experience, skills, portfolio, profile, cv',
    authors: {
      name: response.data.name,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="yes">
      <body
        className={cn('antialiased', robotSans.variable, robotoMono.variable)}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
