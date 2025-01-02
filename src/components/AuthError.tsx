import React from 'react';

interface AuthErrorProps {
  message: string;
}

export default function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <span className="block sm:inline">{message}</span>
    </div>
  );
}