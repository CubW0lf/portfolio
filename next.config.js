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

const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  images: {
    domains: ["api.vincentcottalorda.me"],
  },
  publicRuntimeConfig: {
    url: process.env.DIRECTUS_URL,
  },
});
