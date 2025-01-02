import React from 'react';
import { MapPin, Bell, Users, Shield } from 'lucide-react';

const features = [
  {
    name: 'Real-time Location Tracking',
    description: 'Share your location with trusted contacts and get instant assistance when needed.',
    icon: MapPin,
  },
  {
    name: 'Smart Alerts',
    description: 'Receive instant notifications about potential safety concerns in your area.',
    icon: Bell,
  },
  {
    name: 'Trusted Contacts',
    description: 'Add emergency contacts who can monitor your journey and respond quickly.',
    icon: Users,
  },
  {
    name: 'AI-Powered Safety',
    description: 'Advanced algorithms analyze your surroundings to suggest the safest routes.',
    icon: Shield,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to stay safe
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}