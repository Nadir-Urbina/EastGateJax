'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { SanityErrorBoundary } from '../components/SanityErrorBoundary'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Add a short loading delay to ensure all resources are properly loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show a loading state while initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <p className="text-gray-600">Loading Sanity Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <SanityErrorBoundary>
      <NextStudio config={config} />
    </SanityErrorBoundary>
  );
} 