
import { Rocket, Calendar, Bell, Smartphone, Database, Satellite } from "lucide-react";

export function FutureSlide() {
  const futureFeatures = [
    {
      title: "Enhanced Data Integration",
      icon: Database,
      description: "Connect to more data sources including NASA Earth Observations and local weather stations",
      status: "In Planning"
    },
    {
      title: "Advanced ML Models",
      icon: Rocket,
      description: "Deep learning models for more accurate predictions with higher geographic resolution",
      status: "Research Phase"
    },
    {
      title: "Mobile App",
      icon: Smartphone,
      description: "Native applications for iOS and Android with offline functionality",
      status: "Design Phase"
    },
    {
      title: "Real-time Alerts",
      icon: Bell,
      description: "Push notifications for changing risk levels in monitored locations",
      status: "Development"
    },
    {
      title: "Satellite Integration",
      icon: Satellite,
      description: "Direct integration with satellite imagery for real-time monitoring",
      status: "In Planning"
    },
    {
      title: "Seasonal Forecasts",
      icon: Calendar,
      description: "Long-term predictions up to 3 months ahead for resource planning",
      status: "Research Phase"
    }
  ];

  return (
    <div className="h-full flex flex-col px-8 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-wildfire-800">Future Development</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {futureFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-wildfire-100 flex items-center justify-center mr-3">
                  <feature.icon className="h-4 w-4 text-wildfire-600" />
                </div>
                <h3 className="font-medium">{feature.title}</h3>
              </div>
              
              <p className="text-sm text-muted-foreground flex-grow mb-3">
                {feature.description}
              </p>
              
              <div className="mt-auto">
                <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  {feature.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-wildfire-50 to-amber-50 rounded-lg border border-wildfire-100 p-5">
          <h3 className="font-medium mb-2">Research Collaborations</h3>
          <p className="text-sm text-muted-foreground">
            We're partnering with environmental research institutions to enhance our models with the latest scientific findings on climate-wildfire interactions.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100 p-5">
          <h3 className="font-medium mb-2">Community Expansion</h3>
          <p className="text-sm text-muted-foreground">
            Building a community platform for fire departments and environmental agencies to share data, best practices, and coordinate response efforts.
          </p>
        </div>
      </div>
    </div>
  );
}
