
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import { Loader2 } from "lucide-react";

// Loading state component
export const PasswordResetLoading = () => (
  <div className="text-center">
    <Loader2 className="h-12 w-12 animate-spin text-wildfire-600 mx-auto mb-4" />
    <p className="text-lg font-medium">Verifying reset link...</p>
  </div>
);

// Success state component
export const PasswordResetSuccess = () => (
  <div className="space-y-4">
    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
      <p className="font-medium">Recovery link verified!</p>
      <p className="text-sm mt-1">Please set your new password below.</p>
    </div>
    <UpdatePasswordForm />
  </div>
);

// Error state component
export const PasswordResetError = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
        <p className="font-medium">Password reset link invalid</p>
        <p className="text-sm mt-1">The link may be invalid or expired.</p>
      </div>
      <Button onClick={() => navigate("/reset-password")} className="mt-4 mr-2">
        Try Again
      </Button>
      <Button onClick={() => navigate("/signin")} className="mt-4" variant="outline">
        Return to Sign In
      </Button>
    </div>
  );
};
