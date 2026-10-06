"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { packages, formatPrice, OTHER_OPTION } from "@/content/packages";

const interestOptions = [
  ...packages.map((p) => ({
    id: p.id as string,
    label: `${p.name} · ${formatPrice(p)}`,
    starred: p.starred,
  })),
  { ...OTHER_OPTION, starred: false },
];

/** The enquiry form, and its thank-you state once sent. */
export function ContactForm() {
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

  return sent ? (
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
          {interestOptions.map((p) => (
            <label
              key={p.id}
              className="group flex cursor-pointer items-center gap-3 rounded-[10px] border border-hairline-strong bg-white px-4 py-3 text-[14px] text-fg-muted transition-colors hover:border-fg-muted has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-fg has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent has-[:focus-visible]:outline-offset-2"
            >
              <input
                type="radio"
                name="package"
                value={p.id}
                defaultChecked={p.starred}
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
