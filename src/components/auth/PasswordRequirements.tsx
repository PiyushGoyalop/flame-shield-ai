
import { CheckCircle, XCircle } from "lucide-react";

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
}

interface PasswordRequirementsProps {
  validation: PasswordValidation;
}

export function PasswordRequirements({ validation }: PasswordRequirementsProps) {
  return (
    <div className="mt-2 text-xs space-y-1">
      <p className="font-medium text-gray-700">Password must include:</p>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center">
          {validation.length ? 
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
            <XCircle className="h-3 w-3 text-red-500 mr-1" />}
          <span className={validation.length ? "text-green-600" : "text-gray-600"}>
            At least 8 characters
          </span>
        </div>
        <div className="flex items-center">
          {validation.uppercase ? 
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
            <XCircle className="h-3 w-3 text-red-500 mr-1" />}
          <span className={validation.uppercase ? "text-green-600" : "text-gray-600"}>
            One uppercase letter
          </span>
        </div>
        <div className="flex items-center">
          {validation.number ? 
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
            <XCircle className="h-3 w-3 text-red-500 mr-1" />}
          <span className={validation.number ? "text-green-600" : "text-gray-600"}>
            One number
          </span>
        </div>
        <div className="flex items-center">
          {validation.special ? 
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
            <XCircle className="h-3 w-3 text-red-500 mr-1" />}
          <span className={validation.special ? "text-green-600" : "text-gray-600"}>
            One special character
          </span>
        </div>
      </div>
    </div>
  );
}
