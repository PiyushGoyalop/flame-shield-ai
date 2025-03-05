
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { useAuth } from "@/contexts/AuthContext";
import { isStrongPassword } from "@/services/authService";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  
  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Check password strength as the user types
  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    if (!isStrongPassword(password)) {
      toast({
        title: "Password is not strong enough",
        description: "Please ensure your password meets all the requirements",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, name);
      // On successful signup, the user will be automatically logged in
      // and redirected to the home page (handled in AuthContext)
    } catch (error) {
      console.error("Signup error in component:", error);
      // Error already handled in signUp function
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
                title="Create an Account" 
                description="Join Wildfire Analytics to access all features and track prediction history"
              />
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                
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
                  
                  {/* Password strength indicators */}
                  <div className="mt-2 text-xs space-y-1">
                    <p className="font-medium text-gray-700">Password must include:</p>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="flex items-center">
                        {passwordValidation.length ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-red-500 mr-1" />}
                        <span className={passwordValidation.length ? "text-green-600" : "text-gray-600"}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center">
                        {passwordValidation.uppercase ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-red-500 mr-1" />}
                        <span className={passwordValidation.uppercase ? "text-green-600" : "text-gray-600"}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center">
                        {passwordValidation.number ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-red-500 mr-1" />}
                        <span className={passwordValidation.number ? "text-green-600" : "text-gray-600"}>
                          One number
                        </span>
                      </div>
                      <div className="flex items-center">
                        {passwordValidation.special ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-red-500 mr-1" />}
                        <span className={passwordValidation.special ? "text-green-600" : "text-gray-600"}>
                          One special character
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <PasswordInput
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    disabled={isLoading}
                    required={true}
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the{" "}
                    <Link to="/terms" className="text-wildfire-600 hover:text-wildfire-800">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-wildfire-600 hover:text-wildfire-800">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <LoadingButton 
                  isLoading={isLoading} 
                  loadingText="Creating Account..."
                  icon={<UserPlus className="h-4 w-4" />}
                >
                  Create Account
                </LoadingButton>
                
                <div className="text-center text-sm text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-wildfire-600 hover:text-wildfire-800 font-medium">
                    Sign in
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

export default SignUp;
