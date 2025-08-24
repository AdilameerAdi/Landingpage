// app/gallery/page.js
import fs from "fs";
import path from "path";
import Image from "next/image";
import Navbar from "../../components/Navbar";

export default async function GalleryPage() {
  // Read metadata.json server-side
  const metadataPath = path.join(process.cwd(), "data/metadata.json");
  const metadataRaw = fs.readFileSync(metadataPath, "utf-8");
  const metadata = JSON.parse(metadataRaw);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Artists", href: "/artists" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Navbar */}
      <Navbar navLinks={navLinks} />

      {/* Hero Section */}
      <div
        className="w-full h-screen relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://globalrecords.com/wp-content/uploads/2020/06/ourArtistsBg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-10 left-6 sm:left-10 z-30">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Our Gallery
          </h1>
        </div>
      </div>

      {/* Scrollable Gallery Description */}
      <div className="flex justify-center mt-30 px-4">
        <div className="bg-black/70 text-white p-6 rounded-lg w-full max-w-2xl h-64 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Welcome to Our Gallery</h2>
          <p className="text-lg leading-relaxed mb-4">
            Step into a world of creativity and inspiration. Our gallery showcases stunning works from talented artists, each piece reflecting passion, skill, and unique vision. Explore vibrant visuals, immerse yourself in diverse styles, and experience the beauty of art from around the world. Every image tells a story—take your time to appreciate the detail, color, and emotion captured in each masterpiece.
          </p>
          <p className="text-lg leading-relaxed">
            Scroll, read, and immerse yourself in the art world. Learn about the techniques, the inspirations, the stories, and the messages behind each creation. Our goal is to provide a space where art lovers can connect with artists, discover new styles, and appreciate the beauty of creativity. Keep scrolling to see the artworks in action and experience a journey through their masterpieces.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-40 p-6 grid grid-cols-2 md:grid-cols-5 gap-4 mt-30">
        {metadata.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl relative w-full h-[300px]"
          >
            <Image
              src={`/gallery/${item.file}`}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              priority={index < 5} // first 5 images load with priority
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          </div>
        ))}
      </div>

      <div className="h-24"></div> {/* Extra bottom spacing */}
    </div>
  );
}
