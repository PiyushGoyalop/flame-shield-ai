
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PresentationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToSlide: (slide: number) => void;
}

export function PresentationControls({
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
  onGoToSlide
}: PresentationControlsProps) {
  return (
    <div className="mt-6 flex justify-between items-center">
      <Button
        onClick={onPrevious}
        disabled={currentSlide === 0}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoToSlide(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === currentSlide
                ? "bg-wildfire-600 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      <Button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
