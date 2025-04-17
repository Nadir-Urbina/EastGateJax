// GROQ queries for Sanity CMS

// Ministry Dynamics
export const ministryDynamicsQuery = `*[_type == "ministryDynamic"] | order(order asc) {
  _id,
  title,
  description,
  image,
  slug
}`;

// Testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  name,
  role,
  testimony,
  image
}`;

// Encounter Home Groups
export const homeGroupsQuery = `*[_type == "homeGroup"] {
  _id,
  title,
  slug,
  description,
  location,
  meetingDay,
  meetingTime,
  ageGroup,
  leaders,
  contactEmail,
  contactPhone,
  coordinates,
  image
}`;

// Latest Messages/Sermons
export const sermonsQuery = `*[_type == "sermon"] | order(date desc) [0...3] {
  _id,
  title,
  preacher,
  date,
  description,
  youtubeUrl,
  image
}`;

// Blog Posts for Homepage
export const recentBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  "categories": categories[]->title,
  "author": author->name
}`;

// Single Blog Post
export const singleBlogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  publishedAt,
  mainImage,
  "categories": categories[]->title,
  "author": author->name,
  "authorImage": author->image
}`;

// Missions
export const missionsQuery = `*[_type == "mission"] | order(order asc) {
  _id,
  title,
  description,
  location,
  startDate,
  ongoing,
  image,
  contactPerson,
  donationLink
}`;

// Single Ministry Dynamic
export const singleMinistryQuery = `*[_type == "ministryDynamic" && slug.current == $slug][0] {
  _id,
  title,
  description,
  fullDescription,
  image,
  gallery,
  leadersInfo,
  events,
  contactInfo
}`;

// All Blog Posts with Pagination
export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  "categories": categories[]->title,
  "author": author->name
}`;

// Count of Blog Posts for Pagination
export const blogPostsCountQuery = `count(*[_type == "blogPost"])`;

// Categories
export const categoriesQuery = `*[_type == "category"] {
  _id,
  title,
  description
}`; 