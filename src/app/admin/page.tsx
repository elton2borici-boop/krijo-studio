import { listContacts } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const rows = listContacts(500);

  return (
    <main id="permbajtja" className="mx-auto max-w-[1240px] px-6 py-12 sm:px-10 lg:px-14">
      <header className="flex flex-col gap-2 border-b border-hairline pb-6">
        <p className="mono text-[11px] uppercase tracking-[0.14em] text-accent">
          Admin · Krijo Studio
        </p>
        <h1 className="serif text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Mesazhet e kontaktit
        </h1>
        <p className="text-[14px] text-fg-muted">
          {rows.length === 0
            ? "Asnjë mesazh deri tani."
            : `${rows.length} mesazh${rows.length === 1 ? "" : "e"} në bazën e të dhënave.`}
        </p>
      </header>

      {rows.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-hairline p-10 text-center text-fg-muted">
          Pasi dikush dërgon formularin e kontaktit, do të shfaqet këtu.
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {rows.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-hairline bg-canvas-raised/55 p-5 shadow-[0_3px_12px_-5px_rgba(28,24,19,0.16)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="mono tnum text-[11px] text-fg-muted">
                    #{r.id}
                  </span>
                  <h2 className="serif text-[19px] font-semibold tracking-tight text-fg">
                    {r.name}
                  </h2>
                  <a
                    href={`mailto:${r.email}`}
                    className="text-[13px] text-accent underline-offset-4 hover:underline"
                  >
                    {r.email}
                  </a>
                </div>
                <time
                  dateTime={r.created_at.replace(" ", "T") + "Z"}
                  className="mono tnum text-[11px] uppercase tracking-wide text-fg-muted"
                >
                  {r.created_at} UTC
                </time>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[13px] text-fg-muted sm:grid-cols-4">
                {r.phone && (
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-wide text-fg-muted/70">
                      Tel
                    </dt>
                    <dd className="text-fg">{r.phone}</dd>
                  </div>
                )}
                {r.business && (
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-wide text-fg-muted/70">
                      Biznesi
                    </dt>
                    <dd className="text-fg">{r.business}</dd>
                  </div>
                )}
                {r.package && (
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-wide text-fg-muted/70">
                      Pakoja
                    </dt>
                    <dd className="text-fg">{r.package}</dd>
                  </div>
                )}
                {r.ip && (
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-wide text-fg-muted/70">
                      IP
                    </dt>
                    <dd className="text-fg">{r.ip}</dd>
                  </div>
                )}
              </dl>

              <p className="mt-4 whitespace-pre-wrap rounded-md border border-hairline bg-canvas/85 p-3 text-[14px] leading-relaxed text-fg">
                {r.message}
              </p>

              {r.user_agent && (
                <p className="mono mt-3 truncate text-[10px] text-fg-muted/70">
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
