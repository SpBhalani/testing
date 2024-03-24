/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ["i.ibb.co"],
    },
  
    env: {
      BASE_URL: process.env.SERVER_URL,
    },
    // experimental: {
    //   // scrollRestoration: false,
    // },
  };

module.exports = nextConfig
