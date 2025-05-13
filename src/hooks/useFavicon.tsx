
import { useEffect, useRef } from 'react';

export function useFavicon() {
  // Use a ref to track if favicon has been set to avoid redundant DOM operations
  const faviconSet = useRef(false);
  
  useEffect(() => {
    // Only set favicon once per session
    if (faviconSet.current) return;
    
    try {
      // Create a new link element for SVG favicon
      const svgLink = document.createElement('link');
      svgLink.type = 'image/svg+xml';
      svgLink.rel = 'icon';
      svgLink.href = '/favicon.svg';
      
      // Create a fallback PNG link for browsers that don't support SVG favicons
      const pngLink = document.createElement('link');
      pngLink.type = 'image/png';
      pngLink.rel = 'icon';
      pngLink.href = '/favicon.png'; // We'll create this file
      
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(el => el.parentNode?.removeChild(el));
      
      // Add the new links to the head
      document.head.appendChild(svgLink);
      document.head.appendChild(pngLink);
      
      // Mark as set
      faviconSet.current = true;
      
      console.log("Favicon successfully set with SVG and PNG fallback");
    } catch (error) {
      console.error("Error setting favicon:", error);
    }
  }, []);
}
