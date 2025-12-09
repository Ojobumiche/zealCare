"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [isMobileProgramOpen, setIsMobileProgramOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur border-b border-black/[.06] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 min-w-0">
          <div className="relative h-10 w-[160px] shrink-0">
            <Image
              src="/logo.png"
              fill
              alt="Zeal Care logo"
              priority
              className="object-contain"
              sizes="160px"
            />
          </div>
          <span className="font-bold text-lg sm:text-xl text-orange-600">ZealCare</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center bg-yellow-400 px-4 py-2 rounded-md">
          <Link href="/" className="hover:text-blue-600">Home</Link>

          {/* About Us Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              aria-expanded={isAboutOpen}
              className="flex items-center gap-1 hover:text-blue-600"
              onClick={() => setIsAboutOpen((s) => !s)}
            >
              About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isAboutOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 p-2 z-50">
                <Link href="/about#about" className="block px-3 py-2 hover:bg-zinc-50">About</Link>
                <Link href="/about#vision" className="block px-3 py-2 hover:bg-zinc-50">Vision</Link>
                <Link href="/about#mission" className="block px-3 py-2 hover:bg-zinc-50">Mission</Link>
                <Link href="/about#core-values" className="block px-3 py-2 hover:bg-zinc-50">Core Value</Link>
              </div>
            )}
          </div>

          {/* Programs Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsProgramOpen(true)}
            onMouseLeave={() => setIsProgramOpen(false)}
          >
            <button
              aria-expanded={isProgramOpen}
              className="flex items-center gap-1 hover:text-blue-600"
              onClick={() => setIsProgramOpen((s) => !s)}
            >
              Programs
              <svg className="w-4 h-4" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isProgramOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-60 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl ring-1 ring-black/5 p-2 z-50"
                >
                  <button
                    onClick={() => {
                      setSelectedProgram("educational-sponsorship");
                      setIsProgramOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-orange-100 transition font-medium"
                  >
                    Educational Sponsorship
                  </button>

                  {[
                    ["Leadership", "/programs#where-we-operate"],
                    ["Entrepreneurship", "/programs#our-program"],
                    ["Career Path in STEM", "/programs#your-questions"],
                    ["Digital Transformation", "/programs#what-sets-us-apart"],
                    ["Our Impact", "/programs#our-impact"],
                  ].map(([title, link]) => (
                    <Link
                      key={title}
                      href={link}
                      className="block px-4 py-2.5 rounded-xl hover:bg-zinc-100 transition"
                    >
                      {title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/impact" className="hover:text-blue-600">Who we are</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>

          <Link
            href="/donate"
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          >
            Donate
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-zinc-100"
        >
          <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-6 pt-2 space-y-4 text-gray-800 shadow-lg rounded-b-lg max-h-[70vh] overflow-y-auto">
          <Link href="/" onClick={() => setIsOpen(false)} className="block">Home</Link>

          {/* About Mobile */}
          <div>
            <button
              onClick={() => setIsMobileAboutOpen((s) => !s)}
              className="w-full flex justify-between px-3 py-3 rounded-md hover:bg-zinc-50"
            >
              <span>About Us</span>
              <svg className={`w-5 h-5 ${isMobileAboutOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMobileAboutOpen && (
              <div className="mt-2 pl-4 space-y-2">
                <Link href="/about#about" onClick={() => setIsOpen(false)} className="block">About</Link>
                <Link href="/about#vision" onClick={() => setIsOpen(false)} className="block">Vision</Link>
                <Link href="/about#mission" onClick={() => setIsOpen(false)} className="block">Mission</Link>
                <Link href="/about#core-values" onClick={() => setIsOpen(false)} className="block">Core Value</Link>
              </div>
            )}
          </div>

          {/* Programs Mobile */}
          <div>
            <button
              onClick={() => setIsMobileProgramOpen((s) => !s)}
              className="w-full flex justify-between px-3 py-3 rounded-md hover:bg-zinc-50"
            >
              <span>Programs</span>
              <svg className={`w-5 h-5 ${isMobileProgramOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMobileProgramOpen && (
              <div className="mt-2 pl-4 space-y-2">
                <Link href="/programs#how-we-operate" onClick={() => setIsOpen(false)} className="block">How We Operate</Link>
                <Link href="/programs#where-we-operate" onClick={() => setIsOpen(false)} className="block">Where We Operate</Link>
                <Link href="/programs#our-program" onClick={() => setIsOpen(false)} className="block">Our Program</Link>
                <Link href="/programs#your-questions" onClick={() => setIsOpen(false)} className="block">Your Questions</Link>
                <Link href="/programs#what-sets-us-apart" onClick={() => setIsOpen(false)} className="block">What Sets Us Apart</Link>
                <Link href="/programs#our-impact" onClick={() => setIsOpen(false)} className="block">Our Impact</Link>
              </div>
            )}
          </div>

          <Link href="/impact" onClick={() => setIsOpen(false)} className="block">Impact</Link>
          <Link href="/volunteer" onClick={() => setIsOpen(false)} className="block">Volunteer</Link>

          <Link href="#contact" scroll={true} onClick={() => setIsOpen(false)} className="block">
            Contact
          </Link>

          <Link
            href="/donate"
            onClick={() => setIsOpen(false)}
            className="block bg-blue-600 text-white text-center py-3 rounded-md"
          >
            Donate
          </Link>
        </div>
      )}

      {/* EDUCATIONAL SPONSORSHIP SECTION (Inline Display) */}
      <AnimatePresence>
        {selectedProgram === "educational-sponsorship" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-h-[80vh] overflow-y-auto">
                {/* Image Section */}
                <div className="relative w-full h-auto min-h-[300px] md:min-h-[400px]">
                  <div className="relative aspect-[4/3] w-full max-w4xl max-auto">
                  <Image
                    src="/supportive.jpg"  // Use your image path
                    alt="Educational Sponsorship"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:768px) 100vw, 1200px"
                    priority
                  />
                </div>

    {/* Content Section */}
    <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-b-2xl">
      <div className="mb-6">
        <h1 className="inline-block text-2xl md:text-3xl font-bold">
          <span className="bg-yellow-400 text-blue-600 px-4 py-2 rounded-lg shadow-lg">
            SUPPORTING
          </span>
        </h1>
      </div>
      
      <div className="space-y-4">
        <p className="leading-relaxed text-blue-50">
          Our Educational Sponsorship Program supports underprivileged children 
          by providing tuition assistance, school materials, mentorship, and 
          long-term academic and emotional guidance.
        </p>
        
        <div className="mt-8 pt-6 border-t border-blue-400/30">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-300">
            Underprivileged children in Liberia
          </h2>
          
          <p className="leading-relaxed text-blue-50">
            ZealCare is a registered non-profit organization that supports underprivileged 
            children age 4 to 17 years from low-income families. We help them succeed 
            academically and develop essential life skills through comprehensive 
            educational support programs.
          </p>
          
          {/* Optional: Add more content here */}
          <ul className="mt-4 space-y-2 text-blue-100">
            <li className="flex items-start">
              <span className="text-yellow-300 mr-2">•</span>
              <span>Full tuition coverage for selected students</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-2">•</span>
              <span>School supplies and learning materials</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-2">•</span>
              <span>Mentorship and career guidance</span>
            </li>
          </ul>
        
       {/* Close Button */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setSelectedProgram(null)}
                      className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}