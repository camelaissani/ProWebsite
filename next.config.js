/** @type {import('next').NextConfig} */

const profileUrl = new URL(process.env.PROFILE_URL);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    PROFILE_URL: process.env.PROFILE_URL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    PIPEDREAM_CONTACT_FORM_ENDPOINT:
      process.env.PIPEDREAM_CONTACT_FORM_ENDPOINT,
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
