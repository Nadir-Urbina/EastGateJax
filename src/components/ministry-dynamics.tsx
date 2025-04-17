import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { MinistryDynamic } from '@/lib/sanity/types';
import { PlaceholderImage } from './placeholder-image';

interface MinistryDynamicsProps {
  ministries: MinistryDynamic[];
}

export function MinistryDynamics({ ministries = [] }: MinistryDynamicsProps) {
  // If no ministries data from Sanity yet, show placeholder ministries
  const displayMinistries = ministries.length > 0 
    ? ministries 
    : [
        {
          _id: '1',
          title: 'Worship Ministry',
          description: 'Experience the presence of God through music and creative arts.',
          image: null as any,
          slug: { _type: 'slug', current: 'worship-ministry' },
        },
        {
          _id: '2',
          title: 'Youth Ministry',
          description: 'Empowering the next generation through faith, fellowship, and fun.',
          image: null as any,
          slug: { _type: 'slug', current: 'youth-ministry' },
        },
        {
          _id: '3',
          title: 'Missions',
          description: 'Reaching the nations with the love of Christ.',
          image: null as any,
          slug: { _type: 'slug', current: 'missions' },
        },
        {
          _id: '4',
          title: 'Children\'s Ministry',
          description: 'Nurturing young hearts in faith and biblical understanding.',
          image: null as any,
          slug: { _type: 'slug', current: 'childrens-ministry' },
        },
        {
          _id: '5',
          title: 'Prayer Ministry',
          description: 'Standing together in faith through intercessory prayer.',
          image: null as any,
          slug: { _type: 'slug', current: 'prayer-ministry' },
        },
        {
          _id: '6',
          title: 'Community Outreach',
          description: 'Serving our local community with compassion and care.',
          image: null as any,
          slug: { _type: 'slug', current: 'community-outreach' },
        },
      ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Ministry Dynamics</h2>
          <p className="mb-12 text-lg text-gray-600">
            Discover the various ways you can grow, serve, and connect through our ministry programs.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayMinistries.map((ministry) => (
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
      </div>
    </section>
  );
} 