import React from 'react';
import Image from 'next/image';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { Sermon } from '@/lib/sanity/types';
import { YoutubeEmbed } from './youtube-embed';
import { formatDate } from '@/lib/utils';

interface LatestSermonsProps {
  sermons: Sermon[];
  isLoading?: boolean;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function LatestSermons({ sermons = [], isLoading = false }: LatestSermonsProps) {
  // Only show actual sermons from Sanity
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Latest Messages</h2>
          <p className="mb-12 text-lg text-gray-600">
            Watch our most recent sermons and be inspired by the Word of God.
          </p>
        </div>
        
        {isLoading ? (
          // Loading skeletons
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col rounded-lg bg-white shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6 flex-grow">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sermons.length > 0 ? (
          // Actual sermon content
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <div key={sermon._id} className="flex flex-col rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="aspect-video relative">
                  <YoutubeEmbed
                    videoId={extractYouTubeId(sermon.youtubeUrl) || ''}
                    title={sermon.title}
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="mb-2 text-xl font-semibold">{sermon.title}</h3>
                  <p className="text-gray-600 mb-2">{sermon.preacher}</p>
                  <p className="text-sm text-gray-500">{formatDate(sermon.date)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state when no sermons are available
          <div className="text-center py-8">
            <p className="text-gray-500">No sermons available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
} 