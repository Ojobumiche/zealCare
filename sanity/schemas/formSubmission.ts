/**
 * Form Submission Schema
 * Stores contact form, volunteer applications, and program inquiries.
 * Acts as an inbox for all website form submissions.
 */

import { defineType, defineField } from "sanity";

export default defineType({
  name: "formSubmission",
  title: "Form Submissions",
  type: "document",
  
  fields: [
    // Submission type (contact, volunteer, program, etc.)
    defineField({
      name: "formType",
      title: "Form Type",
      type: "string",
      description: "Which form did this come from?",
      options: {
        list: [
          { title: "Contact Form", value: "contact" },
          { title: "Volunteer Application", value: "volunteer" },
          { title: "Program Registration", value: "program" },
          { title: "Donation Inquiry", value: "donation" },
          { title: "Partnership Request", value: "partnership" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    // Submitter's name
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Full name of the person who submitted",
      validation: (Rule) => Rule.required(),
    }),

    // Email address
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Contact email",
      validation: (Rule) => Rule.required().email(),
    }),

    // Phone number (optional)
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Optional contact phone",
    }),

    // Subject/topic (for contact forms)
    defineField({
      name: "subject",
      title: "Subject / Topic",
      type: "string",
      description: "Main topic or reason for contact",
    }),

    // Interest area (for volunteers)
    defineField({
      name: "interest",
      title: "Interest Area",
      type: "string",
      description: "What the volunteer wants to help with",
    }),

    // Program name (for program registrations)
    defineField({
      name: "program",
      title: "Program",
      type: "string",
      description: "Which program are they interested in?",
    }),

    // Message/details
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      description: "Full message or application details",
      rows: 5,
    }),

    // Submission date/time
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      description: "When this form was submitted",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),

    // Processing status
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description: "Track follow-up progress",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Review", value: "reviewing" },
          { title: "Responded", value: "responded" },
          { title: "Resolved", value: "resolved" },
          { title: "Archived", value: "archived" },
        ],
        layout: "dropdown",
      },
      initialValue: "new",
    }),

    // Internal notes
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Staff notes (not visible to submitter)",
      rows: 3,
    }),

    // Assigned to
    defineField({
      name: "assignedTo",
      title: "Assigned To",
      type: "string",
      description: "Which team member is handling this?",
    }),

    // Priority flag
    defineField({
      name: "priority",
      title: "Priority",
      type: "string",
      options: {
        list: [
          { title: "Low", value: "low" },
          { title: "Normal", value: "normal" },
          { title: "High", value: "high" },
          { title: "Urgent", value: "urgent" },
        ],
        layout: "radio",
      },
      initialValue: "normal",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "formType",
      status: "status",
      date: "submittedAt",
    },
    prepare(selection) {
      const { title, subtitle, status, date } = selection;
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "";
      return {
        title,
        subtitle: `${subtitle} • ${status} • ${formattedDate}`,
      };
    },
  },

  orderings: [
    {
      title: "Submitted Date, Newest",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
