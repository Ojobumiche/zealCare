/**
 * Media Asset Schema
 * Organized storage for photos, videos, and other media used across the site.
 * Useful for building galleries, reports, and media libraries.
 */

import { defineType, defineField } from "sanity";

export default defineType({
  name: "mediaAsset",
  title: "Media Library",
  type: "document",
  
  fields: [
    // Asset title/label
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Descriptive name for this media item",
      validation: (Rule) => Rule.required(),
    }),

    // Media type
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Video", value: "video" },
          { title: "Document", value: "document" },
        ],
        layout: "radio",
      },
      initialValue: "photo",
      validation: (Rule) => Rule.required(),
    }),

    // The actual file/image
    defineField({
      name: "file",
      title: "File",
      type: "image",
      description: "Upload image or file here",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Accessibility description",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional caption shown below image",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Category/tag
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Group similar media together",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "Programs", value: "programs" },
          { title: "Beneficiaries", value: "beneficiaries" },
          { title: "Team", value: "team" },
          { title: "Facilities", value: "facilities" },
          { title: "General", value: "general" },
        ],
      },
    }),

    // Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Context about where/when/why this was captured",
      rows: 3,
    }),

    // Date taken/created
    defineField({
      name: "dateTaken",
      title: "Date Taken",
      type: "date",
      description: "When was this photo/video captured?",
    }),

    // Location
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Where was this captured? (optional)",
    }),

    // Tags for search
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Keywords to help find this media later",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    // Featured flag
    defineField({
      name: "isFeatured",
      title: "Featured Asset",
      type: "boolean",
      description: "Show this in homepage galleries or highlights",
      initialValue: false,
    }),

    // Copyright/credit
    defineField({
      name: "credit",
      title: "Photo Credit",
      type: "string",
      description: "Photographer or source attribution",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "file",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle || "Uncategorized",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Date Taken, Newest",
      name: "dateTakenDesc",
      by: [{ field: "dateTaken", direction: "desc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
