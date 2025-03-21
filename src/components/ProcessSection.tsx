
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function ProcessSection() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Use IntersectionObserver instead of scroll event
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // Once visible, disconnect scroll observation
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Cycle through steps for animation - only when in view
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInView]);
  
  const steps = [
    {
      number: "01",
      title: "Data Collection",
      description: "Our system continuously collects and processes wildfire data, CO₂ emissions, and geographic information."
    },
    {
      number: "02",
      title: "Machine Learning",
      description: "Advanced algorithms analyze patterns and correlations between environmental factors and wildfire occurrences."
    },
    {
      number: "03",
      title: "Risk Assessment",
      description: "The model calculates wildfire probability based on location data and current environmental conditions."
    },
    {
      number: "04",
      title: "Visualization",
      description: "Results are presented through intuitive visualizations and actionable insights for better decision-making."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="process-section" 
      className="py-20 relative overflow-hidden bg-white will-change-transform"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-10 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className={`lg:w-1/2 transition-all duration-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
               style={{ willChange: isInView ? 'transform, opacity' : 'auto' }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-wildfire-800">
              Our Wildfire Prediction Process
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              From data collection to actionable insights, our comprehensive approach ensures accurate wildfire risk assessment and analysis.
            </p>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex gap-4 p-4 rounded-lg transition-all duration-300 ${activeStep === index ? 'bg-wildfire-50 border border-wildfire-200' : ''}`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold ${activeStep === index ? 'bg-wildfire-500 text-white' : 'bg-wildfire-100 text-wildfire-600 border border-wildfire-200'}`}>
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-medium text-xl mb-1 text-wildfire-800">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Button 
                className="bg-wildfire-500 hover:bg-wildfire-600 text-white"
                onClick={() => navigate("/predict")}
              >
                Try the Prediction Tool <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={`lg:w-1/2 transition-all duration-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
               style={{ willChange: isInView ? 'transform, opacity' : 'auto' }}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-wildfire-300 to-wildfire-500 rounded-xl blur-sm opacity-75"></div>
              <div className="relative bg-white rounded-xl overflow-hidden border border-wildfire-200">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
                    alt="Wildfire prediction visualization" 
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-wildfire-300" />
                      <span className="text-sm font-medium">Analyzing forest conditions</span>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-wildfire-300 rounded-full" 
                        style={{ 
                          width: `${(activeStep + 1) * 25}%`,
                          transition: 'width 1s ease-in-out',
                          willChange: 'width'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-2 text-wildfire-800">Predictive Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    Our machine learning model processes multiple data points to generate accurate wildfire risk assessments and visualizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Static decorative element instead of animated */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-wildfire-200 rounded-full filter blur-3xl opacity-30"></div>
    </section>
  );
}
