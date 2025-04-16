
import React from "react";

export const ActivityDiagram = () => {
  return (
    <div className="relative overflow-auto p-4 border border-muted rounded-md bg-white">
      <svg width="800" height="800" viewBox="0 0 800 800" className="mx-auto">
        {/* Start Point */}
        <circle cx="400" cy="40" r="15" fill="#0ea5e9" />
        
        {/* Data Collection Activity */}
        <rect x="300" y="80" width="200" height="60" rx="30" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="400" y="115" textAnchor="middle" className="text-sm font-medium" fill="#334155">Collect Environmental Data</text>
        
        {/* Data Cleaning Activity */}
        <rect x="300" y="180" width="200" height="60" rx="30" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="400" y="215" textAnchor="middle" className="text-sm font-medium" fill="#334155">Clean and Normalize Data</text>
        
        {/* Feature Extraction Activity */}
        <rect x="300" y="280" width="200" height="60" rx="30" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <text x="400" y="315" textAnchor="middle" className="text-sm font-medium" fill="#334155">Extract Relevant Features</text>
        
        {/* Decision Diamond */}
        <polygon points="400,380 450,430 400,480 350,430" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <text x="400" y="435" textAnchor="middle" className="text-xs font-medium" fill="#334155">Data Quality</text>
        <text x="400" y="450" textAnchor="middle" className="text-xs font-medium" fill="#334155">Sufficient?</text>
        
        {/* If No - Return to Data Collection */}
        <text x="300" y="430" textAnchor="middle" className="text-xs" fill="#ef4444">No</text>
        <path d="M 350 430 H 250 V 110 H 300" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <polygon points="295,105 305,115 295,115" fill="#ef4444" />
        
        {/* If Yes - Continue to Analysis */}
        <text x="500" y="430" textAnchor="middle" className="text-xs" fill="#10b981">Yes</text>
        
        {/* Climate Analysis Activity */}
        <rect x="300" y="520" width="200" height="60" rx="30" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <text x="400" y="555" textAnchor="middle" className="text-sm font-medium" fill="#334155">Analyze Climate Patterns</text>
        
        {/* Prediction Modeling Activity */}
        <rect x="300" y="620" width="200" height="60" rx="30" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <text x="400" y="655" textAnchor="middle" className="text-sm font-medium" fill="#334155">Execute Prediction Models</text>
        
        {/* Risk Decision Diamond */}
        <polygon points="400,700 450,750 400,800 350,750" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <text x="400" y="755" textAnchor="middle" className="text-xs font-medium" fill="#334155">High Risk</text>
        <text x="400" y="770" textAnchor="middle" className="text-xs font-medium" fill="#334155">Detected?</text>
        
        {/* If Yes - Generate Alert */}
        <text x="500" y="750" textAnchor="middle" className="text-xs" fill="#ef4444">Yes</text>
        <rect x="520" y="720" width="180" height="60" rx="30" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
        <text x="610" y="755" textAnchor="middle" className="text-sm font-medium" fill="#334155">Generate Alert</text>
        
        {/* If No - Update Dashboard */}
        <text x="300" y="750" textAnchor="middle" className="text-xs" fill="#10b981">No</text>
        <rect x="100" y="720" width="180" height="60" rx="30" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <text x="190" y="755" textAnchor="middle" className="text-sm font-medium" fill="#334155">Update Dashboard</text>
        
        {/* Connect Start to First Activity */}
        <line x1="400" y1="55" x2="400" y2="80" stroke="#0ea5e9" strokeWidth="1.5" />
        <polygon points="395,75 400,85 405,75" fill="#0ea5e9" />
        
        {/* Connect Activities */}
        <line x1="400" y1="140" x2="400" y2="180" stroke="#0ea5e9" strokeWidth="1.5" />
        <polygon points="395,175 400,185 405,175" fill="#0ea5e9" />
        
        <line x1="400" y1="240" x2="400" y2="280" stroke="#0ea5e9" strokeWidth="1.5" />
        <polygon points="395,275 400,285 405,275" fill="#0ea5e9" />
        
        <line x1="400" y1="340" x2="400" y2="380" stroke="#8b5cf6" strokeWidth="1.5" />
        <polygon points="395,375 400,385 405,375" fill="#8b5cf6" />
        
        <line x1="400" y1="480" x2="400" y2="520" stroke="#f97316" strokeWidth="1.5" />
        <polygon points="395,515 400,525 405,515" fill="#f97316" />
        
        <line x1="400" y1="580" x2="400" y2="620" stroke="#8b5cf6" strokeWidth="1.5" />
        <polygon points="395,615 400,625 405,615" fill="#8b5cf6" />
        
        <line x1="400" y1="680" x2="400" y2="700" stroke="#f97316" strokeWidth="1.5" />
        <polygon points="395,695 400,705 405,695" fill="#f97316" />
        
        {/* Connect Decision Diamond to Activities */}
        <line x1="450" y1="750" x2="520" y2="750" stroke="#ef4444" strokeWidth="1.5" />
        <polygon points="515,745 525,750 515,755" fill="#ef4444" />
        
        <line x1="350" y1="750" x2="280" y2="750" stroke="#10b981" strokeWidth="1.5" />
        <polygon points="285,745 275,750 285,755" fill="#10b981" />
        
        {/* Cycle Line for Continuous Monitoring */}
        <path d="M 610 720 V 650 H 520 V 650" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <text x="570" y="640" className="text-xs" fill="#94a3b8">Continuous Monitoring Loop</text>
        
        <path d="M 190 720 V 650 H 280 V 650" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
      </svg>
    </div>
  );
};
