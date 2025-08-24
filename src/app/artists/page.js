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

      {/* Artists Grid */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {artists.map((artist) => (
          <Link key={artist.slug} href={`/artist/${artist.slug}`}>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl cursor-pointer">
              <Image
                src={artist["profile-url"]}
                alt={artist.name}
                width={400} // specify width & height for optimization
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                loading="lazy" // lazy-load images
              />
              <div className="p-2 text-white text-center font-semibold bg-black/50">
                {artist.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
