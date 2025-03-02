
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, AlertTriangle, Thermometer, Droplets, Wind, Leaf, Cloud, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "@/components/StatCard";

interface PredictionResult {
  location: string;
  probability: number;
  co2Level: number;
  temperature: number;
  humidity: number;
  droughtIndex: number;
}

export function PredictionForm() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [bgAnimation, setBgAnimation] = useState<number>(1);
  const { toast } = useToast();

  // Rotate through different animation states for the card
  useEffect(() => {
    const interval = setInterval(() => {
      setBgAnimation(prev => (prev % 5) + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get background style based on current animation state
  const getCardStyle = () => {
    // Different styles for card animation
    const gradients = [
      "bg-gradient-to-br from-wildfire-50 to-wildfire-100 shadow-wildfire-100/20",
      "bg-gradient-to-br from-blue-50 to-wildfire-50 shadow-blue-100/20",
      "bg-gradient-to-br from-amber-50 to-blue-50 shadow-amber-100/20",
      "bg-gradient-to-tl from-wildfire-50 to-amber-100 shadow-wildfire-100/20",
      "bg-gradient-to-tr from-green-50 to-blue-50 shadow-green-100/20"
    ];
    
    return `${gradients[bgAnimation-1]} transition-all duration-1000`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location to make a prediction",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulating API call to the ML model
    setTimeout(() => {
      // Generate more realistic random data
      const randomProbability = (
        location.toLowerCase().includes('california') ? Math.random() * 35 + 55 : // Higher for California
        location.toLowerCase().includes('colorado') ? Math.random() * 30 + 45 : // Medium-high for Colorado
        location.toLowerCase().includes('oregon') ? Math.random() * 25 + 40 : // Medium for Oregon
        location.toLowerCase().includes('york') ? Math.random() * 15 + 10 : // Lower for New York
        location.toLowerCase().includes('florida') ? Math.random() * 20 + 30 : // Medium-low for Florida
        Math.random() * 60 + 20 // Random for other places
      );
      
      const co2Level = Math.random() * 50 + 5; // Random CO2 level between 5 and 55 MT
      const temperature = Math.random() * 30 + 5; // Random temperature between 5°C and 35°C
      const humidity = Math.random() * 60 + 20; // Random humidity between 20% and 80%
      const droughtIndex = 100 - humidity; // Simple drought index calculation
      
      setResult({
        location,
        probability: Math.round(randomProbability * 100) / 100,
        co2Level: Math.round(co2Level * 10) / 10,
        temperature: Math.round(temperature * 10) / 10,
        humidity: Math.round(humidity),
        droughtIndex: Math.round(droughtIndex),
      });
      
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: "Prediction Complete",
        description: `Analysis for ${location} has been generated.`,
      });
    }, 1500);
  };

  // Modularized result section components
  const ResultHeader = ({ result }: { result: PredictionResult }) => (
    <div className="mb-4 text-center animate-fade-in">
      <h3 className="font-medium text-base flex items-center justify-center gap-2">
        <MapPin className="h-4 w-4 text-wildfire-500" />
        Results for {result.location}
      </h3>
    </div>
  );
  
  const RiskIndicator = ({ probability }: { probability: number }) => {
    // Determine risk level for more detailed styling
    const getRiskLevel = () => {
      if (probability < 33) return { color: 'green', text: 'Low Risk' };
      if (probability < 66) return { color: 'amber', text: 'Moderate Risk' };
      return { color: 'red', text: 'High Risk' };
    };
    
    const risk = getRiskLevel();
    
    return (
      <div className="mb-4">
        <div className="relative h-5 bg-secondary rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
            style={{ 
              width: `${probability}%`,
              background: `linear-gradient(90deg, ${
                probability < 33 ? '#34D399' : 
                probability < 66 ? '#FBBF24' : '#EF4444'
              }, ${
                probability < 33 ? '#10B981' : 
                probability < 66 ? '#F59E0B' : '#DC2626'
              })` 
            }}
          />
          
          {/* Animated pulse marker for exact position */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white animate-pulse"
            style={{ left: `${probability}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm mt-1">
          <span className="text-green-600 font-medium">Low Risk</span>
          <span className="text-amber-600 font-medium">Moderate Risk</span>
          <span className="text-red-600 font-medium">High Risk</span>
        </div>
        
        <div className="text-center mt-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
            ${risk.color === 'green' ? 'bg-green-100 text-green-800' : 
              risk.color === 'amber' ? 'bg-amber-100 text-amber-800' : 
                'bg-red-100 text-red-800'}`}>
            {risk.text}: {probability}%
          </span>
        </div>
      </div>
    );
  };
  
  const WeatherStats = ({ result }: { result: PredictionResult }) => (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <StatCard 
        title="Temperature" 
        value={`${result.temperature}°C`}
        icon={<Thermometer className="h-5 w-5 text-wildfire-500" />}
        className="border-wildfire-100 bg-white/90"
      />
      <StatCard 
        title="Humidity" 
        value={`${result.humidity}%`}
        icon={<Droplets className="h-5 w-5 text-blue-500" />}
        className="border-blue-100 bg-white/90"
      />
      <StatCard 
        title="Drought" 
        value={`${result.droughtIndex}`}
        icon={<Wind className="h-5 w-5 text-amber-500" />}
        className="border-amber-100 bg-white/90"
      />
    </div>
  );
  
  const MainStats = ({ result }: { result: PredictionResult }) => (
    <div className="p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-colors shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <Leaf className="h-3 w-3 text-wildfire-600" /> Wildfire Probability:
        </span>
        <span className="font-bold">{result.probability}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-1">
          <Cloud className="h-3 w-3 text-blue-600" /> CO₂ Levels:
        </span>
        <span>{result.co2Level} MT</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-md w-full mx-auto">
      <Card className={`border-wildfire-200 shadow-elevation transition-all duration-1000 ${getCardStyle()}`}>
        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-wildfire-600/10 to-transparent mix-blend-overlay" />
          <CardTitle className="text-center font-display relative z-10">Wildfire Risk Prediction</CardTitle>
          <CardDescription className="text-center relative z-10">
            Enter a location to assess its wildfire risk based on our ML model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <Input
                  id="location"
                  placeholder="e.g., Los Angeles, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 focus:border-wildfire-400 focus:ring-wildfire-400 transition-all"
                  disabled={isLoading}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter city, state or any known location
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-wildfire-600 hover:bg-wildfire-700 transition-all" 
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Predict Risk"}
            </Button>
          </form>
          
          {result && (
            <div className="mt-6 animate-fade-in">
              <ResultHeader result={result} />
              
              <div className="space-y-4">
                <RiskIndicator probability={result.probability} />
                
                <div className="grid grid-cols-1 gap-3">
                  <MainStats result={result} />
                  <WeatherStats result={result} />
                </div>
                
                {result.probability > 65 && (
                  <Alert variant="destructive" className="bg-danger-50 text-danger-800 border-danger-200 animate-pulse">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>High Risk Detected</AlertTitle>
                    <AlertDescription>
                      This location has a high probability of wildfire occurrence. Consider taking preventive measures.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col px-6 text-xs text-muted-foreground">
          <p>Our prediction model is based on historical wildfire data, CO₂ emissions, and geographic features with real-time weather data.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
