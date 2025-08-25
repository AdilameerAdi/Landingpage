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
          backgroundAttachment:"fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-5xl md:text-7xl font-extrabold">{artistData.name}</h1>
          <p className="mt-2 text-xl md:text-2xl">{artistData.Genre}</p>
        </div>
      </div>
       {/* Artist Biography Section */}
     <div className="max-w-3xl mx-auto px-6 mt-12">
  <div
    className="bg-black text-white p-8 z-20 rounded-2xl shadow-lg max-h-96 overflow-auto scroll-smooth animate-fadeIn"
    suppressHydrationWarning
  >
    <div className="space-y-6 w-full">
      {/* Render dynamic artist name */}
      <h1 className="text-5xl text-center font-extrabold">
        {artistData?.name || "Artist"}
      </h1>

      <p className="leading-relaxed text-lg">
        {artistData?.name} is an internationally recognized DJ and music producer,
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
        In addition to their music career, {artistData?.name} has been an inspiration
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
        Overall, {artistData?.name}'s journey reflects passion, talent, and perseverance,
        making them a significant figure in the music industry.
      </p>

      <p className="leading-relaxed text-lg">
        Fans appreciate the dedication and creativity that goes into each track and
        live set. Their legacy continues to grow with every performance and release.
      </p>

      <p className="leading-relaxed text-lg">
        From humble beginnings to international fame, {artistData?.name} has remained
        grounded, continuously evolving as an artist while staying connected with
        the audience.
      </p>

      {/* Extra static text to ensure scrolling */}
      <p className="leading-relaxed text-lg">
        Beyond their music, {artistData?.name} actively collaborates with global brands and participates 
        in cultural exchange programs, promoting music as a universal language that connects people.
      </p>

      <p className="leading-relaxed text-lg">
        They have also been featured in documentaries and music industry panels, 
        sharing insights on creativity and innovation. Their influence has extended 
        beyond entertainment, contributing to conversations about mental health 
        and artistic expression.
      </p>

      <p className="leading-relaxed text-lg">
        As technology and music evolve, {artistData?.name} continues to experiment 
        with immersive concert experiences and cutting-edge production techniques, 
        ensuring that their fans always have something exciting to look forward to.
      </p>

      <p className="leading-relaxed text-lg">
        The future holds even more promise for {artistData?.name}, with plans for 
        new music, collaborations, and tours that will further cement their legacy 
        as one of the most influential artists of this generation.
      </p>
    </div>
  </div>
</div>



      {/* Artist Overview Section */}
<div className="w-full bg-gray-900/90 py-20">
  <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 px-6">
    
    {/* Centered artist image */}
    <div className="w-3/4 relative rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400">
      <Image
        src={artistData["profile-url"]}
        alt={artistData.name}
        width={1000}
        height={1000}
        className="object-cover w-full"
        priority
      />
      <div className="absolute bottom-4 left-0 w-full text-center">
        <p className="text-gray-400 italic text-lg md:text-xl">
          “{artistData.Quote || "No quote available"}”
        </p>
      </div>
    </div>

    {/* Artist details / points */}
    <div className="w-full max-w-3xl space-y-6 text-center">
      <h2 className="text-5xl font-extrabold text-yellow-400">{artistData.name}</h2>
      <p className="text-gray-300 text-lg md:text-xl leading-relaxed">{artistData.Description}</p>

      <ul className="list-disc list-inside text-gray-200 space-y-2 text-left md:text-center">
        <li><span className="font-semibold">City:</span> Example City</li>
        <li><span className="font-semibold">Years Active:</span> 5</li>
        <li><span className="font-semibold">Genre:</span> {artistData.Genre}</li>
        <li><span className="font-semibold">Expertise:</span> DJing, Music Production</li>
      </ul>
    </div>
  </div>
</div>


     

      {/* Artist Music & Booking Section */}
<div className="w-full bg-gray-900/80 py-16">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center md:items-start">

    {/* Left: Bigger placeholder images in 2x2 grid */}
    <div className="grid grid-cols-2 gap-8 mx-auto">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="w-[200px] h-[250px] flex items-center justify-center rounded-xl shadow-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-800 font-bold text-center text-lg"
        >
          Song Image {idx + 1}
        </div>
      ))}
    </div>

    {/* Right: Songs heading and paragraph */}
    <div className="flex flex-col gap-6 w-full md:w-1/2">
      <h2 className="text-4xl font-bold text-center text-yellow-400">Songs</h2>
      
      {/* Songs as paragraph */}
      <p className="text-gray-200 text-lg leading-relaxed">
        {artistData.Songs?.join(", ")}
      </p>

      {/* Static artist data */}
      <div className="mt-6 text-gray-300 text-lg space-y-2">
        <p className="text-white text-3xl mt-4">
  This artist has performed in international music festivals and collaborated with top DJs. 
  Their style is influenced by electronic, house, and progressive music genres, attracting millions 
  of followers on social media worldwide. They frequently perform at concerts and live events, and 
  have released multiple singles and albums that are globally recognized.
</p>

      </div>
    </div>
  </div>

  {/* Centered Book Now Button */}
  <div className="flex justify-center mt-12">
    <Link href="/contact">
      <button className="bg-yellow-400 text-black font-bold px-10 py-5 text-2xl rounded-3xl animate-bounce hover:scale-110 transition-all">
        Book Now
      </button>
    </Link>
  </div>
</div>






      {/* Related Gallery */}
     <div className="max-w-6xl mx-auto p-8">
  <h2 className="text-7xl font-bold text-center mb-4">Gallery</h2>
  
  {relatedImages.length > 0 ? (
    <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 bg-black rounded-lg min-h-[520px]">
      {relatedImages.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`Gallery ${idx + 1}`}
          width={500}
          height={500}
          className="object-cover rounded-lg shadow-md flex-shrink-0 hover:scale-105 transition-transform duration-300 ease-in-out"
          priority
        />
      ))}
    </div>
  ) : (
    <div className="bg-black rounded-lg min-h-[520px] flex items-center justify-center text-white">
      No images available
    </div>
  )}
</div>


      {/* Contact Footer Section */}
      <div
        className="relative w-full text-white py-20  mt-6px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://globalrecords.com/wp-content/uploads/2020/05/globalFooter22.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="pl-7">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
              Don&rsquo;t be shy,<br />
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
