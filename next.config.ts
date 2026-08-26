import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Si en el futuro sirves imágenes desde un CDN externo, añade el host aquí.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
