// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

if (process.env.SENTRY_STATUS === 'online' && process.env.SENTRY_DSN) {
  const Sentry = require('@sentry/nextjs');

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.25,
    attachStacktrace: true,
    normalizeDepth: 10,
    autoSessionTracking: true,
    environment: process.env.NODE_ENV || 'local',
    release: require('./package.json').version,
  });
}
