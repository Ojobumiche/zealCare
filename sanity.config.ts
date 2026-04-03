/**
 * Sanity Studio Configuration
 * This file configures the Sanity Studio interface for content management.
 * The Studio will be accessible at /studio route in your Next.js app.
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

// Get project credentials from environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  // Unique name for this Sanity project
  name: "default",
  
  // Display title in the Studio
  title: "ZealCare NGO CMS",

  // Project ID and dataset from your Sanity project
  projectId,
  dataset,

  // Path where Studio will be mounted in your Next.js app
  basePath: "/studio",

  // Plugins extend Studio functionality
  plugins: [
    structureTool(), // Visual content structure editor
    visionTool(),    // GROQ query testing tool
  ],

  // Schema types define your content models
  schema: {
    types: schemaTypes,
  },
});
