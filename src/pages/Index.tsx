
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";
import { GreenhouseGasSection } from "@/components/GreenhouseGasSection";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { usePreloadOgImage } from "@/hooks/usePreloadOgImage";
import { useEffect } from "react";

const Index = () => {
  // Preload OG image for better sharing experience
  usePreloadOgImage();
  
  // Apply smooth scrolling on mount
  useEffect(() => {
    // Save original scroll behavior
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    
    // Apply smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Clean up on unmount
    return () => {
      document.documentElement.style.scrollBehavior = originalStyle;
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow will-change-scroll">
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
