
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DiagramsDisplay() {
  const [activeTab, setActiveTab] = useState("website");

  // Diagram content for each tab
  const diagrams = {
    website: {
      title: "Website Architecture",
      content: `┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│   User Interface    │     │   API Integration   │     │    Data Storage     │
│                     │     │                     │     │                     │
└─────────┬───────────┘     └─────────┬───────────┘     └─────────┬───────────┘
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  Frontend (React)   │◄───►│  Backend (Supabase) │◄───►│  Database (PostgreSQL) │
│                     │     │                     │     │                     │
└─────────┬───────────┘     └─────────┬───────────┘     └─────────┬───────────┘
          │                           │                           │
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                             Key Components                                  │
│                                                                             │
├─────────────────────┬─────────────────────┬─────────────────────────────────┤
│                     │                     │                                 │
│   Authentication    │   Prediction Engine │     Analytics & Reporting       │
│                     │                     │                                 │
└─────────────────────┴─────────────────────┴─────────────────────────────────┘`,
      userFlow: `┌──────────┐     ┌───────────┐     ┌────────────────┐     ┌──────────────────┐
│          │     │           │     │                │     │                  │
│  Visit   │────►│  Sign Up/ │────►│  Enter Location│────►│  View Prediction  │
│  Website │     │  Sign In  │     │                │     │                  │
│          │     │           │     │                │     │                  │
└──────────┘     └───────────┘     └────────────────┘     └──────────┬───────┘
                                                                     │
                       ┌─────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────┐     ┌───────────────┐     ┌───────────────────────────┐
│                  │     │               │     │                           │
│  View Historical │◄───►│ Save/Download │◄───►│  Compare Multiple         │
│  Predictions     │     │ Results       │     │  Locations/Predictions    │
│                  │     │               │     │                           │
└──────────────────┘     └───────────────┘     └───────────────────────────┘`
    },
    prediction: {
      title: "Prediction Flow",
      content: `┌──────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│              │     │                   │     │                     │
│  Location    │────►│ Geocoding Service │────►│  Weather API         │──┐
│  Input       │     │ (Coordinates)     │     │  (Temperature,       │  │
│              │     │                   │     │   Humidity, etc.)    │  │
└──────────────┘     └───────────────────┘     └─────────────────────┘  │
                                                                        │
                                                                        ▼
┌───────────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│                   │     │                   │     │                     │
│ Feature           │◄────┤ Air Pollution API │◄────┤ Earth Engine API    │
│ Engineering       │     │ (PM2.5, CO2, etc.)│     │ (Vegetation indices,│
│                   │     │                   │     │  Land cover)        │
└────────┬──────────┘     └───────────────────┘     └─────────────────────┘
         │
         │
         ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  Random Forest      │────►│  Risk Assessment    │────►│  Explanation &      │
│  Prediction Model   │     │  (Probability)      │     │  Visualization      │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘`,
      dataFlow: `┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│         │    │         │    │         │    │         │    │         │    │         │
│ Raw     │───►│ Clean   │───►│ Process │───►│ Feature │───►│ Predict │───►│ Output  │
│ Data    │    │ Data    │    │ Data    │    │ Extract │    │         │    │ Results │
│         │    │         │    │         │    │         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘

│                                                                                    │
▼                                                                                    ▼
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│                            Data Validation & Quality Checks                        │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘`
    },
    "random-forest": {
      title: "Random Forest Architecture",
      content: `┌───────────────────────────────────────────────────────────────┐
│                 Advanced Random Forest Model                   │
│                  (200 Specialized Trees)                       │
└───────────────────────────────────────────────────────────────┘
    │                      │                        │
    ▼                      ▼                        ▼
┌─────────────┐      ┌─────────────┐         ┌─────────────┐
│ Temperature │      │ Humidity &  │         │ Vegetation  │
│ Specialized │      │ Drought     │         │ Specialized │
│ Trees (50)  │      │ Trees (50)  │         │ Trees (50)  │
└──────┬──────┘      └──────┬──────┘         └──────┬──────┘
       │                    │                       │
       └────────────────────┼───────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                 Tree Ensemble Integration                     │
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │Regional        │  │Seasonal        │  │Feature         │  │
│  │Specialization  │  │Specialization  │  │Interactions    │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                 Advanced Prediction Pipeline                  │
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │Weighted        │  │Outlier         │  │Calibration &   │  │
│  │Aggregation     │  │Removal         │  │Confidence      │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                     Final Risk Score                          │
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │Risk            │  │Feature         │  │Confidence      │  │
│  │Probability     │  │Importance      │  │Interval        │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘`,
      decisionTree: `┌─────────────────────────────────────────────┐
│              Random Forest Tree              │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
         ┌───────────────────┐
         │Temperature > 30°C?│
         └─────┬───────┬─────┘
               │       │
               │       │
               ▼       ▼
     ┌──────────────┐ ┌──────────────┐
     │Humidity < 30%│ │Humidity < 45%│
     └──────┬───────┘ └───────┬──────┘
            │                 │
            │                 │
            ▼                 ▼
   ┌────────────────┐   ┌────────────────┐
   │Drought Index   │   │Drought Index   │
   │     > 70?      │   │     > 50?      │
   └───────┬────────┘   └────────┬───────┘
           │                     │
           │                     │
           ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│  VERY HIGH RISK  │  │   MEDIUM RISK    │
│    (80-99%)      │  │     (40-60%)     │
└──────────────────┘  └──────────────────┘`
    },
    "unified-model": {
      title: "Unified Prediction Model",
      content: `┌──────────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│                  │     │                   │     │                     │
│  Location Input  │────►│  Geocoding API    │────►│  Data Collection    │
│                  │     │  (Coordinates)    │     │  Services           │
│                  │     │                   │     │                     │
└──────────────────┘     └───────────────────┘     └──────────┬──────────┘
                                                             │
                                                             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                          Parallel Data Processing                        │
│                                                                          │
│  ┌─────────────┐      ┌────────────────┐       ┌────────────────────┐   │
│  │             │      │                │       │                    │   │
│  │ Weather API │      │ Air Quality &  │       │ Earth Engine API   │   │
│  │ Temperature │      │ Pollution Data │       │ (Vegetation &      │   │
│  │ Humidity    │      │ CO2, PM2.5     │       │  Land Cover)       │   │
│  │             │      │                │       │                    │   │
│  └──────┬──────┘      └───────┬────────┘       └─────────┬──────────┘   │
│         │                     │                          │              │
└─────────┼─────────────────────┼──────────────────────────┼──────────────┘
          │                     │                          │
          ▼                     ▼                          ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         Feature Engineering                              │
│                                                                          │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────────────┐   │
│  │                │   │                │   │                        │   │
│  │ Drought Index  │   │ Environmental  │   │ Vegetation Indices     │   │
│  │ Calculation    │   │ Risk Factors   │   │ & Land Cover Analysis  │   │
│  │                │   │                │   │                        │   │
│  └────────┬───────┘   └──────┬─────────┘   └─────────┬──────────────┘   │
│           │                  │                       │                  │
└───────────┼──────────────────┼───────────────────────┼──────────────────┘
            │                  │                       │
            └──────────────────┼───────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                        Random Forest ML Model                            │
│                                                                          │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────┐           │
│  │                │   │                │   │                │           │
│  │ 200+ Decision  │   │ Feature        │   │ Confidence     │           │
│  │ Trees          │   │ Importance     │   │ Calculation    │           │
│  │                │   │ Analysis       │   │                │           │
│  └────────┬───────┘   └──────┬─────────┘   └──────┬─────────┘           │
│           │                  │                    │                     │
└───────────┼──────────────────┼────────────────────┼─────────────────────┘
            │                  │                    │
            └──────────────────┼────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                       Risk Assessment & Output                           │
│                                                                          │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────┐           │
│  │                │   │                │   │                │           │
│  │ Fire Risk      │   │ Contributing   │   │ Historical     │           │
│  │ Probability %  │   │ Factor         │   │ Data           │           │
│  │                │   │ Breakdown      │   │ Correlation    │           │
│  └────────────────┘   └────────────────┘   └────────────────┘           │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘`
    }
  };

  // Handle download button click
  const handleDownload = () => {
    // Get the correct diagram content based on active tab
    let downloadTitle = "";
    let downloadContent = "";
    
    if (activeTab === "website") {
      downloadTitle = "Website_Architecture";
      downloadContent = diagrams.website.title + "\n\n" + diagrams.website.content + "\n\n" + 
                        "User Flow\n\n" + diagrams.website.userFlow;
    } else if (activeTab === "prediction") {
      downloadTitle = "Prediction_Flow";
      downloadContent = diagrams.prediction.title + "\n\n" + diagrams.prediction.content + "\n\n" + 
                        "Data Flow Pipeline\n\n" + diagrams.prediction.dataFlow;
    } else if (activeTab === "random-forest") {
      downloadTitle = "Random_Forest_Architecture";
      downloadContent = diagrams.["random-forest"].title + "\n\n" + diagrams.["random-forest"].content + "\n\n" + 
                        "Decision Tree Structure\n\n" + diagrams.["random-forest"].decisionTree;
    } else if (activeTab === "unified-model") {
      downloadTitle = "Unified_Prediction_Model";
      downloadContent = diagrams.["unified-model"].title + "\n\n" + diagrams.["unified-model"].content;
    }
    
    // Create a blob from the content
    const blob = new Blob([downloadContent], { type: "text/plain;charset=utf-8" });
    
    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${downloadTitle}_Diagram.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-center text-wildfire-800">
          System Architecture & Flow Diagrams
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-wildfire-600 border-wildfire-300 hover:bg-wildfire-50"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="website" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="website">Website Flow</TabsTrigger>
            <TabsTrigger value="prediction">Prediction Flow</TabsTrigger>
            <TabsTrigger value="random-forest">Random Forest</TabsTrigger>
            <TabsTrigger value="unified-model">Unified Model</TabsTrigger>
          </TabsList>
          
          <TabsContent value="website" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Website Architecture</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams.website.content}
                </pre>
              </div>
              
              <h3 className="font-semibold mt-6 mb-2 text-gray-800">User Flow</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams.website.userFlow}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prediction" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Prediction Flow</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams.prediction.content}
                </pre>
              </div>
              
              <h3 className="font-semibold mt-6 mb-2 text-gray-800">Data Flow Pipeline</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams.prediction.dataFlow}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="random-forest" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Random Forest Architecture</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams["random-forest"].content}
                </pre>
              </div>
              
              <h3 className="font-semibold mt-6 mb-2 text-gray-800">Decision Tree Structure</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams["random-forest"].decisionTree}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="unified-model" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Unified Prediction Model</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams["unified-model"].content}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
