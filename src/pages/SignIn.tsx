
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getRedirectPath } = useAuthRedirect();
  const { signIn } = useAuth();

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
      await signIn(email, password);
      toast({
        title: "Sign in successful",
        description: "Welcome back to FlameShield AI!",
      });
      navigate(getRedirectPath());
    } catch (error) {
      // Error is already handled in the signIn function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-md mx-auto px-6 md:px-8">
          <Card className="border-wildfire-100 shadow-elevation">
            <CardHeader className="text-center">
              <AuthHeader 
                title="Sign In" 
                description="Access your wildfire prediction history and saved locations" 
              />
            </CardHeader>
            
            <CardContent>
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-wildfire-600 hover:text-wildfire-800">
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput 
                    id="password"
                    value={password}
                    onChange={setPassword}
                    disabled={isLoading}
                    required={true}
                  />
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
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
