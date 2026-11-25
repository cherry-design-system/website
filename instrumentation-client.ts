import posthog from "posthog-js";

/**
 * PostHog, loaded before hydration. Without NEXT_PUBLIC_POSTHOG_KEY nothing
 * initialises, so local and preview builds send no data.
 *
 * Privacy: no cookies or storage by default (`persistence: "memory"`), so the
 * site needs no cookie banner. If cookieless mode is enabled in the PostHog
 * project settings, set NEXT_PUBLIC_POSTHOG_COOKIELESS=true to switch to it and
 * get stable visitor counts across page loads.
 */
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  try {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest",
      ui_host: "https://eu.posthog.com",
      defaults: "2026-08-30",
      capture_pageview: "history_change",
      capture_pageleave: true,
      capture_exceptions: true,
      disable_session_recording: true,
      advanced_disable_feature_flags: true,
      ...(process.env.NEXT_PUBLIC_POSTHOG_COOKIELESS === "true"
        ? { cookieless_mode: "always" as const }
        : { persistence: "memory" as const }),
    });
  } catch {
    // Analytics must never break the page.
  }
}
