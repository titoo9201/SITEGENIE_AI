import React, { useState } from "react";
import { motion } from "motion/react";
import Login from "../components/Login";

function Home() {
  const highlights = [
    "AI GENERATED CODE",
    "FULLY RESPONSIVE AI",
    "PRODUCTION READY OUTPUT",
  ];
  const [openLogin, setopenLogin] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold tracking-wide">
            SiteGenie.ai
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white transition cursor-pointer">
              Pricing
            </div>

            <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm transition"
            onClick={()=>setopenLogin(true)}
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          Build Stunning Websites <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            with AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
        >
          Describe your idea and let AI generate a modern,
          responsive, production-ready website.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="px-10 mt-12 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
          onClick={()=>setopenLogin(true)}
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-4">
                {h}
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed">
                SiteGenie builds real websites — clean code,
                smooth animations, full responsiveness,
                and scalable structure.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* footer */}
      {/* Footer */}
<footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 py-16">

    {/* Top Footer Grid */}
    <div className="grid md:grid-cols-4 gap-10">

      {/* Brand */}
      <div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          SiteGenie.ai
        </h2>
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
          AI-powered website builder that transforms
          your ideas into modern, responsive and
          production-ready websites.
        </p>
      </div>

      {/* Product */}
      <div>
        <h3 className="text-sm font-semibold mb-4 text-white">
          Product
        </h3>
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="hover:text-white cursor-pointer transition">Features</li>
          <li className="hover:text-white cursor-pointer transition">Pricing</li>
          <li className="hover:text-white cursor-pointer transition">Templates</li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="text-sm font-semibold mb-4 text-white">
          Company
        </h3>
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="hover:text-white cursor-pointer transition">About</li>
          <li className="hover:text-white cursor-pointer transition">Careers</li>
          <li className="hover:text-white cursor-pointer transition">Contact</li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-sm font-semibold mb-4 text-white">
          Stay Updated
        </h3>
        <p className="text-sm text-zinc-400 mb-4">
          Subscribe to get product updates and AI tips.
        </p>

       
      </div>

    </div>

    {/* Bottom Footer */}
    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
      <p>© {new Date().getFullYear()} SiteGenie.ai. All rights reserved.</p>

      <div className="flex gap-6 mt-4 md:mt-0">
        <span className="hover:text-white cursor-pointer transition">Privacy</span>
        <span className="hover:text-white cursor-pointer transition">Terms</span>
        <span className="hover:text-white cursor-pointer transition">Cookies</span>
      </div>
    </div>

  </div>
</footer>
{openLogin&&<Login open={openLogin} onclose={()=>setopenLogin(false)}/>}
    </div>
  );
}

export default Home;