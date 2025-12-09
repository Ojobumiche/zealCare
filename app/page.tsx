import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans pt-20">
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* HERO + ABOUT SECTION */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
              ZealCare — Empowering Children, Transforming Futures
            </h1>

            <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
              ZealCare is a Morovia-based non-profit dedicated to uplifting <br />
              underprivileged children through education, mentorship, and practical<br />
              skills training. We work within under-served communities to provide <br />
              the support every child deserves—creating pathways to hope, opportunity,
              and long-term growth.
            </p>

            <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              <strong>Join us in giving every child a fair chance.</strong>
            </h2>

            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              Your support can spark a lifetime of possibilities.
            </p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Mission</h2>
              <ul className="list-disc pl-5 mt-3 text-zinc-700 dark:text-zinc-300 space-y-2">
                <li>ZealCare has fully sponsored many disadvantaged children on their educational journeys.</li>
                <li>Provide emotional support and guidance to children facing challenges.</li>
                <li>Empower female children with mentorship and targeted programs.</li>
                <li>Deliver vocational training to build sustainable livelihoods.</li>
                <li>Help build confidence and life skills for personal growth and social interaction.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/donate" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700">
                Donate Now
              </Link>
              <Link href="/volunteer" className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 dark:hover:bg-white/5">
                Get Involved
              </Link>
              <Link href="/about" className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 dark:hover:bg-white/5">
                Learn More
              </Link>
            </div>
          </div>

{/* IMAGE WITH QUOTE - CORRECTED */}
<aside className="relative rounded-lg overflow-hidden bg-white/80 dark:bg-white/5 shadow h-[400px] md:h-[500px] flex flex-col">
  
  {/* Image Container - Takes up most of the space */}
  <div className="relative flex-1">
    <Image
      src="/donateImage.jpg"
      alt="School children learning together"
      fill
      className="object-cover"
      priority
      sizes="(max-width: 768px) 100vw, 50vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
  </div>
  
  {/* Quote Footer - Positioned at the base */}
  <div className="p-6 md:p-8 bg-blue-600 text-white">
    <blockquote className="mb-4">
      <p className="text-2xl md:text-3xl font-bold leading-tight">
        Millions of students are waiting to write their next chapter. You can help.
      </p>
    </blockquote>

    <Link 
      href="/donate" 
      className="inline-block bg-white hover:bg-yellow-100 text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      Donate Now
    </Link>
  </div>
  
</aside>
</section>
      </main>
    </div>
  );
}