import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function LeadershipTeam() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold">Our Leadership</h2>
          <p className="text-lg text-gray-600">
            Meet our senior leaders who lead our community with vision and passion.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image on the left */}
            <div className="relative">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/drJoshAndCoral.webp"
                  alt="Dr. Joshua and Coral Todd"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content on the right */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Dr. Joshua and Coral Todd</h3>
                <p className="text-lg text-gray-600 mb-6">Senior Leaders</p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Dr. Joshua and Coral Todd are passionate about getting the Father what He wants in the region and in the nations. Their heart is to see people and places set free, transformed, and set apart to their God-given purposes and life's call.
                </p>

                <p>
                  By walking out their own process of personal awakening revival, sonship, inner healing, and prophetic training, the Todds are equipped to prepare and position a people to become Kingdom Champions who walk in greater levels of freedom and who can establish, expand, and enforce Kingdom Culture in their communities.
                </p>

                <p>
                  Dr. Todd has written six books on the prophetic, inheritance, and sonship that are part of a blueprint that marries sonship and daughter-hood to spiritual fathering and mothering.
                </p>

                <p>
                  Coral is a leader in the marketplace and is gifted in prophetic ministry, prophetic intercession, dance, and teaching. The Todds are proud parents to their children, Mia and Joshua.
                </p>

                <div className="pt-4">
                  <Link 
                    href="https://drjoshuatodd.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-amber-400 text-gray-900 font-medium rounded-lg hover:bg-amber-300 transition-colors"
                  >
                    Learn more at www.drjoshuatodd.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 