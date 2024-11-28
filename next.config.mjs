/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: [
          "@reduxjs/toolkit",
          "date-fns",
          "leaflet"
        ],
      },
};

export default nextConfig;