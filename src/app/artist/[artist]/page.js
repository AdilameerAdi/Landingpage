// app/artist/[artist]/page.js
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import Image from "next/image";
import Link from "next/link";
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
    .filter((img) => img.tags.includes(artistData["artist-tag"]))
    .map((img) => `/gallery/${img.file}`);

  // Static data for all artists (vertical section)
  const staticHighlights = [
    {
      title: "Top Achievement",
      description: "Performed in international music festivals and collaborated with top DJs."
    },
    {
      title: "Style & Influence",
      description: "Influenced by electronic, house, and progressive music genres."
    },
    {
      title: "Fan Base",
      description: "Millions of followers on social media worldwide."
    },
    {
      title: "Upcoming Events",
      description: "Check out their latest concerts and live performances."
    },
    {
      title: "Discography",
      description: "Released multiple singles and albums globally recognized."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar navLinks={navLinks} />

      {/* Hero Section */}
      <div
        className="w-full h-screen relative flex items-end"
        style={{
          backgroundImage: `url(${artistData["profile-url"]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-5xl md:text-7xl font-extrabold">{artistData.name}</h1>
          <p className="mt-2 text-xl md:text-2xl">{artistData.Genre}</p>
        </div>
      </div>

      {/* Artist Overview Section */}
      <div className="w-full bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/90 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start px-6">
          {/* Left: Larger artist image with decorative border */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-64 h-96 md:w-80 md:h-[36rem] rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400">
              <Image
                src={artistData["profile-url"]}
                alt={artistData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 left-0 w-full text-center">
              <p className="text-gray-400 italic text-lg md:text-xl">
                “{artistData.Quote || "No quote available"}”
              </p>
            </div>
          </div>

          {/* Right: Artist Details */}
          <div className="flex-1 bg-gray-900/70 p-10 rounded-2xl shadow-2xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-400">{artistData.name}</h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">{artistData.Description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailItem
                iconPath="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4z M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z"
                label="City"
                value="Example City"
              />
              <DetailItem
                iconPath="M12 8v4l3 3 M12 20.5C6.753 20.5 2.5 16.247 2.5 11S6.753 1.5 12 1.5 21.5 5.753 21.5 11 17.247 20.5 12 20.5z"
                label="Years Active"
                value="5"
              />
              <DetailItem iconPath="M9 19V6h13 M9 6L5 3" label="Genre" value={artistData.Genre} />
              <DetailItem iconPath="M9 19V6h13 M9 6L5 3" label="Expertise" value="DJing, Music Production" />
            </div>
          </div>
        </div>
      </div>
{/* Artist Biography Section */}
<div className="max-w-3xl mx-auto px-6 mt-12">
  <div className="bg-black text-white p-8 rounded-2xl shadow-lg max-h-96 overflow-auto scroll-smooth animate-fadeIn">
    <div className="space-y-6 w-full">
      <h1 className="text-5xl text-center font-extrabold">Artist [name]</h1>
      <p className="leading-relaxed text-lg">
        {artistData.name} is an internationally recognized DJ and music producer,
        known for their energetic performances and unique sound. They have captivated
        audiences around the world with their innovative mixing style and genre-blending
        music. Over the years, they have released multiple albums and singles that
        have topped charts globally. 
      </p>
      <p className="leading-relaxed text-lg">
        Their music style is influenced by electronic, house, and progressive genres,
        creating a distinctive sound that resonates with millions of fans. 
        Collaborations with other top artists have further enriched their musical journey.
      </p>
      <p className="leading-relaxed text-lg">
        In addition to their music career, {artistData.name} has been an inspiration
        for upcoming DJs and producers, sharing knowledge and supporting the music
        community. Their live shows are praised for creativity, energy, and interaction
        with the crowd.
      </p>
      <p className="leading-relaxed text-lg">
        With a growing fan base on social media and streaming platforms, they continue
        to push boundaries in music production and performance. Their dedication to
        craft, stage presence, and artistry has earned them numerous awards and
        international recognition.
      </p>
      <p className="leading-relaxed text-lg">
        Outside of music, they are known for philanthropic activities and engaging
        with fans through exclusive events and behind-the-scenes content. Their vision
        is to inspire others and contribute positively to the global music scene.
      </p>
      <p className="leading-relaxed text-lg">
        Upcoming tours and live performances are highly anticipated, with tickets
        often selling out within minutes. Each event promises an unforgettable
        experience for attendees.
      </p>
      <p className="leading-relaxed text-lg">
        Overall, {artistData.name}'s journey reflects passion, talent, and perseverance,
        making them a significant figure in the music industry.
      </p>
      <p className="leading-relaxed text-lg">
        Fans appreciate the dedication and creativity that goes into each track and
        live set. Their legacy continues to grow with every performance and release.
      </p>
      <p className="leading-relaxed text-lg">
        From humble beginnings to international fame, {artistData.name} has remained
        grounded, continuously evolving as an artist while staying connected with
        the audience.
      </p>
    </div>
  </div>
</div>

      {/* Vertical Highlights Section */}
     <div className="w-full bg-gray-900/80 py-16">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
    {staticHighlights.map((item, idx) => (
      <div
        key={idx}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h3 className="text-2xl font-bold text-yellow-400">{item.title}</h3>
        {/* Multiple lines of description */}
        <p className="text-gray-300 text-lg">{item.description}</p>
        <p className="text-gray-300 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          vehicula mauris at libero sodales, vel tincidunt erat imperdiet.
        </p>
        <p className="text-gray-300 text-lg">
          Curabitur auctor neque sit amet quam tempor, ac pulvinar urna
          fermentum. Vivamus efficitur sapien id dui laoreet, at bibendum
          nisi suscipit.
        </p>
      </div>
    ))}
  </div>

  {/* Centered Contact Button */}
  <div className="flex justify-center mt-12">
  <Link href="/contact">
    <button className="bg-yellow-400 text-black font-bold px-10 py-5 text-2xl rounded-3xl animate-bounce hover:scale-110 transition-all">
      Contact
    </button>
  </Link>
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
        style={{
          backgroundImage:
            "url('https://globalrecords.com/wp-content/uploads/2020/05/globalFooter22.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="pl-7">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
              Don’t be shy,<br />
              say hi!
            </h2>
            <p className="text-2xl font-semibold">City Name</p>
            <p className="text-gray-300 text-xl">
              1234 Example Street,
              <br />Sector 1, City
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

// DetailItem Component
function DetailItem({ iconPath, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
      <p className="text-gray-200">
        <span className="font-semibold">{label}:</span> {value}
      </p>
    </div>
  );
}
