import React, { useState } from 'react';
import { HomeGroup } from '@/lib/sanity/types';
import dynamic from 'next/dynamic';

// Lazy load the InteractiveMap component since it uses browser-only APIs
const InteractiveMap = dynamic(() => import('./interactive-map').then((mod) => mod.InteractiveMap), {
  ssr: false,
});

interface HomeGroupsProps {
  homeGroups: HomeGroup[];
}

export function HomeGroups({ homeGroups = [] }: HomeGroupsProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  
  // If no home groups data from Sanity yet, show placeholder home groups
  const displayGroups = homeGroups.length > 0
    ? homeGroups
    : [
        {
          _id: '1',
          title: 'Young Adults',
          description: 'Connect with others in a more intimate setting through our home groups, where we study God\'s Word, pray together, and build lasting relationships.',
          location: 'Central District',
          meetingDay: 'Tuesday',
          meetingTime: '7:00 PM',
          ageGroup: 'Young Adults',
          leaders: 'John & Jane Smith',
          contactEmail: 'youngadults@eastgate.com',
          contactPhone: '123-456-7890',
          coordinates: { _type: 'geopoint', lat: 30.166, lng: -81.7018 },
        },
        {
          _id: '2',
          title: 'Family Group',
          description: 'Connect with others in a more intimate setting through our home groups, where we study God\'s Word, pray together, and build lasting relationships.',
          location: 'North District',
          meetingDay: 'Wednesday',
          meetingTime: '6:30 PM',
          ageGroup: 'Family',
          leaders: 'Bob & Mary Johnson',
          contactEmail: 'family@eastgate.com',
          contactPhone: '123-456-7890',
          coordinates: { _type: 'geopoint', lat: 30.246, lng: -81.5514 },
        },
        {
          _id: '3',
          title: 'Senior Adults',
          description: 'Connect with others in a more intimate setting through our home groups, where we study God\'s Word, pray together, and build lasting relationships.',
          location: 'South District',
          meetingDay: 'Thursday',
          meetingTime: '10:00 AM',
          ageGroup: 'Senior Adults',
          leaders: 'Tom & Sarah Williams',
          contactEmail: 'seniors@eastgate.com',
          contactPhone: '123-456-7890',
          coordinates: { _type: 'geopoint', lat: 29.8947, lng: -81.3124 },
        },
      ];

  // Group the home groups by age group
  const groupedByAge = displayGroups.reduce((acc, group) => {
    if (!acc[group.ageGroup]) {
      acc[group.ageGroup] = [];
    }
    acc[group.ageGroup].push(group);
    return acc;
  }, {} as Record<string, HomeGroup[]>);

  // Get map markers from home groups
  const markers = displayGroups.map(group => ({
    id: group._id,
    position: [group.coordinates.lng, group.coordinates.lat],
    title: group.title,
    description: `${group.meetingDay}s at ${group.meetingTime}`,
  }));

  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Encounter Home Groups</h2>
          <p className="mb-8 text-lg text-gray-600">
            Connect with others in a more intimate setting through our home groups, where we study God's Word, pray together, and build lasting relationships.
          </p>
        </div>

        {/* Map */}
        <div className="mb-12 h-[400px] rounded-lg overflow-hidden shadow-md">
          <InteractiveMap markers={markers} />
        </div>

        {/* Home Groups by Age */}
        <div className="grid gap-12">
          {Object.entries(groupedByAge).map(([ageGroup, groups]) => (
            <div key={ageGroup}>
              <h3 className="mb-4 text-2xl font-semibold">{ageGroup}</h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {groups.map(group => (
                  <div 
                    key={group._id} 
                    className="rounded-lg bg-white p-6 shadow-sm"
                    onMouseEnter={() => setActiveGroup(group._id)}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <h4 className="mb-2 text-xl font-semibold">{group.title}</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <span className="font-medium">Leaders:</span>{' '}
                        {group.leaders}
                      </li>
                      <li>
                        <span className="font-medium">When:</span>{' '}
                        {group.meetingDay}s at {group.meetingTime}
                      </li>
                      <li>
                        <span className="font-medium">Location:</span>{' '}
                        {group.location}
                      </li>
                      {(group.contactEmail || group.contactPhone) && (
                        <li>
                          <span className="font-medium">Contact:</span>{' '}
                          {group.contactEmail && <span>{group.contactEmail}<br /></span>}
                          {group.contactPhone && <span>{group.contactPhone}</span>}
                        </li>
                      )}
                    </ul>
                    <button className="mt-4 text-sm font-medium text-primary hover:underline">
                      Join Group
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 