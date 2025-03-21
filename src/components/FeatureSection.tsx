
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Globe, BarChart4, Zap, MapPin, ChartLine } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Use IntersectionObserver instead of scroll event
    // This is more performant than scroll event listeners
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once visible, disconnect to save resources
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-wildfire-500" />,
      title: "Geospatial Analysis",
      description: "Analyze wildfire risks across different geographic locations and terrains with accurate mapping."
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-wildfire-500" />,
      title: "CO₂ Correlation",
      description: "Understand the relationship between carbon emissions and wildfire occurrences through data-driven insights."
    },
    {
      icon: <Zap className="h-8 w-8 text-wildfire-500" />,
      title: "Real-time Predictions",
      description: "Get instant wildfire probability assessments for any location using our machine learning model."
    },
    {
      icon: <MapPin className="h-8 w-8 text-wildfire-500" />,
      title: "Location Intelligence",
      description: "Access detailed wildfire data for specific regions, states, and coordinates with precision."
    },
    {
      icon: <ChartLine className="h-8 w-8 text-wildfire-500" />,
      title: "Trend Analysis",
      description: "Visualize historical wildfire patterns and identify seasonal trends to improve preparedness."
    },
    {
      icon: <Flame className="h-8 w-8 text-wildfire-500" />,
      title: "Cause Identification",
      description: "Explore the common causes of wildfires and their distribution across different regions."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="features-section" 
      className="py-20 relative overflow-hidden will-change-transform"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            Powerful Features for Wildfire Analytics
          </h2>
          <p className="text-white/80 text-lg">
            Our platform combines advanced machine learning with comprehensive data analysis to provide accurate wildfire predictions and insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`border border-wildfire-200/30 bg-black/30 backdrop-blur-sm hover:bg-black/40 hover:shadow-elevation transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transitionDelay: `${Math.min(index * 50, 300)}ms`, 
                willChange: 'transform, opacity'
              }}
            >
              <CardContent className="p-6">
                <div className="mb-4 bg-wildfire-900/60 w-14 h-14 rounded-lg flex items-center justify-center">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2 text-white">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
