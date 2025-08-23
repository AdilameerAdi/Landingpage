"use client";

import { useEffect, useMemo, useState } from "react";

const countryDialCodes = [
	{ code: "US", name: "United States", dial: "+1" },
	{ code: "GB", name: "United Kingdom", dial: "+44" },
	{ code: "RO", name: "Romania", dial: "+40" },
	{ code: "DE", name: "Germany", dial: "+49" },
	{ code: "FR", name: "France", dial: "+33" },
	{ code: "ES", name: "Spain", dial: "+34" },
	{ code: "IT", name: "Italy", dial: "+39" },
	{ code: "CA", name: "Canada", dial: "+1" },
	{ code: "AU", name: "Australia", dial: "+61" },
];

export default function ContactForm({ artistSuggestions }) {
	const [formData, setFormData] = useState({
		name: "",
		company: "",
		eventName: "",
		email: "",
		countryDial: "+1",
		phoneRest: "",
		artists: [],
		dateSingle: "",
		isMultiDay: false,
		dateStart: "",
		dateEnd: "",
		country: "",
		venue: "",
		message: "",
		agreeGDPR: false,
		confirmCorrect: false,
		agreeAccommodation: false,
		agreeBookingFee: false,
		turnstileToken: "",
	});
	const [artistQuery, setArtistQuery] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [serverMessage, setServerMessage] = useState("");

	const hasSelectedArtists = formData.artists.length > 0;

	const filteredArtistSuggestions = useMemo(() => {
		if (!artistQuery) return artistSuggestions.slice(0, 6);
		const query = artistQuery.toLowerCase();
		return artistSuggestions
			.filter((a) => a.toLowerCase().includes(query))
			.slice(0, 8);
	}, [artistQuery, artistSuggestions]);

	function addArtist(artist) {
		if (!formData.artists.includes(artist)) {
			setFormData((prev) => ({ ...prev, artists: [...prev.artists, artist] }));
		}
		setArtistQuery("");
	}

	function removeArtist(artist) {
		setFormData((prev) => ({
			...prev,
			artists: prev.artists.filter((a) => a !== artist),
		}));
	}

	function updateField(field, value) {
		setFormData((prev) => ({ ...prev, [field]: value }));
	}

	function isValidEmail(email) {
		return /.+@.+\..+/.test(email);
	}

	function validate() {
		if (!formData.name.trim()) return "Name is required";
		if (!formData.company.trim()) return "Company is required";
		if (!isValidEmail(formData.email)) return "Valid business email is required";
		if (!formData.agreeGDPR) return "GDPR consent is required";
		if (!formData.confirmCorrect) return "You must confirm data accuracy";
		if (hasSelectedArtists) {
			if (!formData.country.trim()) return "Country is required when an artist is selected";
			if (!formData.venue.trim()) return "Venue is required when an artist is selected";
			if (formData.isMultiDay) {
				if (!formData.dateStart || !formData.dateEnd) return "Start and end dates are required";
				if (new Date(formData.dateStart) > new Date(formData.dateEnd)) return "Start date must be before end date";
			} else {
				if (!formData.dateSingle) return "Date is required when an artist is selected";
			}
			if (!formData.agreeAccommodation) return "Accommodation/transport/meals acknowledgment is required";
			if (!formData.agreeBookingFee) return "Booking fee acknowledgment is required";
		}
		return null;
	}

	// Cloudflare Turnstile
	useEffect(() => {
		if (typeof window === "undefined") return;
		// Ensure the script is added only once
		const existing = document.querySelector('script[data-turnstile]');
		if (existing) return;
		const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
		if (!siteKey) return; // gracefully skip if not provided
		const script = document.createElement("script");
		script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
		script.async = true;
		script.defer = true;
		script.setAttribute("data-turnstile", "true");
		document.body.appendChild(script);
		return () => {
			// do not remove script to avoid reloading between navigations
		};
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		// @ts-ignore
		if (!window.turnstile) return;
		const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
		if (!siteKey) return;
		const container = document.getElementById("turnstile-container");
		if (!container) return;
		// @ts-ignore
		window.turnstile.render(container, {
			sitekey: siteKey,
			callback: (token) => updateField("turnstileToken", token),
		});
	}, []);

	async function onSubmit(e) {
		e.preventDefault();
		setServerMessage("");
		const err = validate();
		if (err) {
			setServerMessage(err);
			return;
		}
		setIsSubmitting(true);
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(data?.error || "Failed to submit form");
			}
			setServerMessage("Thank you! Your message has been sent.");
			// reset minimal fields
			setFormData((prev) => ({
				...prev,
				message: "",
				artists: [],
				dateSingle: "",
				isMultiDay: false,
				dateStart: "",
				dateEnd: "",
				country: "",
				venue: "",
			}));
		} catch (error) {
			setServerMessage(error.message || "Submission failed");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
			{/* Name */}
			<div>
				<label className="block text-gray-300 mb-2">Name *</label>
				<input
					type="text"
					required
					value={formData.name}
					onChange={(e) => updateField("name", e.target.value)}
					className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
					placeholder="Enter your name"
				/>
			</div>

			{/* Company */}
			<div>
				<label className="block text-gray-300 mb-2">Company *</label>
				<input
					type="text"
					required
					value={formData.company}
					onChange={(e) => updateField("company", e.target.value)}
					className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
					placeholder="Enter your company name"
				/>
			</div>

			{/* Event Name */}
			<div>
				<label className="block text-gray-300 mb-2">Event Name</label>
				<input
					type="text"
					value={formData.eventName}
					onChange={(e) => updateField("eventName", e.target.value)}
					className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
					placeholder="Name of your event (optional)"
				/>
			</div>

			{/* Business Email */}
			<div>
				<label className="block text-gray-300 mb-2">Business Email *</label>
				<input
					type="email"
					required
					value={formData.email}
					onChange={(e) => updateField("email", e.target.value)}
					className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
					placeholder="name@company.com"
				/>
			</div>

			{/* Phone with country code */}
			<div>
				<label className="block text-gray-300 mb-2">Phone Number</label>
				<div className="flex gap-2">
					<select
						value={formData.countryDial}
						onChange={(e) => updateField("countryDial", e.target.value)}
						className="min-w-28 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
					>
						{countryDialCodes.map((c) => (
							<option key={c.code} value={c.dial}>{c.dial} {c.name}</option>
						))}
					</select>
					<input
						type="tel"
						value={formData.phoneRest}
						onChange={(e) => updateField("phoneRest", e.target.value)}
						className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
						placeholder="Phone number"
					/>
				</div>
			</div>

			{/* Artists of interest with suggestions */}
			<div>
				<label className="block text-gray-300 mb-2">Artist(s) of interest</label>
				<div className="flex flex-wrap gap-2 mb-2">
					{formData.artists.map((a) => (
						<span key={a} className="inline-flex items-center gap-2 px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
							{a}
							<button type="button" onClick={() => removeArtist(a)} className="text-yellow-300 hover:text-yellow-200">×</button>
						</span>
					))}
				</div>
				<input
					type="text"
					value={artistQuery}
					onChange={(e) => setArtistQuery(e.target.value)}
					className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
					placeholder="Type an artist name or tag..."
				/>
				{filteredArtistSuggestions.length > 0 && (
					<div className="mt-2 bg-gray-800 border border-gray-700 rounded-lg max-h-48 overflow-auto">
						{filteredArtistSuggestions.map((s) => (
							<button type="button" key={s} onClick={() => addArtist(s)} className="w-full text-left px-3 py-2 hover:bg-gray-700">
								{s}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Date + Country + Venue (conditional requirement, optional hidden) */}
			{hasSelectedArtists ? (
				<div className="grid grid-cols-1 gap-6">
					<div>
						<label className="block text-gray-300 mb-2">Date</label>
						<div className="flex items-center gap-3 mb-2">
							<input
								type="checkbox"
								checked={formData.isMultiDay}
								onChange={(e) => updateField("isMultiDay", e.target.checked)}
							/>
							<span className="text-gray-300">Multiple day event</span>
						</div>
						{formData.isMultiDay ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<input type="date" value={formData.dateStart} onChange={(e) => updateField("dateStart", e.target.value)} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none" />
								<input type="date" value={formData.dateEnd} onChange={(e) => updateField("dateEnd", e.target.value)} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none" />
							</div>
						) : (
							<input type="date" value={formData.dateSingle} onChange={(e) => updateField("dateSingle", e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none" />
						)}
					</div>

					<div>
						<label className="block text-gray-300 mb-2">Country</label>
						<input type="text" value={formData.country} onChange={(e) => updateField("country", e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none" placeholder="Country of the event" />
					</div>

					<div>
						<label className="block text-gray-300 mb-2">Venue</label>
						<input type="text" value={formData.venue} onChange={(e) => updateField("venue", e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none" placeholder="Venue name" />
					</div>
				</div>
			) : null}

			{/* Message */}
			<div>
				<label className="block text-gray-300 mb-2">Message</label>
				<textarea
					rows={6}
					value={formData.message}
					onChange={(e) => updateField("message", e.target.value)}
					className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
					placeholder="Tell us more about your request"
				/>
			</div>

			{/* Terms checkboxes */}
			<div className="space-y-3">
				<label className="flex items-start gap-3 text-gray-300">
					<input type="checkbox" checked={formData.agreeGDPR} onChange={(e) => updateField("agreeGDPR", e.target.checked)} />
					<span>I agree that my data will be stored according to GDPR</span>
				</label>
				<label className="flex items-start gap-3 text-gray-300">
					<input type="checkbox" checked={formData.confirmCorrect} onChange={(e) => updateField("confirmCorrect", e.target.checked)} />
					<span>I confirm that all the data I introduced above is correct</span>
				</label>
				{hasSelectedArtists && (
					<>
						<label className="flex items-start gap-3 text-gray-300">
							<input type="checkbox" checked={formData.agreeAccommodation} onChange={(e) => updateField("agreeAccommodation", e.target.checked)} />
							<span>I understand that as the event organizer I have to cover the artist&apos;s accomodation, transportation and meals, to, from and during the event.</span>
						</label>
						<label className="flex items-start gap-3 text-gray-300">
							<input type="checkbox" checked={formData.agreeBookingFee} onChange={(e) => updateField("agreeBookingFee", e.target.checked)} />
							<span>I understand that a booking fee will be charged that is 15% of the artist fee.</span>
						</label>
					</>
				)}
			</div>

			{/* Turnstile */}
			<div id="turnstile-container" className="my-2"></div>

			{/* Submit */}
			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 disabled:opacity-60 transition-all"
			>
				{isSubmitting ? "Sending..." : "Send"}
			</button>

			{serverMessage && (
				<p className="text-sm text-gray-200">{serverMessage}</p>
			)}
		</form>
	);
}