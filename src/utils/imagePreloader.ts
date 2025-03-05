
/**
 * Utility for preloading images for better UX
 */

// Function to preload a single image
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = (error) => {
      console.warn(`Failed to preload image: ${src}`, error);
      // Resolve anyway to prevent Promise.all from failing completely
      resolve();
    };
    img.src = src;
  });
};

// Function to preload multiple images
export const preloadImages = async (sources: string[]): Promise<boolean> => {
  try {
    // Map each source to a preload promise
    const promises = sources.map(src => preloadImage(src));
    
    // Wait for all images to load
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error("Image preloading failed:", error);
    return false;
  }
};
