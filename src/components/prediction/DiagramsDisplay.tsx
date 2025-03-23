import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DiagramsDisplay() {
  const [activeTab, setActiveTab] = useState("system-architecture");

  // Diagram content for each tab
  const diagrams = {
    "system-architecture": {
      title: "System Architecture",
      content: `┌───────────────────────────────────────────────────────────────────────────────┐
│                           WILDFIRE PREDICTION SYSTEM                           │
└───────────────────────────────┬───────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                         1. DATA INTEGRATION MODULE                            │
│                                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌─────────────┐  │
│  │                │  │                │  │                │  │             │  │
│  │ Weather API    │  │ Satellite      │  │ Geographic     │  │ Historic    │  │
│  │ Temperature    │  │ Imagery        │  │ Data Sources   │  │ Wildfire    │  │
│  │ Humidity       │  │ Vegetation     │  │ Land Cover     │  │ Database    │  │
│  │ Precipitation  │  │ NDVI & EVI     │  │ Elevation      │  │ Records     │  │
│  │                │  │                │  │                │  │             │  │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘  └──────┬──────┘  │
│          │                   │                   │                  │         │
└──────────┼───────────────────┼───────────────────┼──────────────────┼─────────┘
           │                   │                   │                  │
           └───────────────────┼───────────────────┼──────────────────┘
                               │                   │
                               ▼                   ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                      2. CLIMATE-FIRE ANALYSIS MODULE                          │
│                                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌─────────────┐  │
│  │                │  │                │  │                │  │             │  │
│  │ Drought Index  │  │ Vegetation     │  │ Topographic    │  │ CO₂ & Air   │  │
│  │ Calculation    │  │ Health Analysis│  │ Risk Modeling  │  │ Quality     │  │
│  │                │  │                │  │                │  │ Analysis     │  │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘  └──────┬──────┘  │
│          │                   │                   │                  │         │
└──────────┼───────────────────┼───────────────────┼──────────────────┼─────────┘
           │                   │                   │                  │
           └───────────────────┼───────────────────┼──────────────────┘
                               │                   │
                               ▼                   ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                           3. PREDICTION ENGINE                                │
│                                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌─────────────┐  │
│  │                │  │                │  │                │  │             │  │
│  │ Random Forest  │  │ Feature        │  │ Risk Score     │  │ Confidence  │  │
│  │ Model          │  │ Importance     │  │ Calculation    │  │ Analysis    │  │
│  │ (200+ Trees)   │  │ Analysis       │  │ Algorithm      │  │ Model       │  │
│  │                │  │                │  │                │  │             │  │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘  └──────┬──────┘  │
│          │                   │                   │                  │         │
└──────────┼───────────────────┼───────────────────┼──────────────────┼─────────┘
           │                   │                   │                  │
           └───────────────────┼───────────────────┼──────────────────┘
                               │                   │
                               ▼                   ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                           4. USER INTERFACE                                   │
│                                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌─────────────┐  │
│  │                │  │                │  │                │  │             │  │
│  │ Location       │  │ Risk           │  │ Visualization  │  │ Historical  │  │
│  │ Search &       │  │ Assessment     │  │ & Interactive  │  │ Data        │  │
│  │ Input          │  │ Display        │  │ Maps           │  │ Comparison  │  │
│  │                │  │                │  │                │  │             │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  └─────────────┘  │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘`,
      description: `The system architecture consists of four main modules with a top-down data flow:

1. DATA INTEGRATION MODULE
   - Collects raw data from various sources including weather APIs, satellite imagery, geographic databases, and historical wildfire records
   - Standardizes and preprocesses all incoming data for further analysis
   - Handles real-time and batch data collection processes
   
2. CLIMATE-FIRE ANALYSIS MODULE
   - Processes integrated data to extract meaningful environmental indicators
   - Calculates drought indexes based on temperature, precipitation, and humidity
   - Analyzes vegetation health using satellite imagery indices (NDVI, EVI)
   - Models topographic risk factors like elevation, slope, and aspect
   - Evaluates air quality and greenhouse gas metrics that influence fire behavior
   
3. PREDICTION ENGINE
   - Employs an advanced Random Forest machine learning model with 200+ specialized decision trees
   - Analyzes feature importance to identify the most significant fire risk factors
   - Calculates risk probability scores using weighted ensemble methods
   - Provides confidence analysis for prediction reliability assessment
   
4. USER INTERFACE
   - Allows location search and input for specific area analysis
   - Displays intuitive risk assessment results with color-coded indicators
   - Provides interactive maps and data visualizations for deeper insights
   - Enables comparison with historical data and previous predictions

DATA FLOW: Raw environmental data → Analysis & feature engineering → ML prediction → User-friendly visualization`
    },
    "website": {
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
      content: `┌─────────────────────────────────────────────┐
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
└──────────────────┘  └──────────────────┘`,
      decisionTree: `┌───────────────────────────────────────────────────────────────┐
│                 Advanced Random Forest Model                   │
│                  (200 Specialized Trees)                       │
└───────────────────────────────────────────────┘
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
└───────────────────────────────────────────────────────────────┘`
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
│  │                │   │                │   │                │           │
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
    
    if (activeTab === "system-architecture") {
      downloadTitle = "System_Architecture";
      downloadContent = diagrams["system-architecture"].title + "\n\n" + diagrams["system-architecture"].content + "\n\n" + 
                        diagrams["system-architecture"].description;
    } else if (activeTab === "website") {
      downloadTitle = "Website_Architecture";
      downloadContent = diagrams.website.title + "\n\n" + diagrams.website.content + "\n\n" + 
                        "User Flow\n\n" + diagrams.website.userFlow;
    } else if (activeTab === "prediction") {
      downloadTitle = "Prediction_Flow";
      downloadContent = diagrams.prediction.title + "\n\n" + diagrams.prediction.content + "\n\n" + 
                        "Data Flow Pipeline\n\n" + diagrams.prediction.dataFlow;
    } else if (activeTab === "random-forest") {
      downloadTitle = "Random_Forest_Architecture";
      downloadContent = diagrams["random-forest"].title + "\n\n" + diagrams["random-forest"].content + "\n\n" + 
                        "Decision Tree Structure\n\n" + diagrams["random-forest"].decisionTree;
    } else if (activeTab === "unified-model") {
      downloadTitle = "Unified_Prediction_Model";
      downloadContent = diagrams["unified-model"].title + "\n\n" + diagrams["unified-model"].content;
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
        <Tabs defaultValue="system-architecture" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="system-architecture">System Architecture</TabsTrigger>
            <TabsTrigger value="website">Website Flow</TabsTrigger>
            <TabsTrigger value="prediction">Prediction Flow</TabsTrigger>
            <TabsTrigger value="random-forest">Random Forest</TabsTrigger>
            <TabsTrigger value="unified-model">Unified Model</TabsTrigger>
          </TabsList>
          
          <TabsContent value="system-architecture" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">System Architecture</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                  {diagrams["system-architecture"].content}
                </pre>
              </div>
              
              <h3 className="font-semibold mt-6 mb-2 text-gray-800">Module Description & Data Flow</h3>
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {diagrams["system-architecture"].description}
                </p>
              </div>
            </div>
          </TabsContent>
          
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
