
import { Flame } from "lucide-react";

export function IntroSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 py-12 text-center">
      <div className="mb-8 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-wildfire-100 flex items-center justify-center">
          <Flame className="h-12 w-12 text-wildfire-600" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-wildfire-600 to-amber-500">
        Wildfire Risk Prediction System
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
        An AI-powered system that predicts wildfire risks based on environmental factors
      </p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
        <div className="p-4">
          <h3 className="font-medium mb-2 text-wildfire-800">Target Users</h3>
          <p className="text-muted-foreground">Environmental agencies, fire departments, policymakers, and the general public</p>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-2 text-wildfire-800">Core Value</h3>
          <p className="text-muted-foreground">Early detection and risk assessment to prevent damage</p>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-2 text-wildfire-800">Approach</h3>
          <p className="text-muted-foreground">Machine learning for data-driven predictions</p>
        </div>
      </div>
    </div>
  );
}
