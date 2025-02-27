
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function HeroSection() {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState<number>(1);

  // Rotate through different background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage(prev => (prev % 4) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Dynamically get background class based on current image
  const getBgClass = () => {
    switch(bgImage) {
      case 1: return "bg-forest-dark";
      case 2: return "bg-mountain-bg";
      case 3: return "bg-water-bg";
      case 4: return "bg-forest-light";
      default: return "bg-forest-dark";
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Dynamic background image with overlay */}
      <div className={`absolute inset-0 ${getBgClass()} bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out z-0`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <p className="text-sm md:text-base font-medium text-wildfire-200 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-wildfire-800/60 backdrop-blur-sm border border-wildfire-600/20">
              Advanced Machine Learning
            </span>
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 tracking-tight">
            Predict and Analyze{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wildfire-300 to-wildfire-500">Wildfire Risks</span>{" "}
            with Precision
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            Leverage our cutting-edge machine learning model to predict wildfire probabilities based on location data, CO₂ emissions, and historical patterns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-wildfire-500 hover:bg-wildfire-600 transition-all text-white"
              onClick={() => navigate("/predict")}
            >
              Make a Prediction <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              onClick={() => navigate("/analytics")}
            >
              Explore Analytics
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-wildfire-400/40 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-wildfire-600/40 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
    </div>
  );
}
