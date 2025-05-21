"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"

// Use the environment variable for the access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

interface MapMarker {
  id: string;
  position: [number, number]; // [longitude, latitude]
  title: string;
  description: string;
}

interface InteractiveMapProps {
  markers?: MapMarker[];
  center?: [number, number]; // [longitude, latitude]
  zoom?: number;
  selectedId?: string | null;
  onSelectMarker?: (id: string) => void;
}

export function InteractiveMap({ 
  markers = [], 
  center = [-81.5514, 30.246], 
  zoom = 9,
  selectedId = null,
  onSelectMarker,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (map.current) return // initialize map only once
    if (!mapboxgl.accessToken) {
      setMapError("Mapbox access token is not set")
      return
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: zoom,
      })

      if (selectedId) {
        const marker = markers.find(m => m.id === selectedId);
        if (marker) {
          map.current.flyTo({ center: marker.position, zoom: 12 });
        }
      } else {
        map.current.flyTo({ center, zoom });
      }

      map.current.on("load", () => {
        // Add markers when map loads
        markers.forEach((marker) => {
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = marker.id === selectedId ? '#000' : '#FF0000';
          el.style.width = marker.id === selectedId ? '28px' : '20px';
          el.style.height = marker.id === selectedId ? '28px' : '20px';
          el.style.borderRadius = '50%';
          el.style.cursor = 'pointer';
          
          const mapMarker = new mapboxgl.Marker(el)
            .setLngLat(marker.position)
            .addTo(map.current!)

          mapMarker.getElement().addEventListener("click", () => {
            setSelectedMarker(marker)
            if (onSelectMarker) onSelectMarker(marker.id)
          })
        })
      })

      map.current.on("error", (e) => {
        setMapError("An error occurred while loading the map")
        console.error("Mapbox error:", e)
      })
    } catch (error) {
      setMapError("Failed to initialize the map")
      console.error("Map initialization error:", error)
    }
  }, [selectedId, center, zoom, markers, onSelectMarker])

  if (mapError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-center text-gray-500">
        <p>{mapError}</p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 rounded-lg bg-white p-4 shadow-md">
          <h3 className="mb-2 font-semibold">{selectedMarker.title}</h3>
          <p>{selectedMarker.description}</p>
        </div>
      )}
    </div>
  )
}

