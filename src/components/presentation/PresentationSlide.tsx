
import { IntroSlide } from "./slides/IntroSlide";
import { ArchitectureSlide } from "./slides/ArchitectureSlide";
import { FeaturesSlide } from "./slides/FeaturesSlide";
import { ProcessSlide } from "./slides/ProcessSlide";
import { TechnologySlide } from "./slides/TechnologySlide";
import { AnalyticsSlide } from "./slides/AnalyticsSlide";
import { FutureSlide } from "./slides/FutureSlide";
import { DemoSlide } from "./slides/DemoSlide";

interface PresentationSlideProps {
  slideNumber: number;
  totalSlides: number;
}

export function PresentationSlide({ slideNumber }: PresentationSlideProps) {
  // Render the appropriate slide based on slideNumber
  switch (slideNumber) {
    case 0:
      return <IntroSlide />;
    case 1:
      return <ArchitectureSlide />;
    case 2:
      return <FeaturesSlide />;
    case 3:
      return <ProcessSlide />;
    case 4:
      return <TechnologySlide />;
    case 5:
      return <AnalyticsSlide />;
    case 6:
      return <FutureSlide />;
    case 7:
      return <DemoSlide />;
    default:
      return <IntroSlide />;
  }
}
