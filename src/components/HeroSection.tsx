
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, PresentationIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-wildfire-50 z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-wildfire-200 rounded-full filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-20 animate-float-delayed"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Predicting Wildfires With <span className="text-wildfire-600">AI Technology</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Our advanced machine learning model analyzes environmental factors, weather patterns, and historical data to predict wildfire risks with high accuracy.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate("/predict")} 
                className="bg-wildfire-600 hover:bg-wildfire-700 text-white"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4" />
                Try Prediction Tool
              </Button>
              
              <Button 
                onClick={() => navigate("/about")} 
                variant="outline" 
                size="lg"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={() => navigate("/presentation")} 
                variant="ghost" 
                size="lg"
                className="text-wildfire-600 hover:text-wildfire-700 hover:bg-wildfire-50"
              >
                <PresentationIcon className="mr-2 h-4 w-4" />
                View Presentation
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-wildfire-300 to-wildfire-500 rounded-xl blur-sm opacity-75"></div>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1609152770613-ede93c9ffb35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
                  alt="Wildfire" 
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
