
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center">
        <div className="max-w-3xl text-white backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-white/10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 tracking-tight">
            Predict and Analyze{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wildfire-300 to-wildfire-500">Wildfire Risks</span>{" "}
            with Precision
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Leverage our cutting-edge machine learning model to predict wildfire probabilities based on location data, CO₂ emissions, and historical patterns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-wildfire-500 hover:bg-wildfire-600 transition-all text-white shadow-lg"
              onClick={() => navigate("/predict")}
            >
              Make a Prediction <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 shadow-lg"
              onClick={() => navigate("/analytics")}
            >
              Explore Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
