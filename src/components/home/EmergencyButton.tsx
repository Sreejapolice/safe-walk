import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function EmergencyButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEmergency = async () => {
    setLoading(true);
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleEmergency}
      disabled={loading}
      className="fixed bottom-8 right-8 z-50 flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 disabled:opacity-50 shadow-lg transform hover:scale-105 transition-transform duration-200"
    >
      <AlertTriangle className="h-6 w-6" />
      <span>{loading ? 'Processing...' : 'Emergency Help'}</span>
    </button>
  );
}