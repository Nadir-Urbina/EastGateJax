import Image from "next/image";
import Link from "next/link";
import { fetchBlogPosts } from "@/lib/sanity/sanity.utils";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { projectId } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Blog - East Gate Kingdom Fellowship",
  description: "Read our latest articles, devotionals, and updates from East Gate Kingdom Fellowship.",
};

interface BlogPageProps {
  searchParams: { page?: string }
}

const POSTS_PER_PAGE = 9;

// Hero image for the top of the blog page
const HERO_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newEGHeroimg-GJFwdnDP12Ycw5eU1ZnyDkZmTcGrKZ.png";

// Fallback image for when post images are missing
const FALLBACK_IMAGE = "/placeholder-image.png";

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Ensure searchParams is awaited properly before use
  const pageParam = searchParams?.page ? await Promise.resolve(searchParams.page) : '1';
  const currentPage = Number(pageParam) || 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const { posts, count } = await fetchBlogPosts(start, end);
  const totalPages = Math.ceil(count / POSTS_PER_PAGE);

  // Show placeholder posts when Sanity configuration is missing or no posts are available
  const isSanityConfigured = projectId && projectId !== 'placeholder-project-id';
  const displayPosts = (isSanityConfigured && posts.length > 0) 
    ? posts 
    : Array.from({ length: 6 }, (_, i) => ({
        _id: `placeholder-${i}`,
        title: `Blog Post Title ${i + 1}`,
        excerpt: "This is a placeholder excerpt for a blog post. Once you start creating content in Sanity, real blog posts will appear here.",
        slug: { current: "placeholder" },
        publishedAt: new Date().toISOString(),
        author: "Church Staff",
        categories: ["Church News"],
        mainImage: null,
      }));

  if (currentPage > totalPages && currentPage !== 1) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[300px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={HERO_IMAGE}
              alt="Church Community"
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="container relative z-10 flex h-full items-center px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Blog</h1>
              <p className="text-xl text-gray-200">
                Insights, devotionals, and updates from our community
              </p>
            </div>
          </div>
        </section>

        {/* Sanity Configuration Notice */}
        {!isSanityConfigured && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 mx-4 sm:mx-auto sm:max-w-5xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Sanity CMS configuration is required for the blog to display real content. 
                  Please set the <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code> environment variable.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post) => (
                <article 
                  key={post._id} 
                  className="overflow-hidden rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md"
                >
                  <Link href={isSanityConfigured ? `/blog/${post.slug.current}` : '#'}>
                    <div className="relative h-48 overflow-hidden">
                      {post.mainImage ? (
                        <Image
                          src={typeof post.mainImage === 'string' ? post.mainImage : urlForImage(post.mainImage).url()}
                          alt={post.title || "Blog post image"}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No image available</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-center text-sm text-gray-500">
                        <span>{formatDate(post.publishedAt)}</span>
                        {post.categories && post.categories.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{post.categories[0]}</span>
                          </>
                        )}
                      </div>
                      <h2 className="mb-3 text-xl font-semibold hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="mb-4 text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center">
                        <span className="text-primary font-medium">Read more</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {isSanityConfigured && totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`px-4 py-2 text-sm font-medium ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      } ${
                        page === 1 ? "rounded-l-md" : ""
                      } ${
                        page === totalPages ? "rounded-r-md" : ""
                      } border border-gray-300`}
                    >
                      {page}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-100">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mb-6 text-3xl font-bold">Stay Updated</h2>
              <p className="mb-8 text-lg text-gray-700">
                Subscribe to our newsletter to receive the latest blog posts, church announcements,
                and event updates directly in your inbox.
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 