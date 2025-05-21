import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from './image';

// Custom components for rendering Portable Text content
export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image 
            src={urlForImage(value).url()} 
            alt={value.alt || "Blog Image"} 
            width={800} 
            height={500}
            className="w-full h-auto"
          />
          {value.caption && (
            <div className="italic text-center text-gray-600 mt-2">{value.caption}</div>
          )}
        </div>
      );
    },
  },
  block: {
    // Handle each block style
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold my-3">{children}</h4>,
    // Fix for blockquote - ensuring proper HTML structure without p > div nesting
    blockquote: ({ children }: any) => (
      <blockquote className="pl-4 border-l-4 border-gray-300 italic my-6">
        {React.Children.map(children, child => {
          // If child is a p tag, extract its children to avoid nesting issues
          if (React.isValidElement(child) && child.type === 'p') {
            return <div className="my-1">{child.props.children}</div>;
          }
          return child;
        })}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="my-4">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
}; 