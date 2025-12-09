import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-400 text-zinc-200 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Column 1: Logo / Tagline */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">ZealCare</h1>
          <p className="text-white">
            Empowering children, transforming futures. Providing education, mentorship, and vocational training for underprivileged youths.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500">About</Link>
            </li>
            <li>
              <Link href="/donate" className="hover:text-blue-500">Donate</Link>
            </li>
            <li>
              <Link href="/volunteer" className="hover:text-blue-500">Volunteer</Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-blue-600">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info / Social */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Contact Us</h2>
          <p>
            💬 <a href="https://wa.me/2348012345678" target="_blank" className="hover:text-green-400">WhatsApp</a>
          </p>
          <p>
            📧 <a href="mailto:yourngoemail@gmail.com" className="hover:text-blue-400">Email</a>
          </p>
          <p>📞 +231 8867277619</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-500">Facebook</a>
            <a href="#" className="hover:text-blue-600">Twitter</a>
            <a href="#" className="hover:text-pink-500 text-blue-600">Instagram</a>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t border-zinc-700 pt-6 text-center text-white/50 bg-blue-600">
        &copy; {new Date().getFullYear()} ZealCare. All rights reserved.
      </div>
    </footer>
  );
}
