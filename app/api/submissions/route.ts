/**
 * GET /api/submissions - Fetch all form submissions from MongoDB
 * POST /api/submissions - Save a new form submission to MongoDB
 * 
 * Handles contact forms, volunteer applications, program registrations, etc.
 */

import connectDB  from "@/lib/db";
import Submission from "@/models/Submission";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler: Fetch all form submissions from MongoDB
 */
export async function GET(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Query for all submissions, sorted by newest first
    const submissions = await Submission.find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .lean();

    // Transform MongoDB documents for the admin dashboard
    const formattedSubmissions = submissions.map((sub: any) => ({
      id: sub._id.toString(),
      name: sub.name,
      email: sub.email,
      topic: sub.subject || sub.interest || sub.program,
      formType: sub.formType,
      received: sub.submittedAt
        ? new Date(sub.submittedAt).toISOString().slice(0, 10)
        : "N/A",
      status: sub.status,
      message: sub.message,
    }));

    return NextResponse.json(formattedSubmissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions from database" },
      { status: 500 }
    );
  }
}

/**
 * POST handler: Save a new form submission to MongoDB
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { formType, name, email, subject, interest, program, message, phone } = body;

    // Validate required fields
    if (!formType || !name || !email || !message) {
      return NextResponse.json(
        { error: "FormType, name, email, and message are required" },
        { status: 400 }
      );
    }

    // Create new submission document
    const newSubmission = new Submission({
      formType,
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      interest: interest || "",
      program: program || "",
      message,
      submittedAt: new Date(),
      status: "new",
      notes: "",
      assignedTo: "",
      priority: "normal",
    });

    // Save to MongoDB
    const savedSubmission = await newSubmission.save();

    return NextResponse.json({
      id: savedSubmission._id,
      name: savedSubmission.name,
      email: savedSubmission.email,
      message: "Submission received successfully",
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
