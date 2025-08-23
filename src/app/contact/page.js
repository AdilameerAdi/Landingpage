// app/contact/page.js
import Navbar from "../../components/Navbar";
import ContactForm from "../../components/ContactForm";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export default async function ContactPage() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Artists", href: "/artists" },
    { name: "Contact us", href: "/contact" },
  ];

  // Build artist suggestions array (names + tags)
  const artistsDir = path.join(process.cwd(), "data/artists");
  let artistSuggestions = [];
  if (fs.existsSync(artistsDir)) {
    const files = fs.readdirSync(artistsDir);
    const items = files.map((file) => {
      const filePath = path.join(artistsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const data = yaml.load(content);
      return { name: data?.name, tag: data?.["artist-tag"] };
    });
    const unique = new Set();
    items.forEach((it) => {
      if (it.name) unique.add(String(it.name));
      if (it.tag) unique.add(String(it.tag));
    });
    artistSuggestions = Array.from(unique);
  }

  return (
    <div className="relative w-full bg-black text-white">
      {/* Navbar */}
      <Navbar navLinks={navLinks} />

      {/* Hero Section */}
      <div
        className="w-full h-screen relative bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            'url("https://globalrecords.com/wp-content/uploads/2020/06/ourArtistsBg.jpg")',
          backgroundAttachment: "fixed", // fixed background
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Hero Text - bottom left with padding */}
        <div className="relative z-10 p-8 pb-16 text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-2 text-xl sm:text-2xl text-gray-300">
            We’d love to hear from you
          </p>
        </div>
      </div>

      {/* Content Section with Side Menu */}
      <div className="relative z-20 max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Side Menu */}
          <aside className="md:col-span-1 bg-gray-900/80 rounded-xl shadow-lg p-6 h-fit sticky top-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Contact Options</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#form" className="hover:text-yellow-400">Contact form</a></li>
              <li><a href="mailto:office@example.com" className="hover:text-yellow-400">Email us</a></li>
              <li><a href="/artists" className="hover:text-yellow-400">Browse artists</a></li>
            </ul>
            <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-700/40 text-yellow-200">
              <p className="font-semibold">Pro tip</p>
              <p className="text-sm">Date, Country, Venue are required only if you select artist(s). They stay hidden otherwise.</p>
            </div>
          </aside>

          {/* Contact Form Card */}
          <section id="form" className="md:col-span-2 bg-gray-900/80 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">Get in Touch</h2>
            <ContactForm artistSuggestions={artistSuggestions} />
          </section>
        </div>

        {/* Any Query Card */}
        <div className="bg-gray-900/80 rounded-xl shadow-lg text-center p-8 mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-yellow-400">
            Any Query?
          </h2>
          <p className="text-gray-300 mb-4">
            Feel free to reach out anytime. We are here to help you!
          </p>
          <a
            href="mailto:office@example.com"
            className="inline-block bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <div
        className="relative w-full text-white py-20 px-6 mt-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://globalrecords.com/wp-content/uploads/2020/05/globalFooter22.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="pl-7">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
              Don’t be shy,<nobr /><br />
              say hi!
            </h2>
            <p className="text-2xl font-semibold">City Name</p>
            <p className="text-gray-300 text-xl">
              1234 Example Street,
              <br />
              Sector 1, City
            </p>
            <div className="mt-8 space-y-3 text-2xl">
              <p className="hover:text-yellow-400 cursor-pointer">TikTok</p>
              <p className="hover:text-yellow-400 cursor-pointer">Instagram</p>
              <p className="hover:text-yellow-400 cursor-pointer">Facebook</p>
              <p className="hover:text-yellow-400 cursor-pointer">YouTube</p>
              <p className="hover:text-yellow-400 cursor-pointer">LinkedIn</p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-gray-400 text-xl mb-3">Start a conversation</p>
            <p className="text-3xl sm:text-4xl font-medium hover:text-yellow-400 cursor-pointer">
              office@example.com
            </p>
          </div>

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
