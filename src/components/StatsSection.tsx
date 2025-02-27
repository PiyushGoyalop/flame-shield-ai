
import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { BarChart4, Globe, Flame, CloudRain } from "lucide-react";

export function StatsSection() {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-wildfire-800 opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-wildfire-50/50 to-white/95 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-wildfire-800">Key Statistics</h2>
          <p className="text-muted-foreground mt-2">A snapshot of our wildfire analytics impact</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Locations Analyzed"
            value={animateStats ? formatNumber(24632) : "0"}
            description="Geographic locations processed by our model"
            icon={<Globe className="h-5 w-5 text-wildfire-500" />}
            className="transition-all duration-500 delay-100 border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation"
          />
          
          <StatCard
            title="CO₂ Data Points"
            value={animateStats ? formatNumber(18457) : "0"}
            description="Emissions data collected and analyzed"
            icon={<CloudRain className="h-5 w-5 text-wildfire-500" />}
            className="transition-all duration-500 delay-200 border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation"
          />
          
          <StatCard
            title="Wildfires Predicted"
            value={animateStats ? formatNumber(3129) : "0"}
            description="Successfully forecasted with high accuracy"
            icon={<Flame className="h-5 w-5 text-wildfire-500" />}
            trend="up"
            trendValue="+14% from last year"
            className="transition-all duration-500 delay-300 border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation"
          />
          
          <StatCard
            title="Model Accuracy"
            value={animateStats ? "94.2%" : "0%"}
            description="Precision in wildfire risk assessment"
            icon={<BarChart4 className="h-5 w-5 text-wildfire-500" />}
            trend="up"
            trendValue="+2.3% improvement"
            className="transition-all duration-500 delay-400 border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation"
          />
        </div>
      </div>
    </section>
  );
}
