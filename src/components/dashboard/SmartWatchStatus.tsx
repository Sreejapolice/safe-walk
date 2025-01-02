import React, { useEffect, useState } from 'react';
import { Watch } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function SmartWatchStatus() {
  const { user } = useAuth();
  const [connected, setConnected] = useState(false);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    if (!user) return;

    // Subscribe to smartwatch updates
    const watchChannel = supabase
      .channel('watch-updates')
      .on('broadcast', { event: 'watch_data' }, (payload) => {
        setConnected(true);
        setHeartRate(payload.heartRate);
        setLastSync(new Date());
      })
      .subscribe();

    return () => {
      watchChannel.unsubscribe();
    };
  }, [user]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-3">
        <Watch className={`h-6 w-6 ${connected ? 'text-green-500' : 'text-gray-400'}`} />
        <div>
          <h3 className="font-medium">SmartWatch Status</h3>
          <p className="text-sm text-gray-500">
            {connected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
      </div>
      {connected && heartRate && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Heart Rate: {heartRate} BPM</p>
          <p className="text-xs text-gray-400">
            Last sync: {lastSync?.toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}