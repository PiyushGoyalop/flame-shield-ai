
import { useEffect } from 'react';
import { preloadImage } from '@/utils/imagePreloader';

/**
 * Hook to preload the OG image for better performance when shared
 */
export const usePreloadOgImage = () => {
  useEffect(() => {
    // Preload the OG image
    const ogImageUrl = 'https://flame-shield-ai.lovable.app/lovable-uploads/582d6c97-b81e-4da1-af63-8528d7e59f54.png';
    preloadImage(ogImageUrl).catch(error => {
      console.warn('Failed to preload OG image:', error);
    });
  }, []);
};
