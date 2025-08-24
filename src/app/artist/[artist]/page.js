// app/artist/[artist]/page.js
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import Image from "next/image";
import Navbar from "../../../components/Navbar";

export default async function ArtistPage({ params }) {
  const artistSlug = params.artist;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Artists", href: "/artists" },
    { name: "Contact us", href: "/contact" },
  ];

  // Load artist YAML
  const artistPath = path.join(process.cwd(), "data/artists", `${artistSlug}.yaml`);
  if (!fs.existsSync(artistPath)) return <div className="text-white p-6">Artist not found</div>;
  const artistFile = fs.readFileSync(artistPath, "utf-8");
  const artistData = yaml.load(artistFile);

  // Load gallery images filtered by artist tag
  const metadataPath = path.join(process.cwd(), "data/metadata.json");
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  const relatedImages = metadata
    .filter(img => img.tags.includes(artistData["artist-tag"]))
    .map(img => `/gallery/${img.file}`);

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar navLinks={navLinks} />

      {/* Hero Section */}
      <div
        className="w-full h-screen relative flex items-end"
        style={{ backgroundImage: `url(${artistData["profile-url"]})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-5xl md:text-7xl font-extrabold">{artistData.name}</h1>
          <p className="mt-2 text-xl md:text-2xl">{artistData.Genre}</p>
        </div>
      </div>

      {/* Artist Overview Section */}
      <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Left: Small artist image */}
        <div className="flex-shrink-0">
          <Image
            src={artistData["profile-url"]}
            alt={artistData.name}
            width={150}
            height={300}
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Right: Artist Details */}
        <div className="flex-1 space-y-6 bg-gray-900/70 p-6 rounded-xl shadow-lg">
          {/* Name and Description */}
          <div className="space-y-3">
            <h2 className="text-4xl font-extrabold text-yellow-400">{artistData.name}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{artistData.Description}</p>
          </div>

          {/* Professional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z" />
              </svg>
              <p className="text-gray-200"><span className="font-semibold">City:</span> Example City</p>
            </div>

            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20.5C6.753 20.5 2.5 16.247 2.5 11S6.753 1.5 12 1.5 21.5 5.753 21.5 11 17.247 20.5 12 20.5z" />
              </svg>
              <p className="text-gray-200"><span className="font-semibold">Years Active:</span> 5</p>
            </div>

            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6h13" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6L5 3" />
              </svg>
              <p className="text-gray-200"><span className="font-semibold">Genre:</span> {artistData.Genre}</p>
            </div>

            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6h13" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6L5 3" />
              </svg>
              <p className="text-gray-200"><span className="font-semibold">Expertise:</span> DJing, Music Production</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Gallery */}
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {relatedImages.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`Gallery ${idx + 1}`}
              width={400}
              height={400}
              className="object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
              priority
            />
          ))}
        </div>
      </div>

      {/* Contact Footer Section */}
      <div
        className="relative w-full text-white py-20 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('https://globalrecords.com/wp-content/uploads/2020/05/globalFooter22.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
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
