import { NextResponse } from "next/server";
import { Resend } from "resend";
import connectDB from "@/lib/db";
import Submission from "@/models/Submission";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();
    const { firstName, lastName, email, feedbackType, message } = data;

    // 1️⃣ Save submission
   
    await Submission.create({
      name: `${firstName} ${lastName}`,
      email,
      message,
      formType: "contact",
      feedbackType,
      });

    
    // 2️⃣ Notify Admin
    await resend.emails.send({
      from: "ZealCare <onboarding@resend.dev>",
      to: [process.env.ZEALCARE_RECEIVER],
      subject: `New Feedback: ${feedbackType}`,
      html: `
        <h2>New ZealCare Feedback</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${feedbackType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 3️⃣ Confirmation Email to User
    await resend.emails.send({
      from: "ZealCare <support@zealcare.org>",
      to: [email],
      subject: "We received your message – ZealCare",
      html: `
        <p>Dear ${firstName},</p>

        <p>Thank you for reaching out to <strong>ZealCare</strong>.</p>

        <p>We have successfully received your message and our team will review it shortly.</p>

        <p><strong>Your message summary:</strong></p>
        <blockquote style="border-left:4px solid #2563eb;padding-left:12px;">
          ${message}
        </blockquote>

        <p>If your inquiry is urgent, we will contact you as soon as possible.</p>

        <p>Warm regards,<br/>
        <strong>ZealCare Team</strong></p>

        <hr/>
        <small>This is an automated confirmation email. Please do not reply.</small>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
