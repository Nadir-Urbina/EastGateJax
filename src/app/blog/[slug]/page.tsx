import Image from "next/image";
import Link from "next/link";
import { fetchBlogPost } from "@/lib/sanity/sanity.utils";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found - East Gate Kingdom Fellowship",
      description: "The requested blog post could not be found."
    };
  }
  
  return {
    title: `${post.title} - East Gate Kingdom Fellowship Blog`,
    description: post.excerpt || "Read this blog post from East Gate Kingdom Fellowship",
    openGraph: post.mainImage ? {
      images: [urlForImage(post.mainImage).url()],
    } : undefined,
  };
}

// Configure Portable Text components
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image 
            src={urlForImage(value).url()} 
            alt={value.alt || "Blog Image"} 
            width={800} 
            height={500}
            className="w-full h-auto"
          />
          {value.caption && (
            <div className="italic text-center text-gray-600 mt-2">{value.caption}</div>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </Link>
      );
    },
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Blog Post Header */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            {post.mainImage ? (
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                width={1920}
                height={1080}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="bg-gray-300 w-full h-full" />
            )}
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
                  <PortableText value={post.body} components={components} />
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
                        {post.categories.map((category) => (
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