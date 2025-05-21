"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { YoutubeEmbed } from "@/components/youtube-embed"
import { Footer } from "@/components/footer"
import { PlaceholderImage } from "@/components/placeholder-image"
import { MinistryDynamics } from "@/components/ministry-dynamics"
import { Testimonials } from "@/components/testimonials"
import { LatestSermons } from "@/components/latest-sermons"
import { HomeGroups } from "@/components/home-groups"
import { BlogPreview } from "@/components/blog-preview"
import { fetchHomeData, fetchEvents } from "@/lib/sanity/sanity.utils"
import { HomePageData, Event } from "@/lib/sanity/types"
import { urlFor } from '@/lib/sanity/imageUrl'

function useAnimateInView() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return [ref, controls]
}

function AnimatedSection({ children }) {
  const [ref, controls] = useAnimateInView()

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [homeData, setHomeData] = useState<HomePageData>({
    ministries: [],
    testimonials: [],
    sermons: [],
    blogPosts: [],
  });
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [modalEvent, setModalEvent] = useState<Event | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchHomeData();
        setHomeData(data);
      } catch (error) {
        console.error('Error loading home page data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadEvents() {
      setEventsLoading(true);
      try {
        const data = await fetchEvents();
        setEvents(data || []);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setEventsLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.header
        className={`sticky top-0 z-50 border-b border-gray-800 bg-[#20232a] backdrop-blur-sm transition-all ${
          isScrolled ? "shadow-md" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EGLogo-2gbFj8SUeZPgeVRsKFGNfKV2bC2iga.png"
              alt="East Gate Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="hidden text-xl font-semibold text-gray-300 sm:inline-block">East Gate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-primary">
              About
            </Link>
            <Link href="/ministries" className="text-sm font-medium text-gray-300 hover:text-primary">
              Ministries
            </Link>
            <Link href="/events" className="text-sm font-medium text-gray-300 hover:text-primary">
              Events
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-300 hover:text-primary">
              Blog
            </Link>
            <Link href="/donate" className="inline-flex h-10 items-center justify-center rounded-md bg-amber-400 px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Donate
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden text-gray-300 border-gray-700">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="grid gap-4 py-4">
                <Link href="/about" className="text-sm font-medium hover:text-primary">
                  About
                </Link>
                <Link href="/ministries" className="text-sm font-medium hover:text-primary">
                  Ministries
                </Link>
                <Link href="/events" className="text-sm font-medium hover:text-primary">
                  Events
                </Link>
                <Link href="/blog" className="text-sm font-medium hover:text-primary">
                  Blog
                </Link>
                <Link href="/donate" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-amber-400 px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Donate
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newEGHeroimg-GJFwdnDP12Ycw5eU1ZnyDkZmTcGrKZ.png"
            alt="Church Community Life"
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container relative z-10 flex h-full items-center justify-center px-4">
          <div className="max-w-3xl text-center text-white">
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              East Gate Kingdom Fellowship
            </h1>
            <p className="mb-8 text-lg font-medium italic text-gray-200">
              The King Is Here
            </p>
            <p className="mb-8 text-lg text-gray-200">
              A missional community living upon the basis of the eternal covenant of Jesus Christ, fulfilling His mission to reach the nations.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/visit" className="inline-flex h-11 items-center justify-center rounded-md bg-amber-400 px-8 text-sm font-medium text-gray-900 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Plan Your Visit
              </Link>
              <Link href="/watch" className="inline-flex h-11 items-center justify-center rounded-md border border-gray-300 bg-transparent px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Watch Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <AnimatedSection>
        <section className="bg-gray-50 py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-bold">Join Us in Worship</h2>
              {eventsLoading ? (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col animate-pulse">
                      <div className="w-full h-48 bg-gray-200"></div>
                      <div className="flex flex-col p-6 flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3 mt-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : events.length === 0 ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="mb-2 font-semibold">Sunday Service</h3>
                    <p className="text-gray-600">10:30 AM</p>
                  </div>
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="mb-2 font-semibold">Wednesday Bible Study</h3>
                    <p className="text-gray-600">7:00 PM</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                  {events.map(event => (
                    <div key={event._id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                      {event.image && event.image.asset ? (
                        <div className="w-full h-48 relative">
                          <Image
                            src={urlFor(event.image)}
                            alt={event.image.alt || event.name}
                            fill
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                      <div className="flex flex-col p-6 flex-1 text-left">
                        <h3 className="mb-2 font-semibold text-lg truncate">{event.name}</h3>
                        <p className="text-gray-600 font-medium mb-1 truncate">{event.location}</p>
                        <p className="text-gray-500 text-sm mb-2">{new Date(event.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        <p className="text-gray-700 text-sm mb-4">{event.description.length > 150 ? event.description.slice(0, 150) + '…' : event.description}</p>
                        <button
                          className="mt-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                          onClick={() => setModalEvent(event)}
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Modal for event details */}
          {modalEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={() => setModalEvent(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                {modalEvent.image && modalEvent.image.asset && (
                  <div className="w-full h-56 relative mb-4 rounded">
                    <Image
                      src={urlFor(modalEvent.image)}
                      alt={modalEvent.image.alt || modalEvent.name}
                      fill
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{modalEvent.name}</h3>
                <p className="text-gray-600 font-medium mb-1">{modalEvent.location}</p>
                <p className="text-gray-500 text-sm mb-4">{new Date(modalEvent.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                <p className="text-gray-700 whitespace-pre-line">{modalEvent.description}</p>
              </div>
            </div>
          )}
        </section>
      </AnimatedSection>

      {/* Mission Section */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-bold">Our Mission</h2>
              <p className="mb-8 text-lg text-gray-600">
                At East Gate, we are committed to building a community of believers who are passionate about God's
                kingdom and dedicated to serving others through Christ's love.
              </p>
              <div className="grid gap-8 sm:grid-cols-3">
                <div className="rounded-lg p-6">
                  <h3 className="mb-2 font-semibold">Worship</h3>
                  <p className="text-gray-600">Experience the presence of God through dynamic worship</p>
                </div>
                <div className="rounded-lg p-6">
                  <h3 className="mb-2 font-semibold">Community</h3>
                  <p className="text-gray-600">Connect with others in authentic fellowship</p>
                </div>
                <div className="rounded-lg p-6">
                  <h3 className="mb-2 font-semibold">Mission</h3>
                  <p className="text-gray-600">Reach out to our community and the nations</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Ministry Dynamics */}
      <AnimatedSection>
        <MinistryDynamics ministries={homeData.ministries} isLoading={loading} />
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection>
        <Testimonials testimonials={homeData.testimonials} isLoading={loading} />
      </AnimatedSection>

      {/* Encounter Home Groups */}
      <AnimatedSection>
        <HomeGroups homeGroups={homeData.homeGroups || []} />
      </AnimatedSection>

      {/* Latest Sermons */}
      <AnimatedSection>
        <LatestSermons sermons={homeData.sermons} isLoading={loading} />
      </AnimatedSection>

      {/* Blog Preview */}
      <AnimatedSection>
        <BlogPreview blogPosts={homeData.blogPosts} isLoading={loading} />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
}

