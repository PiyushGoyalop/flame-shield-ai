
import { ArrowRight } from "lucide-react";

export function ProcessSlide() {
  const steps = [
    {
      number: 1,
      title: "Location Input",
      description: "User enters location for prediction"
    },
    {
      number: 2,
      title: "Data Collection",
      description: "System fetches environmental data (weather, air quality)"
    },
    {
      number: 3,
      title: "ML Processing",
      description: "Random Forest model calculates probability"
    },
    {
      number: 4,
      title: "Risk Visualization",
      description: "Display of risk factors and analysis"
    },
    {
      number: 5,
      title: "Historical Context",
      description: "Historical wildfire data for context"
    },
    {
      number: 6,
      title: "Recommendations",
      description: "Safety precautions based on risk level"
    }
  ];

  return (
    <div className="h-full flex flex-col px-8 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-wildfire-800">The Prediction Process</h2>
      
      <div className="flex-grow flex flex-col justify-center">
        <div className="relative">
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-wildfire-500 text-white flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                {/* Connection arrows - only for steps that aren't the last in each row */}
                {(index % 3 !== 2 && index < steps.length - 1) && (
                  <div className="hidden md:block absolute top-5 right-0 transform translate-x-1/2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                
                {/* Vertical connection for end of row */}
                {index === 2 && (
                  <div className="hidden md:flex absolute left-5 top-full h-6 items-center">
                    <div className="w-0.5 h-full bg-gray-200"></div>
                    <div className="absolute bottom-0 left-0 transform -translate-x-1/2 rotate-90">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
                
                {/* Right-to-left arrow for start of second row */}
                {index === 5 && (
                  <div className="hidden md:block absolute top-0 left-5 transform -translate-y-6">
                    <div className="w-[300%] h-0.5 bg-gray-200"></div>
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 rotate-180">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h4 className="font-medium mb-2">Output: Comprehensive Risk Assessment</h4>
          <p className="text-sm text-muted-foreground">
            The final result provides a probability score, detailed environmental analysis, and actionable recommendations 
            based on the calculated risk level. Users can save these results and track changes over time.
          </p>
        </div>
      </div>
    </div>
  );
}
