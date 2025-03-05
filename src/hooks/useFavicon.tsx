
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
      
      // Set favicon to flame icon with wildfire orange color
      link.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'%3E%3C/path%3E%3C/svg%3E`;
      
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
