
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRedirectHandler from "./components/auth/AuthRedirectHandler";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Predict from "./pages/Predict";
import About from "./pages/About";
import History from "./pages/History";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import VerifyEmail from "./pages/VerifyEmail";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ModelResults from "./pages/ModelResults";
import UMLDiagrams from "./pages/UMLDiagrams";
import SystemFlowDiagrams from "./pages/SystemFlowDiagrams";
import Presentation from "./pages/Presentation";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
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
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/model-results" element={<ModelResults />} />
              <Route path="/uml-diagrams" element={<UMLDiagrams />} />
              <Route path="/system-flow-diagrams" element={<SystemFlowDiagrams />} />
              <Route path="/presentation" element={<Presentation />} />
              <Route path="/auth-redirect" element={<AuthRedirectHandler />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
