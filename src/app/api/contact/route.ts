// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ensure Node runtime
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  company: z.string().optional(), // honeypot
  startedAt: z.number().optional(),
});

const CONTACT_TO = process.env.CONTACT_TO || process.env.SMTP_USER || "";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true", // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      // return zod-like structure for your client
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] || "message");
        fieldErrors[key] = [issue.message];
      }
      return NextResponse.json({ ok: false, errors: { fieldErrors } }, { status: 422 });
    }

    const { name, email, phone, message, company, startedAt } = parsed.data;

    // Bot checks
    if (company && company.trim() !== "") {
      // pretend success to not clue in bots
      return NextResponse.json({ ok: true });
    }
    if (startedAt && Date.now() - startedAt < 1500) {
      // too fast, likely a bot
      return NextResponse.json({ ok: true });
    }

    if (!CONTACT_TO) {
      console.error("CONTACT_TO/SMTP_USER not set");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const subject = `New contact: ${name}`;
    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system;line-height:1.5;color:#0b0b0b">
        <h2 style="margin:0 0 12px 0">New message from ${escapeHtml(name)}</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#fafafa;padding:12px;border-radius:8px;border:1px solid #eee">${escapeHtml(
          message
        )}</pre>
      </div>
    `;
    const text = `From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}

${message}
`;

    await transporter.sendMail({
      to: CONTACT_TO,
      from: `"Portfolio Contact" <${process.env.SMTP_FROM || CONTACT_TO}>`,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
