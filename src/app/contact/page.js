// app/contact/page.js
import Navbar from "../../components/Navbar";
import Image from "next/image";

export default function ContactPage() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Artists", href: "/artists" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <div className="relative w-full bg-black text-white">
      {/* Navbar */}
      <Navbar navLinks={navLinks} />

      {/* Hero Section */}
      <div className="w-full h-screen relative flex items-end">
        <Image
          src="https://globalrecords.com/wp-content/uploads/2020/06/ourArtistsBg.jpg"
          alt="Contact background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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

      {/* Scrollable Content Section */}
      <div className="relative z-20 max-w-4xl mx-auto p-8">
        {/* Contact Form */}
        <div className="bg-gray-900/80 rounded-xl shadow-lg p-8 mt-10">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Get in Touch</h2>
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
  <select
    required
    id="subject"
    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
    defaultValue="" // ensures placeholder is selected by default
  >
    <option value="" disabled>
      Select a subject
    </option>
    <option value="booking">Booking</option>
    <option value="general">General Inquiry</option>
    <option value="support">Support</option>
    <option value="other">Other</option>
  </select>
</div>


            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea
                required
                id="message"
                rows={6}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all"
            >
              Send Message
            </button>
          </form>
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
              Don’t be shy,<br />
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
