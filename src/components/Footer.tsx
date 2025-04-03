
import { Flame } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <footer className="border-t bg-wildfire-800 text-white">
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10 z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Flame size={24} className="text-wildfire-300" />
                <span className="font-display font-bold text-xl">Wildfire Analytics</span>
              </div>
              <p className="text-wildfire-100/80 text-sm">
                Advanced analytics and predictions for wildfire risk assessment using machine learning and environmental data.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-4 text-wildfire-200">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-wildfire-100/70 hover:text-wildfire-200 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" className="text-wildfire-100/70 hover:text-wildfire-200 transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/predict" className="text-wildfire-100/70 hover:text-wildfire-200 transition-colors">
                    Prediction
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-wildfire-100/70 hover:text-wildfire-200 transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-4 text-wildfire-200">Contact</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-wildfire-200 mb-2">Team Members</h4>
                  <ul className="space-y-1">
                    <li className="text-wildfire-100/70">Piyush Goyal</li>
                    <li className="text-wildfire-100/70">Palash Vyas</li>
                    <li className="text-wildfire-100/70">Parth Patil</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-wildfire-200 mb-2">Contact Info</h4>
                  <ul className="space-y-1">
                    <li className="text-wildfire-100/70">Email: piyushgoyalujn386@gmail.com</li>
                    <li className="text-wildfire-100/70">Phone: +919893894491</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-wildfire-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-wildfire-100/60">
              © {new Date().getFullYear()} Wildfire Analytics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-wildfire-100/60 hover:text-wildfire-200 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-wildfire-100/60 hover:text-wildfire-200 transition-colors">
                Privacy
              </Link>
              <Link to="#" className="text-wildfire-100/60 hover:text-wildfire-200 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
