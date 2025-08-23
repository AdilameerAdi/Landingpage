export default async function sitemap() {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
	return [
		{ url: `${baseUrl}/`, lastModified: new Date() },
		{ url: `${baseUrl}/about`, lastModified: new Date() },
		{ url: `${baseUrl}/gallery`, lastModified: new Date() },
		{ url: `${baseUrl}/artists`, lastModified: new Date() },
		{ url: `${baseUrl}/contact`, lastModified: new Date() },
	];
}

