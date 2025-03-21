
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";
import { GreenhouseGasSection } from "@/components/GreenhouseGasSection";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { usePreloadOgImage } from "@/hooks/usePreloadOgImage";
import { useEffect, useState } from "react";

const Index = () => {
  // Preload OG image for better sharing experience
  usePreloadOgImage();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/static-forest-bg.jpg';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed background image that stays in place during scroll */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-1000" 
           style={{ 
             backgroundImage: `url('/static-forest-bg.jpg')`,
             opacity: imageLoaded ? 1 : 0
           }}>
        {/* Semi-transparent overlay to improve content visibility */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>
      
      {/* Content with higher z-index to appear above the background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Nav />
        
        <main className="flex-grow">
          <HeroSection />
          <StatsSection />
          <FeatureSection />
          <GreenhouseGasSection />
          <ProcessSection />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
