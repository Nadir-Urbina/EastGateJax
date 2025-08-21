// GROQ queries for Sanity CMS - simplified for initial testing

// Ministry Dynamics - Simple version (only published)
export const ministryDynamicsQuery = `*[_type == "ministryDynamic" && !(_id in path("drafts.**"))] {
  _id,
  title,
  description,
  image,
  slug
}`;

// Testimonials - Simple version (only published)
export const testimonialsQuery = `*[_type == "testimonial" && !(_id in path("drafts.**"))] {
  _id,
  name,
  role,
  testimony,
  image
}`;

// Latest Messages/Sermons - Simple version (only published)
export const sermonsQuery = `*[_type == "sermon" && !(_id in path("drafts.**"))] | order(date desc)[0...3] {
  _id,
  title,
  description,
  date,
  youtubeUrl,
  preacher,
  image
}`;

// Blog Posts - Simple version (only published)
export const recentBlogPostsQuery = `*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->name
}`;

// Home Groups - Simple version (only published)
export const homeGroupsQuery = `*[_type == "homeGroup" && !(_id in path("drafts.**"))] {
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

// Leadership Team - Simple version (only published)
export const leadershipTeamQuery = `*[_type == "leadershipTeam" && !(_id in path("drafts.**"))] | order(order asc) {
  _id,
  name,
  position,
  image,
  order,
  socialMedia,
  bio
}`;

// Events - Simple version (only published events)
export const eventsQuery = `*[_type == "event" && !(_id in path("drafts.**"))] {
  _id,
  name,
  description,
  date,
  location,
  likes,
  image
}`;

// Keep other complex queries for reference
export const singleMinistryQuery = `*[_type == "ministryDynamic" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  description,
  fullDescription,
  image
}`;

export const singleBlogPostQuery = `*[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  excerpt,
  "author": author->name,
  "categories": categories[]->title
}`;

export const missionsQuery = `*[_type == "mission" && !(_id in path("drafts.**"))] {
  _id,
  title,
  description,
  location,
  image
}`;

export const allBlogPostsQuery = `*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc)[$start...$end] {
  _id,
  title,
  slug,
  mainImage
}`;

export const blogPostsCountQuery = `count(*[_type == "blogPost" && !(_id in path("drafts.**"))])`;

export const categoriesQuery = `*[_type == "category" && !(_id in path("drafts.**"))] {
  _id,
  title
}`; 