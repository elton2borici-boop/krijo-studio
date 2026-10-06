"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { packages, formatPrice, OTHER_OPTION } from "@/content/packages";
import { Button } from "@/components/ui/Button";

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
  const [error, setError] = useState<string | null>(null);
  const thanksRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users land
  // on it — the form they were in has just been unmounted.
  useEffect(() => {
    if (sent) thanksRef.current?.focus();
  }, [sent]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Diçka shkoi keq. Provo përsëri.");
        return;
      }
      setSent(true);
    } catch {
      setError("Nuk u lidh me serverin.");
    } finally {
      setLoading(false);
    }
  }

  return sent ? (
    <div
      ref={thanksRef}
      tabIndex={-1}
      role="status"
      className="card flex h-full min-h-[480px] flex-col items-start justify-center p-8 outline-none sm:p-10"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        faleminderit ✓
      </span>
      <h3 className="mt-5 font-display text-4xl font-extrabold leading-none text-fg">
        Mesazhi u dërgua.
      </h3>
      <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted">
        Po e shqyrtojmë kërkesën tënde dhe do të të përgjigjemi brenda 24
        orësh. Ndërkohë, shijo një kafe.
      </p>
      <button
        type="button"
        onClick={() => setSent(false)}
        className="link-underline mt-10 text-sm font-medium text-accent"
      >
        Dërgo një mesazh tjetër →
      </button>
    </div>
  ) : (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-col gap-5">
        <Field label="Emri" name="name" autoComplete="name" placeholder="Arben Hoxha" required />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="emri@biznesi.al" required />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Telefon" name="phone" type="tel" autoComplete="tel" placeholder="+355 69 ..." />
          <Field label="Biznesi" name="business" autoComplete="organization" placeholder="Aroma Café" />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-fg">
            Më intereson
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {interestOptions.map((p) => (
              <label
                key={p.id}
                className="group flex cursor-pointer items-center gap-3 rounded-control border border-hairline-strong bg-surface px-4 py-3 text-sm text-fg-muted transition-colors hover:border-fg-muted has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-fg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
              >
                <input
                  type="radio"
                  name="package"
                  value={p.id}
                  defaultChecked={p.starred}
                  className="sr-only"
                />
                {/* Drawn radio mark, so the selected state doesn't rely on
                    colour alone. */}
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

        <Field
          label="Trego pak për projektin"
          name="message"
          textarea
          placeholder="Kam një restorant në Tiranë dhe dua një faqe me menu, rezervime online..."
          required
        />
      </div>

      <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-fg-muted">
          Duke dërguar këtë formular, pranon përpunimin e të dhënave për
          qëllim kontakti. Lexo{" "}
          <Link href="/privatesia" className="text-fg underline underline-offset-4 hover:text-accent">
            politikën e privatësisë
          </Link>
          .
        </p>
        <Button
          type="submit"
          aria-describedby={error ? "kontakt-error" : undefined}
          disabled={loading}
          className="shrink-0"
        >
          {loading ? "Duke dërguar..." : "Dërgo mesazhin"}
          <span aria-hidden>→</span>
        </Button>
      </div>

      {/* Always mounted so screen readers announce the message when it appears. */}
      <p
        id="kontakt-error"
        role="alert"
        className="mt-4 text-sm font-medium text-danger empty:hidden"
      >
        {error}
      </p>
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
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const id = `kontakt-${name}`;
  // A bounded box (line-strong clears the 3:1 non-text contrast floor) reads
  // as "type here" to non-technical visitors; focus adds an accent ring.
  const inputClasses =
    "block w-full rounded-control border border-hairline-strong bg-surface px-4 py-3 text-base text-fg transition-colors placeholder:text-sm placeholder:text-fg-placeholder hover:border-fg-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent-soft";
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden>
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
          className={`${inputClasses} resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClasses}
        />
      )}
    </div>
  );
}
