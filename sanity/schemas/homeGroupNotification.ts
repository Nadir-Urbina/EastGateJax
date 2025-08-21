import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homeGroupNotification',
  title: 'Home Group Notification Request',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'areaInJacksonville',
      title: 'Area in Jacksonville',
      type: 'string',
      description: 'General area or neighborhood in Jacksonville',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'additionalNotes',
      title: 'Additional Notes',
      type: 'text',
      description: 'Any additional information or preferences',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New Request', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Added to Group', value: 'added' },
          { title: 'Not Interested', value: 'not-interested' },
        ],
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'areaInJacksonville',
    },
    prepare(selection) {
      const { title, subtitle, description } = selection;
      return {
        title: title,
        subtitle: subtitle,
        description: `Area: ${description}`,
      };
    },
  },
  orderings: [
    {
      title: 'Submitted Date (Newest First)',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});
