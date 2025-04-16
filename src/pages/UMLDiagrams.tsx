
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Component, 
  FileCode, 
  Activity, 
  PlaySquare, 
  Users,
  ChevronLeft
} from "lucide-react";
import { Link } from "react-router-dom";

// UML Diagram components
import { ComponentDiagram } from "@/components/uml/ComponentDiagram";
import { ClassDiagram } from "@/components/uml/ClassDiagram";
import { SequenceDiagram } from "@/components/uml/SequenceDiagram";
import { ActivityDiagram } from "@/components/uml/ActivityDiagram";
import { UseCaseDiagram } from "@/components/uml/UseCaseDiagram";

const UMLDiagrams = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-6">
            <Link to="/about">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to About
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              UML Diagrams
            </h1>
            <p className="text-muted-foreground text-lg">
              Detailed UML diagrams representing the architecture and workflows of our Wildfire Prediction System
            </p>
          </div>
          
          <Tabs defaultValue="component" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="component" className="flex gap-2 items-center">
                <Component className="h-4 w-4" />
                <span className="hidden md:inline">Component</span>
              </TabsTrigger>
              <TabsTrigger value="class" className="flex gap-2 items-center">
                <FileCode className="h-4 w-4" />
                <span className="hidden md:inline">Class</span>
              </TabsTrigger>
              <TabsTrigger value="sequence" className="flex gap-2 items-center">
                <PlaySquare className="h-4 w-4" />
                <span className="hidden md:inline">Sequence</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex gap-2 items-center">
                <Activity className="h-4 w-4" />
                <span className="hidden md:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="usecase" className="flex gap-2 items-center">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Use Case</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4 md:p-8 border rounded-lg bg-background/50">
              <TabsContent value="component" className="mt-0">
                <h2 className="text-2xl font-bold mb-6 font-display">Component Diagram</h2>
                <p className="text-muted-foreground mb-6">
                  This diagram illustrates the high-level components of our Wildfire Prediction System, showing relationships between the Data Integration Module, Climate-Fire Analysis Module, Prediction Engine, and User Interface.
                </p>
                <ComponentDiagram />
              </TabsContent>
              
              <TabsContent value="class" className="mt-0">
                <h2 className="text-2xl font-bold mb-6 font-display">Class Diagram</h2>
                <p className="text-muted-foreground mb-6">
                  Depicts the key classes in our Random Forest implementation, showing relationships between Risk Classification Forest, Intensity Regression Forest, and Emissions Prediction Forest classes.
                </p>
                <ClassDiagram />
              </TabsContent>
              
              <TabsContent value="sequence" className="mt-0">
                <h2 className="text-2xl font-bold mb-6 font-display">Sequence Diagram</h2>
                <p className="text-muted-foreground mb-6">
                  Illustrates the workflow of data through our system, showing interactions between system components during a prediction cycle and demonstrating how data flows from collection to analysis to prediction.
                </p>
                <SequenceDiagram />
              </TabsContent>
              
              <TabsContent value="activity" className="mt-0">
                <h2 className="text-2xl font-bold mb-6 font-display">Activity Diagram</h2>
                <p className="text-muted-foreground mb-6">
                  Shows the operational workflow of our model, illustrating decision points in the analysis process and mapping the step-by-step process from data collection to alert generation.
                </p>
                <ActivityDiagram />
              </TabsContent>
              
              <TabsContent value="usecase" className="mt-0">
                <h2 className="text-2xl font-bold mb-6 font-display">Use Case Diagram</h2>
                <p className="text-muted-foreground mb-6">
                  Shows different user roles (fire managers, public users, policy makers), illustrating various system functions accessed by different stakeholders and demonstrating how users interact with different aspects of the system.
                </p>
                <UseCaseDiagram />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UMLDiagrams;
