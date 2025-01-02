import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function EmergencyAlert() {
  const { user } = useAuth();
  const [alerting, setAlerting] = useState(false);

  const triggerEmergencyAlert = async () => {
    if (!user || alerting) return;

    try {
      setAlerting(true);
      
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Send emergency alert
      const { error } = await supabase
        .from('emergency_alerts')
        .insert([{
          user_id: user.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          status: 'active'
        }]);

      if (error) throw error;

      // Notify emergency contacts
      await supabase.functions.invoke('notify-emergency-contacts', {
        body: { userId: user.id }
      });

    } catch (error) {
      console.error('Error triggering alert:', error);
    } finally {
      setAlerting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={triggerEmergencyAlert}
        disabled={alerting}
        className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 disabled:opacity-50 shadow-lg"
      >
        <AlertTriangle className="h-6 w-6" />
        <span>{alerting ? 'Alerting...' : 'Emergency Alert'}</span>
      </button>
    </div>
  );
}