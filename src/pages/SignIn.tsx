
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn: signInUser, user } = useAuth();

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signInUser(email, password);
      console.log("Sign in successful, navigating to home page");
      navigate('/');
    } catch (error) {
      console.error("Error in signin component:", error);
      // Error is already handled in the signIn function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign In" 
      description="Access your wildfire prediction history and saved locations"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput 
            id="password"
            value={password}
            onChange={setPassword}
            disabled={isLoading}
            required={true}
          />
          <div className="text-right">
            <Link 
              to="/reset-password" 
              className="text-sm text-wildfire-600 hover:text-wildfire-800"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        
        <LoadingButton 
          isLoading={isLoading} 
          loadingText="Signing In..."
          icon={<Mail className="h-4 w-4" />}
        >
          Sign In with Email
        </LoadingButton>
        
        <div className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-wildfire-600 hover:text-wildfire-800 font-medium">
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
