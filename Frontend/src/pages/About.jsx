import React from "react";
import { motion } from "motion/react";

function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 py-20">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Building the Future of Website Creation with AI
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          SiteGenie.ai is an AI-powered website builder that transforms your ideas
          into modern, responsive and production-ready websites within seconds.
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <p className="text-zinc-400 leading-relaxed">
            Our mission is to simplify website development using artificial intelligence.
            We aim to make powerful website creation accessible to students,
            freelancers, and startups without requiring complex coding knowledge.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Why SiteGenie.ai?</h2>
          <ul className="space-y-4 text-zinc-400">
            <li>• Instant AI website generation</li>
            <li>• Clean, responsive HTML output</li>
            <li>• Student-friendly pricing</li>
            <li>• Fast & scalable performance</li>
          </ul>
        </div>
      </div>

      {/* Founder Section */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <h2 className="text-2xl font-semibold mb-6">Founder</h2>
        <p className="text-zinc-400 leading-relaxed">
          SiteGenie.ai was built by a passionate developer focused on combining
          AI with modern web technologies to empower creators worldwide.
          The vision is simple — make website building smarter, faster, and more accessible.
        </p>
      </div>

      {/* Future Vision */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Our Vision</h2>
        <p className="text-zinc-400 leading-relaxed">
          We are continuously improving our AI engine to deliver smarter layouts,
          better UI generation, and global-scale deployment capabilities.
          The future of web creation is AI-driven — and we are building it.
        </p>
      </div>

    </div>
  );
}

export default About;