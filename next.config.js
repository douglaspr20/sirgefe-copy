// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // sentry: {
  //   hideSourceMaps: true,
  // },
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(
  //     new webpack.DefinePlugin({
  //       __SENTRY_DEBUG__: false,
  //       __SENTRY_TRACING__: false,
  //     }),
  //   );

  //   // return the modified config
  //   return config;
  // },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dev.sirge.io',
      },
      {
        protocol: 'https',
        hostname: 'sirge-prod.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'sirge-dev.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pixel.com',
      },
      {
        protocol: 'https',
        hostname: 'z-p3-scontent.flos1-2.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/selector',
      //   permanent: true,
      // },
    ];
  },
};

module.exports =
  process.env.SENTRY_STATUS === 'online'
    ? withSentryConfig(nextConfig)
    : nextConfig;
