import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Use fallback values to prevent build errors, but log warnings
const PLACEHOLDER_PROJECT_ID = 'placeholder-project-id';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PLACEHOLDER_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Log warning if Sanity projectId is missing
if (projectId === PLACEHOLDER_PROJECT_ID) {
  console.warn('Warning: Sanity projectId is not set. Please add NEXT_PUBLIC_SANITY_PROJECT_ID to your environment variables.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export function getSanityImageUrl(image: any) {
  if (!image || !image.asset) {
    return '/placeholder-image.png';
  }
  return urlFor(image).url();
} 