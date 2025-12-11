export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            We are here to listen and support. Contact us for inquiries, donations, 
            partnerships, or feedback. Your message matters.
          </p>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/2349097228224"
            target="_blank"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl mb-4 w-max"
          >
            <span className="text-xl">💬</span>
            <span>Chat on WhatsApp</span>
          </a>

          {/* Email Button */}
          <a
            href="mailto:josoftcreative@gmail.com?subject=Website%20Contact&body=Hello,%20I%20would%20like%20to%20make%20an%20inquiry..."
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl w-max"
          >
            <span className="text-xl">📧</span>
            <span>Send an Email</span>
          </a>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h3>

          <form
            action="https://formsubmit.co/josoftcreative@gmail.com"
            method="POST"
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
