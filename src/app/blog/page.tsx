import Image from "next/image";
import Link from "next/link";
import { fetchBlogPosts } from "@/lib/sanity/sanity.utils";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog - East Gate Kingdom Fellowship",
  description: "Read our latest articles, devotionals, and updates from East Gate Kingdom Fellowship.",
};

interface BlogPageProps {
  searchParams: { page?: string }
}

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const { posts, count } = await fetchBlogPosts(start, end);
  const totalPages = Math.ceil(count / POSTS_PER_PAGE);

  // Default placeholder posts if there's no data from Sanity
  const displayPosts = posts.length > 0 
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newEGHeroimg-GJFwdnDP12Ycw5eU1ZnyDkZmTcGrKZ.png"
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

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post) => (
                <article 
                  key={post._id} 
                  className="overflow-hidden rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md"
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="relative h-48 overflow-hidden">
                      {post.mainImage ? (
                        <Image
                          src={post.mainImage}
                          alt={post.title}
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
            {totalPages > 1 && (
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