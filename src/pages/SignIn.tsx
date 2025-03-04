
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getRedirectPath } = useAuthRedirect();

  const handleSubmit = (e: React.FormEvent) => {
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

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Find user with matching email
    const user = registeredUsers.find((user: any) => user.email === email);
    
    // If user not found or password doesn't match
    if (!user || user.password !== password) {
      setIsLoading(false);
      toast({
        title: "Invalid credentials",
        description: "Email or password is incorrect",
        variant: "destructive",
      });
      return;
    }

    // Successful login
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", email);
      
      // Show success toast
      toast({
        title: "Sign in successful",
        description: "Welcome back to FlameShield AI!",
      });
      
      setIsLoading(false);
      navigate(getRedirectPath());
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      const googleUser = {
        name: "Google User",
        email: "user@gmail.com",
        signInMethod: "google"
      };
      
      // Check if this Google user already exists
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const existingUser = registeredUsers.find((user: any) => user.email === googleUser.email);
      
      // If not registered, add to registered users
      if (!existingUser) {
        registeredUsers.push(googleUser);
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      }
      
      // Set user info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", googleUser.name);
      localStorage.setItem("userEmail", googleUser.email);
      localStorage.setItem("signInMethod", "google");
      
      // Show success toast
      toast({
        title: "Google sign in successful",
        description: "You've signed in with Google successfully!",
      });
      
      setIsLoading(false);
      navigate(getRedirectPath());
    }, 1500);
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
              {/* Google Sign In Button */}
              <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />
              
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
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
