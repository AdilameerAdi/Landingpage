"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Artists", href: "/artists" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <div className="relative w-full min-h-screen">
      {/* Background */}
      <div className="fixed inset-0">
        <Image
          src="https://globalrecords.com/wp-content/uploads/2020/05/globalAbout22.jpg"
          alt="About background"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:object-center [object-position:60%]"
        />
      </div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/50"></div>

      {/* Hero Content Layer */}
      <div className="relative z-30 min-h-screen flex flex-col">
        {/* Logo + Tagline */}
        <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
          <div
            className="rounded-full bg-white border-2 border-white"
            style={{
              width: "80px",
              height: "80px",
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
          />
          <p className="text-white text-xs md:text-sm italic">
            United by sound, lifted by rhythm
          </p>
        </div>

        {/* Hamburger */}
        <button
          className="absolute top-4 right-4 z-40 text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={32} />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed top-0 right-0 w-72 max-w-full h-full bg-black/95 text-white z-50 flex flex-col p-6"
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
                <nav className="flex flex-col gap-6 text-xl font-semibold">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom-Left Heading */}
        <div className="absolute bottom-10 left-6 sm:left-10 text-left px-2">
          <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg max-w-xl">
            Approach the song <br className="hidden sm:block" /> differently
          </h1>
        </div>
      </div>

   
   {/* 🔥 Black Section after Hero (scrollable) */}

<motion.div
  className="relative w-full bg-black py-28 px-6 flex flex-col items-start"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  {/* Paragraph */}
  <p className="text-white text-left pl-4 sm:pl-10 max-w-3xl text-xl sm:text-2xl md:text-3xl leading-relaxed">
    Music isn’t something that appears on its own—it must be explored and
    shared with others. It exists within each of us, influencing our thoughts
    and emotions, and offering comfort in any situation. It embodies creativity
    and brings a sense of happiness.
  </p>

  {/* Button below paragraph, aligned right */}
  <div className="w-full flex justify-end">
    <button className="mt-70 bg-amber-400 hover:bg-yellow-500 text-black font-bold text-3xl px-12 py-6 rounded-xl shadow-xl transition-all duration-300">
      Our Artists
    </button>
  </div>
    {/* About Company Section */}
  <div className="mt-20 pl-4 sm:pl-10 max-w-4xl text-left">
    <h2 className="text-white text-3xl sm:text-4xl font-bold">
      [Company Name] <br/> – Bringing Music to Life
    </h2>
    <br />
    <p className="text-white text-lg sm:text-xl leading-relaxed md:pr-100">
      [Company Name] is a vibrant, independent music   label dedicated to discovering and promoting 
      talent from around the world. With a diverse roster   of artists spanning Pop, Electronic, Hip-Hop,
      and  regional genres, the label delivers unforgettable   musical experiences across streaming
      platforms ,  live performances, and media outlets.
    </p>
    <br />
    <p className="text-white text-lg sm:text-xl leading-relaxed md:pr-100">
      Focused on creativity, innovation, and authenticity,  [Company Name] produces hundreds of tracks 
      and videos each year, connecting with fans   everywhere. By nurturing emerging talent and   embracing
      a global music culture, the label   continues to shape the industry while bringing joy, energy, and
      inspiration to audiences worldwide.
    </p>
  </div>

</motion.div>
<div
  className="relative w-full text-white py-20 px-6 bg-cover bg-center"
  style={{ backgroundImage: "url('https://globalrecords.com/wp-content/uploads/2020/05/globalFooter22.jpg')" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
    
    {/* Left Section */}
    <div className="pl-7">
      <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
        Don’t be shy,<br />say hi!
      </h2>
      <p className="text-2xl font-semibold">City Name</p>
      <p className="text-gray-300 text-xl">
        1234 Example Street,<br />Sector 1, City
      </p>

      <div className="mt-8 space-y-3 text-2xl">
        <p className="hover:text-yellow-400 cursor-pointer">TikTok</p>
        <p className="hover:text-yellow-400 cursor-pointer">Instagram</p>
        <p className="hover:text-yellow-400 cursor-pointer">Facebook</p>
        <p className="hover:text-yellow-400 cursor-pointer">YouTube</p>
        <p className="hover:text-yellow-400 cursor-pointer">LinkedIn</p>
      </div>
    </div>

    {/* Middle Section */}
    <div className="flex flex-col justify-center">
      <p className="text-gray-400 text-xl mb-3">Start a conversation</p>
      <p className="text-3xl sm:text-4xl font-medium hover:text-yellow-400 cursor-pointer">
        office@example.com
      </p>
    </div>

    {/* Right Section */}
    <div className="flex flex-col justify-center">
      <p className="text-gray-400 text-xl mb-3">For concerts</p>
      <p className="text-3xl sm:text-4xl font-medium hover:text-yellow-400 cursor-pointer">
        booking@example.com
      </p>
    </div>
  </div>
</div>










    </div>
  );
}

