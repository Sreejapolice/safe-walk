import React, { useState, useEffect } from 'react';
import { Watch } from 'lucide-react';

interface BluetoothDevice {
  name: string;
  id: string;
}

export default function BluetoothConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [error, setError] = useState<string | null>(null);

  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service']
      });

      const server = await device.gatt?.connect();
      if (server) {
        setIsConnected(true);
        // Store device info
        setDevices(prev => [...prev, { name: device.name || 'Unknown Device', id: device.id }]);
      }
    } catch (err) {
      setError('Failed to connect to device. Please try again.');
      console.error('Bluetooth connection error:', err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Watch className={`h-6 w-6 ${isConnected ? 'text-green-500' : 'text-gray-400'}`} />
          <h3 className="font-medium">Smartwatch Connection</h3>
        </div>
        <button
          onClick={connectToDevice}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
          disabled={isConnected}
        >
          {isConnected ? 'Connected' : 'Connect Watch'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {devices.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Connected Devices</h4>
          <ul className="space-y-2">
            {devices.map(device => (
              <li key={device.id} className="text-sm text-gray-600 flex items-center space-x-2">
                <Watch className="h-4 w-4 text-green-500" />
                <span>{device.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}