import fs from "fs";
import path from "path";
import Navbar from "../../components/Navbar";
import Image from "next/image";

// Make the component async to fetch data on the server
export default async function GalleryPage() {
  // Read metadata.json on the server
  const metadataPath = path.join(process.cwd(), "data/metadata.json");
  const metadataRaw = fs.readFileSync(metadataPath, "utf-8");
  const metadata = JSON.parse(metadataRaw);

  // Prepare images array
  const images = metadata.map((item) => ({
    src: `/gallery/${item.file}`,
    tags: item.tags,
    width: 600,
    height: 300,
  }));

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
      <div className="w-full h-screen relative">
        <Image
          src="https://globalrecords.com/wp-content/uploads/2020/06/ourArtistsBg.jpg"
          alt="Artists background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-10 left-6 sm:left-10 text-left z-30">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Our Gallery
          </h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-40 p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl"
          >
            <Image
              src={img.src}
              alt={`Gallery ${index + 1}`}
              width={img.width}
              height={img.height}
              className="w-full h-[300px] object-cover"
              loading={index < 6 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
