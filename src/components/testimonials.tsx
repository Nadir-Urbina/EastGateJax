import React from 'react';
import Image from 'next/image';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { Testimonial as TestimonialType } from '@/lib/sanity/types';
import { PlaceholderImage } from './placeholder-image';

interface TestimonialsProps {
  testimonials: TestimonialType[];
  isLoading?: boolean;
}

export function Testimonials({ testimonials = [], isLoading = false }: TestimonialsProps) {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Testimonials</h2>
          <p className="mb-12 text-lg text-gray-600">
            Hear from our community members about how God is working in their lives.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          {isLoading ? (
            // Loading skeletons
            <div className="grid gap-8 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-lg bg-white p-6 shadow-sm animate-pulse">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            // Actual testimonials
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 relative">
                      {testimonial.image && testimonial.image.asset ? (
                        <Image
                          src={getSanityImageUrl(testimonial.image)}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <PlaceholderImage
                          width={48}
                          height={48}
                          alt="Testimonial"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "{testimonial.testimony}"
                  </p>
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
      </div>
    </section>
  );
} 