import Image from "next/image";
import Link from "next/link";
import { fetchBlogPost } from "@/lib/sanity/sanity.utils";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { projectId, getSanityImageSrcFromRef } from "@/lib/sanity/client";
import { portableTextComponents } from "@/lib/sanity/portableText";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Fallback image for when post images are missing
const FALLBACK_IMAGE = "/placeholder-image.png";

// Hero image for posts that don't have their own featured image
const HERO_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newEGHeroimg-GJFwdnDP12Ycw5eU1ZnyDkZmTcGrKZ.png";

// Helper function for blog post image URLs (consistent with blog listing page)
function getBlogImageUrl(image: any) {
  if (!image || !image.asset || !image.asset._ref) return '';
  return getSanityImageSrcFromRef(image.asset._ref);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Await params before accessing its properties
  const { slug } = await params;
  
  // Check if Sanity is properly configured
  if (!projectId || projectId === 'placeholder-project-id') {
    return {
      title: "Blog - East Gate Kingdom Fellowship",
      description: "Blog functionality requires Sanity configuration."
    };
  }
  
  const post = await fetchBlogPost(slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found - East Gate Kingdom Fellowship",
      description: "The requested blog post could not be found."
    };
  }
  
  const imageUrl = getBlogImageUrl(post.mainImage);
  
  return {
    title: `${post.title} - East Gate Kingdom Fellowship Blog`,
    description: post.excerpt || "Read this blog post from East Gate Kingdom Fellowship",
    openGraph: imageUrl ? {
      images: [imageUrl],
    } : undefined,
  };
}

/**
 * Safely get image URL from Sanity image object
 */
const getSafeImageUrl = (image: any): string => {
  const imageUrl = getBlogImageUrl(image);
  return imageUrl || HERO_IMAGE;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await params before accessing its properties
  const { slug } = await params;
  
  // Check if Sanity is properly configured
  if (!projectId || projectId === 'placeholder-project-id') {
    return (
      <>
        <Header />
        <main>
          <section className="py-16">
            <div className="container px-4 mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-4">Blog Configuration Required</h1>
                <p className="text-gray-600 mb-8">
                  The blog functionality requires Sanity CMS configuration. Please set the NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.
                </p>
                <Link href="/blog" className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg">
                  Back to Blog
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
  
  const post = await fetchBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  // Get safe image URL
  const imageUrl = getSafeImageUrl(post.mainImage);

  return (
    <>
      <Header />
      <main>
        {/* Blog Post Header */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={post.title || "Blog post"}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container relative z-10 flex h-full items-center px-4">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center text-sm text-gray-300">
                <span>{formatDate(post.publishedAt)}</span>
                {post.categories && post.categories.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.categories.join(", ")}</span>
                  </>
                )}
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{post.title}</h1>
              {post.author && (
                <div className="flex items-center">
                  <span className="text-gray-200">By {post.author}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blog Post Content */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="mx-auto max-w-3xl">
              <article className="prose prose-lg max-w-none">
                {post.body ? (
                  <PortableText 
                    value={post.body} 
                    components={portableTextComponents}
                  />
                ) : (
                  <p>This blog post has no content yet.</p>
                )}
              </article>

              {/* Share and Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Share this post</h3>
                    <div className="flex space-x-4">
                      <Link 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          typeof window !== 'undefined' ? window.location.href : ''
                        )}&text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary"
                      >
                        Twitter
                      </Link>
                      <Link 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          typeof window !== 'undefined' ? window.location.href : ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary"
                      >
                        Facebook
                      </Link>
                    </div>
                  </div>
                  {post.categories && post.categories.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {post.categories.map((category: string) => (
                          <Link
                            key={category}
                            href={`/blog?category=${encodeURIComponent(category)}`}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Back to Blog */}
              <div className="mt-12 text-center">
                <Link 
                  href="/blog" 
                  className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 