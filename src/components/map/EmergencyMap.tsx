import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import LocationTracker from './LocationTracker';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function EmergencyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        // Initialize map with default center
        map.current = new google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 15,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        // Subscribe to real-time location updates
        const subscription = supabase
          .from('user_locations')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })
          .limit(1)
          .on('INSERT', (payload) => {
            const { latitude, longitude } = payload.new;
            const position = new google.maps.LatLng(latitude, longitude);

            if (!marker.current) {
              marker.current = new google.maps.Marker({
                position,
                map: map.current,
                title: 'Current Location'
              });
            } else {
              marker.current.setPosition(position);
            }

            map.current?.panTo(position);
          })
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      }
    }).catch((err) => {
      setError('Error loading Google Maps');
      console.error(err);
    });
  }, [user]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
      <LocationTracker />
    </div>
  );
}