import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImage } from './types';

// Use environment variables with fallbacks
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'peh0hj3p';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Simple client for image URL building
const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
};

// Create a separate image client for better stability
const imageClient = createClient(clientConfig);
const builder = imageUrlBuilder(imageClient);

// Image URL helper that can handle various Sanity image formats
export function getSanityImageUrl(source: any) {
  if (!source) return '';
  
  // Handle standard Sanity image objects
  if (source.asset && source.asset._ref) {
    return builder.image(source).url();
  }
  
  // Handle direct image URLs
  if (typeof source === 'string') {
    return source;
  }
  
  return '';
}

// Function to directly build a Sanity image URL from a reference
export function getSanityImageSrcFromRef(ref: string) {
  if (!ref) return '';
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref
    .replace('image-', '')
    .replace('-jpg', '.jpg')
    .replace('-png', '.png')
    .replace('-webp', '.webp')
    .replace('-jpeg', '.jpeg')}`;
} 