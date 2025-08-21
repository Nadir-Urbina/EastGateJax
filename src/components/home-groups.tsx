import React, { useState, useEffect } from 'react';
import { HomeGroup } from '@/lib/sanity/types';
import dynamic from 'next/dynamic';
import { geocodeZip } from '@/lib/geocode';
import { MapPin } from 'lucide-react';

// Lazy load the InteractiveMap component since it uses browser-only APIs
const InteractiveMap = dynamic(() => import('./interactive-map').then((mod) => mod.InteractiveMap), {
  ssr: false,
});

interface HomeGroupsProps {
  homeGroups: HomeGroup[];
}

export function HomeGroups({ homeGroups = [] }: HomeGroupsProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [attendGroup, setAttendGroup] = useState<HomeGroup | null>(null);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [geoMarkers, setGeoMarkers] = useState<any[]>([]);
  const [geoLoading, setGeoLoading] = useState(true);
  
  // Notification form state
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [notificationFormState, setNotificationFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [notificationFormError, setNotificationFormError] = useState<string | null>(null);
  
  // Remove placeholder logic, only use homeGroups prop
  const displayGroups = homeGroups;

  useEffect(() => {
    let cancelled = false;
    async function geocodeAll() {
      setGeoLoading(true);
      const results = await Promise.all(homeGroups.map(async group => {
        if (!group.locationZip) return null;
        const pos = await geocodeZip(group.locationZip);
        if (!pos) return null;
        return {
          id: group._id,
          position: pos,
          title: group.title,
          description: `${group.meetingDay}s at ${group.meetingTime}`,
        };
      }));
      if (!cancelled) {
        setGeoMarkers(results.filter(Boolean));
        setGeoLoading(false);
      }
    }
    if (homeGroups.length > 0) {
      geocodeAll();
    } else {
      setGeoMarkers([]);
      setGeoLoading(false);
    }
    return () => { cancelled = true; };
  }, [homeGroups]);

  const selectedGroup = displayGroups.find(g => g._id === selectedGroupId) || null;

  async function handleAttendSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!attendGroup) return;
    setFormState('loading');
    setFormError(null);
    const form = e.currentTarget;
    const data = {
      groupId: attendGroup._id,
      groupTitle: attendGroup.title,
      groupEmail: attendGroup.contactEmail,
      leaders: attendGroup.leaders,
      zip: attendGroup.locationZip,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      referral: form.referral.value,
      message: form.message.value,
    };
    try {
      const res = await fetch('/api/send-homegroup-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormState('success');
        setTimeout(() => {
          setAttendGroup(null);
          setFormState('idle');
        }, 2000);
      } else {
        const err = await res.json();
        setFormError(err.error || 'Failed to send RSVP.');
        setFormState('error');
      }
    } catch (err) {
      setFormError('Failed to send RSVP.');
      setFormState('error');
    }
  }

  async function handleNotificationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotificationFormState('loading');
    setNotificationFormError(null);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      areaInJacksonville: formData.get('areaInJacksonville') as string,
      additionalNotes: formData.get('additionalNotes') as string,
    };

    try {
      const res = await fetch('/api/submit-home-group-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        setNotificationFormState('success');
        setTimeout(() => {
          setShowNotificationForm(false);
          setNotificationFormState('idle');
        }, 3000);
      } else {
        setNotificationFormError(result.error || 'Failed to submit notification request.');
        setNotificationFormState('error');
      }
    } catch (err) {
      setNotificationFormError('Failed to submit notification request. Please try again.');
      setNotificationFormState('error');
    }
  }

  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Encounter Home Groups</h2>
          <p className="mb-8 text-lg text-gray-600">
            Connect with others in a more intimate setting through our home groups, where we study God's Word, pray together, and build lasting relationships.
          </p>
        </div>

        {displayGroups.length === 0 ? (
          /* Empty State Banner */
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-amber-100 rounded-lg p-8 md:p-12 text-center border border-primary/20">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Encounter Home Groups Coming Soon!
              </h3>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                We're currently organizing our home groups and will have updated information available soon. 
                These intimate gatherings will provide wonderful opportunities to connect, study God's Word, 
                and build lasting relationships within our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowNotificationForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Get Notified When Available
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Map */}
            <div className="mb-12 h-[400px] rounded-lg overflow-hidden shadow-md">
              {geoLoading ? (
                <div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>
              ) : (
                <InteractiveMap markers={geoMarkers} selectedId={selectedGroupId} />
              )}
            </div>

            {/* Home Groups - Horizontal Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayGroups.map(group => (
                <div
                  key={group._id}
                  className={
                    `flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-6 w-full cursor-pointer ${selectedGroupId === group._id ? 'ring-2 ring-primary' : ''}`
                  }
                  onClick={() => setSelectedGroupId(group._id)}
                >
                  {/* Group image or initials avatar */}
                  <div className="mb-4 flex justify-center">
                    {group.image && group.image.asset ? (
                      <img
                        src={group.image.asset._ref.startsWith('image-') ? `/api/sanity-image?ref=${group.image.asset._ref}` : group.image.asset._ref}
                        alt={group.title}
                        className="w-20 h-20 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                        {group.title.split(' ').map(w => w[0]).join('').slice(0,2)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{group.title}</h3>
                  <div className="mb-2 text-gray-700">
                    <span className="font-semibold text-gray-900">Leaders:</span> {group.leaders}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <span className="font-semibold text-gray-900">When:</span> {group.meetingDay}s at {group.meetingTime}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <span className="font-semibold text-gray-900">County:</span> {group.county}
                  </div>
                  <div className="mb-4 text-gray-700 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-gray-900">Zip Code:</span> {group.locationZip}
                  </div>
                  <button
                    className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors font-semibold"
                    onClick={e => { e.stopPropagation(); setAttendGroup(group); }}
                  >
                    Attend
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {attendGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" onClick={() => setAttendGroup(null)} aria-label="Close">&times;</button>
              <h3 className="text-xl font-bold mb-4">Attend {attendGroup.title}</h3>
              <form className="space-y-4" onSubmit={handleAttendSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name*</label>
                  <input type="text" name="name" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email*</label>
                  <input type="email" name="email" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="tel" name="phone" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">How did you learn about us?*</label>
                  <input type="text" name="referral" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea name="message" className="w-full border rounded px-3 py-2" rows={3}></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors" disabled={formState==='loading'}>
                  {formState==='loading' ? 'Sending...' : 'Send RSVP'}
                </button>
                {formState==='success' && <p className="text-green-600 text-sm mt-2">RSVP sent! Thank you.</p>}
                {formState==='error' && <p className="text-red-600 text-sm mt-2">{formError}</p>}
              </form>
            </div>
          </div>
        )}

        {/* Notification Form Modal */}
        {showNotificationForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
              <button 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" 
                onClick={() => setShowNotificationForm(false)} 
                aria-label="Close"
              >
                &times;
              </button>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Get Notified About Home Groups</h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll notify you when home groups become available in your area.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleNotificationSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name*</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email Address*</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Area in Jacksonville*</label>
                  <input 
                    type="text" 
                    name="areaInJacksonville" 
                    required 
                    placeholder="e.g., Riverside, Mandarin, Orange Park" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Additional Notes</label>
                  <textarea 
                    name="additionalNotes" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    rows={3}
                    placeholder="Any additional preferences or information you'd like us to know..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium" 
                  disabled={notificationFormState === 'loading'}
                >
                  {notificationFormState === 'loading' ? 'Submitting...' : 'Submit Notification Request'}
                </button>

                {notificationFormState === 'success' && (
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">Thank you! We'll notify you when home groups are available.</p>
                  </div>
                )}
                
                {notificationFormState === 'error' && (
                  <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{notificationFormError}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 