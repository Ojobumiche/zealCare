import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-yellow-400 text-zinc-200 py-12">
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
            <li><Link href="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-500">About</Link></li>
            <li><Link href="/donate" className="hover:text-blue-500">Donate</Link></li>
            <li><Link href="/volunteer" className="hover:text-blue-500">Volunteer</Link></li>
            <li><Link href="#contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info / Social */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Contact Us</h2>

          <p className="flex items-center gap-2">
            <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} />
            <a href="https://wa.me/231886727619" target="_blank" className="hover:text-green-300">
              WhatsApp Chat
            </a>
          </p>

          <p className="flex items-center gap-2 mt-2">
            <Image src="/email.png" alt="Email" width={28} height={28} />
            <a href="mailto:josoftcreative@gmail.com" className="hover:text-blue-300">
              josoftcreative@gmail.com
            </a>
          </p>

          <p className="mt-2">📞 +231 8867277619</p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-5 items-center">
            <a href="https://facebook.com" target="_blank">
              <Image src="/facebook.png" alt="Facebook" width={40} height={40} className="hover:opacity-80 transition" />
            </a>
            <a href="https://twitter.com" target="_blank">
              <Image src="/twitter.png" alt="Twitter" width={40} height={40} className="hover:opacity-80 transition" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <Image src="/instagram.png" alt="Instagram" width={40} height={40} className="hover:opacity-80 transition" />
            </a>
            <a href="https://youtube.com" target="_blank">
              <Image src="/youtube.png" alt="YouTube" width={40} height={40} className="hover:opacity-80 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank">
              <Image src="/lindin.png" alt="LinkedIn" width={40} height={40} className="hover:opacity-80 transition" />
            </a>
            <a href="https://tiktok.com" target="_blank">
              <Image src="/tiktok.png" alt="TikTok" width={40} height={40} className="hover:opacity-80 transition" />
            </a>
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
