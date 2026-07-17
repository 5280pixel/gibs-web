import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Hostinger (or any shared hosting)
  output: "export",
  // Folder URLs work reliably on Apache/Hostinger: /work/miracle-truss/index.html
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; serve images as-is for static hosting
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
