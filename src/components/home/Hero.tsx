import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-purple-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src="https://images.unsplash.com/photo-1581093458791-9d42e3c7e2a6?auto=format&fit=crop&q=80"
          alt="Woman walking safely at night"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your AI-Powered Safety Companion
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          SafeWalk combines advanced AI technology with real-time monitoring to keep you safe,
          wherever you go. Get instant alerts, share your location with trusted contacts, and
          navigate confidently with our smart route planning.
        </p>
        <div className="mt-10 flex space-x-4">
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}