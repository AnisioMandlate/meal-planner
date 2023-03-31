/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  mode: "production",
  disable: false,
});

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tsjbwhyfieshnwxcrhjl.supabase.co",
      },
    ],
  },
  nextConfig,
};
