"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [isMobileProgramOpen, setIsMobileProgramOpen] = useState(false);

  // Program menu items
  const programLinks = [
    { title: "Educational Sponsorship", href: "/programs#educational-sponsorship" },
    { title: "Leadership", href: "/programs/leadership" },
    { title: "Entrepreneurship", href: "/programs/entrepreneurship" },
    { title: "Career Path in STEM", href: "/programs/career-stem" },
    { title: "Digital Transformation", href: "/programs/digital-transformation" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur border-b border-black/6 shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 min-w-0">
          <div className="relative h-10 w-40 shrink-0">
            <Image
              src="/logo.png"
              fill
              alt="Zeal Care logo"
              priority
              className="object-contain"
              sizes="160px"
            />
          </div>
          <span className="font-bold text-lg sm:text-xl text-yellow-400">ZealCare</span>
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
                  {programLinks.map((program) => (
                    <Link
                      key={program.title}
                      href={program.href}
                      className="block px-4 py-2.5 rounded-xl hover:bg-zinc-100 transition"
                      onClick={() => setIsProgramOpen(false)}
                    >
                      {program.title}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white px-4 pb-6 pt-2 space-y-2 text-gray-800 shadow-lg rounded-b-lg overflow-hidden"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md hover:bg-zinc-50">Home</Link>

            {/* About Mobile */}
            <div>
              <button
                onClick={() => setIsMobileAboutOpen((s) => !s)}
                className="w-full flex justify-between px-3 py-3 rounded-md hover:bg-zinc-50"
              >
                <span>About Us</span>
                <svg className={`w-5 h-5 transition-transform ${isMobileAboutOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileAboutOpen && (
                <div className="mt-1 ml-4 space-y-1">
                  <Link href="/about#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-zinc-50">About</Link>
                  <Link href="/about#vision" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-zinc-50">Vision</Link>
                  <Link href="/about#mission" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-zinc-50">Mission</Link>
                  <Link href="/about#core-values" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-zinc-50">Core Value</Link>
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
                <svg className={`w-5 h-5 transition-transform ${isMobileProgramOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileProgramOpen && (
                <div className="mt-1 ml-4 space-y-1">
                  {programLinks.map((program) => (
                    <Link
                      key={program.title}
                      href={program.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md hover:bg-zinc-50"
                    >
                      {program.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/impact" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md hover:bg-zinc-50">Who we are</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md hover:bg-zinc-50">Contact</Link>

            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="block bg-blue-600 text-white text-center py-3 rounded-md mt-2"
            >
              Donate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}