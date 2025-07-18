// LaunchDarkly feature flag utility
// Usage: import { isFeatureEnabled } from '@/lib/featureFlags';
// Example: if (await isFeatureEnabled('rfp-generator')) { ... }

import { LDClient, initialize } from 'launchdarkly-js-client-sdk';

let ldClient: LDClient | null = null;

export async function initLD(user = { key: 'anonymous' }) {
  if (typeof window === 'undefined') return null;
  if (!ldClient) {
    ldClient = initialize('YOUR_LAUNCHDARKLY_CLIENT_SIDE_ID', user); // TODO: Replace with real key
    await new Promise(resolve => ldClient!.on('ready', resolve));
  }
  return ldClient;
}

export async function isFeatureEnabled(flag: string, user = { key: 'anonymous' }) {
  if (typeof window === 'undefined') return true; // SSR fallback: show all features
  const client = await initLD(user);
  return client ? client.variation(flag, false) : false;
} 