import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Domain dari URL gambar Cloudinary Anda
      },
    ],
  },
};

export default nextConfig;