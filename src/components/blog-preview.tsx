import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/sanity/types';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { formatDate } from '@/lib/utils';
import { PlaceholderImage } from './placeholder-image';

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts = [] }: BlogPreviewProps) {
  // If no blog posts data from Sanity yet, show placeholder blog posts
  const displayPosts = posts.length > 0
    ? posts
    : [
        {
          _id: '1',
          title: 'Finding God in Everyday Life',
          slug: { _type: 'slug', current: 'finding-god-in-everyday-life' },
          excerpt: 'Discover how to experience God\'s presence in your daily routines and activities.',
          publishedAt: '2023-02-12T12:00:00Z',
          mainImage: null as any,
          author: 'Pastor John',
          categories: ['Spiritual Growth', 'Devotional'],
          body: [] as any,
        },
        {
          _id: '2',
          title: 'The Power of Community',
          slug: { _type: 'slug', current: 'the-power-of-community' },
          excerpt: 'Why being part of a church community is essential for spiritual growth and emotional well-being.',
          publishedAt: '2023-03-05T12:00:00Z',
          mainImage: null as any,
          author: 'Pastor Sarah',
          categories: ['Community', 'Fellowship'],
          body: [] as any,
        },
        {
          _id: '3',
          title: 'Prayer: A Conversation with God',
          slug: { _type: 'slug', current: 'prayer-conversation-with-god' },
          excerpt: 'Learn how to develop a meaningful prayer life and deepen your relationship with God.',
          publishedAt: '2023-04-18T12:00:00Z',
          mainImage: null as any,
          author: 'Pastor Michael',
          categories: ['Prayer', 'Spiritual Discipline'],
          body: [] as any,
        },
      ];

  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Latest Blog Posts</h2>
          <p className="mb-12 text-lg text-gray-600">
            Insights, teachings, and encouragement from our pastoral team and church community.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <motion.div
              key={post._id}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/blog/${post.slug.current}`} className="block">
                <div className="aspect-video relative">
                  {post.mainImage && post.mainImage.asset ? (
                    <Image
                      src={getSanityImageUrl(post.mainImage)}
                      alt={post.title}
                      width={600}
                      height={340}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <PlaceholderImage
                      width={600}
                      height={340}
                      alt={post.title}
                      className="w-full h-full"
                    />
                  )}
                </div>
                <div className="p-6 flex-grow">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.categories && post.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                  <p className="mb-4 text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
} 