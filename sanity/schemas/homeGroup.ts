import { defineField, defineType } from 'sanity';
import GeopointHelper from '../components/GeopointHelper';

export default defineType({
  name: 'homeGroup',
  title: 'Home Groups',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          { title: 'Young Adults', value: 'young-adults' },
          { title: 'Family', value: 'family' },
          { title: 'Senior Adults', value: 'senior-adults' },
          { title: 'Mixed', value: 'mixed' },
        ],
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'meetingDay',
      title: 'Meeting Day',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'meetingTime',
      title: 'Meeting Time',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
      description: 'County or general area for the group (displayed publicly).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationZip',
      title: 'Location Zip Code',
      type: 'string',
      description: 'Only the zip code will be shown publicly for privacy.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leaders',
      title: 'Group Leaders',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'county',
      media: 'image',
    },
  },
}); 