import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  mapboxToken: string;
  onZoneClick?: (zone: {name: string; available: number; total: number; pricePerHour: string}) => void;
}

interface ParkingZone {
  id: string;
  name: string;
  coordinates: number[][][];
  color: string;
  available: number;
  total: number;
  price: number;
}

const MapView = ({ mapboxToken, onZoneClick }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null);

  mapboxgl.accessToken = mapboxToken;

  const parkingZones: ParkingZone[] = [
    {
      id: 'zone-1',
      name: 'Zone A',
      coordinates: [[
        [106.6920, 10.7835],
        [106.6970, 10.7840],
        [106.6985, 10.7820],
        [106.6980, 10.7800],
        [106.6960, 10.7785],
        [106.6920, 10.7790],
        [106.6920, 10.7835]
      ]],
      color: '#CD7F32',
      available: 45,
      total: 120,
      price: 15
    },
    {
      id: 'zone-2',
      name: 'Zone B',
      coordinates: [[
        [106.6990, 10.7840],
        [106.7045, 10.7835],
        [106.7050, 10.7810],
        [106.7040, 10.7785],
        [106.7000, 10.7780],
        [106.6985, 10.7800],
        [106.6990, 10.7840]
      ]],
      color: '#DC143C',
      available: 78,
      total: 200,
      price: 20
    },
    {
      id: 'zone-3',
      name: 'Zone C',
      coordinates: [[
        [106.6900, 10.7775],
        [106.6970, 10.7780],
        [106.6985, 10.7760],
        [106.6975, 10.7720],
        [106.6940, 10.7700],
        [106.6900, 10.7710],
        [106.6900, 10.7775]
      ]],
      color: '#1E90FF',
      available: 156,
      total: 300,
      price: 25
    },
    {
      id: 'zone-4',
      name: 'Zone D',
      coordinates: [[
        [106.6995, 10.7770],
        [106.7050, 10.7775],
        [106.7065, 10.7750],
        [106.7060, 10.7715],
        [106.7020, 10.7695],
        [106.6990, 10.7710],
        [106.6995, 10.7770]
      ]],
      color: '#32CD32',
      available: 12,
      total: 150,
      price: 18
    }
  ];

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [106.6975, 10.7750],
      zoom: 14,
      pitch: 0,
      bearing: 0,
      attributionControl: false
    });

    map.current.on('load', () => {
      parkingZones.forEach((zone) => {
        // Add source for each zone
        map.current!.addSource(zone.id, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {
              name: zone.name,
              available: zone.available,
              total: zone.total,
              price: zone.price
            },
            geometry: {
              type: 'Polygon',
              coordinates: zone.coordinates
            }
          }
        });

        // Add fill layer
        map.current!.addLayer({
          id: `${zone.id}-fill`,
          type: 'fill',
          source: zone.id,
          paint: {
            'fill-color': zone.color,
            'fill-opacity': 0.35
          }
        });

        // Add outline layer
        map.current!.addLayer({
          id: `${zone.id}-outline`,
          type: 'line',
          source: zone.id,
          paint: {
            'line-color': zone.color,
            'line-width': 3,
            'line-opacity': 0.9
          }
        });

        // Calculate center point for label
        const centerLng = zone.coordinates[0].reduce((sum, coord) => sum + coord[0], 0) / zone.coordinates[0].length;
        const centerLat = zone.coordinates[0].reduce((sum, coord) => sum + coord[1], 0) / zone.coordinates[0].length;

        // Add text label for zone name
        map.current!.addSource(`${zone.id}-label`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {
              name: zone.name
            },
            geometry: {
              type: 'Point',
              coordinates: [centerLng, centerLat]
            }
          }
        });

        map.current!.addLayer({
          id: `${zone.id}-label`,
          type: 'symbol',
          source: `${zone.id}-label`,
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14,
            'text-anchor': 'center'
          },
          paint: {
            'text-color': '#ffffff',
            'text-halo-color': 'rgba(0, 0, 0, 0.8)',
            'text-halo-width': 2
          }
        });

        // Add click event
        map.current!.on('click', `${zone.id}-fill`, (e: any) => {
          const properties = e.features[0].properties;
          
          if (onZoneClick) {
            onZoneClick({
              name: properties.name,
              available: properties.available,
              total: properties.total,
              pricePerHour: `$${properties.price}`
            });
          }
        });

        // Change cursor on hover
        map.current!.on('mouseenter', `${zone.id}-fill`, () => {
          map.current!.getCanvas().style.cursor = 'pointer';
        });

        map.current!.on('mouseleave', `${zone.id}-fill`, () => {
          map.current!.getCanvas().style.cursor = '';
        });
      });
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    // Add geolocate control
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true,
      showUserLocation: true
    });

    map.current.addControl(geolocateControl, 'bottom-left');

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        
        // Create custom marker for user location
        const el = document.createElement('div');
        el.className = 'user-location-marker';
        el.innerHTML = `
          <div class="pulse"></div>
          <div class="marker-dot"></div>
        `;

        if (userLocationMarker.current) {
          userLocationMarker.current.remove();
        }

        userLocationMarker.current = new mapboxgl.Marker(el)
          .setLngLat([longitude, latitude])
          .addTo(map.current!);

        // Optionally fly to user location
        map.current!.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          duration: 2000
        });
      });
    }
  }, [mapboxToken]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  );
};

export default MapView;
