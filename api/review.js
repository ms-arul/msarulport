import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

const escapeHTML = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, message, link } = req.body || {};

  if (!name || !message || typeof name !== "string" || typeof message !== "string") {
    return res.status(400).json({ success: false, message: "Name and message are required" });
  }

  try {
    const transporterInstance = getTransporter();
    const receiverEmail = process.env.RECEIVER_EMAIL || process.env.SMTP_USER;

    const safeName = escapeHTML(name.trim());
    const safeLink = link ? escapeHTML(link.trim()) : "Not Provided";
    const safeMessage = escapeHTML(message.trim()).replace(/\n/g, "<br/>");

    const mailOptions = {
      from: `"Portfolio Reviews" <${process.env.SMTP_USER}>`,
      to: receiverEmail,
      subject: `⭐ New Review from ${safeName}`,
      html: `
        <div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:0;">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:28px 24px;border-radius:12px 12px 0 0;">
            <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">
              ⭐ New Client Review Received
            </h2>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:12px;">
              Submitted from your Testimonials Page
            </p>
          </div>

          <!-- Body -->
          <div style="background:#ffffff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;">
            <!-- Client Name -->
            <div style="margin-bottom:16px;">
              <div style="font-size:11px;text-transform:uppercase;color:#94a3b8;font-weight:700;letter-spacing:1px;margin-bottom:4px;">Client Name</div>
              <div style="font-size:15px;color:#1e293b;font-weight:600;">${safeName}</div>
            </div>

            <!-- Optional Link -->
            <div style="margin-bottom:16px;">
              <div style="font-size:11px;text-transform:uppercase;color:#94a3b8;font-weight:700;letter-spacing:1px;margin-bottom:4px;">Optional Link</div>
              <div style="font-size:14px;color:#3b82f6;font-weight:500;">
                ${safeLink !== "Not Provided" ? `<a href="${safeLink}" target="_blank">${safeLink}</a>` : safeLink}
              </div>
            </div>

            <!-- Message -->
            <div style="margin-bottom:16px;">
              <div style="font-size:11px;text-transform:uppercase;color:#94a3b8;font-weight:700;letter-spacing:1px;margin-bottom:8px;">Review Message</div>
              <div style="font-size:14px;color:#334155;line-height:1.7;padding:16px;background:#f8fafc;border-radius:10px;border-left:3px solid #7c3aed;font-style:italic;">
                "${safeMessage}"
              </div>
            </div>
          </div>
        </div>
      `,
    };

    await transporterInstance.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Review submitted successfully ✅",
    });
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({
      success: false,
      message: "Submission failed ❌",
    });
  }
}
