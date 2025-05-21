"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Facebook, Instagram, X } from 'lucide-react';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { LeadershipTeam as LeadershipTeamType } from '@/lib/sanity/types';
import { PlaceholderImage } from './placeholder-image';
import { PortableText } from '@portabletext/react';

interface LeadershipTeamProps {
  leaders: LeadershipTeamType[];
  isLoading?: boolean;
}

export function LeadershipTeam({ leaders = [], isLoading = false }: LeadershipTeamProps) {
  const [activeLeader, setActiveLeader] = useState<LeadershipTeamType | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold">Our Leadership Team</h2>
          <p className="text-lg text-gray-600">
            Meet the dedicated individuals who lead and serve our church community with vision and passion.
          </p>
        </div>

        {isLoading ? (
          // Loading skeleton for leadership team
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="h-40 w-40 rounded-full bg-gray-200 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="flex gap-3 mt-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : leaders.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {leaders.map((leader) => (
              <div key={leader._id} className="flex flex-col items-center">
                <div 
                  className="relative h-40 w-40 rounded-full overflow-hidden mb-4 cursor-pointer shadow-md border border-gray-100" 
                  onClick={() => setActiveLeader(leader)}
                >
                  {leader.image && leader.image.asset ? (
                    <Image
                      src={getSanityImageUrl(leader.image)}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <PlaceholderImage
                      width={160}
                      height={160}
                      alt={leader.name}
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                <p className="text-gray-600 mb-3">{leader.position}</p>
                <div className="flex gap-3 mt-2">
                  {leader.socialMedia?.facebook && (
                    <a 
                      href={leader.socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {leader.socialMedia?.instagram && (
                    <a 
                      href={leader.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
                <button 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  onClick={() => setActiveLeader(leader)}
                >
                  Read Bio
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No leadership team members available yet.</p>
          </div>
        )}
      </div>

      {/* Modal for leader bio */}
      {activeLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setActiveLeader(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="h-48 w-48 rounded-lg overflow-hidden relative shadow-md border border-gray-100">
                  {activeLeader.image && activeLeader.image.asset ? (
                    <Image
                      src={getSanityImageUrl(activeLeader.image)}
                      alt={activeLeader.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <PlaceholderImage
                      width={192}
                      height={192}
                      alt={activeLeader.name}
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex gap-3 mt-4 justify-center">
                  {activeLeader.socialMedia?.facebook && (
                    <a 
                      href={activeLeader.socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {activeLeader.socialMedia?.instagram && (
                    <a 
                      href={activeLeader.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-1">{activeLeader.name}</h3>
                <p className="text-lg text-gray-600 mb-4">{activeLeader.position}</p>
                <div className="prose prose-sm max-w-none">
                  <PortableText value={activeLeader.bio} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 