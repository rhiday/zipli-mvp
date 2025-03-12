import { router } from 'expo-router';

/**
 * Navigation helper functions
 * Use these functions instead of direct router calls for consistent navigation
 */

// Basic navigation
export const goBack = () => router.back();
export const goHome = () => router.push('/');

// Auth navigation
export const goToLogin = () => router.push('/login');
export const goToSignup = () => router.push('/signup');
export const goToRoleSelection = () => router.push('/role-selection');

// Dashboard navigation
export const goToDonorDashboard = () => router.push('/donor-dashboard');
export const goToRecipientDashboard = () => router.push('/recipient-dashboard');

// Donation flow
export const goToNewDonation = () => router.push('/new-donation');
export const goToCreateDonation = () => router.push('/create-donation');
export const goToRequestSent = () => router.push('/request-sent');

// Account
export const goToDonorSignup = () => router.push('/donor-signup');
export const goToRecipientSignup = () => router.push('/recipient-signup');

// Navigation with replacement (clears history)
export const replaceWithDonorDashboard = () => router.replace('/donor-dashboard');
export const replaceWithRecipientDashboard = () => router.replace('/recipient-dashboard');
export const replaceWithHome = () => router.replace('/');

// Default export for navigation functions
const navigation = {
  goBack,
  goHome,
  goToLogin,
  goToSignup,
  goToRoleSelection,
  goToDonorDashboard,
  goToRecipientDashboard,
  goToNewDonation,
  goToCreateDonation,
  goToRequestSent,
  goToDonorSignup,
  goToRecipientSignup,
  replaceWithDonorDashboard,
  replaceWithRecipientDashboard,
  replaceWithHome,
};

export default navigation; 