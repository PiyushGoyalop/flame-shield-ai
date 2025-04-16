
import React from "react";

export const ComponentDiagram = () => {
  return (
    <div className="relative overflow-auto p-4 border border-muted rounded-md bg-white">
      <svg width="800" height="600" viewBox="0 0 800 600" className="mx-auto">
        {/* External Systems */}
        <rect x="20" y="20" width="760" height="560" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" rx="8" />
        <text x="40" y="50" className="text-sm font-medium" fill="#334155">External Systems</text>
        
        {/* Main System Boundary */}
        <rect x="100" y="80" width="600" height="440" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
        <text x="120" y="110" className="text-base font-semibold" fill="#334155">Wildfire Prediction System</text>
        
        {/* Data Integration Module */}
        <rect x="140" y="140" width="180" height="100" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" rx="4" />
        <text x="230" y="190" className="text-sm font-medium" textAnchor="middle" fill="#0ea5e9">Data Integration Module</text>
        
        {/* Climate-Fire Analysis Module */}
        <rect x="140" y="280" width="180" height="100" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" rx="4" />
        <text x="230" y="330" className="text-sm font-medium" textAnchor="middle" fill="#8b5cf6">Climate-Fire Analysis Module</text>
        
        {/* Prediction Engine */}
        <rect x="380" y="210" width="180" height="100" fill="#ffffff" stroke="#f97316" strokeWidth="2" rx="4" />
        <text x="470" y="260" className="text-sm font-medium" textAnchor="middle" fill="#f97316">Prediction Engine</text>
        
        {/* User Interface */}
        <rect x="480" y="380" width="180" height="100" fill="#ffffff" stroke="#10b981" strokeWidth="2" rx="4" />
        <text x="570" y="430" className="text-sm font-medium" textAnchor="middle" fill="#10b981">User Interface</text>
        
        {/* External Data Sources */}
        <rect x="30" y="380" width="100" height="80" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" rx="4" />
        <text x="80" y="420" className="text-xs font-medium" textAnchor="middle" fill="#64748b">External Data Sources</text>
        
        {/* Alert System */}
        <rect x="670" y="210" width="100" height="80" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" rx="4" />
        <text x="720" y="250" className="text-xs font-medium" textAnchor="middle" fill="#64748b">Alert System</text>
        
        {/* Connection Lines */}
        {/* Data Sources to Data Integration */}
        <line x1="130" y1="420" x2="160" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="156,285 160,270 164,285" fill="#94a3b8" />
        
        {/* Data Integration to Analysis */}
        <line x1="230" y1="240" x2="230" y2="280" stroke="#0ea5e9" strokeWidth="1.5" />
        <polygon points="225,275 230,290 235,275" fill="#0ea5e9" />
        
        {/* Analysis to Prediction */}
        <line x1="320" y1="330" x2="380" y2="260" stroke="#8b5cf6" strokeWidth="1.5" />
        <polygon points="377,265 390,255 383,251" fill="#8b5cf6" />
        
        {/* Prediction to UI */}
        <line x1="510" y1="310" x2="550" y2="380" stroke="#f97316" strokeWidth="1.5" />
        <polygon points="545,376 555,388 555,376" fill="#f97316" />
        
        {/* Prediction to Alert System */}
        <line x1="560" y1="260" x2="670" y2="250" stroke="#f97316" strokeWidth="1.5" />
        <polygon points="665,255 680,247 665,245" fill="#f97316" />
      </svg>
    </div>
  );
};
