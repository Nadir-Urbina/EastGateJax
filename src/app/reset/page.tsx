"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPage() {
  const router = useRouter();
  
  useEffect(() => {
    const clearCacheAndRedirect = async () => {
      try {
        // Clear localStorage
        localStorage.clear();
        
        // Clear sessionStorage
        sessionStorage.clear();
        
        // Clear any service worker caches if they exist
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        
        console.log('Cache cleared successfully');
        
        // Wait a moment before redirecting
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } catch (error) {
        console.error('Error clearing cache:', error);
        // Redirect anyway in case of error
        router.push('/');
      }
    };
    
    clearCacheAndRedirect();
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Clearing Cache</h1>
        <p className="text-gray-600">Please wait, clearing application cache...</p>
        <div className="mt-4 w-12 h-12 border-t-4 border-primary rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
} 