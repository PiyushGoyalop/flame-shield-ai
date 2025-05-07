
import { useEffect, useRef } from 'react';

export function useFavicon() {
  // Use a ref to track if favicon has been set to avoid redundant DOM operations
  const faviconSet = useRef(false);
  
  useEffect(() => {
    // Only set favicon once per session
    if (faviconSet.current) return;
    
    try {
      // Create a new link element
      const link = document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'icon';
      
      // Set favicon to the SVG file
      link.href = '/favicon.svg';
      
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(el => el.parentNode?.removeChild(el));
      
      // Add the new link to the head
      document.head.appendChild(link);
      
      // Mark as set
      faviconSet.current = true;
      
      console.log("Favicon successfully set");
    } catch (error) {
      console.error("Error setting favicon:", error);
    }
  }, []);
}
