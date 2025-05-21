/**
 * Utility functions for handling image uploads with Sanity
 */

/**
 * Validates if a file is a supported image format for Sanity
 * Sanity supports: JPG, PNG, WebP, GIF
 * 
 * @param file File to validate
 * @returns boolean indicating if the file is a supported format
 */
export const isSupportedImageFormat = (file: File): boolean => {
  // List of MIME types supported by Sanity
  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png', 
    'image/gif',
    'image/webp'
  ];
  
  // Check if the file's MIME type is supported
  if (!supportedTypes.includes(file.type)) {
    return false;
  }
  
  // Also check file extension as a fallback
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  return validExtensions.some(ext => fileName.endsWith(ext));
};

/**
 * Displays a user-friendly error message for unsupported image formats
 */
export const getImageFormatErrorMessage = (): string => {
  return 'Unsupported image format. Please use JPG, PNG, WebP, or GIF files only. AVIF and other formats are not supported by Sanity.';
};

/**
 * Checks if the WebSocket connection to Sanity is working
 * @returns Promise that resolves to true if connected, false otherwise
 */
export const checkSanityConnection = async (): Promise<boolean> => {
  try {
    // Simple ping to check if Sanity API is reachable
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/ping`, 
      { method: 'GET' }
    );
    return response.ok;
  } catch (error) {
    console.error('Sanity connection error:', error);
    return false;
  }
}; 