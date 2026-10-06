import type { Metadata } from "next";
import { listContacts } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Krijo Studio",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const rows = listContacts(500);

  return (
    <main id="permbajtja" className="mx-auto max-w-6xl px-4 py-12 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-2 border-b border-hairline pb-6">
        <p className="text-xs uppercase tracking-[0.14em] text-accent">
          Admin · Krijo Studio
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Mesazhet e kontaktit
        </h1>
        <p className="text-sm text-fg-muted">
          {rows.length === 0
            ? "Asnjë mesazh deri tani."
            : `${rows.length} mesazh${rows.length === 1 ? "" : "e"} në bazën e të dhënave.`}
        </p>
      </header>

      {rows.length === 0 ? (
        <div className="mt-12 rounded-card border border-dashed border-hairline p-10 text-center text-fg-muted">
          Pasi dikush dërgon formularin e kontaktit, do të shfaqet këtu.
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {rows.map((r) => (
            <li
              key={r.id}
              className="card p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="tabular-nums text-xs text-fg-muted">
                    #{r.id}
                  </span>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
                    {r.name}
                  </h2>
                  <a
                    href={`mailto:${r.email}`}
                    className="text-sm text-accent underline-offset-4 hover:underline"
                  >
                    {r.email}
                  </a>
                </div>
                <time
                  dateTime={r.created_at.replace(" ", "T") + "Z"}
                  className="tabular-nums text-xs uppercase tracking-wide text-fg-muted"
                >
                  {r.created_at} UTC
                </time>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-fg-muted sm:grid-cols-4">
                {r.phone && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fg-muted">
                      Tel
                    </dt>
                    <dd className="text-fg">{r.phone}</dd>
                  </div>
                )}
                {r.business && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fg-muted">
                      Biznesi
                    </dt>
                    <dd className="text-fg">{r.business}</dd>
                  </div>
                )}
                {r.package && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fg-muted">
                      Pakoja
                    </dt>
                    <dd className="text-fg">{r.package}</dd>
                  </div>
                )}
                {r.ip && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fg-muted">
                      IP
                    </dt>
                    <dd className="text-fg">{r.ip}</dd>
                  </div>
                )}
              </dl>

              <p className="mt-4 whitespace-pre-wrap rounded-md border border-hairline bg-canvas p-3 text-sm leading-relaxed text-fg">
                {r.message}
              </p>

              {r.user_agent && (
                <p className="mt-3 truncate text-xs text-fg-muted">
                  {r.user_agent}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
