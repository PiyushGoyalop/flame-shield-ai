
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";
import { GreenhouseGasSection } from "@/components/GreenhouseGasSection";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { usePreloadOgImage } from "@/hooks/usePreloadOgImage";

const Index = () => {
  // Preload OG image for better sharing experience
  usePreloadOgImage();
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Static background image with overlay */}
      <div className="fixed inset-0 bg-forest-dark bg-cover bg-center bg-no-repeat z-0">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>
      </div>
      
      <Nav />
      
      <main className="flex-grow relative z-10">
        <HeroSection />
        <StatsSection />
        <FeatureSection />
        <GreenhouseGasSection />
        <ProcessSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
