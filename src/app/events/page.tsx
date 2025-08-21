import { Suspense } from 'react';
import Image from "next/image";
import Link from "next/link";
import { fetchEvents } from "@/lib/sanity/sanity.utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { projectId } from "@/lib/sanity/client";
import { Calendar, MapPin, Clock } from "lucide-react";
import { EventCard } from "@/components/event-card";

// Fallback image for hero section
const HERO_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newEGHeroimg-GJFwdnDP12Ycw5eU1ZnyDkZmTcGrKZ.png";

interface EventsPageProps {
  searchParams: {
    category?: string;
  };
}

/**
 * Determine if an event is upcoming, current, or past
 */
const getEventStatus = (dateString?: string) => {
  if (!dateString) return 'tbd';
  
  const eventDate = new Date(dateString);
  const now = new Date();
  const timeDiff = eventDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysDiff < 0) return 'past';
  if (daysDiff === 0) return 'today';
  if (daysDiff <= 7) return 'this-week';
  return 'upcoming';
};

async function EventsContent({ searchParams }: EventsPageProps) {
  // Check if Sanity is properly configured
  if (!projectId || projectId === 'placeholder-project-id') {
    return (
      <main>
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold mb-4">Events Configuration Required</h1>
              <p className="text-gray-600 mb-8">
                The events functionality requires Sanity CMS configuration. Please set the NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.
              </p>
              <Link href="/" className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  try {
    const events = await fetchEvents();
    
    // Sort events by date (upcoming first, then past events in reverse chronological order)
    const sortedEvents = events.sort((a, b) => {
      // Handle events without dates - put them at the top
      if (!a.date && !b.date) return 0;
      if (!a.date) return -1;
      if (!b.date) return 1;
      
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const now = new Date();
      
      // If both are in the future or both are in the past, sort chronologically
      if ((dateA >= now && dateB >= now) || (dateA < now && dateB < now)) {
        return dateA.getTime() - dateB.getTime();
      }
      
      // Future events come first
      return dateA >= now ? -1 : 1;
    });

    // Group events by status
    const upcomingEvents = sortedEvents.filter(event => {
      const status = getEventStatus(event.date);
      return status !== 'past';
    });
    const pastEvents = sortedEvents.filter(event => getEventStatus(event.date) === 'past');

    return (
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={HERO_IMAGE}
              alt="Church Events"
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container relative z-10 flex h-full items-center px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-playfair font-bold text-white sm:text-6xl lg:text-7xl tracking-wide">
                Church Events
              </h1>
              <p className="mb-6 text-xl text-gray-200">
                Join us for worship, fellowship, and community events that strengthen our faith and build lasting relationships.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Upcoming Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Various Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>All Welcome</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Upcoming Events</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't miss these exciting opportunities to worship, learn, and connect with our church family.
              </p>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Events</h3>
                <p className="text-gray-600">
                  Check back soon for new events and activities. In the meantime, join us for our regular Sunday service.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container px-4 mx-auto">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">Past Events</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Take a look at some of the wonderful events and gatherings we've had recently.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {pastEvents.slice(0, 8).map((event) => (
                  <EventCard key={event._id} event={event} isPast={true} />
                ))}
              </div>
              
              {pastEvents.length > 8 && (
                <div className="text-center mt-8">
                  <button className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                    View More Past Events
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-black text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold">Stay Connected</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Don't miss out on our upcoming events! Follow us on social media or contact us directly 
              to stay updated on all church activities and special gatherings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                href="/" 
                className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error loading events:', error);
    return (
      <main>
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold mb-4">Unable to Load Events</h1>
              <p className="text-gray-600 mb-8">
                We're having trouble loading the events. Please try again later or contact us if the problem persists.
              </p>
              <Link href="/" className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default function EventsPage({ searchParams }: EventsPageProps) {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        </main>
      }>
        <EventsContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </>
  );
} 