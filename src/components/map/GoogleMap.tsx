import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useAuth } from '../../contexts/AuthContext';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        map.current = new google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 15,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        // Get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              if (!marker.current) {
                marker.current = new google.maps.Marker({
                  position: pos,
                  map: map.current,
                  title: 'Your Location',
                });
              } else {
                marker.current.setPosition(pos);
              }

              map.current?.setCenter(pos);
            },
            () => {
              setError('Error: The Geolocation service failed.');
            }
          );
        } else {
          setError('Error: Your browser doesn\'t support geolocation.');
        }
      }
    });
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}