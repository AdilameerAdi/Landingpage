import Image from "next/image";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default async function ArtistsPage() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Artists", href: "/artists" },
    { name: "Contact us", href: "/contact" },
  ];

  // Load artists data from YAML files
  const artistsDir = path.join(process.cwd(), "data/artists");
  const artistFiles = fs.readdirSync(artistsDir);
  const artists = artistFiles.map((file) => {
    const filePath = path.join(artistsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = yaml.load(fileContent);
    const slug = file.replace(".yaml", "");
    return { ...data, slug };
  });

  return (
    <div className="relative w-full min-h-screen bg-black">
      <Navbar navLinks={navLinks} />

      {/* Hero Section */}
      <div
        className="w-full h-screen relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url("https://globalrecords.com/wp-content/uploads/2020/06/ourArtistsBg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-10 left-6 sm:left-10 text-left z-30">
          <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-lg">
            Our Artists
          </h1>
        </div>
      </div>

      {/* Scrollable Text Block */}
      <div className="flex justify-center mt-60 px-4">
        <div className="bg-black/70 text-white p-6 rounded-lg w-full max-w-3xl h-64 overflow-y-auto">
          <h2 className="text-7xl font-bold mb-4 text-center">Meet Our Artists</h2>
          <p className="text-3xl leading-relaxed mb-4">
            Welcome to our artist gallery! Here you can explore talented artists from around the world. Each artist
            has their own unique style and story. Scroll through this block to learn more about their journeys,
            inspirations, and contributions to the art community. We are proud to showcase a diverse range of creative
            talents. Enjoy discovering their work and connecting with the vibrant world of art. Our platform celebrates
            creativity, innovation, and expression. We invite you to scroll down and meet each artist individually. Their
            portfolios, achievements, and stories are all curated here for your inspiration. Dive in and enjoy the
            experience! Each artist has a unique perspective and every piece tells a story. You will find works that are
            bold, subtle, abstract, and vivid, capturing the true spirit of contemporary art. Take your time exploring the
            gallery and appreciate the creativity and dedication behind each piece.
          </p>
          <p className="text-3xl leading-relaxed">
            Scroll, read, and immerse yourself in the art world. Learn about the techniques, the inspirations, the stories,
            and the messages behind each creation. Our goal is to provide a space where art lovers can connect with
            artists, discover new styles, and appreciate the beauty of creativity. Keep scrolling to see the artists in
            action and experience a journey through their masterpieces.
          </p>
        </div>
      </div>

     {/* Related Gallery Section with Search Bar */}
<div className="max-w-6xl mt-30 mx-auto p-6 flex flex-col items-end gap-2">
  <h2 className="text-2xl font-semibold text-white">Search Artists</h2>
  <input
    type="text"
    placeholder="Search..."
    className="px-4 py-2 w-72 rounded-lg border-5 border-yellow-500 
               bg-white text-gray-800 placeholder-gray-400
               shadow-md focus:outline-none 
               focus:border-yellow-600 focus:ring-2 focus:ring-yellow-400 
               transition-all duration-300 ease-in-out hover:shadow-lg"
  />
</div>



      {/* Artists Grid */}
    <div className="p-6 bg-white rounded-lg shadow-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-30">
  {artists.map((artist) => (
    <Link key={artist.slug} href={`/artist/${artist.slug}`}>
      <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer 
                      border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] 
                      hover:shadow-[0_0_30px_rgba(59,130,246,1)] transition-all duration-300">
        
        {/* Artist Image */}
        <Image
          src={artist["profile-url"]}
          alt={artist.name}
          width={400}
          height={400}
          className="w-full h-[500px] object-cover transition-all duration-300 ease-in-out group-hover:blur-sm"
          priority
          placeholder="blur"
          blurDataURL="/placeholder.png"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Name Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-2xl font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {artist.name}
        </div>
      </div>
    </Link>
  ))}
</div>




      <div className="h-24"></div> {/* Extra bottom spacing */}
    </div>
  );
}
