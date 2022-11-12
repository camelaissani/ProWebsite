/** @type {import('next').NextConfig} */

const profileUrl = new URL(process.env.PROFILE_URL);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    PROFILE_URL: process.env.PROFILE_URL,
    WEB3_FORMS_ACCESS_KEY: process.env.WEB3_FORMS_ACCESS_KEY,
  },
  basePath: process.env.BASE_PATH || '',
  images: {
    remotePatterns: [
      {
        protocol: profileUrl.protocol?.replace(':', '') || 'http',
        hostname: profileUrl.hostname,
        port: '',
        pathname: '/cdn/camel/**',
      },
    ],
  },
};

module.exports = nextConfig;
