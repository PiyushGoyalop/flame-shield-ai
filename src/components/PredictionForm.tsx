
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, AlertTriangle, Thermometer, Droplets, Wind, Leaf, Cloud } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
  const [bgImage, setBgImage] = useState<number>(1);
  const { toast } = useToast();

  // Rotate through different background images for the card
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage(prev => (prev % 4) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Get background gradient based on current image
  const getCardGradient = () => {
    switch(bgImage) {
      case 1: return "bg-gradient-to-br from-wildfire-50 to-wildfire-100";
      case 2: return "bg-gradient-to-br from-blue-50 to-wildfire-50";
      case 3: return "bg-gradient-to-br from-green-50 to-blue-50";
      case 4: return "bg-gradient-to-br from-amber-50 to-green-50";
      default: return "bg-gradient-to-br from-wildfire-50 to-wildfire-100";
    }
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
      // Sample data - in a real app, this would come from the backend/API
      const probability = Math.random() * 100;
      const co2Level = Math.random() * 50 + 5; // Random CO2 level between 5 and 55 MT
      const temperature = Math.random() * 30 + 5; // Random temperature between 5°C and 35°C
      const humidity = Math.random() * 60 + 20; // Random humidity between 20% and 80%
      const droughtIndex = 100 - humidity; // Simple drought index calculation
      
      setResult({
        location,
        probability: Math.round(probability * 100) / 100,
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

  // Helper components to make the code more modular
  const ResultHeader = ({ result }: { result: PredictionResult }) => (
    <div className="mb-4 text-center animate-fade-in">
      <h3 className="font-medium text-base">Results for {result.location}</h3>
    </div>
  );
  
  const RiskIndicator = ({ probability }: { probability: number }) => (
    <>
      <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
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
      </div>
      <div className="flex justify-between text-sm">
        <span>Low Risk</span>
        <span>Moderate Risk</span>
        <span>High Risk</span>
      </div>
    </>
  );
  
  const WeatherStats = ({ result }: { result: PredictionResult }) => (
    <div className="grid grid-cols-3 gap-2">
      <StatCard 
        icon={Thermometer} 
        label="Temperature" 
        value={`${result.temperature}°C`} 
      />
      <StatCard 
        icon={Droplets} 
        label="Humidity" 
        value={`${result.humidity}%`} 
      />
      <StatCard 
        icon={Wind} 
        label="Drought Index" 
        value={`${result.droughtIndex}`} 
      />
    </div>
  );
  
  const StatCard = ({ 
    icon: Icon, 
    label, 
    value 
  }: { 
    icon: React.ComponentType<any>; 
    label: string; 
    value: string;
  }) => (
    <div className="p-3 bg-wildfire-50 rounded-lg border border-wildfire-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-center mb-1">
        <Icon className="h-4 w-4 text-wildfire-500" />
      </div>
      <div className="text-center">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
  
  const MainStats = ({ result }: { result: PredictionResult }) => (
    <div className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary/60 transition-colors">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium flex items-center gap-1">
          <Leaf className="h-3 w-3" /> Wildfire Probability:
        </span>
        <span className="font-bold">{result.probability}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-1">
          <Cloud className="h-3 w-3" /> CO₂ Levels:
        </span>
        <span>{result.co2Level} MT</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-md w-full mx-auto">
      <Card className={`border-wildfire-200 shadow-elevation transition-all duration-700 ${getCardGradient()}`}>
        <CardHeader>
          <CardTitle className="text-center font-display">Wildfire Risk Prediction</CardTitle>
          <CardDescription className="text-center">
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
                  className="pl-10 focus:border-wildfire-400 focus:ring-wildfire-400"
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
              className="w-full bg-wildfire-600 hover:bg-wildfire-700 transition-colors" 
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
                  <Alert variant="destructive" className="bg-danger-50 text-danger-800 border-danger-200">
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
