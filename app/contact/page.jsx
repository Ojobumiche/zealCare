"use client";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

     const formData = {
      firstName: e.target["first-name"].value,
      lastName: e.target["last-name"].value,
      email: e.target.email.value,
      feedbackType: e.target["feedback-type"].value,
      message: e.target.message.value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

     if (res.ok) {
      setStatus("Message sent successfully!");
      e.target.reset();
    } else {
      setStatus("Failed to send message.");
    }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-yellow-400 sm:text-5xl">
          ZealCare MVP Feedback
        </h2>
        <p className="mt-2 text-lg text-blue-900">
          Help us improve ZealCare. Share your experience, report issues, or suggest new features.
        </p>
      </div>

      <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-900">First name</label>
            <input
              type="text"
              name="first-name"
              className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900">Last name</label>
            <input
              type="text"
              name="last-name"
              className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-900">Feedback Type</label>
            <select
              name="feedback-type"
              className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            >
              <option>General Feedback</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Performance Issue</option>
              <option>UI/UX Suggestion</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-900">Your Feedback</label>
            <textarea
              rows="5"
              name="message"
              placeholder="Tell us what worked well, what went wrong, or what you would like to see added..."
              className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
            ></textarea>
          </div>

          <div className="flex gap-x-4 sm:col-span-2">
            <input type="checkbox" id="agree" className="h-5 w-5 rounded" />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I agree that my feedback may be used to improve the ZealCare MVP experience.
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow hover:bg-indigo-500"
        >
          Submit Feedback
        </button>
        {loading && (<p className="mt-4 text-center text-sm text-gray-700">Sending...</p>
        )}
        {status && (<p className="mt-4 text-center text-sm text-gray-700">{status}</p>
        )}

      </form>
    </div>
  );
}
