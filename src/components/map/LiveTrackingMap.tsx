import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { MAPBOX_CONFIG } from '../../config/mapbox';

mapboxgl.accessToken = MAPBOX_CONFIG.accessToken;

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: string;
  heartRate?: number;
}

export default function LiveTrackingMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const { user } = useAuth();
  const [locationHistory, setLocationHistory] = useState<LocationData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add user location control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });
    map.current.addControl(geolocate);

    // Clean up
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!user || !map.current) return;

    // Subscribe to real-time location updates
    const locationChannel = supabase
      .channel('location-updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'location_updates',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        const { latitude, longitude, timestamp, heart_rate } = payload.new;
        updateLocation({ latitude, longitude, timestamp, heartRate: heart_rate });
      })
      .subscribe();

    // Subscribe to smartwatch data
    const watchChannel = supabase
      .channel('watch-updates')
      .on('broadcast', { event: 'watch_data' }, (payload) => {
        if (payload.heartRate) {
          // Update marker color based on heart rate
          updateMarkerStatus(payload.heartRate);
        }
      })
      .subscribe();

    return () => {
      locationChannel.unsubscribe();
      watchChannel.unsubscribe();
    };
  }, [user]);

  const updateLocation = (data: LocationData) => {
    const { latitude, longitude } = data;

    // Update marker position
    if (!userMarker.current) {
      userMarker.current = new mapboxgl.Marker({ color: '#6366f1' })
        .setLngLat([longitude, latitude])
        .addTo(map.current!);
    } else {
      userMarker.current.setLngLat([longitude, latitude]);
    }

    // Update location history
    setLocationHistory(prev => [...prev, data]);

    // Pan map to new location
    map.current?.flyTo({
      center: [longitude, latitude],
      zoom: 15
    });
  };

  const updateMarkerStatus = (heartRate: number) => {
    if (!userMarker.current) return;

    // Change marker color based on heart rate thresholds
    let color = '#6366f1'; // Default purple
    if (heartRate > 100) color = '#ef4444'; // Red for elevated heart rate
    if (heartRate > 120) color = '#dc2626'; // Darker red for high heart rate

    userMarker.current.getElement().style.color = color;
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Map Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow-lg" />
      {locationHistory.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <h3 className="font-medium text-gray-900">Location History</h3>
          <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
            {locationHistory.slice(-5).map((location, index) => (
              <div key={index} className="text-sm text-gray-600">
                {new Date(location.timestamp).toLocaleTimeString()}
                {location.heartRate && ` - ${location.heartRate} BPM`}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}