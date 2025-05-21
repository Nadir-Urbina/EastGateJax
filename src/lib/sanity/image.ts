import createImageUrlBuilder from '@sanity/image-url';
import { client } from './client';

// Fallback image for placeholder or error cases (use a local file for reliability)
const PLACEHOLDER_IMAGE = '/placeholder-image.png';

// Create a dummy image URL builder that returns placeholders for all methods
const createPlaceholderBuilder = (fallbackUrl = PLACEHOLDER_IMAGE) => {
  const fallbackBuilder = {
    width: () => fallbackBuilder,
    height: () => fallbackBuilder,
    quality: () => fallbackBuilder,
    auto: () => fallbackBuilder,
    format: () => fallbackBuilder,
    crop: () => fallbackBuilder,
    fit: () => fallbackBuilder,
    url: () => fallbackUrl,
  };
  return fallbackBuilder;
};

// Initialize the Sanity image builder
const imageBuilder = createImageUrlBuilder(client);

/**
 * Get a URL builder for a Sanity image, with graceful fallbacks
 * @param source The Sanity image object
 * @returns An image URL builder instance that can chain methods
 */
export const urlForImage = (source: any) => {
  // Safety check for source validity
  if (!source) {
    return createPlaceholderBuilder();
  }

  // If source is already a string URL, return a builder that just returns this URL
  if (typeof source === 'string') {
    return createPlaceholderBuilder(source);
  }

  try {
    // For Sanity image objects
    if (typeof source === 'object' && source !== null) {
      // Check if it has the expected Sanity image structure with asset
      if (source.asset && typeof source.asset === 'object') {
        return imageBuilder.image(source);
      }
      
      // If it has a URL property (some APIs return this format)
      if (source.url && typeof source.url === 'string') {
        return createPlaceholderBuilder(source.url);
      }
    }
  } catch (error) {
    console.error('Error creating Sanity image URL:', error);
  }
  
  // Default fallback
  return createPlaceholderBuilder();
}; 