
import { useState, useEffect } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, BarChart4, FileCode, Globe, CloudRain, Thermometer, Database, LineChart } from "lucide-react";

// Array of background images for rotation
const backgroundImages = [
  "bg-[url('/prediction-bg-1.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/90",
  "bg-[url('/prediction-bg-2.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/90",
  "bg-[url('/prediction-bg-3.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/90",
  "bg-[url('/prediction-bg-4.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/90",
  "bg-[url('/prediction-bg-5.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/90"
];

// Array of gradient backgrounds for when images aren't loaded
const gradientBackgrounds = [
  "bg-gradient-to-br from-white to-wildfire-50",
  "bg-gradient-to-br from-white to-blue-50",
  "bg-gradient-to-br from-white to-green-50",
  "bg-gradient-to-br from-white to-amber-50",
  "bg-gradient-to-br from-white to-wildfire-100"
];

const Predict = () => {
  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  // Function to preload the background images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imageUrls = [
          '/prediction-bg-1.jpg',
          '/prediction-bg-2.jpg',
          '/prediction-bg-3.jpg',
          '/prediction-bg-4.jpg',
          '/prediction-bg-5.jpg',
        ];
        
        const preloadPromises = imageUrls.map(url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        
        await Promise.all(preloadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images:", error);
        // Fallback to gradient backgrounds
      }
    };
    
    preloadImages();
  }, []);

  // Rotate through different background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % 5);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Get background class based on current image
  const getBackgroundClass = () => {
    return imagesLoaded ? backgroundImages[backgroundIndex] : gradientBackgrounds[backgroundIndex];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className={`flex-grow pt-28 pb-20 transition-all duration-1500 ${getBackgroundClass()}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 bg-white/80 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-wildfire-800">
              Wildfire Risk Prediction
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter a location to get an AI-powered assessment of wildfire risk based on environmental factors, real-time weather data, and historical patterns.
            </p>
          </div>
          
          <PredictionForm />
          
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-6 text-center">Advanced ML-Powered Prediction</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <FeatureCard 
                icon={FileCode} 
                title="XGBoost Algorithm" 
                description="Our model uses XGBoost with optimized hyperparameters to achieve 94.2% accuracy in wildfire prediction."
              />
              
              <FeatureCard 
                icon={Globe} 
                title="Real-Time Data" 
                description="Incorporates current weather conditions via OpenWeather API for more accurate risk assessment."
              />
              
              <FeatureCard 
                icon={BarChart4} 
                title="SMOTE Balancing" 
                description="Uses Synthetic Minority Over-sampling Technique to address class imbalance for better prediction."
              />
              
              <FeatureCard 
                icon={CloudRain} 
                title="CO₂ Correlation" 
                description="Analyzes the relationship between carbon emissions and wildfire occurrence probability."
              />
              
              <FeatureCard 
                icon={Database} 
                title="GridSearchCV Tuning" 
                description="Optimizes hyperparameters using 5-fold cross-validation to maximize model performance."
              />
              
              <FeatureCard 
                icon={LineChart} 
                title="Pattern Recognition" 
                description="Identifies temporal and spatial patterns in wildfire occurrences across diverse geographical regions."
              />
            </div>
            
            <Card className="border-wildfire-200 transform transition-all duration-500 hover:shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">How Our Prediction Works</h3>
                <p className="text-muted-foreground mb-4">
                  Our enhanced wildfire prediction model analyzes multiple factors to assess wildfire risk:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>Geographic location and terrain characteristics</li>
                  <li>Historical wildfire occurrences across 24,632 locations</li>
                  <li>CO₂ emission levels from state-level environmental data</li>
                  <li>Real-time weather conditions (temperature, humidity)</li>
                  <li>Derived drought index based on weather parameters</li>
                  <li>Advanced feature engineering from multiple data sources</li>
                </ul>
                <div className="mt-6 p-4 bg-wildfire-50 rounded-lg border border-wildfire-100">
                  <div className="flex items-center gap-2 text-wildfire-700">
                    <Thermometer className="h-5 w-5" />
                    <span className="font-medium">Technical Implementation:</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The model combines XGBoost classification with GridSearchCV for hyperparameter tuning. 
                    Weather data is fetched via API, while location data is geocoded using the Nominatim service. 
                    Predictions deliver probability scores along with contributing environmental factors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper component to make the code more modular
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string;
}) => (
  <Card className="border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation transition-all hover:-translate-y-1 duration-300 bg-white/80 backdrop-blur-sm">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="bg-wildfire-100 p-2.5 rounded-lg">
          <Icon className="h-5 w-5 text-wildfire-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Predict;
