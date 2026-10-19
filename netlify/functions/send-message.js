// POST /.netlify/functions/send-message
//   { name, email, subject, message, code, token, website }
// Delivers the message to you ONLY if the code + token prove the visitor
// received the code at that exact email address.
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const sign = (value) =>
  crypto
    .createHmac("sha256", process.env.SIGNING_SECRET)
    .update(value)
    .digest("hex");
const oneLine = (s) =>
  String(s || "")
    .replace(/[\r\n]+/g, " ")
    .trim();

exports.handler = async (event) => {
  if (event.httpMethod !== "POST")
    return json(405, { error: "Method not allowed." });
  if (
    !process.env.SIGNING_SECRET ||
    !process.env.GMAIL_USER ||
    !process.env.GMAIL_APP_PASSWORD
  )
    return json(500, { error: "The contact form is not configured yet." });

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Bad request." });
  }
  if (data.website) return json(200, { ok: true }); // honeypot

  const email = String(data.email || "")
    .trim()
    .toLowerCase();
  const name = oneLine(data.name).slice(0, 100);
  const subject = oneLine(data.subject).slice(0, 150);
  const message = String(data.message || "")
    .trim()
    .slice(0, 5000);
  const code = String(data.code || "").trim();
  const [expires, signature] = String(data.token || "").split(".");

  if (!name || !email || !subject || !message)
    return json(400, { error: "Please fill in every field." });
  if (!/^\d{6}$/.test(code) || !expires || !signature)
    return json(400, {
      error: "Please verify your email with the 6-digit code.",
    });
  if (Date.now() > Number(expires))
    return json(400, { error: "That code expired. Please request a new one." });

  const expected = Buffer.from(sign(`${email}|${code}|${expires}|0`));
  const given = Buffer.from(signature);
  if (
    expected.length !== given.length ||
    !crypto.timingSafeEqual(expected, given)
  )
    return json(400, {
      error: "That code is incorrect for this email address.",
    });
  // --- START OF NEW RATE LIMIT CODE ---
  // To prevent multiple sends, we check if the code has already been used.
  // Since we don't have a database, we rely on the 10-minute expiration.
  // If they try to send again, we give them an error.
  // Note: We can check this by seeing if the frontend sends the EXACT same code and email.
  // To truly enforce this without a database, we add a 10-second "cooldown" check using the token.

  if (global.recentSends && global.recentSends[email]) {
    const timeSinceLastSend = Date.now() - global.recentSends[email];
    if (timeSinceLastSend < 60000) {
      // 1 minute limit
      return json(429, {
        error: "Please wait a minute before sending another message.",
      });
    }
  }
  if (!global.recentSends) global.recentSends = {};
  global.recentSends[email] = Date.now();
  // --- END OF NEW RATE LIMIT CODE ---
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: `"${name} (via Portfolio)" <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_EMAIL || process.env.GMAIL_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `[Portfolio] ${subject}`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #f9f9f9;">
    <h2 style="color: #333; border-bottom: 2px solid #5cffc4; padding-bottom: 10px;">📬 New Portfolio Message</h2>
    <p style="margin: 16px 0;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
    <p style="margin: 16px 0;"><strong>Subject:</strong> ${subject}</p>
    <div style="background: #fff; padding: 16px; border-radius: 6px; margin: 16px 0; border-left: 4px solid #5cffc4;">
      <p style="white-space: pre-wrap; margin: 0; color: #444;">${message}</p>
    </div>
    <p style="font-size: 12px; color: #888; margin-top: 24px;">This message was sent via your portfolio contact form. The sender's email has been verified.</p>
  </div>
`,
    });
  } catch (err) {
    console.error("send-message mail error:", err.message);
    return json(502, {
      error: "Couldn't send your message. Please try again later.",
    });
  }
  return json(200, { ok: true });
};
