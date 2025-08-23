/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "globalrecords.com" },
		],
	},
	experimental: {
		optimizePackageImports: ["framer-motion", "lucide-react"],
	},
	headers: async () => [
		{
			source: "/gallery/:path*",
			headers: [
				{ key: "Cache-Control", value: "public, max-age=31536000, immutable" },
			],
		},
		{
			source: "/artists/:path*",
			headers: [
				{ key: "Cache-Control", value: "public, max-age=31536000, immutable" },
			],
		},
	],
};

export default nextConfig;
