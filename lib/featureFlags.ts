// Feature flags configuration for PMP Universe
// This simulates LaunchDarkly integration for controlling feature visibility

export interface FeatureFlags {
  showNBAPMPs: boolean;
  enableCustomDealCreation: boolean;
  enableAdvancedFiltering: boolean;
  enablePerformanceMetrics: boolean;
  enableSSPIntegration: boolean;
  enableDSPCompatibility: boolean;
  enableRealTimeOptimization: boolean;
  enableCreativeStudio: boolean;
  enableSurveyIntegration: boolean;
  enableLocationTargeting: boolean;
}

// Default feature flags (when LaunchDarkly is not available)
const defaultFlags: FeatureFlags = {
  showNBAPMPs: false, // NBA PMPs are hidden by default
  enableCustomDealCreation: true,
  enableAdvancedFiltering: true,
  enablePerformanceMetrics: true,
  enableSSPIntegration: true,
  enableDSPCompatibility: true,
  enableRealTimeOptimization: true,
  enableCreativeStudio: true,
  enableSurveyIntegration: true,
  enableLocationTargeting: true,
};

// Simulated LaunchDarkly client
class LaunchDarklyClient {
  private flags: FeatureFlags;
  private user: any;

  constructor() {
    this.flags = defaultFlags;
    this.user = {
      key: 'pmp-universe-user',
      email: 'user@pmpuniverse.com',
      custom: {
        environment: process.env.NODE_ENV || 'development',
        userType: 'admin',
        permissions: ['read', 'write', 'admin']
      }
    };
  }

  // Initialize LaunchDarkly (simulated)
  async initialize(clientSideId: string): Promise<void> {
    console.log('LaunchDarkly initialized with client ID:', clientSideId);
    
    // Simulate async flag loading
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real implementation, this would fetch flags from LaunchDarkly
    this.flags = {
      ...defaultFlags,
      // Override with environment-specific flags
      showNBAPMPs: process.env.NODE_ENV === 'development' ? true : false,
    };
  }

  // Get a specific feature flag
  variation(flagKey: keyof FeatureFlags, defaultValue: any): any {
    return this.flags[flagKey] ?? defaultValue;
  }

  // Get all feature flags
  getAllFlags(): FeatureFlags {
    return { ...this.flags };
  }

  // Update a feature flag (for testing/admin purposes)
  updateFlag(flagKey: keyof FeatureFlags, value: any): void {
    this.flags[flagKey] = value;
  }

  // Track an event
  track(eventName: string, data?: any): void {
    console.log('LaunchDarkly track:', eventName, data);
  }

  // Identify a user
  identify(user: any): void {
    this.user = user;
    console.log('LaunchDarkly identify:', user);
  }
}

// Create singleton instance
const launchDarklyClient = new LaunchDarklyClient();

// Initialize LaunchDarkly (call this in your app initialization)
export const initializeFeatureFlags = async (): Promise<void> => {
  const clientSideId = process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID || 'your-client-side-id';
  await launchDarklyClient.initialize(clientSideId);
};

// Hook for using feature flags in React components
export const useFeatureFlags = () => {
  const [flags, setFlags] = React.useState<FeatureFlags>(defaultFlags);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadFlags = async () => {
      await initializeFeatureFlags();
      setFlags(launchDarklyClient.getAllFlags());
      setLoading(false);
    };

    loadFlags();
  }, []);

  const isEnabled = (flagKey: keyof FeatureFlags): boolean => {
    return flags[flagKey] ?? false;
  };

  const getFlag = (flagKey: keyof FeatureFlags, defaultValue?: any): any => {
    return flags[flagKey] ?? defaultValue;
  };

  return {
    flags,
    loading,
    isEnabled,
    getFlag,
    updateFlag: (flagKey: keyof FeatureFlags, value: any) => {
      launchDarklyClient.updateFlag(flagKey, value);
      setFlags(launchDarklyClient.getAllFlags());
    }
  };
};

// Utility functions for feature flag checks
export const isFeatureEnabled = (flagKey: keyof FeatureFlags): boolean => {
  return launchDarklyClient.variation(flagKey, false);
};

export const getFeatureFlag = (flagKey: keyof FeatureFlags, defaultValue?: any): any => {
  return launchDarklyClient.variation(flagKey, defaultValue);
};

// Track feature usage
export const trackFeatureUsage = (featureName: string, data?: any): void => {
  launchDarklyClient.track(`feature_used_${featureName}`, data);
};

// Filter PMPs based on feature flags
export const filterPMPsByFlags = (pmpData: any[]): any[] => {
  const showNBAPMPs = isFeatureEnabled('showNBAPMPs');
  
  if (showNBAPMPs) {
    return pmpData; // Show all PMPs including NBA
  } else {
    // Filter out NBA PMPs
    return pmpData.filter(pmp => 
      !pmp.name.toLowerCase().includes('nba') && 
      !pmp.category.toLowerCase().includes('nba') &&
      !pmp.description.toLowerCase().includes('nba')
    );
  }
};

// Environment-specific flag overrides
export const getEnvironmentFlags = (): Partial<FeatureFlags> => {
  const env = process.env.NODE_ENV;
  
  switch (env) {
    case 'development':
      return {
        showNBAPMPs: true, // Show NBA PMPs in development
        enableCustomDealCreation: true,
        enableAdvancedFiltering: true,
      };
    case 'production':
      return {
        showNBAPMPs: false, // Hide NBA PMPs in production
        enableCustomDealCreation: true,
        enableAdvancedFiltering: true,
      };
    default:
      return {
        showNBAPMPs: false, // Hide NBA PMPs in other environments
        enableCustomDealCreation: true,
        enableAdvancedFiltering: true,
      };
  }
};

// Export the client for direct access if needed
export { launchDarklyClient };

// React import for the hook
import React from 'react'; 