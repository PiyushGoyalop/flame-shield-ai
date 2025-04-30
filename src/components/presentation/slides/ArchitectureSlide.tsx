
import { Component, Database, Server, Layout, Lock } from "lucide-react";

export function ArchitectureSlide() {
  return (
    <div className="h-full flex flex-col px-8 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-wildfire-800">System Architecture</h2>
      
      <div className="flex-grow flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          {/* Left column - Architecture diagram */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <Component className="h-64 w-64" />
            </div>
            
            <div className="w-full max-w-md">
              {/* Frontend Layer */}
              <div className="bg-blue-100 rounded-t-lg p-4 border border-blue-200 text-center mb-4">
                <h3 className="font-medium flex items-center justify-center gap-2">
                  <Layout className="h-4 w-4" />
                  <span>Frontend</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">React, TypeScript, Tailwind CSS, Shadcn UI</p>
              </div>
              
              {/* Connection arrows */}
              <div className="h-6 flex items-center justify-center">
                <div className="h-full border-l-2 border-dashed border-gray-400"></div>
              </div>
              
              {/* Backend Layer */}
              <div className="bg-green-100 rounded-lg p-4 border border-green-200 text-center mb-4">
                <h3 className="font-medium flex items-center justify-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>Backend</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Supabase for data storage and authentication</p>
              </div>
              
              {/* Connection arrows */}
              <div className="h-6 flex items-center justify-center">
                <div className="h-full border-l-2 border-dashed border-gray-400"></div>
              </div>
              
              {/* Edge Functions Layer */}
              <div className="bg-purple-100 rounded-lg p-4 border border-purple-200 text-center mb-4">
                <h3 className="font-medium flex items-center justify-center gap-2">
                  <Server className="h-4 w-4" />
                  <span>Edge Functions</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Serverless functions for prediction algorithms</p>
              </div>
              
              {/* Connection arrows */}
              <div className="h-6 flex items-center justify-center">
                <div className="h-full border-l-2 border-dashed border-gray-400"></div>
              </div>
              
              {/* Data Sources Layer */}
              <div className="bg-amber-100 rounded-b-lg p-4 border border-amber-200 text-center">
                <h3 className="font-medium flex items-center justify-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>Data Sources</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Weather data, air quality data, vegetation indices, and historical wildfire data</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Key components */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-medium mb-4 text-wildfire-700">Key Components</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Layout className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">React Frontend</h4>
                  <p className="text-sm text-muted-foreground">User interface with responsive design for accessing prediction functionality</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Database className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Supabase Database</h4>
                  <p className="text-sm text-muted-foreground">Stores user accounts, prediction history, and application data</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Lock className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium">Authentication System</h4>
                  <p className="text-sm text-muted-foreground">User management with secure login and profile features</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Server className="h-3.5 w-3.5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Prediction Serverless Functions</h4>
                  <p className="text-sm text-muted-foreground">Edge functions that process environmental data and calculate wildfire risk</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-6 text-center">
          UML diagrams demonstrating system design (Component, Class, Sequence, Activity, Use Case)
        </p>
      </div>
    </div>
  );
}
