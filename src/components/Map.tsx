import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MAPBOX_CONFIG, validateMapboxToken } from '../config/mapbox';

mapboxgl.accessToken = MAPBOX_CONFIG.accessToken;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Validate Mapbox token before initialization
      validateMapboxToken();

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAPBOX_CONFIG.style,
        center: MAPBOX_CONFIG.defaultCenter,
        zoom: MAPBOX_CONFIG.defaultZoom
      });

      // Add navigation control
      const nav = new mapboxgl.NavigationControl();
      map.current.addControl(nav, 'top-right');

      // Add geolocation control
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      });

      map.current.addControl(geolocate);

      // Wait for map to load before requesting location
      map.current.on('load', () => {
        geolocate.trigger(); // Automatically request user location
      });

      // Handle geolocation errors
      geolocate.on('error', () => {
        setError('Unable to access your location. Please enable location services.');
      });

      return () => {
        map.current?.remove();
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error initializing map';
      setError(errorMessage);
      console.error('Map initialization error:', err);
    }
  }, []);

  useEffect(() => {
    if (!user || !map.current) return;

    const locationChannel = supabase
      .channel('location-updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'location_updates',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        try {
          const { latitude, longitude } = payload.new;
          
          if (!marker.current) {
            marker.current = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map.current!);
          } else {
            marker.current.setLngLat([longitude, latitude]);
          }

          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 15
          });
        } catch (err) {
          console.error('Error updating location:', err);
          setError('Error updating location');
        }
      })
      .subscribe();

    return () => {
      locationChannel.unsubscribe();
    };
  }, [user]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Map Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow-lg" />
  );
}