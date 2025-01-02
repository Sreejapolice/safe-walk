import React from 'react';

interface EmergencyButtonProps {
  enabled: boolean;
  onClick: () => void;
  loading?: boolean;
}

export default function EmergencyButton({ enabled, onClick, loading = false }: EmergencyButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-colors duration-200 ${
        enabled
          ? 'bg-red-600 hover:bg-red-700 animate-pulse'
          : 'bg-purple-600 hover:bg-purple-700'
      } disabled:opacity-50`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : enabled ? (
        'Disable Emergency Mode'
      ) : (
        'Enable Emergency Mode'
      )}
    </button>
  );
}