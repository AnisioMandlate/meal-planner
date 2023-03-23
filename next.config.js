/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

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
