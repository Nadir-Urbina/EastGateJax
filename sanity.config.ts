import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { mapboxPlugin } from './sanity/plugins/mapbox';

export default defineConfig({
  name: 'default',
  title: 'East Gate Kingdom Fellowship',
  
  projectId: 'peh0hj3p',
  dataset: 'production',
  
  plugins: [deskTool(), visionTool(), mapboxPlugin],
  
  schema: {
    types: schemaTypes,
  },

  form: {
    // Add this configuration to get Mapbox working in the Sanity Studio 
    geopoint: {
      map: {
        apiKey: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }
    }
  },

  basePath: '/admin',

  // Customize desk structure if needed
  // structure: (S) => 
  //   S.list()
  //   .title('Content')
  //   .items([
  //     // Add your structure items here
  //   ]),
}); 