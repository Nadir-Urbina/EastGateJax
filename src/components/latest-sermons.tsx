import React from 'react';
import Image from 'next/image';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { Sermon } from '@/lib/sanity/types';
import { YoutubeEmbed } from './youtube-embed';
import { formatDate } from '@/lib/utils';

interface LatestSermonsProps {
  sermons: Sermon[];
}

export function LatestSermons({ sermons = [] }: LatestSermonsProps) {
  // If no sermons data from Sanity yet, show placeholder sermons
  const displaySermons = sermons.length > 0
    ? sermons
    : [
        {
          _id: '1',
          title: 'The Power of Faith',
          preacher: 'Pastor John Doe',
          date: '2023-05-21',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: null as any,
        },
        {
          _id: '2',
          title: 'Walking in Love',
          preacher: 'Pastor Jane Smith',
          date: '2023-05-24',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: null as any,
        },
        {
          _id: '3',
          title: 'Overcoming Challenges',
          preacher: 'Pastor John Doe',
          date: '2023-05-28',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: null as any,
        },
      ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Latest Messages</h2>
          <p className="mb-12 text-lg text-gray-600">
            Watch our most recent sermons and be inspired by the Word of God.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displaySermons.map((sermon) => (
            <div key={sermon._id} className="flex flex-col rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="aspect-video relative">
                <YoutubeEmbed url={sermon.youtubeUrl} />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="mb-2 text-xl font-semibold">{sermon.title}</h3>
                <p className="text-gray-600 mb-2">{sermon.preacher}</p>
                <p className="text-sm text-gray-500">{formatDate(sermon.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 