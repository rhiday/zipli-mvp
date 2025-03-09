import React from 'react';
import { useRouter, usePathname } from 'expo-router';

/**
 * AppNavigator - Navigation utility component for the application
 * Provides navigation functions and current route information
 */
export default function AppNavigator() {
  const router = useRouter();
  const pathname = usePathname();

  // Navigate to the role selection screen
  const navigateToRoleSelection = () => {
    router.push('/role-selection' as any);
  };

  // Navigate to donor dashboard
  const navigateToDonorDashboard = () => {
    router.push('/donor-dashboard' as any);
  };

  // Navigate to recipient dashboard
  const navigateToRecipientDashboard = () => {
    router.push('/recipient-dashboard' as any);
  };

  // Navigate back
  const goBack = () => {
    router.back();
  };

  // Go to home
  const goHome = () => {
    router.push('/');
  };

  return {
    currentRoute: pathname,
    navigateToRoleSelection,
    navigateToDonorDashboard,
    navigateToRecipientDashboard,
    goBack,
    goHome,
  };
}

// Helper function to use the navigator elsewhere in the app
export const useAppNavigation = () => {
  return AppNavigator();
}; 