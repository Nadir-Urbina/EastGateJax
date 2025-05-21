import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/sanity/types';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { formatDate } from '@/lib/utils';
import { PlaceholderImage } from './placeholder-image';

interface BlogPreviewProps {
  blogPosts: BlogPost[];
  isLoading?: boolean;
}

export function BlogPreview({ blogPosts = [], isLoading = false }: BlogPreviewProps) {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Latest Blog Posts</h2>
          <p className="mb-12 text-lg text-gray-600">
            Insights, teachings, and encouragement from our pastoral team and church community.
          </p>
        </div>
        
        {isLoading ? (
          // Loading skeletons
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="mb-3 flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="mt-4 flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : blogPosts.length > 0 ? (
          // Actual blog posts
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
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
        ) : (
          // Empty state
          <div className="text-center py-8">
            <p className="text-gray-500">No blog posts available yet. Check back soon for updates!</p>
          </div>
        )}
        
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