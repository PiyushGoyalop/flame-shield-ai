
import { useState, useEffect, useMemo } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { preloadImages } from "@/utils/imagePreloader";
import { FeatureCardsSection } from "@/components/prediction/FeatureCardsSection";

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

// Image paths for preloading
const imagePaths = [
  '/prediction-bg-1.jpg',
  '/prediction-bg-2.jpg',
  '/prediction-bg-3.jpg',
  '/prediction-bg-4.jpg',
  '/prediction-bg-5.jpg',
];

const Predict = () => {
  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  // Function to preload the background images
  useEffect(() => {
    const loadImages = async () => {
      const loaded = await preloadImages(imagePaths);
      setImagesLoaded(loaded);
    };
    
    // Start preloading immediately
    loadImages();
  }, []);

  // Rotation through different background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % backgroundImages.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Get background class based on current image - memoized to prevent recalculation
  const getBackgroundClass = useMemo(() => {
    return imagesLoaded ? backgroundImages[backgroundIndex] : gradientBackgrounds[backgroundIndex];
  }, [backgroundIndex, imagesLoaded]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className={`flex-grow pt-24 pb-20 transition-all duration-1500 ${getBackgroundClass}`}>
        <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 bg-white/80 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-wildfire-800">
              Wildfire Risk Prediction
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter a location to get an AI-powered assessment of wildfire risk based on environmental factors, real-time weather data, and historical patterns.
            </p>
          </div>
          
          <PredictionForm />
          
          <div className="mt-16 max-w-[95%] xl:max-w-6xl mx-auto">
            <FeatureCardsSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Predict;
