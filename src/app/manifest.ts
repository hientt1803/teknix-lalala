import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LaLaLa - Premium Hotels Booking Platform",
    short_name: "Lalala",
    description:
      "Affordable Travel Bookings | Lalala - Your Trusted Online Travel Agency.",
    start_url: `/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: `/assets/favicon/lalala.svg`,
        sizes: "192x192",
        type: "image/svg",
      },
      {
        src: `/assets/favicon/lalala.svg`,
        sizes: "512x512",
        type: "image/svg",
      },
    ],
  };
}