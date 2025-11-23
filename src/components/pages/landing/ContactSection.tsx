"use client";

import * as React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FrostPlate from "@/components/FrostPlate";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "A bit more detail helps"),
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
      if (res.ok) {
        formRef.current?.reset();
      } else if (data.errors) {
        // zod server-side errors (rare because we validate client-side)
        const map: Record<string, string> = {};
        Object.entries<any>(data.errors.fieldErrors || {}).forEach(([k, v]) => {
          map[k] = Array.isArray(v) ? v[0] : String(v);
        });
        setErrors(map);
      }
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
      {/* Wrapper that defines the plate area */}
      <div ref={cardRef} className="relative mx-auto max-w-3xl">
        {/* The frosted plate is rendered globally, aligned to this rect */}
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

          <div className="relative z-10 mx-auto grid max-w-3xl gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <form ref={formRef} onSubmit={onSubmit}>
              {/* honeypot (hidden) */}
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
                label="Message"
                name="message"
                as="textarea"
                rows={6}
                placeholder="What are you building?"
                error={errors.message}
              />

              <div className="mt-2 flex items-center justify-between gap-3">
                <small className="text-white/60">
                  I’ll reply within 24–48h. Your info stays private.
                </small>

                <Button
                  variant="animated-gradient"
                  className="min-w-36"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send message"}
                </Button>
              </div>

              {/* status */}
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
