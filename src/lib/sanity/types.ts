// Define types for Sanity content

// Common types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// Ministry Dynamics
export interface MinistryDynamic {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  slug: SanitySlug;
  fullDescription?: any[]; // Rich text
  gallery?: SanityImage[];
  leadersInfo?: any[]; // Rich text or structured data
  events?: Event[];
  contactInfo?: string;
  order?: number;
}

// Testimonials
export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  testimony: string;
  image?: SanityImage;
}

// Encounter Home Groups
export interface HomeGroup {
  _id: string;
  title: string;
  slug?: SanitySlug;
  description?: string;
  location: string;
  meetingDay: string;
  meetingTime: string;
  ageGroup: string;
  leaders: string;
  contactEmail?: string;
  contactPhone?: string;
  coordinates: {
    _type: 'geopoint';
    lat: number;
    lng: number;
    alt?: number;
  };
  image?: SanityImage;
}

// Latest Messages/Sermons
export interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  description?: string;
  youtubeUrl: string;
  image?: SanityImage;
}

// Blog Author
export interface Author {
  _id: string;
  name: string;
  bio?: any[]; // Rich text
  image?: SanityImage;
}

// Blog Category
export interface Category {
  _id: string;
  title: string;
  description?: string;
}

// Blog Post
export interface BlogPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  body: any[]; // Rich text
  publishedAt: string;
  mainImage?: SanityImage;
  categories?: string[]; // String array of category titles
  author?: string; // Author name
  authorImage?: SanityImage;
}

// Mission
export interface Mission {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  ongoing: boolean;
  image: SanityImage;
  contactPerson?: string;
  donationLink?: string;
  order?: number;
}

// Event (could be used within ministries)
export interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  image?: SanityImage;
}

// Home Page Data
export interface HomePageData {
  ministries: MinistryDynamic[];
  testimonials: Testimonial[];
  sermons: Sermon[];
  blogPosts: BlogPost[];
} 