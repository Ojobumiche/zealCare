/**
 * Sanity Client Configuration
 * This creates a configured Sanity client for fetching and writing data.
 * 
 * Two clients are exported:
 * - sanityClient: Read-only client for public data (uses CDN for speed)
 * - sanityWriteClient: Write-enabled client for admin operations (requires auth token)
 */

import { createClient } from "@sanity/client";

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables");
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET in environment variables");
}

/**
 * Public read-only client
 * Uses CDN for faster reads. Perfect for fetching published content on the frontend.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-04", // Use today's date or latest API version
  useCdn: true, // Enable CDN for faster cached responses
  perspective: "published", // Only fetch published documents
});

/**
 * Admin write client
 * Includes authentication token for creating/updating content.
 * Only use this on the server-side (API routes, server components).
 */
export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-04",
  useCdn: false, // Don't use CDN for write operations (need fresh data)
  token: process.env.SANITY_API_TOKEN, // Required for mutations
  perspective: "raw", // Access drafts and published content
});

/**
 * Helper function to get image URL from Sanity image reference
 * @param source - Sanity image object
 * @returns URL string for the image
 */
export function urlForImage(source: any) {
  if (!source?.asset?._ref) return "";
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  // Parse the image reference to build the URL
  const [, id, dimensions, format] = source.asset._ref.split("-");
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}
