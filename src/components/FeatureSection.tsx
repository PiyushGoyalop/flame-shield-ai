
import { Card, CardContent } from "@/components/ui/card";
import { Fire, Globe, BarChart4, Zap, MapPin, ChartLine } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-wildfire-600" />,
      title: "Geospatial Analysis",
      description: "Analyze wildfire risks across different geographic locations and terrains with accurate mapping."
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-wildfire-600" />,
      title: "CO₂ Correlation",
      description: "Understand the relationship between carbon emissions and wildfire occurrences through data-driven insights."
    },
    {
      icon: <Zap className="h-8 w-8 text-wildfire-600" />,
      title: "Real-time Predictions",
      description: "Get instant wildfire probability assessments for any location using our machine learning model."
    },
    {
      icon: <MapPin className="h-8 w-8 text-wildfire-600" />,
      title: "Location Intelligence",
      description: "Access detailed wildfire data for specific regions, states, and coordinates with precision."
    },
    {
      icon: <ChartLine className="h-8 w-8 text-wildfire-600" />,
      title: "Trend Analysis",
      description: "Visualize historical wildfire patterns and identify seasonal trends to improve preparedness."
    },
    {
      icon: <Fire className="h-8 w-8 text-wildfire-600" />,
      title: "Cause Identification",
      description: "Explore the common causes of wildfires and their distribution across different regions."
    }
  ];

  return (
    <section className="py-20 bg-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Powerful Features for Wildfire Analytics
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines advanced machine learning with comprehensive data analysis to provide accurate wildfire predictions and insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-wildfire-100 bg-white/80 backdrop-blur-sm hover:shadow-elevation transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-wildfire-200 rounded-full filter blur-3xl opacity-30 animate-float"></div>
    </section>
  );
}
