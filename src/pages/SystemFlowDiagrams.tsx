
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DiagramsDisplay } from "@/components/prediction/DiagramsDisplay";

const SystemFlowDiagrams = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              System Flow Diagrams
            </h1>
            <p className="text-muted-foreground text-lg">
              Detailed visual representations of our wildfire prediction system architecture and data flows.
            </p>
          </div>
          
          <div className="mb-10">
            <DiagramsDisplay />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SystemFlowDiagrams;
