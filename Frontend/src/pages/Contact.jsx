import React from "react";
import { Github, Instagram, Mail } from "lucide-react";
import { motion } from "motion/react";

function Contact() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white px-6 py-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Let’s Connect 🚀
        </motion.h1>

        <p className="text-zinc-400 text-lg mb-16">
          Have an idea, collaboration, or just want to say hello?  
          I’m always open to building something amazing.
        </p>

        {/* Glass Card Container */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 grid md:grid-cols-3 gap-8 shadow-2xl">

          {/* GitHub */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://github.com/titoo9201"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 group transition"
          >
            <div className="p-4 rounded-2xl bg-white/10 group-hover:bg-purple-600/20 transition">
              <Github size={36} />
            </div>
            <h2 className="text-lg font-semibold">GitHub</h2>
            <p className="text-sm text-zinc-400 group-hover:text-white transition">
              titoo9201
            </p>
          </motion.a>

          {/* Instagram */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://www.instagram.com/titoo_9201/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 group transition"
          >
            <div className="p-4 rounded-2xl bg-white/10 group-hover:bg-pink-600/20 transition">
              <Instagram size={36} />
            </div>
            <h2 className="text-lg font-semibold">Instagram</h2>
            <p className="text-sm text-zinc-400 group-hover:text-white transition">
              @titoo_9201
            </p>
          </motion.a>

          {/* Gmail */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:titoos675@gmail.com"
            className="flex flex-col items-center gap-4 group transition"
          >
            <div className="p-4 rounded-2xl bg-white/10 group-hover:bg-blue-600/20 transition">
              <Mail size={36} />
            </div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-sm text-zinc-400 group-hover:text-white transition">
              titoos675@gmail.com
            </p>
          </motion.a>

        </div>

        {/* Bottom Line */}
        <p className="mt-16 text-sm text-zinc-500">
          Built with ❤️ by Titoo Singh
        </p>

      </div>
    </div>
  );
}

export default Contact;