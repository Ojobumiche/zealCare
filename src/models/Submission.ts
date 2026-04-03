/**
 * Submission Model
 * Defines the MongoDB schema for form submissions (contact, volunteer, programs, etc.)
 */

import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    // Type of form submitted
    formType: {
      type: String,
      enum: ["contact", "volunteer", "program", "donation", "partnership"],
      required: true,
    },

    // Submitter information
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
    },

    // Form content fields
    subject: {
      type: String, // For contact forms
      default: "",
    },
    interest: {
      type: String, // For volunteer forms
      default: "",
    },
    program: {
      type: String, // For program registration
      default: "",
    },
    message: {
      type: String,
      required: true,
    },

    // Admin tracking
    status: {
      type: String,
      enum: ["new", "reviewing", "responded", "resolved", "archived"],
      default: "new",
    },
    notes: {
      type: String,
      default: "",
    },
    assignedTo: {
      type: String, // Admin name or ID
      default: "",
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal",
    },

    // Timestamps
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Create or retrieve the model
const Submission =
  mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema);

export default Submission;
