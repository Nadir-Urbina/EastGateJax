import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchMissions } from '@/lib/sanity/sanity.utils';
import { getSanityImageUrl } from '@/lib/sanity/client';
import { formatDate } from '@/lib/utils';
import { PlaceholderImage } from '@/components/placeholder-image';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { projectId } from '@/lib/sanity/client';

export const metadata = {
  title: 'Missions | East Gate Kingdom Fellowship',
  description: 'Current and upcoming mission work at East Gate Kingdom Fellowship in Costa Rica, Australia, New Zealand, and beyond.',
};

interface Mission {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  ongoing: boolean;
  image: any;
  contactPerson: string;
  donationLink?: string;
  order: number;
}

export default async function MissionsPage() {
  // Check if Sanity is configured properly before fetching data
  const isSanityConfigured = projectId && projectId !== 'placeholder-project-id';
  
  // Only fetch data if Sanity is properly configured
  const missionsData = isSanityConfigured ? await fetchMissions() : [];
  
  // Safely handle the case where missions might be null
  const missions = missionsData || [];
  
  // If no missions data from Sanity yet, show placeholder missions
  const displayMissions = missions.length > 0
    ? missions
    : [
        {
          _id: '1',
          title: 'Costa Rica Outreach',
          description: 'Serving communities in Costa Rica through education, healthcare, and spiritual support.',
          location: 'San José, Costa Rica',
          startDate: '2023-01-15',
          ongoing: true,
          image: null as any,
          contactPerson: 'John Smith',
          donationLink: 'https://example.com/donate',
          order: 1,
        },
        {
          _id: '2',
          title: 'Australia Church Planting',
          description: 'Supporting new church plants in major Australian cities and rural communities.',
          location: 'Sydney, Australia',
          startDate: '2023-03-20',
          ongoing: true,
          image: null as any,
          contactPerson: 'Sarah Johnson',
          donationLink: 'https://example.com/donate',
          order: 2,
        },
        {
          _id: '3',
          title: 'New Zealand Youth Ministry',
          description: 'Reaching the next generation in New Zealand through youth camps and leadership training.',
          location: 'Auckland, New Zealand',
          startDate: '2023-05-01',
          ongoing: true,
          image: null as any,
          contactPerson: 'Michael Brown',
          donationLink: 'https://example.com/donate',
          order: 3,
        },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/placeholder.svg"
            alt="Missions"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              Our Missions
            </h1>
            <p className="text-xl text-gray-300">
              Reaching the nations with the love and message of Jesus Christ
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
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
                    Sanity CMS configuration is required to display real mission data. 
                    Please set the <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code> environment variable.
                  </p>
                </div>
              </div>
            </div>
          )}
        
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">Our Mission Focus</h2>
            <p className="mb-6 text-lg text-gray-700">
              At East Gate Kingdom Fellowship, we are committed to fulfilling the Great Commission by taking the gospel to the ends of the earth. Our mission work focuses on:
            </p>
            <div className="grid gap-6 mt-12 md:grid-cols-3">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="mb-4 text-xl font-semibold">Church Planting</h3>
                <p className="text-gray-700">Supporting and establishing new churches in unreached communities</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="mb-4 text-xl font-semibold">Compassion Ministry</h3>
                <p className="text-gray-700">Meeting practical needs while sharing Christ's love</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="mb-4 text-xl font-semibold">Leadership Development</h3>
                <p className="text-gray-700">Training and equipping local leaders for sustainable ministry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Missions */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">Current Missions</h2>
            <p className="mb-12 text-lg text-gray-700">
              We are actively involved in these mission fields, bringing the gospel and Christ's compassion to communities around the world.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayMissions.map((mission: Mission) => (
              <div
                key={mission._id}
                className="overflow-hidden bg-white rounded-lg shadow-sm"
              >
                <div className="aspect-video relative">
                  {mission.image && mission.image.asset ? (
                    <Image
                      src={getSanityImageUrl(mission.image)}
                      alt={mission.title}
                      width={600}
                      height={340}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <PlaceholderImage
                      width={600}
                      height={340}
                      alt={mission.title}
                      className="w-full h-full"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{mission.title}</h3>
                  <p className="mb-4 text-gray-600">{mission.description}</p>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="ml-2 text-gray-600">{mission.location}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">Started:</span>
                      <span className="ml-2 text-gray-600">{formatDate(mission.startDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className="ml-2 text-gray-600">{mission.ongoing ? 'Ongoing' : 'Completed'}</span>
                    </div>
                  </div>
                  {mission.donationLink && (
                    <Link
                      href={mission.donationLink}
                      className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                    >
                      Support This Mission
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">Get Involved</h2>
            <p className="mb-12 text-lg text-gray-700">
              There are many ways you can participate in our mission work and make a difference.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 text-center bg-gray-50 rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Pray</h3>
              <p className="mb-4 text-gray-700">
                Join our prayer team and lift up our missionaries and the communities they serve.
              </p>
              <Link
                href="/contact"
                className="text-primary hover:underline"
              >
                Join Prayer Team
              </Link>
            </div>
            <div className="p-6 text-center bg-gray-50 rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Give</h3>
              <p className="mb-4 text-gray-700">
                Support our mission work financially. Your gifts make a significant impact.
              </p>
              <Link
                href="https://give.tithe.ly/?formId=fc03799a-0541-44e4-91a9-d53c7f5fd9d3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Donate Now
              </Link>
            </div>
            <div className="p-6 text-center bg-gray-50 rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Go</h3>
              <p className="mb-4 text-gray-700">
                Join one of our mission trips and serve alongside our missionaries.
              </p>
              <Link
                href="/contact"
                className="text-primary hover:underline"
              >
                Learn About Trips
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">Contact Our Missions Team</h2>
            <p className="mb-8 text-lg text-gray-700">
              Have questions about our mission work or want to get involved? Reach out to our missions director.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 