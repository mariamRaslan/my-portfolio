// app/(site)/_sections/ContactSection.tsx (or wherever you keep it)
"use client";

import * as React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FrostPlate from "@/components/FrostPlate";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";
const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || "+20 10 0000 0000";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[\d+\-()\s]{7,20}$/.test(v), "Enter a valid phone"),
  message: z.string().min(10, "A bit more detail helps"),
  company: z.string().optional(), // honeypot
  startedAt: z.number().optional(),
});

export default function ContactSection() {
  const [startedAt] = React.useState<number>(() => Date.now());
  const [loading, setLoading] = React.useState(false);
  const [ok, setOk] = React.useState<null | boolean>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setOk(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // honeypot
      startedAt,
    };

    const parsed = Schema.safeParse(payload);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach(
        (i) => (map[i.path[0] as string] = i.message),
      );
      setErrors(map);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setOk(Boolean(data.ok) && res.ok);
      if (res.ok) formRef.current?.reset();
      else if (data.errors) setErrors(data.errors);
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-20"
      style={{ ["--brand" as any]: "#9780ff" }}
    >
      <div ref={cardRef} className="relative mx-auto max-w-5xl">
        <FrostPlate target={cardRef} radius={16} blur={20} />

        <div className="container px-4">
          <header className="relative z-10 mb-8 text-center">
            <p className="mx-auto inline-flex rounded-[var(--radius)] bg-[var(--brand)]/12 px-3 py-1 text-xs font-semibold text-[var(--brand)] ring-1 ring-[var(--brand)]/30">
              Get in touch
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-balance text-white md:text-5xl">
              Let’s build something
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-white/70">
              Tell me a bit about your project and how I can help.
            </p>
          </header>

          <div className="relative z-10 mx-auto flex flex-col items-center gap-10 rounded-2xl border border-white/10 bg-white/5 sm:px-6 py-8 backdrop-blur-xl max-w-3xl">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 px-8">
              {" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 transition hover:bg-white/10"
              >
                <Mail size={16} /> {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 transition hover:bg-white/10"
              >
                <Phone size={16} /> {CONTACT_PHONE}
              </a>
            </div>
            {/* Divider + label */}
            <div className="w-full px-8">
              <div className="flex items-center   gap-3">
                  <span aria-hidden className="h-px flex-1 bg-white/15" />

                <p className="shrink-0 text-xs whitespace-nowrap text-white/60">
                  Or use the form
                </p>
                    <span aria-hidden className="h-px flex-1 bg-white/15" />

              </div>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="grid w-full gap-4 px-4  sm:px-8"
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Your name"
                  name="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  error={errors.email}
                />
              </div>

              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+20 10 1234 5678"
                error={errors.phone}
              />

              <Field
                label="Message"
                name="message"
                as="textarea"
                rows={6}
                placeholder="What are you building?"
                error={errors.message}
              />

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <small className="text-white/60">
                  I’ll reply within 24–48h. Your info stays private.
                </small>
                <Button
                  variant="animated-gradient"
                  className="w-36 ms-auto"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send message"}
                </Button>
              </div>

              {ok === true && (
                <p role="status" className="text-emerald-400">
                  Thanks! Your message is on its way.
                </p>
              )}
              {ok === false && (
                <p role="status" className="text-rose-400">
                  Sorry—something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
           <div className="mx-auto mt-5 w-full  flex justify-center items-center gap-3">
                    <a
                      href="https://github.com/mariamRaslan"
                      target="_blank"
                      className="rounded-lg border border-white/10 p-2 text-white/80 hover:bg-white/10"
                      aria-label="GitHub"
                    >
                      <Github className="size-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mariam-raslan-0a02b1192"
                      target="_blank"
                      className="rounded-lg border border-white/10 p-2 text-white/80 hover:bg-white/10"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                    <a
                      href="mailto:mariamraslan231@gmail.com"
                      className="rounded-lg border border-white/10 p-2 text-white/80 hover:bg-white/10"
                      aria-label="Email"
                    >
                      <Mail className="size-5" />
                    </a>
                  </div>
        </div>
      </div>
    </section>
  );
}

function Field(
  props: {
    label: string;
    name: string;
    error?: string;
    as?: "input" | "textarea";
  } & React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const { label, name, error, as = "input", ...rest } = props;
  const Comp: any = as;
  return (
    <label className="grid gap-1.5">
      <span className="text-sm text-white/80">{label}</span>
      <Comp
        name={name}
        className={[
          "w-full rounded-[var(--radius)] border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40",
          "focus:ring-2 focus:ring-[#9780ff] focus:ring-offset-0 focus:outline-none",
        ].join(" ")}
        aria-invalid={!!error}
        {...rest}
      />
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </label>
  );
}
