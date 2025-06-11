import { getSanityImageSrcFromRef } from './client';

// Fallback image for placeholder or error cases (use a local file for reliability)
const PLACEHOLDER_IMAGE = '/placeholder-image.png';

/**
 * Get a URL for a Sanity image, with graceful fallbacks
 * @param source The Sanity image object
 * @returns A simple URL string (not a builder)
 */
export const urlForImage = (source: any) => {
  // Safety check for source validity
  if (!source) {
    return { url: () => PLACEHOLDER_IMAGE };
  }

  // If source is already a string URL
  if (typeof source === 'string') {
    return { url: () => source };
  }

  try {
    // For Sanity image objects
    if (typeof source === 'object' && source !== null) {
      // Check if it has the expected Sanity image structure with asset
      if (source.asset && source.asset._ref) {
        const imageUrl = getSanityImageSrcFromRef(source.asset._ref);
        return { url: () => imageUrl || PLACEHOLDER_IMAGE };
      }
      
      // If it has a URL property (some APIs return this format)
      if (source.url && typeof source.url === 'string') {
        return { url: () => source.url };
      }
    }
  } catch (error) {
    console.error('Error creating Sanity image URL:', error);
  }
  
  // Default fallback
  return { url: () => PLACEHOLDER_IMAGE };
}; 