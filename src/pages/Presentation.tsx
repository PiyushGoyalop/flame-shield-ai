
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PresentationSlide } from "@/components/presentation/PresentationSlide";
import { PresentationControls } from "@/components/presentation/PresentationControls";
import { ChevronLeft, ChevronRight, Home, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  // Total number of slides
  const totalSlides = 8;
  
  // Handle navigation between slides
  const goToNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextSlide();
      } else if (event.key === "ArrowLeft") {
        goToPrevSlide();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Nav />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-muted-foreground"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/predict")}
                className="flex items-center gap-1"
              >
                <Monitor className="h-4 w-4" />
                <span>Try the App</span>
              </Button>
            </div>
          </div>
          
          <div className="aspect-[16/9] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Slide content */}
            <PresentationSlide slideNumber={currentSlide} totalSlides={totalSlides} />
          </div>
          
          {/* Presentation controls */}
          <PresentationControls
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            onNext={goToNextSlide}
            onPrevious={goToPrevSlide}
            onGoToSlide={setCurrentSlide}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Presentation;
