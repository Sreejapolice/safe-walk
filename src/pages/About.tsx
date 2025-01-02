import React from 'react';
import { Shield, Heart, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&q=80"
            alt="Safety first"
          />
          <div className="absolute inset-0 bg-purple-900 mix-blend-multiply" />
        </div>
        
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About SafeWalk
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-300 sm:max-w-3xl">
            We're on a mission to make every journey safer through innovative technology and community support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-gray-500">
              To create a world where everyone can walk without fear, empowered by technology and community.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Heart className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Our Values</h3>
            <p className="mt-2 text-gray-500">
              Safety, innovation, and community are at the heart of everything we do.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Our Community</h3>
            <p className="mt-2 text-gray-500">
              Join thousands of users who trust SafeWalk to keep them safe every day.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Story</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto text-center">
            Founded in 2024, SafeWalk was born from a simple idea: everyone deserves to feel safe while walking. 
            We've combined cutting-edge AI technology with community-driven safety features to create a 
            comprehensive personal safety solution that's accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
}