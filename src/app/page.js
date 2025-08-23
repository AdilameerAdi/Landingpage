"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoMoved, setLogoMoved] = useState(false);
  const [bgAnimStart, setBgAnimStart] = useState(false);
  const [blurRemoved, setBlurRemoved] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoMoved(true);
      setBlurRemoved(true);
    }, 2000);
    const bgTimer = setTimeout(() => setBgAnimStart(true), 4000);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(bgTimer);
    };
  }, []);

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Artists", href: "/artists" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0")`,
        }}
        initial={{ scale: 1.2, filter: "blur(10px)" }}
        animate={{
          scale: bgAnimStart ? [1, 1.05, 1.1, 1] : 1.2,
          rotate: bgAnimStart ? [0, 1, -1, 0] : 0,
          filter: blurRemoved ? "blur(0px)" : "blur(10px)",
        }}
        transition={{
          scale: bgAnimStart
            ? { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 1] }
            : { duration: 0 },
          filter: { duration: 1 },
        }}
      />

      {/* Logo + Motto */}
      <motion.div
        className="absolute z-30 flex flex-col items-center gap-2"
        initial={{
          opacity: 1,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={
          logoMoved
            ? { top: "1rem", left: "1rem", x: 0, y: 0 }
            : { top: "50%", left: "50%", x: "-50%", y: "-50%" }
        }
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <motion.div
          className="rounded-full bg-white border-2 border-white"
          style={{ boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}
          initial={{ width: 250, height: 250 }}
          animate={{
            width: logoMoved ? 96 : 250,
            height: logoMoved ? 96 : 250,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.p
          className="text-base italic text-white drop-shadow-md text-center"
          initial={{ opacity: 1, y: 0 }}
          animate={
            logoMoved
              ? { opacity: 1, y: 0, alignSelf: "flex-start", paddingLeft: "0.25rem" }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 1 }}
        >
          United by sound, lifted by the rhythm
        </motion.p>
      </motion.div>

      {/* Hamburger Menu */}
      {bgAnimStart && (
        <>
          <motion.button
            className="absolute top-4 right-4 z-30 text-white"
            onClick={() => setMenuOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Menu size={32} />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="absolute top-0 right-0 w-72 h-full bg-black/90 backdrop-blur-sm text-white z-40 flex flex-col p-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
                >
                  <X size={28} />
                </button>
                <div className="flex-1 flex flex-col justify-center items-center gap-6">
                  <nav className="flex flex-col gap-4 text-lg">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={linkVariants}
                      >
                        <Link
                          href={link.href}
                          className="hover:underline"
                          onClick={() => setMenuOpen(false)} // Close menu on click
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
