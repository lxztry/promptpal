/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@promptpal/config', '@promptpal/db'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

module.exports = nextConfig;
