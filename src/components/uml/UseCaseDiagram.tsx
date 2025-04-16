
import React from "react";

export const UseCaseDiagram = () => {
  return (
    <div className="relative overflow-auto p-4 border border-muted rounded-md bg-white">
      <svg width="800" height="650" viewBox="0 0 800 650" className="mx-auto">
        {/* System Boundary */}
        <rect x="200" y="50" width="450" height="550" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="8" />
        <text x="425" y="80" textAnchor="middle" className="text-base font-semibold" fill="#334155">Wildfire Prediction System</text>
        
        {/* Actors */}
        {/* Fire Manager */}
        <circle cx="80" cy="200" r="20" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="80" y1="220" x2="80" y2="270" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="80" y1="240" x2="50" y2="280" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="80" y1="240" x2="110" y2="280" stroke="#0ea5e9" strokeWidth="2" />
        <text x="80" y="310" textAnchor="middle" className="text-sm font-medium" fill="#0ea5e9">Fire Manager</text>
        
        {/* Public User */}
        <circle cx="80" cy="400" r="20" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="80" y1="420" x2="80" y2="470" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="80" y1="440" x2="50" y2="480" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="80" y1="440" x2="110" y2="480" stroke="#8b5cf6" strokeWidth="2" />
        <text x="80" y="510" textAnchor="middle" className="text-sm font-medium" fill="#8b5cf6">Public User</text>
        
        {/* Policy Maker */}
        <circle cx="710" cy="200" r="20" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <line x1="710" y1="220" x2="710" y2="270" stroke="#f97316" strokeWidth="2" />
        <line x1="710" y1="240" x2="680" y2="280" stroke="#f97316" strokeWidth="2" />
        <line x1="710" y1="240" x2="740" y2="280" stroke="#f97316" strokeWidth="2" />
        <text x="710" y="310" textAnchor="middle" className="text-sm font-medium" fill="#f97316">Policy Maker</text>
        
        {/* Data Scientist */}
        <circle cx="710" cy="400" r="20" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <line x1="710" y1="420" x2="710" y2="470" stroke="#10b981" strokeWidth="2" />
        <line x1="710" y1="440" x2="680" y2="480" stroke="#10b981" strokeWidth="2" />
        <line x1="710" y1="440" x2="740" y2="480" stroke="#10b981" strokeWidth="2" />
        <text x="710" y="510" textAnchor="middle" className="text-sm font-medium" fill="#10b981">Data Scientist</text>
        
        {/* Use Cases */}
        {/* Risk Assessment */}
        <ellipse cx="320" cy="150" rx="90" ry="30" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="320" y="155" textAnchor="middle" className="text-sm font-medium" fill="#334155">Monitor Fire Risk</text>
        
        {/* Manage Alerts */}
        <ellipse cx="320" cy="250" rx="90" ry="30" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="320" y="255" textAnchor="middle" className="text-sm font-medium" fill="#334155">Manage Alerts</text>
        
        {/* View Public Maps */}
        <ellipse cx="320" cy="350" rx="90" ry="30" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <text x="320" y="355" textAnchor="middle" className="text-sm font-medium" fill="#334155">View Risk Maps</text>
        
        {/* Receive Notifications */}
        <ellipse cx="320" cy="450" rx="90" ry="30" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <text x="320" y="455" textAnchor="middle" className="text-sm font-medium" fill="#334155">Receive Notifications</text>
        
        {/* View Reports */}
        <ellipse cx="500" cy="150" rx="90" ry="30" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <text x="500" y="155" textAnchor="middle" className="text-sm font-medium" fill="#334155">View Annual Reports</text>
        
        {/* Analyze Trends */}
        <ellipse cx="500" cy="250" rx="90" ry="30" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <text x="500" y="255" textAnchor="middle" className="text-sm font-medium" fill="#334155">Analyze Trends</text>
        
        {/* Train Model */}
        <ellipse cx="500" cy="350" rx="90" ry="30" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <text x="500" y="355" textAnchor="middle" className="text-sm font-medium" fill="#334155">Train Prediction Model</text>
        
        {/* Evaluate Performance */}
        <ellipse cx="500" cy="450" rx="90" ry="30" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <text x="500" y="455" textAnchor="middle" className="text-sm font-medium" fill="#334155">Evaluate Performance</text>
        
        {/* Authentication (Include) */}
        <ellipse cx="425" cy="550" rx="90" ry="30" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
        <text x="425" y="555" textAnchor="middle" className="text-sm font-medium" fill="#334155">Authenticate User</text>
        
        {/* Lines connecting actors to use cases */}
        {/* Fire Manager */}
        <line x1="100" y1="200" x2="230" y2="150" stroke="#0ea5e9" strokeWidth="1.5" />
        <line x1="100" y1="200" x2="230" y2="250" stroke="#0ea5e9" strokeWidth="1.5" />
        
        {/* Public User */}
        <line x1="100" y1="400" x2="230" y2="350" stroke="#8b5cf6" strokeWidth="1.5" />
        <line x1="100" y1="400" x2="230" y2="450" stroke="#8b5cf6" strokeWidth="1.5" />
        
        {/* Policy Maker */}
        <line x1="690" y1="200" x2="590" y2="150" stroke="#f97316" strokeWidth="1.5" />
        <line x1="690" y1="200" x2="590" y2="250" stroke="#f97316" strokeWidth="1.5" />
        
        {/* Data Scientist */}
        <line x1="690" y1="400" x2="590" y2="350" stroke="#10b981" strokeWidth="1.5" />
        <line x1="690" y1="400" x2="590" y2="450" stroke="#10b981" strokeWidth="1.5" />
        
        {/* Include relationships to Authentication */}
        <line x1="320" y1="180" x2="392" y2="520" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
        <line x1="320" y1="280" x2="400" y2="520" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
        <line x1="500" y1="180" x2="435" y2="520" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
        <line x1="500" y1="280" x2="442" y2="520" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
        <line x1="500" y1="380" x2="450" y2="520" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
        <line x1="500" y1="480" x2="458" y2="520" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
        
        {/* Include text */}
        <text x="360" y="490" className="text-xs" fill="#64748b" transform="rotate(-50, 360, 490)">«include»</text>
        <text x="450" y="490" className="text-xs" fill="#64748b" transform="rotate(50, 450, 490)">«include»</text>
      </svg>
    </div>
  );
};
