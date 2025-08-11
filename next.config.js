/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://woodstock-technical-chatbot-full-fe.vercel.app"
          },
          {
            key: 'X-Frame-Options',
            value: ''
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig 