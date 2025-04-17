import {definePlugin} from 'sanity'

// Get the Mapbox token from environment variables
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export const mapboxPlugin = definePlugin({
  name: 'mapbox-plugin',
  form: {
    geopoint: {
      map: {
        provider: 'mapbox',
        apiKey: mapboxToken,
        defaultZoom: 13,
        defaultLocation: {
          lat: 30.166,
          lng: -81.7018,
        },
      },
    },
  },
}) 