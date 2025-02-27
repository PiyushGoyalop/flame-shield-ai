
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 animated-bg opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-50 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl">
          <p className="text-sm md:text-base font-medium text-wildfire-600 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-wildfire-100 border border-wildfire-200">
              Advanced Machine Learning
            </span>
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 tracking-tight">
            Predict and Analyze{" "}
            <span className="text-gradient">Wildfire Risks</span>{" "}
            with Precision
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Leverage our cutting-edge machine learning model to predict wildfire probabilities based on location data, CO₂ emissions, and historical patterns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-wildfire-600 hover:bg-wildfire-700 transition-all"
              onClick={() => navigate("/predict")}
            >
              Make a Prediction <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/analytics")}
            >
              Explore Analytics
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-wildfire-300 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-wildfire-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
    </div>
  );
}
