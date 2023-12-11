import { PostHog } from 'posthog-node';

export default function PostHogClient() {
  const posthogClient = new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_INIT as string,
    {
      host: process.env.NEXT_PUBLIC_POSTHOG_URL,
    },
  );
  return posthogClient;
}
