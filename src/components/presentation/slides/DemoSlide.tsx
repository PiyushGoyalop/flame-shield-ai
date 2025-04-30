
import { Play, File, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function DemoSlide() {
  const navigate = useNavigate();
  
  return (
    <div className="h-full flex flex-col px-8 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-wildfire-800">Demo & Conclusion</h2>
      
      <div className="flex-grow flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
        <div className="mb-12">
          <div className="w-20 h-20 rounded-full bg-wildfire-100 flex items-center justify-center mx-auto mb-6">
            <Play className="h-10 w-10 text-wildfire-600" />
          </div>
          
          <h3 className="text-2xl font-medium mb-4">Ready for a Live Demonstration?</h3>
          <p className="text-muted-foreground mb-8">
            Experience the Wildfire Risk Prediction System firsthand and see how it can help with early detection and prevention.
          </p>
          
          <Button 
            size="lg"
            className="bg-wildfire-600 hover:bg-wildfire-700 text-white"
            onClick={() => navigate("/predict")}
          >
            Try the Prediction Tool
          </Button>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="flex items-center mb-4">
              <File className="h-5 w-5 text-wildfire-600 mr-2" />
              <h3 className="font-medium">Documentation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive documentation is available for technical details, API references, and implementation guides.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-wildfire-600 mr-2" />
              <h3 className="font-medium">Contact</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              For questions, feedback, or partnership opportunities, please reach out to our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
