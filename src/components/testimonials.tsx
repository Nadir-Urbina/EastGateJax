import React from 'react';
import Image from 'next/image';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { Testimonial as TestimonialType } from '@/lib/sanity/types';
import { PlaceholderImage } from './placeholder-image';

interface TestimonialsProps {
  testimonials: TestimonialType[];
}

export function Testimonials({ testimonials = [] }: TestimonialsProps) {
  // If no testimonials data from Sanity yet, show placeholder testimonials
  const displayTestimonials = testimonials.length > 0
    ? testimonials
    : [
        {
          _id: '1',
          name: 'Church Member',
          role: 'Church Member',
          testimony: 'East Gate has been a place of spiritual growth and community for our family. The teachings are profound and the fellowship is genuine.',
          image: null as any,
        },
        {
          _id: '2',
          name: 'Church Member',
          role: 'Church Member',
          testimony: 'The worship experience at East Gate is powerful and transformative. I\'ve found a true spiritual family here.',
          image: null as any,
        },
      ];

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
          <div className="grid gap-8 md:grid-cols-2">
            {displayTestimonials.map((testimonial) => (
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
        </div>
      </div>
    </section>
  );
} 