"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { Event } from "@/lib/sanity/types";
import { getSanityImageSrcFromRef } from "@/lib/sanity/client";

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

// Fallback image for events that don't have their own image
const HERO_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newEGHeroimg-GJFwdnDP12Ycw5eU1ZnyDkZmTcGrKZ.png";

// Helper function for event image URLs
function getEventImageUrl(image: any) {
  if (!image || !image.asset || !image.asset._ref) return '';
  return getSanityImageSrcFromRef(image.asset._ref);
}

/**
 * Safely get image URL from Sanity image object
 */
const getSafeImageUrl = (image: any): string => {
  const imageUrl = getEventImageUrl(image);
  return imageUrl || HERO_IMAGE;
};

/**
 * Format event date and time for display
 */
const formatEventDateTime = (dateString?: string) => {
  if (!dateString) {
    return {
      date: 'TBD',
      time: 'TBD',
      dayOfWeek: 'TBD'
    };
  }
  
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }),
    dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' })
  };
};

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

export function EventCard({ event, isPast = false }: EventCardProps) {
  const [likes, setLikes] = useState(event.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load user's like status from localStorage on component mount
  useEffect(() => {
    const storedIsLiked = localStorage.getItem(`event-liked-${event._id}`);
    if (storedIsLiked) {
      setIsLiked(storedIsLiked === 'true');
    }
    
    // Clean up old localStorage data from previous implementation
    const oldLikesKey = `event-likes-${event._id}`;
    if (localStorage.getItem(oldLikesKey)) {
      localStorage.removeItem(oldLikesKey);
    }
  }, [event._id]);

  // Update likes when event data changes
  useEffect(() => {
    setLikes(event.likes || 0);
  }, [event.likes]);

  const handleLike = async () => {
    if (isLoading) return; // Prevent multiple requests
    
    setIsLoading(true);
    const newIsLiked = !isLiked;
    
    try {
      const method = newIsLiked ? 'POST' : 'DELETE';
      const response = await fetch(`/api/events/${event._id}/like`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

      const data = await response.json();
      
      // Update local state
      setIsLiked(newIsLiked);
      setLikes(data.likes);
      
      // Store user's like status in localStorage (for UI state only)
      localStorage.setItem(`event-liked-${event._id}`, newIsLiked.toString());
      
    } catch (error) {
      console.error('Error updating like:', error);
      // Could add a toast notification here for better UX
    } finally {
      setIsLoading(false);
    }
  };

  const { date, time, dayOfWeek } = formatEventDateTime(event.date);
  const status = getEventStatus(event.date);
  const imageUrl = getSafeImageUrl(event.image);

  if (isPast) {
    return (
      <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-32">
          <Image
            src={imageUrl}
            alt={event.image?.alt || event.name}
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
            {event.name}
          </h3>
          
          <div className="mb-2 text-sm text-gray-500">
            {date}
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {event.description}
          </p>
          
          {/* Like button for past events */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleLike}
              disabled={isLoading}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isLiked 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart 
                className={`w-4 h-4 ${isLiked ? 'fill-current' : ''} ${isLoading ? 'animate-pulse' : ''}`} 
              />
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={event.image?.alt || event.name}
          fill
          className="object-cover w-full h-full"
        />
        {status === 'today' && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Today
          </div>
        )}
        {status === 'this-week' && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            This Week
          </div>
        )}
        {status === 'tbd' && (
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            TBD
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-3 flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{dayOfWeek}, {date}</span>
        </div>
        
        <h3 className="mb-3 text-xl font-bold text-gray-900 hover:text-primary transition-colors">
          {event.name}
        </h3>
        
        <div className="mb-3 flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{time}</span>
        </div>
        
        <div className="mb-4 flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.location || 'TBD'}</span>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isLiked 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart 
              className={`w-4 h-4 ${isLiked ? 'fill-current' : ''} ${isLoading ? 'animate-pulse' : ''}`} 
            />
            <span>{likes}</span>
          </button>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'today' ? 'bg-red-100 text-red-800' :
            status === 'this-week' ? 'bg-orange-100 text-orange-800' :
            status === 'tbd' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {status === 'today' ? 'Today' :
             status === 'this-week' ? 'This Week' :
             status === 'tbd' ? 'TBD' :
             'Upcoming'}
          </span>
        </div>
      </div>
    </article>
  );
}
