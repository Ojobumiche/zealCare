"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-center px-6 pt-20 relative overflow-hidden"
    >
      {/* Animated Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: "url('/children1.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          borderImageWidth:"(max-width:768px) 100vw, 1200px"
        }}
      />
      

      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40 -z-10" /> */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 4 }}
        className="max-w-3xl text-white relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Empowering Children Through Education & Support
        </h1>

        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
          A future where every child has equal access to learning, mentorship, and hope.
        </p>

        <button className="mt-6 px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700">
          Join Our Mission
        </button>
      </motion.div>
    </section>
    
  );
}
