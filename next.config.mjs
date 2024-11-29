/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: [
          "@reduxjs/toolkit",
          "date-fns",
          "leaflet",
          "framer-motion",
          "@novu/notification-center"
        ],
      },
};

export default nextConfig;