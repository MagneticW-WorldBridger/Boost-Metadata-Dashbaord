/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ruralking.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'", 
          },
          {
            key: 'X-Frame-Options',
            value: '',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 