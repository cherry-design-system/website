import posthog from "posthog-js";

/** Captures a product event when PostHog is running; a no-op otherwise. */
export function track(event: string, properties?: Record<string, unknown>) {
  if (posthog.__loaded) posthog.capture(event, properties);
}
