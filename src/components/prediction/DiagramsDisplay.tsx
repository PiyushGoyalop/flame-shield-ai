
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DiagramsDisplay() {
  const [activeTab, setActiveTab] = useState("website");

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-wildfire-800">
          System Architecture & Flow Diagrams
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="website" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="website">Website Flow</TabsTrigger>
            <TabsTrigger value="prediction">Prediction Flow</TabsTrigger>
            <TabsTrigger value="random-forest">Random Forest</TabsTrigger>
          </TabsList>
          
          <TabsContent value="website" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Website Architecture</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
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
└─────────────────────┴─────────────────────┴─────────────────────────────────┘`}
                </pre>
              </div>
              
              <h3 className="font-semibold mt-6 mb-2 text-gray-800">User Flow</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`┌──────────┐     ┌───────────┐     ┌────────────────┐     ┌──────────────────┐
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
└──────────────────┘     └───────────────┘     └───────────────────────────┘`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prediction" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Prediction Flow</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`┌──────────────┐     ┌───────────────────┐     ┌─────────────────────┐
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
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘`}
                </pre>
              </div>
              
              <h3 className="font-semibold mt-6 mb-2 text-gray-800">Data Flow Pipeline</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
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
└────────────────────────────────────────────────────────────────────────────────────┘`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="random-forest" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Random Forest Architecture</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`┌───────────────────────────────────────────────────────────────┐
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
└───────────────────────────────────────────────────────────────┘`}
                </pre>
              </div>
              
              <h3 className="font-semibold mt-6 mb-2 text-gray-800">Decision Tree Structure</h3>
              <div className="overflow-auto">
                <pre className="text-xs whitespace-pre bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`┌─────────────────────────────────────────────┐
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
└──────────────────┘  └──────────────────┘`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
