
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Predict from "./pages/Predict";
import About from "./pages/About";
import History from "./pages/History";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/SetNewPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => {
  // Create a separate component for auth redirect to use hooks
  const AuthRedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
      console.log("Auth Redirect Handler called");
      console.log("URL:", window.location.href);
      console.log("Hash:", window.location.hash);
      console.log("Search:", window.location.search);
      
      // Preserve the hash fragment and search params when redirecting
      const redirectTo = `/set-new-password${location.search}${location.hash}`;
      console.log("Redirecting to:", redirectTo);
      
      // Use navigate instead of returning Navigate component
      // This ensures the navigation happens after the component mounts
      navigate(redirectTo, { replace: true });
    }, [navigate, location.search, location.hash]);
    
    // Return null while redirecting to avoid flashing content
    return null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={<Account />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/set-new-password" element={<SetNewPassword />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              {/* Use a component for auth-redirect to better handle the parameters */}
              <Route path="/auth-redirect" element={<AuthRedirectHandler />} />
              {/* Make the catch-all route more specific to avoid catching reset password links */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
