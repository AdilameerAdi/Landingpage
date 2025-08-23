import { NextResponse } from "next/server";

async function verifyTurnstile(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If not configured, fail closed to avoid spam in production
    return false;
  }
  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token || "");
    if (remoteIp) formData.append("remoteip", remoteIp);

    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const data = await result.json();
    return !!data.success;
  } catch (e) {
    return false;
  }
}

function buildDiscordEmbed(payload) {
  const {
    name,
    company,
    eventName,
    email,
    countryDial,
    phoneRest,
    artists,
    isMultiDay,
    dateSingle,
    dateStart,
    dateEnd,
    country,
    venue,
    message,
    agreeGDPR,
    confirmCorrect,
    agreeAccommodation,
    agreeBookingFee,
  } = payload;

  const phone = [countryDial, phoneRest].filter(Boolean).join(" ");
  const dateLine = artists?.length
    ? (isMultiDay ? `${dateStart || "?"} → ${dateEnd || "?"}` : dateSingle || "?")
    : "(not provided)";

  const fields = [
    { name: "Name", value: name || "-", inline: true },
    { name: "Company", value: company || "-", inline: true },
    { name: "Business Email", value: email || "-", inline: false },
    { name: "Phone", value: phone || "-", inline: false },
    { name: "Artists of interest", value: (artists && artists.length ? artists.join(", ") : "None") , inline: false },
    { name: "Event Name", value: eventName || "-", inline: false },
    { name: "Date", value: dateLine, inline: true },
    { name: "Country", value: country || (artists?.length ? "(required, missing)" : "(optional)") , inline: true },
    { name: "Venue", value: venue || (artists?.length ? "(required, missing)" : "(optional)") , inline: true },
    { name: "GDPR", value: agreeGDPR ? "Yes" : "No", inline: true },
    { name: "Confirm Data Correct", value: confirmCorrect ? "Yes" : "No", inline: true },
  ];

  if (artists?.length) {
    fields.push(
      { name: "Organizer covers logistics", value: agreeAccommodation ? "Yes" : "No", inline: true },
      { name: "15% booking fee acknowledged", value: agreeBookingFee ? "Yes" : "No", inline: true },
    );
  }

  return {
    title: "New Contact Request",
    color: 0xFACC15, // Tailwind yellow-400
    fields,
    description: message || "(no message)",
    timestamp: new Date().toISOString(),
  };
}

function badRequest(error) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));

  const {
    name,
    company,
    email,
    eventName,
    countryDial,
    phoneRest,
    artists = [],
    isMultiDay,
    dateSingle,
    dateStart,
    dateEnd,
    country,
    venue,
    message,
    agreeGDPR,
    confirmCorrect,
    agreeAccommodation,
    agreeBookingFee,
    turnstileToken,
  } = body || {};

  if (!name || !company) return badRequest("Name and Company are required");
  if (!email || !/.+@.+\..+/.test(email)) return badRequest("Valid email is required");
  if (!agreeGDPR) return badRequest("GDPR consent required");
  if (!confirmCorrect) return badRequest("Data accuracy confirmation required");

  if (Array.isArray(artists) && artists.length > 0) {
    if (isMultiDay) {
      if (!dateStart || !dateEnd) return badRequest("Start and end dates are required");
    } else {
      if (!dateSingle) return badRequest("Date is required when artist is selected");
    }
    if (!country) return badRequest("Country is required when artist is selected");
    if (!venue) return badRequest("Venue is required when artist is selected");
    if (!agreeAccommodation) return badRequest("Accommodation acknowledgement required");
    if (!agreeBookingFee) return badRequest("Booking fee acknowledgement required");
  }

  const remoteIp = req.headers.get("x-forwarded-for")?.split(",")[0];
  const captchaOk = await verifyTurnstile(turnstileToken, remoteIp);
  if (!captchaOk) return badRequest("Captcha verification failed");

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return badRequest("Server not configured: Discord webhook missing");

  const embed = buildDiscordEmbed(body);
  try {
    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
    if (!resp.ok) {
      return NextResponse.json({ error: "Failed to send to Discord" }, { status: 502 });
    }
  } catch (e) {
    return NextResponse.json({ error: "Network error sending to Discord" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}