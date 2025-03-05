
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

/**
 * Gets the current session from Supabase
 */
export const getSession = async (): Promise<Session | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

/**
 * Signs in a user with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  
  console.log("Sign in successful:", data?.user?.id);
  return data;
};

/**
 * Signs up a new user with email, password, and additional metadata
 * @param skipEmailVerification - If true, will not require email verification
 */
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  name: string,
  redirectUrl: string,
  skipEmailVerification: boolean = false
) => {
  console.log("Signing up with:", { email, name });
  
  // Validate password strength
  if (!isStrongPassword(password)) {
    throw new Error("Password must be at least 8 characters and include at least one uppercase letter, one number, and one special character.");
  }
  
  // Sign up the user
  const { error, data } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        name
      },
      emailRedirectTo: redirectUrl
    }
  });
  
  if (error) throw error;
  
  console.log("Sign up auth response:", data);
  
  // If we're skipping verification and the user needs confirmation,
  // sign them in automatically
  if (skipEmailVerification && data.user && !data.session) {
    console.log("Auto signing in after signup");
    await signInWithEmail(email, password);
  }
  
  return data;
};

/**
 * Updates user profile in the database
 */
export const updateUserProfile = async (userId: string, updates: { name?: string }) => {
  console.log("Updating profile for user:", userId, "with data:", updates);
  
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
    
  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
  
  return true;
};

/**
 * Resends a confirmation email to the user
 */
export const resendConfirmationEmail = async (email: string, redirectUrl: string) => {
  console.log("Using redirect URL for resend:", redirectUrl);
  
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: redirectUrl
    }
  });
  
  if (error) throw error;
};

/**
 * Send a password reset email
 */
export const resetPassword = async (email: string, redirectUrl: string) => {
  console.log("Sending password reset email to:", email);
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl + "?type=recovery"
  });
  
  if (error) throw error;
  
  return true;
};

/**
 * Signs out the current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * Check if a password is strong enough
 */
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters
  if (password.length < 8) return false;
  
  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) return false;
  
  // At least one number
  if (!/[0-9]/.test(password)) return false;
  
  // At least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
  
  return true;
};
