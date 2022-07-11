/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/photos/:id*",
  //       destination: "/:id*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
