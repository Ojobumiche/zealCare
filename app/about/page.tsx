export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans pt-28">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">About Us</h1>

        <section id="about" className="mt-6 text-zinc-700 dark:text-zinc-300 space-y-4">
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p>
            ZealCare is a Morovia-based non-profit organization founded in 2024 with a mission to uplift underprivileged children from low-income and no-income families.<br/>
             We believe every child deserves access to quality education, supportive mentorship, and opportunities that empower them to reach their full potential.
              Our work is rooted in the heart of the community. We partner with families, schools, and local leaders to provide children with the resources they need to succeed.<br/>
               Through our programs—ranging from school support and learning materials to vocational skills training and leadership development — <br/>
               we aim to break long-standing barriers and open doors to brighter futures.<br/>
              At ZealCare, we focus on long-term impact. We help children build confidence, acquire practical skills, and develop a strong foundation <br/>
              for personal and academic growth. Our approach ensures that empowerment is not temporary, but lasting.
              Together with our supporters and partners, we are shaping a future where every child has the chance to learn,<br/>
               thrive, and contribute meaningfully to their community.<br/>
                Join us in making a difference—one child at a time.<br/>
                <strong>ZealCare — Empowering children. Transforming futures.</strong>
          </p>
        </section>

        <section id="vision" className="mt-8 text-zinc-700 dark:text-zinc-300">
          <h2 className="text-xl font-semibold">Our Vision</h2>
          <p className="mt-2">
            We envision a future where every child has equal access to learning and lifelong opportunity.<br/>
             A future where no child is held back by poverty, and where communities are strengthened through education, 
             empowerment, and compassion.
              Our long-term goal is to build sustainable pathways that uplift children and help them become confident, 
              capable, and self-reliant members of society.
          </p>
        </section>

        <section id="mission" className="mt-8 text-zinc-700 dark:text-zinc-300">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="list-disc pl-5 mt-2 space-y-2"/>
            <p>At ZealCare, our mission is to empower underprivileged children through education, mentorship, and skills development.<br/>
             We are committed to providing the tools, guidance, and opportunities needed to help every child grow academically, emotionally, 
             and socially—regardless of their background or financial situation.
             </p>
            
        </section>

        <section id="core-values" className="mt-8 text-zinc-700 dark:text-zinc-300">
          <h2 className="text-xl font-semibold">Core Value</h2>
          <p className="mt-2">
            We operate with compassion, integrity, and a commitment to
            measurable impact. Collaboration with local communities guides how
            we design and deliver programs.
          </p>
        </section>

        <section id="core-values" className="mt-8 text-zinc-700 dark:text-zinc-300">
          <h2 className="text-xl font-semibold">Our Believe</h2>
          <p className="mt-2">
            We believe that every child has the right to a quality education and the opportunity to reach their full potential.<br/>
           We believe that with the right support, guidance, and resources, children from underprivileged backgrounds can overcome challenges and thrive.<br/>
            We believe in the power of community and collaboration to create lasting change.<br/>
             We believe that investing in children is investing in the future of society as a whole.
            
          </p> 
        </section>

        <section id="core-values" className="mt-8 text-zinc-700 dark:text-zinc-300">
          <h2 className="text-xl font-semibold">Our Impact</h2>
          <p className="mt-2">
            Since our founding in 2024, ZealCare has positively impacted the lives of over 500 underprivileged children in Morovia.<br/>
             Through our educational sponsorships, mentorship programs, and skills training initiatives, we have helped children improve their academic performance, build confidence, and develop practical skills for the future.<br/>
              Our community outreach efforts have also raised awareness about the challenges faced by underprivileged children and mobilized support from local stakeholders.<br/>
               We are proud of the progress we have made so far, but we know there is still much work to be done. With continued support, we aim to expand our reach and deepen our impact in the years to come.
          </p> 
        </section>


        <div className="mt-10 flex gap-3">
          <a href="/donate" className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700">Donate</a>
          <a href="/volunteer" className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-50">Get Involved</a>
        </div>
      </main>
    </div>
  );
}
