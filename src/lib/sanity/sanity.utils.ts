import { client } from './client';

export async function fetchSanityData(query: string, params?: any) {
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return null;
  }
}

export async function fetchHomeData() {
  // Import queries in the function to avoid circular dependencies
  const { 
    ministryDynamicsQuery, 
    testimonialsQuery, 
    sermonsQuery, 
    recentBlogPostsQuery 
  } = await import('./queries');

  try {
    const [ministries, testimonials, sermons, blogPosts] = await Promise.all([
      fetchSanityData(ministryDynamicsQuery),
      fetchSanityData(testimonialsQuery),
      fetchSanityData(sermonsQuery),
      fetchSanityData(recentBlogPostsQuery),
    ]);

    return {
      ministries: ministries || [],
      testimonials: testimonials || [],
      sermons: sermons || [],
      blogPosts: blogPosts || [],
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      ministries: [],
      testimonials: [],
      sermons: [],
      blogPosts: [],
    };
  }
}

export async function fetchHomeGroups() {
  const { homeGroupsQuery } = await import('./queries');
  return fetchSanityData(homeGroupsQuery) || [];
}

export async function fetchMissions() {
  const { missionsQuery } = await import('./queries');
  return fetchSanityData(missionsQuery) || [];
}

export async function fetchBlogPosts(start = 0, end = 9) {
  const { allBlogPostsQuery, blogPostsCountQuery } = await import('./queries');
  
  try {
    const [posts, count] = await Promise.all([
      fetchSanityData(allBlogPostsQuery, { start, end }),
      fetchSanityData(blogPostsCountQuery),
    ]);

    return {
      posts: posts || [],
      count: count || 0,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: [],
      count: 0,
    };
  }
}

export async function fetchBlogPost(slug: string) {
  const { singleBlogPostQuery } = await import('./queries');
  return fetchSanityData(singleBlogPostQuery, { slug }) || null;
}

export async function fetchMinistryDetail(slug: string) {
  const { singleMinistryQuery } = await import('./queries');
  return fetchSanityData(singleMinistryQuery, { slug }) || null;
} 