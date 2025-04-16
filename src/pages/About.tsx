import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DiagramsDisplay } from "@/components/prediction/DiagramsDisplay";
import { Button } from "@/components/ui/button";
import { Workflow, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const [showDiagrams, setShowDiagrams] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              About Our Project
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn about our mission, methodology, and the technology behind our wildfire prediction model.
            </p>
          </div>
          
          {/* System Flow Diagrams Section - Only show when showDiagrams is true */}
          {showDiagrams && (
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DiagramsDisplay />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-4 font-display">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                We're dedicated to leveraging advanced machine learning and data analytics to predict, analyze, and mitigate wildfire risks across different regions. By combining historical wildfire data with CO₂ emissions and geographical information, we aim to provide accurate risk assessments that can help in wildfire prevention and management.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 font-display">Research Methodology</h2>
              <p className="text-muted-foreground">
                Our approach integrates various data sources and employs sophisticated algorithms to identify patterns and correlations between environmental factors and wildfire occurrences. The methodology includes:
              </p>
              <ul className="list-disc pl-5 my-4 space-y-2 text-muted-foreground">
                <li>Comprehensive data collection from multiple sources</li>
                <li>Rigorous preprocessing and feature engineering</li>
                <li>Implementation of advanced machine learning models</li>
                <li>Continuous validation against historical data</li>
                <li>Regular model updates based on new data and findings</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 font-display">The Technology</h2>
              <p className="text-muted-foreground mb-4">
                Our platform is built on a combination of cutting-edge technologies that enable accurate predictions and insightful analytics:
              </p>
              
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg border border-wildfire-100">
                  <h3 className="font-medium mb-2">Machine Learning Model</h3>
                  <p className="text-sm text-muted-foreground">
                    Random Forest Classifier optimized for geospatial and environmental data, achieving over 94% accuracy in wildfire predictions.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg border border-wildfire-100">
                  <h3 className="font-medium mb-2">Data Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced data pipelines for collecting, cleaning, and integrating wildfire records, CO₂ emission data, and geographic information.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg border border-wildfire-100">
                  <h3 className="font-medium mb-2">Visualization</h3>
                  <p className="text-sm text-muted-foreground">
                    Interactive analytics dashboard powered by modern data visualization libraries for clear and actionable insights.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg border border-wildfire-100">
                  <h3 className="font-medium mb-2">User Interface</h3>
                  <p className="text-sm text-muted-foreground">
                    Intuitive, accessible web application built with React, featuring responsive design and seamless user experience.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 font-display">Future Developments</h2>
              <p className="text-muted-foreground">
                We're continuously working to enhance our platform with new features and improvements, including real-time data integration, mobile applications, and expanded geographic coverage.
              </p>
            </div>
          </div>
          
          {/* Toggle Diagrams Buttons */}
          <div className="mt-16 mb-4 text-center space-x-4">
            <Button 
              variant="outline" 
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors bg-transparent border-none"
              onClick={() => setShowDiagrams(!showDiagrams)}
            >
              <Workflow className="h-3 w-3 mr-1" />
              {showDiagrams ? "Hide System Flow Diagrams" : "View System Flow Diagrams"}
            </Button>
            
            <Link to="/uml-diagrams">
              <Button 
                variant="outline" 
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors bg-transparent border-none"
              >
                <FileText className="h-3 w-3 mr-1" />
                UML Diagrams
              </Button>
            </Link>
          </div>
          
          {/* Subtle link to model results at the bottom */}
          <div className="mt-16 text-center">
            <Link 
              to="/model-results" 
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              Research Model Performance Data
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
