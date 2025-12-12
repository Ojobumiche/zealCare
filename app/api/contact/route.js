import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, feedbackType, message } = data;

    // Configure email transporter (replace with Zealcare email SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g. "smtp.gmail.com"
      port: Number(process.env.EMAIL_PORT), //  587
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // Your Zealcare email address
        pass: process.env.EMAIL_PASS, // App password or SMTP password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Zealcare Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.ZEALCARE_RECEIVER, // Where you want to receive messages
      subject: `New Feedback: ${feedbackType}`,
      text: `
You received new feedback from the Zealcare MVP contact form.

Name: ${firstName} ${lastName}
Email: ${email}
Type: ${feedbackType}

Message:
${message}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
