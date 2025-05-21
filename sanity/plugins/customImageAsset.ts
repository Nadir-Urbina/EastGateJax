/**
 * Custom image asset plugin for Sanity
 * Adds better validation and error handling for image uploads
 */

import { definePlugin } from 'sanity';

interface AssetSource {
  name: string;
  title: string;
  component: React.ComponentType<any>;
  icon?: React.ComponentType<any>;
}

export const customImageAsset = definePlugin(() => {
  return {
    name: 'custom-image-asset',
    document: {
      // Add a file input change hook
      onChange: (onChange: any, context: any) => (event: any) => {
        // If this is an image upload
        if (
          event.patches &&
          event.patches.some((patch: any) => 
            patch.path && 
            (patch.path.includes('asset') || patch.path.includes('image'))
          )
        ) {
          // Get the file from the event if possible
          const file = event?.patches?.[0]?.value?.file;
          
          // Validate file formats
          if (file && !isSupportedImageFormat(file)) {
            // Alert the user about the unsupported format
            alert('Unsupported image format. Please use JPG, PNG, WebP, or GIF files only.');
            // Cancel the upload by not calling the original onChange
            return;
          }
        }
        
        // Call original onChange for other changes
        onChange(event);
      }
    }
  };
});

/**
 * Check if a file has a supported image format for Sanity
 */
function isSupportedImageFormat(file: File): boolean {
  // Supported mime types
  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png', 
    'image/gif',
    'image/webp'
  ];

  // Check mime type
  if (!supportedTypes.includes(file.type)) {
    return false;
  }
  
  // Check file extension as a fallback
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  return validExtensions.some(ext => fileName.endsWith(ext));
} 