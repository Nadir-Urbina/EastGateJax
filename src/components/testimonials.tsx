"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { Testimonial as TestimonialType } from '@/lib/sanity/types';
import { PlaceholderImage } from './placeholder-image';

interface TestimonialsProps {
  testimonials: TestimonialType[];
  isLoading?: boolean;
}

export function Testimonials({ testimonials = [], isLoading = false }: TestimonialsProps) {
  const [modalTestimonial, setModalTestimonial] = useState<TestimonialType | null>(null);
  
  // Function to truncate text to a specified length
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        {/* Center-aligned title and subtitle */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold">Testimonials</h2>
          <p className="text-lg text-gray-600">
            Hear from our community members about how God is working in their lives.
          </p>
        </div>
        
        {isLoading ? (
          // Loading skeletons
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-white p-6 shadow-md border border-gray-100 animate-pulse">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3 mt-auto"></div>
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          // Actual testimonials - left-aligned grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full w-full">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100 relative border-2 border-primary/20">
                    {testimonial.image && testimonial.image.asset ? (
                      <Image
                        src={getSanityImageUrl(testimonial.image)}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PlaceholderImage
                        width={64}
                        height={64}
                        alt="Testimonial"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex-grow mb-4">
                  <p className="text-gray-600 italic">
                    "{truncateText(testimonial.testimony)}"
                  </p>
                </div>
                <button
                  className="mt-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors self-start"
                  onClick={() => setModalTestimonial(testimonial)}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-8">
            <p className="text-gray-500">No testimonials available yet.</p>
          </div>
        )}
      </div>

      {/* Modal for testimonial details */}
      {modalTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setModalTestimonial(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100 relative border-2 border-primary/20">
                {modalTestimonial.image && modalTestimonial.image.asset ? (
                  <Image
                    src={getSanityImageUrl(modalTestimonial.image)}
                    alt={modalTestimonial.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PlaceholderImage
                    width={80}
                    height={80}
                    alt="Testimonial"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{modalTestimonial.name}</h3>
                <p className="text-gray-600">{modalTestimonial.role}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-700 whitespace-pre-line italic">"{modalTestimonial.testimony}"</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 