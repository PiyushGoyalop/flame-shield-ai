
import { PredictionForm } from "@/components/PredictionForm";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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
              Enter a location to get an AI-powered assessment of wildfire risk based on environmental factors and historical data.
            </p>
          </div>
          
          <PredictionForm />
          
          <div className="mt-16 max-w-3xl mx-auto bg-secondary/50 p-6 rounded-lg border border-wildfire-100">
            <h2 className="text-xl font-medium mb-4">How Our Prediction Works</h2>
            <p className="text-muted-foreground mb-4">
              Our wildfire prediction model analyzes multiple factors to assess wildfire risk:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
              <li>Geographic location and terrain characteristics</li>
              <li>Historical wildfire occurrences in the region</li>
              <li>CO₂ emission levels and environmental factors</li>
              <li>Seasonal and climate patterns affecting the area</li>
              <li>Proximity to known wildfire risk zones</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              The results are presented as a probability percentage, indicating the likelihood of wildfire occurrence based on our machine learning model.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Predict;
