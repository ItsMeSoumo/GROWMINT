import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
// Handle missing API key gracefully
let resendInstance = null;

try {
  // Only initialize if API key exists
  if (process.env.RESEND_API_KEY) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
    console.log('Resend initialized successfully');
  } else {
    console.log('No Resend API key found in environment variables');
  }
} catch (error) {
  console.error('Error initializing Resend:', error);
}

export const resend = resendInstance;