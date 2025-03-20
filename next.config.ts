import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'chat.openai.com',
      'github.com',
      'figma.com',
      'dribbble.com',
      'developer.mozilla.org',
      'nextjs.org'
    ]
  }
};

export default nextConfig;
