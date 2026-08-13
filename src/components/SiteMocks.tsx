/**
 * Illustrative mini-sites, drawn in CSS at ~360px with 6-13px type.
 *
 * These live apart from any one section because the format picker shows them
 * as worked examples of each structure. They are inventions, not client work,
 * and the copy around them says so.
 */

/* Mock 1 — gastronomi: foto-first, menu e lexueshme, rezervim i dukshëm.
   The old version leaned on a dark chocolate gradient panel that read as mud
   against the light page and dated the whole section. Same restaurant, same
   structure — now a single clay accent on warm paper, with the hero band
   carrying an actual dish rather than a brown rectangle. */
export function GastroPreview() {
  return (
    <div className="flex h-full flex-col bg-[#fdfaf5] text-[#2a2118]">
      <div className="flex items-center justify-between border-b border-[#2a2118]/10 px-4 py-2.5">
        <span className="serif text-[11px] font-semibold tracking-tight">Bukë &amp; Verë</span>
        <span className="flex items-center gap-2.5 text-[6.5px] uppercase tracking-[0.12em] text-[#2a2118]/55">
          <span>Menuja</span>
          <span>Historia</span>
          <span className="rounded-[3px] bg-[#a8451f] px-1.5 py-0.5 text-white">Rezervo</span>
        </span>
      </div>

      <div className="relative mx-3 mt-2.5 flex h-[70px] shrink-0 items-center gap-2.5 overflow-hidden rounded-[3px] bg-[#f3e7d6] px-3">
        <div className="min-w-0 flex-1">
          <span className="serif block text-[11.5px] font-semibold leading-tight text-[#2a2118]">
            Kuzhinë shqiptare,
            <br />
            me zjarr të ngadaltë.
          </span>
          <span className="mt-1 block text-[6px] uppercase tracking-[0.2em] text-[#a8451f]">
            Tiranë · që nga 2012
          </span>
        </div>
        {/* Stand-in for the dish photograph that would sit here on a real build. */}
        <div className="grid shrink-0 grid-cols-2 gap-1" aria-hidden>
          <span className="size-[19px] rounded-[2px] bg-[#c9a882]" />
          <span className="size-[19px] rounded-[2px] bg-[#a8451f]/75" />
          <span className="size-[19px] rounded-[2px] bg-[#8a9a6b]" />
          <span className="size-[19px] rounded-[2px] bg-[#d9c4a3]" />
        </div>
      </div>

      <div className="flex-1 px-4 pt-3">
        <div className="flex items-baseline justify-between border-b border-[#2a2118]/12 pb-1">
          <span className="text-[7.5px] font-semibold uppercase tracking-[0.14em]">Menuja e ditës</span>
          <span className="text-[6.5px] text-[#a8451f]">Shiko të plotën →</span>
        </div>
        {[
          ["Tavë kosi me mish qengji", "9.50 €"],
          ["Fërgesë tiranase", "7.00 €"],
          ["Byrek me spinaq, i shtëpisë", "3.50 €"],
        ].map(([dish, price]) => (
          <div key={dish} className="flex items-baseline justify-between py-[3px] text-[7px]">
            <span>{dish}</span>
            <span className="tnum font-semibold text-[#a8451f]">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Mock 2 — profesion serioz: tipografi e qetë, shërbime të qarta, takim i lehtë. */
export function LawPreview() {
  return (
    <div className="flex h-full flex-col bg-[#f4f4f1] text-[#1a2420]">
      <div className="flex items-center justify-between border-b border-[#1a2420]/12 px-4 py-2.5">
        <span className="serif text-[10.5px] font-semibold tracking-tight">
          Avokatura <span className="text-[#3c5a4c]">Arta</span>
        </span>
        <span className="rounded-sm border border-[#1a2420]/25 px-1.5 py-0.5 text-[6.5px] uppercase tracking-[0.12em]">
          Cakto takim
        </span>
      </div>
      <div className="px-4 pt-3">
        <span className="text-[6px] uppercase tracking-[0.2em] text-[#3c5a4c]">
          Studio ligjore · Tiranë
        </span>
        <p className="serif mt-1 text-[12px] font-semibold leading-snug">
          Këshillim i qartë,
          <br />
          pa zhargon ligjor.
        </p>
      </div>
      <div className="mt-2.5 grid flex-1 grid-cols-2 gap-1.5 px-4 pb-3">
        {[
          ["E drejta civile", "Pronësi, trashëgimi, dëmshpërblime"],
          ["Kontratat", "Hartim dhe rishikim për biznese"],
          ["E drejta familjare", "Me përkujdes dhe diskrecion"],
          ["Regjistrim biznesi", "NIPT, licenca, përfaqësim"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-sm bg-white p-2 shadow-[0_1px_3px_rgba(26,36,32,0.08)]">
            <span className="block text-[7px] font-semibold">{t}</span>
            <span className="mt-0.5 block text-[6px] leading-snug text-[#1a2420]/60">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Mock 3 — dyqan online: blerje e shpejtë nga telefoni, çmime të dukshme. */
export function ShopPreview() {
  return (
    <div className="flex h-full flex-col bg-white text-[#221c18]">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="serif text-[10.5px] font-semibold tracking-tight">Atelier № 12</span>
        <span className="flex items-center gap-2 text-[6.5px] uppercase tracking-[0.12em] text-[#221c18]/60">
          <span>Koleksioni</span>
          <span className="relative">
            Shporta
            <span className="absolute -right-2 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#bd4f2c] text-[5px] font-bold text-white">
              2
            </span>
          </span>
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-1.5 px-4 pb-2">
        {[
          ["Çanta 'Drini'", "45 €", "#d9c7b2"],
          ["Shall leshi", "28 €", "#b9a18a"],
          ["Rrip lëkure", "32 €", "#8a6f57"],
          ["Portofol 'Mali'", "38 €", "#c3b39e"],
          ["Doreza dimri", "24 €", "#a08d76"],
          ["Çelësmbajtëse", "12 €", "#d4c0a8"],
        ].map(([name, price, tone]) => (
          <div key={name} className="flex flex-col">
            <div className="aspect-square rounded-sm" style={{ backgroundColor: tone }} />
            <span className="mt-1 truncate text-[6.5px] font-medium">{name}</span>
            <span className="tnum text-[6.5px] font-semibold text-[#bd4f2c]">{price}</span>
          </div>
        ))}
      </div>
      <div className="mx-4 mb-3 rounded-sm bg-[#221c18] py-1.5 text-center text-[6.5px] uppercase tracking-[0.16em] text-white">
        Bli tani — dërgesa në 24 orë
      </div>
    </div>
  );
}

/* Mock 4 — portfolio vizual: fotografia mban faqen, teksti hapet mënjanë. */
export function StudioPreview() {
  return (
    <div className="flex h-full flex-col bg-[#f7f6f4] text-[#1d1c1a]">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="serif text-[10.5px] font-semibold tracking-tight">
          Elira Nushi
        </span>
        <span className="flex items-center gap-2.5 text-[6.5px] uppercase tracking-[0.12em] text-[#1d1c1a]/55">
          <span>Punët</span>
          <span>Rreth meje</span>
          <span className="border-b border-[#1d1c1a]/40">Kontakt</span>
        </span>
      </div>
      <div className="px-4 pb-1.5">
        <span className="text-[6px] uppercase tracking-[0.2em] text-[#1d1c1a]/50">
          Fotografe · Tiranë
        </span>
      </div>
      {/* Uneven grid: a portfolio should look composed, not tabulated. */}
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5 px-4 pb-3">
        <div className="col-span-2 row-span-2 rounded-sm bg-[#8f8778]" />
        <div className="rounded-sm bg-[#bdb4a6]" />
        <div className="rounded-sm bg-[#6f6a62]" />
      </div>
    </div>
  );
}
