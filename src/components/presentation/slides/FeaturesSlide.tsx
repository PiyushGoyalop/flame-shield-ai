
import { CheckCircle, Map, Brain, ChartBar, History, UserCircle } from "lucide-react";

export function FeaturesSlide() {
  const features = [
    {
      title: "Location-based Prediction",
      icon: Map,
      description: "Enter any location to get wildfire risk prediction for that area"
    },
    {
      title: "Random Forest ML Model",
      icon: Brain,
      description: "Advanced machine learning model for accurate risk assessment"
    },
    {
      title: "Environmental Analysis",
      icon: ChartBar,
      description: "Comprehensive analysis of weather, air quality, and vegetation factors"
    },
    {
      title: "Historical Data",
      icon: History,
      description: "View past wildfire incidents and patterns in the selected area"
    },
    {
      title: "Interactive Dashboard",
      icon: ChartBar,
      description: "Analytics dashboard with interactive data visualizations"
    },
    {
      title: "User Accounts",
      icon: UserCircle,
      description: "Save and track prediction history for logged-in users"
    }
  ];

  return (
    <div className="h-full flex flex-col px-8 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-wildfire-800">Key Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow content-center">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-wildfire-100 flex items-center justify-center">
                  <feature.icon className="h-4 w-4 text-wildfire-600" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-wildfire-50 border border-wildfire-100 rounded-lg p-4 flex items-center">
        <CheckCircle className="h-5 w-5 text-wildfire-600 mr-3 flex-shrink-0" />
        <p className="text-sm">All features are designed to provide actionable insights for wildfire prevention and response planning.</p>
      </div>
    </div>
  );
}
