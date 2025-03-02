
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PredictionFormCardProps {
  children: React.ReactNode;
}

export function PredictionFormCard({ children }: PredictionFormCardProps) {
  const [bgAnimation, setBgAnimation] = useState<number>(1);

  // Rotate through different animation states for the card
  useEffect(() => {
    const interval = setInterval(() => {
      setBgAnimation(prev => (prev % 5) + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get background style based on current animation state
  const getCardStyle = () => {
    // Different styles for card animation
    const gradients = [
      "bg-gradient-to-br from-wildfire-50 to-wildfire-100 shadow-wildfire-100/20",
      "bg-gradient-to-br from-blue-50 to-wildfire-50 shadow-blue-100/20",
      "bg-gradient-to-br from-amber-50 to-blue-50 shadow-amber-100/20",
      "bg-gradient-to-tl from-wildfire-50 to-amber-100 shadow-wildfire-100/20",
      "bg-gradient-to-tr from-green-50 to-blue-50 shadow-green-100/20"
    ];
    
    return `${gradients[bgAnimation-1]} transition-all duration-1000`;
  };

  return (
    <Card className={`border-wildfire-200 shadow-elevation transition-all duration-1000 ${getCardStyle()}`}>
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wildfire-600/10 to-transparent mix-blend-overlay" />
        <CardTitle className="text-center font-display relative z-10">Wildfire Risk Prediction</CardTitle>
        <CardDescription className="text-center relative z-10">
          Enter a location to assess its wildfire risk based on our ML model
        </CardDescription>
      </CardHeader>
      {children}
      <CardFooter className="flex flex-col px-6 text-xs text-muted-foreground">
        <p>Our prediction model is based on historical wildfire data, CO₂ emissions, and geographic features with real-time weather data.</p>
      </CardFooter>
    </Card>
  );
}
