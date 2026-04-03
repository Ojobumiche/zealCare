/**
 * Schema Type Definitions
 * Export all Sanity schema types here to be used in sanity.config.ts
 */

import post from "./post";
import impactStory from "./impactStory";
import mediaAsset from "./mediaAsset";
import formSubmission from "./formSubmission";

// Array of all schema types used in the CMS
export const schemaTypes = [
  post,
  impactStory,
  mediaAsset,
  formSubmission,
];
