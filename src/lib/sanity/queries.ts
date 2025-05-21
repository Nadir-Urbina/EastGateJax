// GROQ queries for Sanity CMS - simplified for initial testing

// Ministry Dynamics - Simple version
export const ministryDynamicsQuery = `*[_type == "ministryDynamic"] {
  _id,
  title,
  description,
  image,
  slug
}`;

// Testimonials - Simple version
export const testimonialsQuery = `*[_type == "testimonial"] {
  _id,
  name,
  role,
  testimony,
  image
}`;

// Latest Messages/Sermons - Simple version
export const sermonsQuery = `*[_type == "sermon"] | order(date desc)[0...3] {
  _id,
  title,
  description,
  date,
  youtubeUrl,
  preacher,
  image
}`;

// Blog Posts - Simple version
export const recentBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->name
}`;

// Home Groups - Simple version
export const homeGroupsQuery = `*[_type == "homeGroup"] {
  _id,
  title,
  description,
  leaders,
  county,
  meetingDay,
  meetingTime,
  locationZip,
  contactEmail,
  image
}`;

// Leadership Team - Simple version
export const leadershipTeamQuery = `*[_type == "leadershipTeam"] {
  _id,
  name,
  position,
  image,
  socialMedia,
  bio
}`;

// Events - Simple version
export const eventsQuery = `*[_type == "event"] {
  _id,
  name,
  description,
  date,
  location,
  image
}`;

// Keep other complex queries for reference
export const singleMinistryQuery = `*[_type == "ministryDynamic" && slug.current == $slug][0] {
  _id,
  title,
  description,
  fullDescription,
  image
}`;

export const singleBlogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body
}`;

export const missionsQuery = `*[_type == "mission"] {
  _id,
  title,
  description,
  location,
  image
}`;

export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc)[$start...$end] {
  _id,
  title,
  slug,
  mainImage
}`;

export const blogPostsCountQuery = `count(*[_type == "blogPost"])`;

export const categoriesQuery = `*[_type == "category"] {
  _id,
  title
}`; 