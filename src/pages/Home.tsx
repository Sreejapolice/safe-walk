import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';
import EmergencyButton from '../components/home/EmergencyButton';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
      <EmergencyButton />
    </div>
  );
}