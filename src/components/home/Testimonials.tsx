import React from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'University Student',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    quote: 'SafeWalk gives me peace of mind when walking home late from the library. The real-time tracking feature is a game-changer!',
  },
  {
    name: 'Michael Chen',
    role: 'Night Shift Worker',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    quote: 'The smart alerts have helped me avoid potentially dangerous situations multiple times. Highly recommended!',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Healthcare Professional',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    quote: 'As someone who works late shifts, SafeWalk has become an essential part of my daily routine. The emergency contact feature is invaluable.',
  },
];

export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Trusted by thousands of users
          </h2>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-purple-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-500 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}