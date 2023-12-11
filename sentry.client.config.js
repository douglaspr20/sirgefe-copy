// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

if (process.env.SENTRY_STATUS === 'online' && process.env.SENTRY_DSN) {
  const Sentry = require('@sentry/nextjs');
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tunnel: '/api/tunnel',
    tracesSampleRate: 0.25,
    attachStacktrace: true,
    autoSessionTracking: true,
    normalizeDepth: 10,
    environment: process.env.NODE_ENV || 'local',
    release: require('./package.json').version,
  });
}
