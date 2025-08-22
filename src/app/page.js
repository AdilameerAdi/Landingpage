"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 5000);
    const skipIntro = () => setIntroDone(true);

    window.addEventListener("scroll", skipIntro);
    window.addEventListener("click", skipIntro);
    window.addEventListener("keydown", skipIntro);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", skipIntro);
      window.removeEventListener("click", skipIntro);
      window.removeEventListener("keydown", skipIntro);
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

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      {/* Background */}
     <motion.div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url("https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0")`,
  }}
  initial={{ scale: 1.2, filter: "blur(10px)" }}
  animate={{
    scale: introDone ? [1, 1.05, 1.1, 1] : 1.2,
    rotate: introDone ? [0, 1, -1, 0] : 0,
    filter: introDone ? ["blur(10px)", "blur(6px)", "blur(0px)"] : "blur(10px)",
  }}
  transition={
    introDone
      ? { duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 1] }
      : { duration: 0 }
  }
/>

      {/* Floating Particles */}
      {!introDone &&
        Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10],
              x: [-5, 5],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

      {/* Intro */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="w-56 h-56 rounded-full mb-4 bg-white border-4 border-white relative"
              style={{ boxShadow: "0 0 30px rgba(255,255,255,0.8)" }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.1, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* Pulsating Glow */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>

            {/* Animated Text */}
            <motion.p
              className="text-2xl italic text-white font-light drop-shadow-md mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            >
              United by sound, lifted by the rhythm
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo + Motto */}
      <motion.div
        className="absolute z-30 flex flex-col items-start gap-2"
        initial={{
          scale: 0,
          opacity: 0,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={
          introDone
            ? { scale: 1, opacity: 1, top: "1rem", left: "1rem", x: 0, y: 0 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1 }}
      >
        <div
          className="w-16 h-16 rounded-full bg-white border-2 border-white"
          style={{ boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}
        />
        {introDone && (
          <motion.p
            className="text-base italic text-white drop-shadow-md pl-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            United by sound, lifted by the rhythm
          </motion.p>
        )}
      </motion.div>

      {/* Hamburger & Slide Menu */}
      {introDone && (
        <>
          <motion.button
            className="absolute top-4 right-4 z-30 text-white"
            onClick={() => setMenuOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
                >
                  <X size={28} />
                </button>

                <div className="flex-1 flex flex-col justify-center items-center gap-6">
                  <h2 className="text-2xl font-bold mb-6">Who we are</h2>
                  <nav className="flex flex-col gap-4 text-lg">
                    {["Home", "About", "Artists", "Contact"].map((link, i) => (
                      <motion.a
                        key={link}
                        href="#"
                        className="hover:underline"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={linkVariants}
                      >
                        {link}
                      </motion.a>
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
