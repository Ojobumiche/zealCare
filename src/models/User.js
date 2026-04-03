import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    formType: { type: String, required: true }, // contact, volunteer, donate
    feedbackType: { type: String },
    reviewed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
