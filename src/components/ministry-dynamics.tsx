import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { MinistryDynamic } from '@/lib/sanity/types';
import { PlaceholderImage } from './placeholder-image';

interface MinistryDynamicsProps {
  ministries: MinistryDynamic[];
  isLoading?: boolean;
}

export function MinistryDynamics({ ministries = [], isLoading = false }: MinistryDynamicsProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Ministry Dynamics</h2>
          <p className="mb-12 text-lg text-gray-600">
            Discover the various ways you can grow, serve, and connect through our ministry programs.
          </p>
        </div>
        
        {isLoading ? (
          // Loading skeleton
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : ministries.length > 0 ? (
          // Actual ministries
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((ministry) => (
              <motion.div
                key={ministry._id}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Link href={`/ministries/${ministry.slug.current}`}>
                  <div className="aspect-video relative">
                    {ministry.image && ministry.image.asset ? (
                      <Image
                        src={getSanityImageUrl(ministry.image)}
                        alt={ministry.title}
                        width={400}
                        height={200}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <PlaceholderImage
                        width={400}
                        height={200}
                        alt={ministry.title}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{ministry.title}</h3>
                    <p className="text-gray-600">{ministry.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-8">
            <p className="text-gray-500">No ministry information available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
} 