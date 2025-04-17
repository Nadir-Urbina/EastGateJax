import React from 'react';
import Image from 'next/image';

interface PlaceholderImageProps {
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export function PlaceholderImage({ width, height, alt, className = '' }: PlaceholderImageProps) {
  return (
    <div 
      className={`bg-gray-100 flex items-center justify-center overflow-hidden relative ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <Image
        src="/placeholder.svg"
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
} 