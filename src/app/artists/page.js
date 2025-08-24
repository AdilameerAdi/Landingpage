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
        <div className="bg-black/70 text-white p-6 rounded-lg w-full max-w-2xl h-64 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Meet Our Artists</h2>
          <p className="text-lg leading-relaxed mb-4">
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
          <p className="text-lg leading-relaxed">
            Scroll, read, and immerse yourself in the art world. Learn about the techniques, the inspirations, the stories,
            and the messages behind each creation. Our goal is to provide a space where art lovers can connect with
            artists, discover new styles, and appreciate the beauty of creativity. Keep scrolling to see the artists in
            action and experience a journey through their masterpieces.
          </p>
        </div>
      </div>

     

      {/* Artists Grid */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-30">
        {artists.map((artist) => (
          <Link key={artist.slug} href={`/artist/${artist.slug}`}>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-lg cursor-pointer">
              <Image
                src={artist["profile-url"]}
                alt={artist.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                priority
                placeholder="blur"
                blurDataURL="/placeholder.png"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="p-2 text-white text-center font-semibold bg-black/50">
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
