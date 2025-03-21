
import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { BarChart4, Globe, Flame, CloudRain, Thermometer, Wind } from "lucide-react";

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
      {/* Semi-transparent backdrop for readability */}
      <div className="relative z-10 bg-black/30 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Key Statistics</h2>
            <p className="text-white/80 mt-2">A snapshot of our expanded wildfire analytics impact</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Locations Analyzed"
              value={animateStats ? formatNumber(24632) : "0"}
              description="Geographic locations processed by our model"
              icon={<Globe className="h-5 w-5 text-wildfire-500" />}
              className="transition-all duration-500 delay-100 border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-wildfire-300 hover:shadow-elevation"
              textColor="text-white"
              descriptionColor="text-white/70"
            />
            
            <StatCard
              title="CO₂ Data Points"
              value={animateStats ? formatNumber(18457) : "0"}
              description="Emissions data collected and analyzed"
              icon={<CloudRain className="h-5 w-5 text-wildfire-500" />}
              className="transition-all duration-500 delay-200 border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-wildfire-300 hover:shadow-elevation"
              textColor="text-white"
              descriptionColor="text-white/70"
            />
            
            <StatCard
              title="Wildfires Predicted"
              value={animateStats ? formatNumber(3129) : "0"}
              description="Successfully forecasted with high accuracy"
              icon={<Flame className="h-5 w-5 text-wildfire-500" />}
              trend="up"
              trendValue="+14% from last year"
              className="transition-all duration-500 delay-300 border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-wildfire-300 hover:shadow-elevation"
              textColor="text-white"
              descriptionColor="text-white/70"
              trendColor="text-green-400"
            />
            
            <StatCard
              title="Model Accuracy"
              value={animateStats ? "94.2%" : "0%"}
              description="Precision in wildfire risk assessment"
              icon={<BarChart4 className="h-5 w-5 text-wildfire-500" />}
              trend="up"
              trendValue="+2.3% improvement"
              className="transition-all duration-500 delay-400 border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-wildfire-300 hover:shadow-elevation"
              textColor="text-white"
              descriptionColor="text-white/70"
              trendColor="text-green-400"
            />
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Weather Data Points"
              value={animateStats ? formatNumber(42518) : "0"}
              description="Real-time temperature and humidity readings"
              icon={<Thermometer className="h-5 w-5 text-wildfire-500" />}
              className="transition-all duration-500 delay-500 border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-wildfire-300 hover:shadow-elevation"
              textColor="text-white"
              descriptionColor="text-white/70"
            />
            
            <StatCard
              title="Drought Indices"
              value={animateStats ? formatNumber(15763) : "0"}
              description="Drought conditions analyzed for risk factors"
              icon={<Wind className="h-5 w-5 text-wildfire-500" />}
              trend="up"
              trendValue="+8.7% coverage"
              className="transition-all duration-500 delay-600 border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-wildfire-300 hover:shadow-elevation"
              textColor="text-white"
              descriptionColor="text-white/70"
              trendColor="text-green-400"
            />
            
            <StatCard
              title="API Calls Daily"
              value={animateStats ? formatNumber(12500) : "0"}
              description="Weather data requests to enhance predictions"
              icon={<Globe className="h-5 w-5 text-wildfire-500" />}
              className="transition-all duration-500 delay-700 border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-wildfire-300 hover:shadow-elevation lg:col-span-1 sm:col-span-2"
              textColor="text-white"
              descriptionColor="text-white/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
