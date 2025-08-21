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
  leader?: string;
  meetingTime?: string;
  meetingLocation?: string;
}

// Testimonials
export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  testimony: string;
  image?: SanityImage;
}

// Encounter Home Groups
export interface HomeGroup {
  _id: string;
  title: string;
  slug?: SanitySlug;
  description?: string;
  county: string;
  locationZip: string;
  meetingDay: string;
  meetingTime: string;
  ageGroup: string;
  leaders: string;
  contactEmail?: string;
  contactPhone?: string;
  image?: SanityImage;
}

// Latest Messages/Sermons
export interface Sermon {
  _id: string;
  title: string;
  description?: string;
  date: string;
  youtubeUrl: string;
  preacher?: string;
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
  name: string;
  date?: string; // Optional - will show "TBD" if not provided
  description: string;
  location?: string; // Optional - will show "TBD" if not provided
  likes?: number; // Total likes count from Sanity
  image?: {
    asset: { _ref: string; _type: string };
    alt?: string;
  };
}

// Leadership Team
export interface LeadershipTeam {
  _id: string;
  name: string;
  position: string;
  image: SanityImage;
  order?: number;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
  bio: any[];
}

// Home Page Data
export interface HomePageData {
  ministries: MinistryDynamic[];
  testimonials: Testimonial[];
  sermons: Sermon[];
  blogPosts: BlogPost[];
  homeGroups?: HomeGroup[];
} 