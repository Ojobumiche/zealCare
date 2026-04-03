/**
 * Impact Story Schema
 * Dedicated schema for beneficiary success stories and program impact narratives.
 * These are featured stories showing the real-world impact of the NGO's work.
 */

import { defineType, defineField } from "sanity";

export default defineType({
  name: "impactStory",
  title: "Impact Stories",
  type: "document",
  
  fields: [
    // Story title
    defineField({
      name: "title",
      title: "Story Title",
      type: "string",
      description: "Compelling headline for the impact story",
      validation: (Rule) => Rule.required().max(100),
    }),

    // URL slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Beneficiary or subject name
    defineField({
      name: "subjectName",
      title: "Subject Name",
      type: "string",
      description: "Name of the person or community featured (use first name only if privacy needed)",
    }),

    // Related program
    defineField({
      name: "program",
      title: "Related Program",
      type: "string",
      description: "Which program does this story highlight?",
      options: {
        list: [
          { title: "Educational Sponsorship", value: "Educational Sponsorship" },
          { title: "Leadership", value: "Leadership" },
          { title: "Entrepreneurship", value: "Entrepreneurship" },
          { title: "Career Path in STEM", value: "Career Path in STEM" },
          { title: "Digital Transformation", value: "Digital Transformation" },
          { title: "General", value: "General" },
        ],
      },
    }),

    // Publishing status
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "Draft" },
          { title: "Published", value: "Published" },
        ],
        layout: "radio",
      },
      initialValue: "Draft",
      validation: (Rule) => Rule.required(),
    }),

    // Featured photo
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      description: "Primary photo for this story (faces or activities work best)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional photo caption",
        },
      ],
    }),

    // Short teaser
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Brief hook shown on cards (100-150 chars)",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),

    // Full story content
    defineField({
      name: "story",
      title: "Full Story",
      type: "array",
      description: "The complete impact narrative",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    // Key metrics or outcomes
    defineField({
      name: "outcomes",
      title: "Key Outcomes",
      type: "array",
      description: "Measurable achievements (e.g., 'Graduated top of class', 'Started own business')",
      of: [{ type: "string" }],
    }),

    // Publication date
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    // Location
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City or region (optional)",
    }),

    // Additional gallery
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      description: "Additional images for this story",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "program",
      media: "featuredImage",
    },
  },

  orderings: [
    {
      title: "Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
