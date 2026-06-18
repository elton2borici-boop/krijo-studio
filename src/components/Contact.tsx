"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";

const packages = [
  { id: "vetem-faqja", label: "I — Vetëm Faqja · €299" },
  { id: "faqja-plus-domain", label: "II — Faqja + Domain · €399" },
  { id: "mirembajtje", label: "III — Mirëmbajtje · €29/muaj" },
  { id: "premium", label: "IV — Gjithçka · €799" },
  { id: "tjeter", label: "Diçka tjetër / pyetje" },
];

export function Contact() {
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
    <section id="kontakt" className="section-accent-hairline relative overflow-hidden border-t border-ink/70 bg-ink py-16 text-paper sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/contact-portfolio.png"
          alt=""
          fill
          sizes="100vw"
          className="ambient-drift photo-soft object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-ink/85" />
      </div>
      <Container>
        <div className="relative z-10 grid grid-cols-12 gap-x-8 gap-y-14">
          {/* Left: bold statement */}
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="mb-5 text-paper/55">Kontakt</Eyebrow>

            <h2 className="serif text-balance text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium leading-[1] tracking-[-0.02em]">
              Le të <span className="italic text-accent-mute">flasim.</span><br />
              Një kafe ose<br />
              një email.
            </h2>

            <p className="mt-7 max-w-md text-[16px] leading-[1.6] text-paper/70">
              Plotëso formularin këtu ose na shkruaj drejtpërdrejt &mdash; përgjigjemi brenda 24 orësh, me një propozim falas e pa asnjë angazhim.
            </p>

            <dl className="mono mt-12 flex flex-col gap-5 text-[12px] uppercase">
              <div className="grid grid-cols-[80px_1fr] gap-3 border-t border-paper/15 pt-4">
                <dt className="text-paper/50">Email</dt>
                <dd>
                  <a href="mailto:pershendetje@krijo.studio" className="link-underline text-paper">
                    pershendetje@krijo.studio
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-3 border-t border-paper/15 pt-4">
                <dt className="text-paper/50">Telefon</dt>
                <dd>
                  <a href="tel:+355695550123" className="link-underline text-paper">+355 69 555 0123</a>
                </dd>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-3 border-t border-paper/15 pt-4">
                <dt className="text-paper/50">WhatsApp</dt>
                <dd>
                  <a href="https://wa.me/355695550123" className="link-underline text-paper">+355 69 555 0123</a>
                </dd>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-3 border-t border-paper/15 pt-4">
                <dt className="text-paper/50">Studio</dt>
                <dd className="text-paper">Rr. Myslym Shyri, Tiranë &mdash; me takim</dd>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-3 border-t border-paper/15 pt-4">
                <dt className="text-paper/50">Orari</dt>
                <dd className="text-paper">E hënë &mdash; E premte · 09:00 &mdash; 19:00</dd>
              </div>
            </dl>
          </div>

          {/* Right: paper-style form */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            {sent ? (
              <div className="flex h-full min-h-[480px] flex-col items-start justify-center border border-paper/15 p-10">
                <span className="mono text-[11px] uppercase text-paper/55">Faleminderit ✓</span>
                <h3 className="serif mt-5 text-[44px] leading-none">
                  Mesazhi u dërgua.
                </h3>
                <p className="mt-6 max-w-md text-[15px] leading-[1.65] text-paper/70">
                  Po e shqyrtojmë kërkesën tënde dhe do të të përgjigjemi brenda 24 orësh. Ndërkohë, shijo një kafe.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mono link-underline mt-10 text-[12px] uppercase text-paper"
                >
                  Dërgo një mesazh tjetër →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="border border-paper/15 p-7 sm:p-10">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <Field label="Emri" name="name" placeholder="Arben Hoxha" required />
                <Field label="Email" name="email" type="email" placeholder="emri@biznesi.al" required />
                <div className="grid gap-0 sm:grid-cols-2">
                  <Field label="Telefon" name="phone" type="tel" placeholder="+355 69 ..." />
                  <Field label="Biznesi" name="business" placeholder="Aroma Café" />
                </div>

                <fieldset className="border-b border-paper/15 py-5">
                  <legend className="mono text-[11px] uppercase text-paper/50">Më intereson</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {packages.map((p, i) => (
                      <label
                        key={p.id}
                        className="mono cursor-pointer border border-paper/20 px-3 py-2 text-[11px] uppercase text-paper/80 transition-colors has-[:checked]:border-paper has-[:checked]:bg-paper has-[:checked]:text-ink hover:border-paper/50"
                      >
                        <input type="radio" name="package" value={p.id} defaultChecked={i === 1} className="sr-only" />
                        {p.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field label="Trego pak për projektin" name="message" textarea placeholder="Kam një restorant në Tiranë dhe dua një faqe me menu, rezervime online..." required />

                <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="mono text-[10px] uppercase text-paper/40">
                    Duke dërguar, pranon politikën e privatësisë.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mono inline-flex h-12 items-center justify-center gap-3 bg-paper px-7 text-[12px] uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
                  >
                    {loading ? "Duke dërguar..." : "Dërgo mesazhin"}
                    <span>→</span>
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
  const inputClasses =
    "block w-full bg-transparent text-[18px] serif text-paper placeholder:text-paper/30 placeholder:font-sans placeholder:text-[14px] focus:outline-none focus-visible:outline-2 focus-visible:outline-accent-mute/80 focus-visible:outline-offset-4";
  return (
    <div
      className={`grid grid-cols-12 gap-3 border-b border-paper/15 pt-5 pb-3 ${
        textarea ? "items-start" : "items-end"
      }`}
    >
      <label
        htmlFor={id}
        className={`mono col-span-12 text-[11px] uppercase text-paper/50 sm:col-span-3 ${
          textarea ? "sm:pt-2" : "sm:pb-[2px]"
        }`}
      >
        {label}{" "}
        {required && <span className="text-paper/45">*</span>}
      </label>
      <div className="col-span-12 sm:col-span-9">
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
            className={`${inputClasses} pb-1`}
          />
        )}
      </div>
    </div>
  );
}
