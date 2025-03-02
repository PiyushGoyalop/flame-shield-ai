
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, AlertTriangle, Thermometer, Droplets, Wind } from "lucide-react";
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
  const { toast } = useToast();

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
    }, 1500);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <Card className="border-wildfire-200 shadow-elevation">
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
                  className="pl-10"
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
              className="w-full bg-wildfire-600 hover:bg-wildfire-700" 
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Predict Risk"}
            </Button>
          </form>
          
          {result && (
            <div className="mt-6 animate-fade-in">
              <div className="mb-4 text-center">
                <h3 className="font-medium text-base">Results for {result.location}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${result.probability}%`,
                      background: `linear-gradient(90deg, ${
                        result.probability < 33 ? '#34D399' : 
                        result.probability < 66 ? '#FBBF24' : '#EF4444'
                      }, ${
                        result.probability < 33 ? '#10B981' : 
                        result.probability < 66 ? '#F59E0B' : '#DC2626'
                      })` 
                    }}
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Low Risk</span>
                  <span>Moderate Risk</span>
                  <span>High Risk</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Wildfire Probability:</span>
                      <span className="font-bold">{result.probability}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">CO₂ Levels:</span>
                      <span>{result.co2Level} MT</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-wildfire-50 rounded-lg border border-wildfire-100">
                      <div className="flex items-center justify-center mb-1">
                        <Thermometer className="h-4 w-4 text-wildfire-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Temperature</div>
                        <div className="font-medium">{result.temperature}°C</div>
                      </div>
                    </div>

                    <div className="p-3 bg-wildfire-50 rounded-lg border border-wildfire-100">
                      <div className="flex items-center justify-center mb-1">
                        <Droplets className="h-4 w-4 text-wildfire-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Humidity</div>
                        <div className="font-medium">{result.humidity}%</div>
                      </div>
                    </div>

                    <div className="p-3 bg-wildfire-50 rounded-lg border border-wildfire-100">
                      <div className="flex items-center justify-center mb-1">
                        <Wind className="h-4 w-4 text-wildfire-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Drought Index</div>
                        <div className="font-medium">{result.droughtIndex}</div>
                      </div>
                    </div>
                  </div>
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
