// Mapbox configuration
export const MAPBOX_CONFIG = {
  accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
  defaultCenter: [-74.5, 40], // Default center coordinates
  defaultZoom: 9,
  style: 'mapbox://styles/mapbox/streets-v12',
};

export const validateMapboxToken = () => {
  if (!MAPBOX_CONFIG.accessToken) {
    throw new Error('Mapbox access token is missing. Please add VITE_MAPBOX_TOKEN to your environment variables.');
  }
};