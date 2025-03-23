import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CheckCircle, AlertTriangle, MapPin, Cloud, Users, FileCheck } from "lucide-react";

const performanceData = [
  {
    name: "Risk Zone Accuracy",
    current: 89.7,
    baseline: 71.3,
    improvement: 18.4
  },
  {
    name: "Fire Spread Rate Prediction",
    current: 82.3,
    baseline: 65.7,
    improvement: 16.6
  },
  {
    name: "Intensity Classification",
    current: 78.5,
    baseline: 59.2,
    improvement: 19.3
  }
];

const testCasesData = [
  {
    id: 1,
    title: "Cross Regional Validation",
    description: "To test Geographical Portability, we applied Flame Shield AI to wildfire events occurring in different regions having contrasted CO2-climate relationships.",
    results: [
      { region: "Western US", accuracy: 87.2, comments: "High accuracy despite varying terrain" },
      { region: "Mediterranean Europe", accuracy: 82.4, comments: "Good performance with adaptation layer" },
      { region: "Southeast Asia", accuracy: 74.8, comments: "Lower accuracy due to monsoon patterns" },
      { region: "Australia", accuracy: 85.3, comments: "Strong correlation with drought patterns" }
    ],
    icon: MapPin
  },
  {
    id: 2,
    title: "Scenarios of Extreme Weather Events",
    description: "We evaluated the models under extreme weather events representing possible future situations at higher CO2 levels.",
    results: [
      { scenario: "Extended Drought", detection: 94.5, earlyWarning: 89.2 },
      { scenario: "Heat Dome", detection: 92.8, earlyWarning: 78.5 },
      { scenario: "Post-Flood Vegetation Growth", detection: 85.4, earlyWarning: 72.3 },
      { scenario: "Rapid Temperature Fluctuation", detection: 81.2, earlyWarning: 67.8 }
    ],
    icon: Cloud
  },
  {
    id: 3,
    title: "User Experience Validation",
    description: "Testing in the field with the foresters brought out some aspects relative to the operational utility of the system.",
    results: [
      { aspect: "Interface Usability", rating: 4.2, feedback: "Intuitive but could use simpler terminology" },
      { aspect: "Alert Response Time", rating: 4.7, feedback: "Excellent advance notification system" },
      { aspect: "Mobile Access", rating: 3.8, feedback: "Works well but needs offline capabilities" },
      { aspect: "Data Integration", rating: 4.5, feedback: "Seamless integration with existing systems" }
    ],
    icon: Users
  },
  {
    id: 4,
    title: "Historical California Fires",
    description: "We have applied the model retrospectively on 15 major California fires that occurred during 2010-2021, and the results are summarized.",
    results: [
      { fire: "Camp Fire (2018)", predictedRisk: 94.2, earlyDetection: "72 hours", accuracy: "Very High" },
      { fire: "Dixie Fire (2021)", predictedRisk: 91.5, earlyDetection: "96 hours", accuracy: "Very High" },
      { fire: "August Complex (2020)", predictedRisk: 88.7, earlyDetection: "48 hours", accuracy: "High" },
      { fire: "Mendocino Complex (2018)", predictedRisk: 87.3, earlyDetection: "60 hours", accuracy: "High" },
      { fire: "Thomas Fire (2017)", predictedRisk: 89.4, earlyDetection: "36 hours", accuracy: "High" }
    ],
    icon: FileCheck
  }
];

const ModelResults = () => {
  const [activeTab, setActiveTab] = useState("performance");

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Wildfire Model Research Results
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analysis of our wildfire prediction model's performance metrics and configuration parameters.
            </p>
          </div>
          
          <Tabs 
            defaultValue="performance" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
              <TabsTrigger value="parameters">Input Parameters</TabsTrigger>
              <TabsTrigger value="configuration">Model Configuration</TabsTrigger>
              <TabsTrigger value="importance">Feature Importance</TabsTrigger>
              <TabsTrigger value="testcases">Test Cases</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="animate-in fade-in-50 duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Model Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Prediction Metric</TableHead>
                          <TableHead className="text-right">Performance</TableHead>
                          <TableHead className="text-right">Baseline Model</TableHead>
                          <TableHead className="text-right">Improvement</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {performanceData.map((metric) => (
                          <TableRow key={metric.name}>
                            <TableCell className="font-medium">{metric.name}</TableCell>
                            <TableCell className="text-right">{metric.current}%</TableCell>
                            <TableCell className="text-right">{metric.baseline}%</TableCell>
                            <TableCell className="text-right text-green-600">+{metric.improvement}%</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Early Warning Lead Time</TableCell>
                          <TableCell className="text-right">72 hours</TableCell>
                          <TableCell className="text-right">24 hours</TableCell>
                          <TableCell className="text-right text-green-600">+48 hours</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="h-80 w-full mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="current" name="Current Model" stroke="#8B5CF6" strokeWidth={2} />
                        <Line type="monotone" dataKey="baseline" name="Baseline Model" stroke="#94A3B8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="parameters" className="animate-in fade-in-50 duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Input Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Typical Value</TableHead>
                        <TableHead>Valid Range</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Temperature (°C)</TableCell>
                        <TableCell>30-35</TableCell>
                        <TableCell>-50 to 60</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Humidity (%)</TableCell>
                        <TableCell>20-30</TableCell>
                        <TableCell>0 to 100</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Drought Index</TableCell>
                        <TableCell>70-85</TableCell>
                        <TableCell>0 to 100</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Air Quality Index</TableCell>
                        <TableCell>3-5</TableCell>
                        <TableCell>1 to 5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">PM2.5 (μg/m³)</TableCell>
                        <TableCell>40-120</TableCell>
                        <TableCell>0 to 1000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="configuration" className="animate-in fade-in-50 duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Model Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Number of Trees</TableCell>
                        <TableCell>200</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Training Data Points</TableCell>
                        <TableCell>50,000+</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Validation Accuracy</TableCell>
                        <TableCell>94.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Minimum Tree Depth</TableCell>
                        <TableCell>8</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Maximum Tree Depth</TableCell>
                        <TableCell>15</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="importance" className="animate-in fade-in-50 duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Feature Importance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Feature</TableHead>
                            <TableHead className="text-right">Weight</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Temperature</TableCell>
                            <TableCell className="text-right">28%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Humidity</TableCell>
                            <TableCell className="text-right">23%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Drought Index</TableCell>
                            <TableCell className="text-right">25%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Air Quality Index</TableCell>
                            <TableCell className="text-right">4%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">PM2.5</TableCell>
                            <TableCell className="text-right">5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">CO2 Level</TableCell>
                            <TableCell className="text-right">3%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Feature</TableHead>
                            <TableHead className="text-right">Weight</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Latitude</TableCell>
                            <TableCell className="text-right">3%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Longitude</TableCell>
                            <TableCell className="text-right">2%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Vegetation Index (NDVI)</TableCell>
                            <TableCell className="text-right">7%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Forest Percent</TableCell>
                            <TableCell className="text-right">5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Grassland Percent</TableCell>
                            <TableCell className="text-right">3%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium"></TableCell>
                            <TableCell className="text-right"></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="testcases" className="animate-in fade-in-50 duration-300">
              <div className="space-y-6">
                {testCasesData.map((testCase) => (
                  <Card key={testCase.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <testCase.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{testCase.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{testCase.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {testCase.id === 1 && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Region</TableHead>
                              <TableHead className="text-right">Accuracy (%)</TableHead>
                              <TableHead>Comments</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {testCase.results.map((result, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{result.region}</TableCell>
                                <TableCell className="text-right">
                                  {result.accuracy}%
                                  {result.accuracy > 85 ? 
                                    <CheckCircle className="h-4 w-4 text-green-500 ml-2 inline" /> :
                                    result.accuracy > 75 ? 
                                      <CheckCircle className="h-4 w-4 text-amber-500 ml-2 inline" /> : 
                                      <AlertTriangle className="h-4 w-4 text-orange-500 ml-2 inline" />
                                  }
                                </TableCell>
                                <TableCell>{result.comments}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}

                      {testCase.id === 2 && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Extreme Weather Scenario</TableHead>
                              <TableHead className="text-right">Detection Accuracy (%)</TableHead>
                              <TableHead className="text-right">Early Warning Accuracy (%)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {testCase.results.map((result, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{result.scenario}</TableCell>
                                <TableCell className="text-right">{result.detection}%</TableCell>
                                <TableCell className="text-right">{result.earlyWarning}%</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}

                      {testCase.id === 3 && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>User Experience Aspect</TableHead>
                              <TableHead className="text-right">Rating (0-5)</TableHead>
                              <TableHead>Feedback Summary</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {testCase.results.map((result, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{result.aspect}</TableCell>
                                <TableCell className="text-right">{result.rating}/5</TableCell>
                                <TableCell>{result.feedback}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}

                      {testCase.id === 4 && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Fire Incident</TableHead>
                              <TableHead className="text-right">Risk Score (%)</TableHead>
                              <TableHead className="text-right">Early Detection</TableHead>
                              <TableHead>Prediction Accuracy</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {testCase.results.map((result, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{result.fire}</TableCell>
                                <TableCell className="text-right">{result.predictedRisk}%</TableCell>
                                <TableCell className="text-right">{result.earlyDetection}</TableCell>
                                <TableCell>
                                  <span className={
                                    result.accuracy === "Very High" ? "text-green-600 font-medium" :
                                    result.accuracy === "High" ? "text-amber-600 font-medium" : 
                                    "text-orange-600 font-medium"
                                  }>
                                    {result.accuracy}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelResults;
