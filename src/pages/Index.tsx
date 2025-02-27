
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <FeatureSection />
        <ProcessSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
