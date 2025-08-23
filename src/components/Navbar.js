"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-50">
      {/* Logo + Motto (Top-left) */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-md"
          style={{ boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}
        />
        <p className="text-white italic text-center text-sm">
          United by sound, lifted by rhythm
        </p>
      </div>

      {/* Hamburger Menu (Top-right) */}
      <motion.button
        className="text-white"
        onClick={() => setMenuOpen(true)}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={32} />
      </motion.button>

      {/* Hamburger Menu Content */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 right-0 w-72 h-full bg-black/95 text-white flex flex-col p-6 z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end mb-4 text-white"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-6 mt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
