
import { PredictionForm } from "@/components/PredictionForm";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, BarChart4, FileCode, Globe, CloudRain, Thermometer } from "lucide-react";

const Predict = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Wildfire Risk Prediction
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter a location to get an AI-powered assessment of wildfire risk based on environmental factors, real-time weather data, and historical patterns.
            </p>
          </div>
          
          <PredictionForm />
          
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-6 text-center">Advanced ML-Powered Prediction</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-wildfire-100 p-2.5 rounded-lg">
                      <FileCode className="h-5 w-5 text-wildfire-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">XGBoost Algorithm</h3>
                      <p className="text-muted-foreground">
                        Our model uses XGBoost with optimized hyperparameters to achieve 94.2% accuracy in wildfire prediction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-wildfire-100 p-2.5 rounded-lg">
                      <Globe className="h-5 w-5 text-wildfire-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Real-Time Data</h3>
                      <p className="text-muted-foreground">
                        Incorporates current weather conditions via OpenWeather API for more accurate risk assessment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-wildfire-100 p-2.5 rounded-lg">
                      <BarChart4 className="h-5 w-5 text-wildfire-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">SMOTE Balancing</h3>
                      <p className="text-muted-foreground">
                        Uses Synthetic Minority Over-sampling Technique to address class imbalance for better prediction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-wildfire-200 hover:border-wildfire-300 hover:shadow-elevation transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-wildfire-100 p-2.5 rounded-lg">
                      <CloudRain className="h-5 w-5 text-wildfire-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">CO₂ Correlation</h3>
                      <p className="text-muted-foreground">
                        Analyzes the relationship between carbon emissions and wildfire occurrence probability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-wildfire-200">
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

export default Predict;
