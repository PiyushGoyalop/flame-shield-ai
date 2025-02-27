
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProcessSection() {
  const navigate = useNavigate();
  
  const steps = [
    {
      number: "01",
      title: "Data Collection",
      description: "Our system continuously collects and processes wildfire data, CO₂ emissions, and geographic information."
    },
    {
      number: "02",
      title: "Machine Learning",
      description: "Advanced algorithms analyze patterns and correlations between environmental factors and wildfire occurrences."
    },
    {
      number: "03",
      title: "Risk Assessment",
      description: "The model calculates wildfire probability based on location data and current environmental conditions."
    },
    {
      number: "04",
      title: "Visualization",
      description: "Results are presented through intuitive visualizations and actionable insights for better decision-making."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Our Wildfire Prediction Process
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              From data collection to actionable insights, our comprehensive approach ensures accurate wildfire risk assessment and analysis.
            </p>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-wildfire-100 text-wildfire-600 flex items-center justify-center font-bold border border-wildfire-200">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-medium text-xl mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Button 
                className="bg-wildfire-600 hover:bg-wildfire-700"
                onClick={() => navigate("/predict")}
              >
                Try the Prediction Tool <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-wildfire-300 to-wildfire-600 rounded-xl blur-sm opacity-75"></div>
              <div className="relative bg-white rounded-xl overflow-hidden border border-wildfire-200">
                <img 
                  src="https://images.unsplash.com/photo-1601058591291-9fa67f5e8326?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                  alt="Wildfire prediction visualization" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-2">Predictive Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    Our machine learning model processes multiple data points to generate accurate wildfire risk assessments and visualizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-wildfire-200 rounded-full filter blur-3xl opacity-30 animate-float"></div>
    </section>
  );
}
