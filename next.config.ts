import type { NextConfig } from 'next';

const profileUrl = new URL(process.env.NEXT_PUBLIC_PROFILE_URL as string);

const protocol: 'http' | 'https' | undefined =
  profileUrl.protocol === 'http:'
    ? 'http'
    : profileUrl.protocol === 'https:'
      ? 'https'
      : undefined;

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  basePath: process.env.BASE_PATH,
  images: {
    remotePatterns: [
      {
        protocol,
        hostname: profileUrl.hostname,
        pathname: '/cdn/camel/**',
      },
    ],
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
