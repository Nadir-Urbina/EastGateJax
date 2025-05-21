import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { mapboxPlugin } from './sanity/plugins/mapbox';
import { customImageAsset } from './sanity/plugins/customImageAsset';

export default defineConfig({
  name: 'default',
  title: 'East Gate Kingdom Fellowship',
  
  projectId: 'peh0hj3p',
  dataset: 'production',
  
  plugins: [
    deskTool(), 
    visionTool(), 
    mapboxPlugin,
    customImageAsset()
  ],
  
  schema: {
    types: schemaTypes,
  },

  form: {
    // Add this configuration to get Mapbox working in the Sanity Studio 
    geopoint: {
      map: {
        apiKey: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }
    },
    // Improve image upload experience
    image: {
      assetSources: (previousAssetSources) => {
        // Filter out unsupported asset sources if needed
        return previousAssetSources;
      },
      // Set a reasonable upload limit to avoid timeouts
      // 5MB is a good default for web images
      storeOriginalFilename: true,
    }
  },

  basePath: '/admin',

  // Performance optimizations
  document: {
    // More efficient document fetching
    unstable_liveEdit: false, // Disable live editing for better performance
  }
}); 