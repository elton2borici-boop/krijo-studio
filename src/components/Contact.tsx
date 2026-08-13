"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Photo } from "./ui/Photo";
import { site, addressLine, telHref, whatsappHref } from "@/lib/site";

const packages = [
  { id: "vetem-faqja", label: "Vetëm Faqja · €299" },
  { id: "faqja-plus-domain", label: "Faqja + Domain · €399" },
  { id: "mirembajtje", label: "Mirëmbajtje · €29/muaj" },
  { id: "premium", label: "Gjithçka · €799" },
  { id: "tjeter", label: "Diçka tjetër / pyetje" },
];

/** Only the channels that are actually reachable — see src/lib/site.ts. */
function contactDetails() {
  const tel = telHref();
  const whatsapp = whatsappHref();
  const address = addressLine();

  return [
    { term: "Email", value: site.email, href: `mailto:${site.email}` },
    tel && site.phoneDisplay
      ? { term: "Telefon", value: site.phoneDisplay, href: tel }
      : null,
    whatsapp && site.phoneDisplay
      ? { term: "WhatsApp", value: site.phoneDisplay, href: whatsapp }
      : null,
    // Only claim a visitable studio once there is a street to visit — "Tiranë
    // — me takim" alone promises a place without saying where.
    site.street && address
      ? { term: "Studio", value: `${address} — me takim`, href: null }
      : null,
    site.openingHours
      ? { term: "Orari", value: site.openingHours, href: null }
      : null,
  ].filter(
    (d): d is { term: string; value: string; href: string | null } => Boolean(d)
  );
}

export function Contact() {
  const details = contactDetails();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || "Diçka shkoi keq. Provo përsëri.");
        return;
      }
      setSent(true);
      toast.success("Mesazhi u dërgua");
    } catch {
      toast.error("Nuk u lidh me serverin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="kontakt"
      className="relative isolate overflow-hidden bg-canvas py-20 sm:py-28"
    >
      {/* Mesh glow instead of a photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="mesh-blob mesh-a absolute -left-[10%] top-[10%] h-[55vh] w-[55vh] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(31,95,191,0.09), transparent 64%)" }}
        />
        <div
          className="mesh-blob mesh-b absolute -bottom-[20%] right-[-8%] h-[50vh] w-[50vh] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(91,63,212,0.07), transparent 66%)" }}
        />
      </div>

      <Container>
        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          {/* Left: bold statement */}
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="mb-5">kontakt</Eyebrow>

            <h2 className="serif text-balance text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.03em] text-fg">
              Le të <span className="text-gradient">flasim.</span><br />
              Një kafe ose<br />
              një email.
            </h2>

            <p className="mt-7 max-w-md text-[16px] leading-[1.6] text-fg-muted">
              Plotëso formularin këtu ose na shkruaj drejtpërdrejt &mdash; përgjigjemi brenda 24 orësh, me një propozim falas e pa asnjë angazhim.
            </p>

            {/* The headline offers a coffee; this is that coffee. */}
            <Photo
              src="/images/kafe.webp"
              alt="Një espresso dhe një bloknot mbi tavolinën e një kafenaje në Tiranë."
              width={1408}
              height={690}
              sizes="(min-width: 1024px) 460px, 100vw"
              className="mt-9 rounded-2xl border border-hairline shadow-[0_10px_30px_-14px_rgba(21,24,29,0.18)]"
            />

            <dl className="mt-12 flex flex-col gap-5 text-[14px]">
              {details.map((d) => (
                <div
                  key={d.term}
                  className="grid grid-cols-[80px_1fr] gap-3 border-t border-hairline pt-4"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                    {d.term}
                  </dt>
                  <dd className="text-fg">
                    {d.href ? (
                      <a href={d.href} className="link-underline text-fg">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: glass form */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            {sent ? (
              <div className="flex h-full min-h-[480px] flex-col items-start justify-center rounded-2xl glass p-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">faleminderit ✓</span>
                <h3 className="serif mt-5 text-[40px] font-extrabold leading-none text-fg">
                  Mesazhi u dërgua.
                </h3>
                <p className="mt-6 max-w-md text-[15px] leading-[1.65] text-fg-muted">
                  Po e shqyrtojmë kërkesën tënde dhe do të të përgjigjemi brenda 24 orësh. Ndërkohë, shijo një kafe.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="link-underline mt-10 text-[14px] font-medium text-fg"
                >
                  Dërgo një mesazh tjetër →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-2xl glass p-7 sm:p-9">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <Field label="Emri" name="name" placeholder="Arben Hoxha" required />
                <Field label="Email" name="email" type="email" placeholder="emri@biznesi.al" required />
                <div className="grid gap-0 sm:grid-cols-2 sm:gap-x-5">
                  <Field label="Telefon" name="phone" type="tel" placeholder="+355 69 ..." />
                  <Field label="Biznesi" name="business" placeholder="Aroma Café" />
                </div>

                {/* Margin, not padding: a <legend> sits in the fieldset's
                    border box and ignores its padding-top, so pt-* left the
                    label jammed against the field above. */}
                <fieldset className="mt-5">
                  <legend className="mb-2 text-[13px] font-medium text-fg">
                    Më intereson
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {packages.map((p, i) => (
                      <label
                        key={p.id}
                        className="group flex cursor-pointer items-center gap-3 rounded-[10px] border border-hairline-strong bg-white px-4 py-3 text-[14px] text-fg-muted transition-colors hover:border-fg-muted has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-fg has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent has-[:focus-visible]:outline-offset-2"
                      >
                        <input
                          type="radio"
                          name="package"
                          value={p.id}
                          defaultChecked={i === 1}
                          className="sr-only"
                        />
                        {/* Radio mark, drawn so the selected state is visible
                            without relying on colour alone. */}
                        <span
                          aria-hidden
                          className="grid size-[18px] shrink-0 place-items-center rounded-full border border-hairline-strong transition-colors group-has-[:checked]:border-accent"
                        >
                          <span className="size-2 scale-0 rounded-full bg-accent transition-transform group-has-[:checked]:scale-100" />
                        </span>
                        {p.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field label="Trego pak për projektin" name="message" textarea placeholder="Kam një restorant në Tiranë dhe dua një faqe me menu, rezervime online..." required />

                <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-[12px] leading-relaxed text-fg-muted">
                    Duke dërguar këtë formular, pranon përpunimin e të dhënave
                    për qëllim kontakti. Lexo{" "}
                    <Link href="/privatesia" className="link-underline text-fg">
                      politikën e privatësisë
                    </Link>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-[10px] bg-accent-deep px-7 text-[14px] font-semibold text-white shadow-[0_6px_18px_-8px_rgba(31,95,191,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {loading ? "Duke dërguar..." : "Dërgo mesazhin"}
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const id = `kontakt-${name}`;
  // Bounded box, not a hairline underline. `hairline-strong` is 3.51:1, which clears the
  // non-text contrast floor (WCAG 1.4.11) that the old 12% rule failed at
  // 1.30:1 — and a visible box is what non-technical users read as "type here".
  const inputClasses =
    "block w-full rounded-[10px] border border-hairline-strong bg-white px-4 py-3 text-[16px] text-fg transition-colors placeholder:text-fg-placeholder placeholder:text-[14px] hover:border-fg-muted focus:border-accent focus:ring-2 focus:ring-accent-soft focus:outline-none focus-visible:outline-2 focus-visible:outline-accent/80 focus-visible:outline-offset-2";
  return (
    <div className="pt-5">
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-medium text-fg"
      >
        {label}{" "}
        {required && (
          <span className="text-accent" aria-hidden>
            *
          </span>
        )}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          required={required}
          placeholder={placeholder}
          className={`${inputClasses} resize-none leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}
