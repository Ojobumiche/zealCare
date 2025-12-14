"use client";

export const dynamic = "force-dynamic"; // This is to tell Next.js NOT to statically prerender this page.

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProgramsPage() {
  const educationalRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === "#educational-sponsorship") {
      setTimeout(() => {
        educationalRef.current?.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }, 500);
    }
  }, []);

  const programs = [
    {
      id: "educational-sponsorship",
      title: "Educational Sponsorship",
      description: "Supporting underprivileged children by providing tuition assistance, school materials, mentorship, and long-term academic and emotional guidance.",
      href: "#educational-sponsorship",
      icon: "🎓"
    },
    {
      id: "leadership",
      title: "Leadership",
      description: "Developing leadership skills through training, mentorship programs, and practical experience opportunities.",
      href: "/programs/leadership",
      icon: "👥"
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship",
      description: "Fostering entrepreneurial mindset with business training, startup resources, and mentorship for aspiring entrepreneurs.",
      href: "/programs/entrepreneurship",
      icon: "💼"
    },
    {
      id: "career-stem",
      title: "Career Path in STEM",
      description: "Guiding students toward careers in Science, Technology, Engineering, and Mathematics through workshops and internships.",
      href: "/programs/career-stem",
      icon: "🔬"
    },
    {
      id: "digital-transformation",
      title: "Digital Transformation",
      description: "Empowering individuals and organizations with digital skills and technology adoption strategies.",
      href: "/programs/digital-transformation",
      icon: "💻"
    }
  ];

  const handleHashClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState({}, '', `/programs${href}`);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive initiatives designed to empower individuals and transform communities.
        </p>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {programs.map((program) => (
          program.href.startsWith('#') ? (
            <button
              key={program.id}
              onClick={(e) => handleHashClick(e, program.href)}
              className="group text-left bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">{program.icon}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                {program.title}
              </h3>
              <p className="text-gray-600">{program.description}</p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ) : (
            <Link
              key={program.id}
              href={program.href}
              className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">{program.icon}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                {program.title}
              </h3>
              <p className="text-gray-600">{program.description}</p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )
        ))}
      </div>

      {/* Educational Sponsorship Detailed Section */}
      <div 
        ref={educationalRef} 
        id="educational-sponsorship"
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-16 scroll-mt-24"
      >
        {/* Image Section */}
        <div className="relative w-full h-auto">
          <div className="relative h-[250px] md:h-[350px] lg:h-[400px]">
            <Image
              src="/supportive.jpg"
              alt="Educational Sponsorship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="mb-6">
            <h1 className="inline-block text-2xl md:text-3xl font-bold">
              <span className="bg-yellow-400 text-blue-600 px-4 py-2 rounded-lg shadow-lg">
                SUPPORTING
              </span>
            </h1>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-blue-50">
              Our Educational Sponsorship Program supports underprivileged children 
              by providing tuition assistance, school materials, mentorship, and 
              long-term academic and emotional guidance.
            </p>
            
            <div className="mt-8 pt-6 border-t border-blue-400/30">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-300">
                Underprivileged children in Liberia
              </h2>
              
              <p className="leading-relaxed text-blue-50 mb-6">
                ZealCare is a registered non-profit organization that supports underprivileged 
                children age 4 to 17 years from low-income families. We help them succeed 
                academically and develop essential life skills through comprehensive 
                educational support programs.
              </p>
              
              <ul className="space-y-3 text-blue-100 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3">•</span>
                  <span>Full tuition coverage for selected students</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3">•</span>
                  <span>School supplies and learning materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3">•</span>
                  <span>Mentorship and career guidance programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3">•</span>
                  <span>After-school tutoring and academic support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3">•</span>
                  <span>Nutrition and healthcare support</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/donate"
              className="px-6 py-3 bg-yellow-400 text-blue-600 font-semibold rounded-lg hover:bg-yellow-300 transition-colors text-center shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}