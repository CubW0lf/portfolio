/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.vincentcottalorda.me"],
  },
  publicRuntimeConfig: {
    url: process.env.DIRECTUS_URL,
  },
};

module.exports = nextConfig;
