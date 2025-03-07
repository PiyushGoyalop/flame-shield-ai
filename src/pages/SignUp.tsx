
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { EmailConfirmation } from "@/components/auth/EmailConfirmation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (name: string, email: string, password: string) => {
    try {
      await signUp(email, password, name);
      
      setEmail(email);
      setShowEmailConfirmation(true);
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      console.error("Signup error in component:", error);
    }
  };

  if (showEmailConfirmation) {
    return (
      <AuthLayout 
        title="Check Your Email" 
        description="We've sent you a verification link"
      >
        <EmailConfirmation email={email} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Create an Account" 
      description="Join Wildfire Analytics to access all features and track prediction history"
    >
      <SignUpForm onSignUp={handleSignUp} />
    </AuthLayout>
  );
};

export default SignUp;
