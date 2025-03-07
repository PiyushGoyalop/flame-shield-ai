
import { useState } from "react";

export type PasswordValidation = {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
};

export const usePasswordValidation = () => {
  const [validation, setValidation] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  const updateValidation = (password: string) => {
    setValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  const isPasswordValid = () => {
    return validation.length && validation.uppercase && validation.number && validation.special;
  };

  return {
    validation,
    updateValidation,
    isPasswordValid
  };
};
