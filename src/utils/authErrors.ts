export const getAuthErrorMessage = (error: any): string => {
  if (typeof error === 'object' && error !== null) {
    // Handle Supabase specific errors
    if (error.message === 'User already registered') {
      return 'An account with this email already exists. Please sign in instead.';
    }
    if (error.message === 'Invalid login credentials') {
      return 'Invalid email or password. Please try again.';
    }
    if (error.message?.toLowerCase().includes('password')) {
      return 'Password must be at least 6 characters long';
    }
    // Add more specific error cases here
    return error.message || 'An error occurred during authentication';
  }
  return 'An unexpected error occurred';
};