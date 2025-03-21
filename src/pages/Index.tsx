
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
    <div className="min-h-screen flex flex-col">
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
  );
};

export default Index;
