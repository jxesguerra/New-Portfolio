// POST /.netlify/functions/send-code   { email, website }
// Emails a 6-digit code to the visitor and returns a signed token.
// The code is NOT stored anywhere and NOT returned to the browser.
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

  if (data.website) return json(200, { ok: true }); // honeypot: bots fill this in

  const email = String(data.email || "")
    .trim()
    .toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return json(400, { error: "Please enter a valid email address." });

  const code = String(crypto.randomInt(0, 1000000)).padStart(6, "0");
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  const token = `${expires}.${sign(`${email}|${code}|${expires}|0`)}`;

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
      from: `"Xairon's Portfolio" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your verification code: ${code}`,
      text:
        `Your verification code is ${code}\n\n` +
        `Enter it on the contact form to send your message. It expires in 10 minutes.\n\n` +
        `If you didn't request this, you can ignore this email.`,
    });
  } catch (err) {
    console.error("send-code mail error:", err.message);
    return json(502, {
      error: "Couldn't send the code. Please try again later.",
    });
  }
  return json(200, { ok: true, token });
};
