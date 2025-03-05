
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useRedirectUrl } from '@/hooks/useRedirectUrl';
import { 
  getSession,
  signInWithEmail,
  signUpWithEmail,
  resendConfirmationEmail as resendEmail,
  signOut as logOut,
  resetPassword
} from '@/services/authService';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { getRedirectUrl } = useRedirectUrl();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmail(email, password);
      
      toast({
        title: "Sign in successful",
        description: "Welcome back to FlameShield AI!",
      });
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const redirectUrl = getRedirectUrl();
      
      // Pass false to disable email confirmation requirement
      await signUpWithEmail(email, password, name, redirectUrl, false);
      
      // Show success message
      toast({
        title: "Account created successfully",
        description: "Welcome to FlameShield AI!",
      });
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      const redirectUrl = getRedirectUrl();
      
      await resendEmail(email, redirectUrl);
      
      toast({
        title: "Confirmation email sent",
        description: "Please check your inbox for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error sending confirmation email",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      const redirectUrl = getRedirectUrl();
      
      await resetPassword(email, redirectUrl);
      
      toast({
        title: "Password reset email sent",
        description: "Please check your inbox for the reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Error sending reset email",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      await logOut();
      
      setUser(null);
      setSession(null);
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      signIn,
      signUp,
      signOut,
      resendConfirmationEmail,
      sendPasswordResetEmail,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
