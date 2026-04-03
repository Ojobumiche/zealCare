/**
 * Post Schema
 * Defines blog posts, news articles, and general content pieces.
 * Used for managing organizational updates, news, and blog content.
 */

import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Blog & News Posts",
  type: "document",
  
  fields: [
    // Post title - required field
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main headline for this post",
      validation: (Rule) => Rule.required().max(100),
    }),

    // URL-friendly identifier for the post
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL path (click Generate)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Post category/type
    defineField({
      name: "type",
      title: "Content Type",
      type: "string",
      description: "Category of this content piece",
      options: {
        list: [
          { title: "Blog Post", value: "Blog" },
          { title: "News Article", value: "News" },
          { title: "Impact Story", value: "Impact Story" },
          { title: "Update", value: "Update" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    // Publishing status
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description: "Publication status",
      options: {
        list: [
          { title: "Draft", value: "Draft" },
          { title: "Published", value: "Published" },
          { title: "Archived", value: "Archived" },
        ],
        layout: "radio",
      },
      initialValue: "Draft",
      validation: (Rule) => Rule.required(),
    }),

    // Featured image
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main image displayed with this post",
      options: {
        hotspot: true, // Enables image cropping
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility",
        },
      ],
    }),

    // Short summary/excerpt
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      description: "Brief intro shown on cards and previews (150-200 chars)",
      rows: 3,
      validation: (Rule) => Rule.required().max(250),
    }),

    // Full post content
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      description: "Full article body with rich text formatting",
      of: [
        {
          type: "block",
          // Formatting options available in the editor
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
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    // Author name
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of the post author",
      initialValue: "ZealCare Team",
    }),

    // Publication date
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When this post was/will be published",
      initialValue: () => new Date().toISOString(),
    }),

    // SEO keywords
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Keywords for search and categorization",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],

  // Preview configuration in Studio lists
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "coverImage",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection;
      return {
        title,
        subtitle: `${subtitle} • ${status}`,
        media,
      };
    },
  },

  // Default ordering: newest first
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
