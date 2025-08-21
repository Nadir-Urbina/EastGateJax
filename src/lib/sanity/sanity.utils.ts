import { createClient } from 'next-sanity';
import { MinistryDynamic, Testimonial, Sermon, BlogPost, HomeGroup, Event, LeadershipTeam, HomePageData } from './types';
import { cache } from 'react';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'peh0hj3p',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2022-03-25',
  useCdn: false, // Set to false for now to avoid caching issues
  token: process.env.SANITY_API_TOKEN, // Required for write operations
});

export const fetchMinistryDynamics = cache(async (): Promise<MinistryDynamic[]> => {
  return client.fetch(
    `*[_type == "ministryDynamic"] | order(order asc) {
      _id,
      title,
      description,
      image,
      leader,
      meetingTime,
      meetingLocation
    }`
  );
});

export const fetchTestimonials = cache(async (): Promise<Testimonial[]> => {
  return client.fetch(
    `*[_type == "testimonial"] {
      _id,
      name,
      role,
      testimony,
      image
    }`
  );
});

export const fetchSermons = cache(async (limit?: number): Promise<Sermon[]> => {
  return client.fetch(
    `*[_type == "sermon"] | order(date desc) ${limit ? `[0...${limit}]` : ''} {
      _id,
      title,
      description,
      date,
      youtubeUrl,
      preacher,
      image
    }`
  );
});

export const fetchBlogPosts = cache(async (start?: number, end?: number): Promise<{ posts: BlogPost[], count: number }> => {
  try {
    // If start and end are provided, use pagination; otherwise, fetch all posts with optional limit
    const isUsingPagination = start !== undefined && end !== undefined;
    
    if (isUsingPagination) {
      // Fetch posts with pagination
      const posts = await client.fetch(
        `*[_type == "blogPost"] | order(publishedAt desc) [${start}...${end + 1}] {
          _id,
          title,
          slug,
          publishedAt,
          mainImage,
          excerpt,
          "categories": categories[]->{ _id, title },
          "author": author->{ _id, name, image }
        }`
      );
      
      // Fetch total count
      const count = await client.fetch(`count(*[_type == "blogPost"])`);
      
      return { posts: posts || [], count: count || 0 };
    } else {
      // Legacy behavior for backwards compatibility - treat start as limit
      const limit = start;
      const posts = await client.fetch(
        `*[_type == "blogPost"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
          _id,
          title,
          slug,
          publishedAt,
          mainImage,
          excerpt,
          "categories": categories[]->{ _id, title },
          "author": author->{ _id, name, image }
        }`
      );
      
      return { posts: posts || [], count: posts?.length || 0 };
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], count: 0 };
  }
});

export const fetchHomeGroups = cache(async (): Promise<HomeGroup[]> => {
  return client.fetch(
    `*[_type == "homeGroup"] | order(title asc) {
      _id,
      title,
      description,
      leaders,
      meetingDay,
      meetingTime,
      locationZip,
      county,
      contactEmail,
      image
    }`
  );
});

export const fetchEvents = cache(async (): Promise<Event[]> => {
  return client.fetch(
    `*[_type == "event"] | order(date asc) {
      _id,
      name,
      description,
      date,
      location,
      image
    }`
  );
});

export const fetchLeadershipTeam = cache(async (): Promise<LeadershipTeam[]> => {
  return client.fetch(
    `*[_type == "leadershipTeam"] | order(order asc) {
      _id,
      name,
      position,
      image,
      order,
      socialMedia,
      bio
    }`
  );
});

export async function fetchSanityData(query: string, params?: any) {
  // If Sanity is not properly configured, return null immediately
  const config = client.config();
  if (!config.projectId || config.projectId === 'placeholder-project-id') {
    return null;
  }
  
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return null;
  }
}

export async function fetchHomeData() {
  // Import queries directly
  const { 
    ministryDynamicsQuery, 
    testimonialsQuery, 
    sermonsQuery, 
    recentBlogPostsQuery,
    homeGroupsQuery
  } = await import('./queries');

  console.log('Fetching home data from Sanity project:', client.config().projectId);

  try {
    // Fetch data directly using client.fetch to avoid any caching issues
    const results = await Promise.allSettled([
      client.fetch(ministryDynamicsQuery).catch(e => {
        console.error('Error fetching ministries:', e);
        return [];
      }),
      client.fetch(testimonialsQuery).catch(e => {
        console.error('Error fetching testimonials:', e);
        return [];
      }),
      client.fetch(sermonsQuery).catch(e => {
        console.error('Error fetching sermons:', e);
        return [];
      }),
      client.fetch(recentBlogPostsQuery).catch(e => {
        console.error('Error fetching blog posts:', e);
        return [];
      }),
      client.fetch(homeGroupsQuery).catch(e => {
        console.error('Error fetching home groups:', e);
        return [];
      }),
    ]);

    const [
      ministryResult,
      testimonialResult,
      sermonResult,
      blogPostResult,
      homeGroupResult
    ] = results;

    // Extract values or use empty arrays for failures
    const ministries = ministryResult.status === 'fulfilled' ? ministryResult.value : [];
    const testimonials = testimonialResult.status === 'fulfilled' ? testimonialResult.value : [];
    const sermons = sermonResult.status === 'fulfilled' ? sermonResult.value : [];
    const blogPosts = blogPostResult.status === 'fulfilled' ? blogPostResult.value : [];
    const homeGroups = homeGroupResult.status === 'fulfilled' ? homeGroupResult.value : [];

    console.log('Fetched data counts:', { 
      ministries: ministries?.length || 0, 
      testimonials: testimonials?.length || 0,
      sermons: sermons?.length || 0,
      blogPosts: blogPosts?.length || 0,
      homeGroups: homeGroups?.length || 0
    });

    return {
      ministries,
      testimonials,
      sermons,
      blogPosts,
      homeGroups,
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      ministries: [],
      testimonials: [],
      sermons: [],
      blogPosts: [],
      homeGroups: [],
    };
  }
}

export async function fetchMissions() {
  // Check if Sanity is properly configured before attempting to fetch
  const config = client.config();
  if (!config.projectId || config.projectId === 'placeholder-project-id') {
    return [];
  }
  
  const { missionsQuery } = await import('./queries');
  return fetchSanityData(missionsQuery) || [];
}

export async function fetchBlogPost(slug: string) {
  // Check if Sanity is properly configured before attempting to fetch
  const config = client.config();
  if (!config.projectId || config.projectId === 'placeholder-project-id') {
    return null;
  }
  
  const { singleBlogPostQuery } = await import('./queries');
  return fetchSanityData(singleBlogPostQuery, { slug }) || null;
}

export async function fetchMinistryDetail(slug: string) {
  // Check if Sanity is properly configured before attempting to fetch
  const config = client.config();
  if (!config.projectId || config.projectId === 'placeholder-project-id') {
    return null;
  }
  
  const { singleMinistryQuery } = await import('./queries');
  return fetchSanityData(singleMinistryQuery, { slug }) || null;
} 