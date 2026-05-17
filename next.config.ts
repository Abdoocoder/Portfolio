import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // output: 'export' is only set for GitHub Pages (static site).
  // Firebase App Hosting and local dev run a full Next.js server.
  ...(isGithubActions ? { output: 'export' } : {}),
  basePath: isGithubActions ? '/Portfolio' : '',
  assetPrefix: isGithubActions ? '/Portfolio/' : '',

  /* config options here */
  async redirects() { return [ { source: "/dashbord", destination: "/dashboard", permanent: true }, ]; },
  images: {

    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },


};

export default nextConfig;
