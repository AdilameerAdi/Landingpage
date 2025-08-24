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

      {/* Gallery Grid */}
      <div className="relative z-40 p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {metadata.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl relative w-full h-[300px]"
          >
            <Image
              src={`/gallery/${item.file}`}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover"
              priority 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
