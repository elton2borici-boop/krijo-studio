/* The whole wall sits at low opacity (see .hero-wall), so the ink here is
   deliberately strong; every value is multiplied down before it reaches the
   screen. */
const NEUTRAL = "bg-fg/[0.36]";
const NEUTRAL_SOFT = "bg-fg/[0.24]";
const ACCENT = "bg-accent-fill/90";

type Tone = { w?: string; h?: string; tone?: string };

function Bar({ w = "w-full", h = "h-2", tone = NEUTRAL }: Tone) {
  return <div className={`${h} ${w} shrink-0 rounded-[2px] ${tone}`} />;
}

function Chrome() {
  return (
    <div className="flex shrink-0 items-center gap-1 pb-1">
      <span className="size-1 rounded-full bg-fg/55" />
      <span className="size-1 rounded-full bg-fg/45" />
      <span className="size-1 rounded-full bg-fg/32" />
      <div className="ml-1 h-2 flex-1 rounded-[2px] bg-fg/[0.22]" />
    </div>
  );
}

function Tile({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <div
      className={`${h} flex shrink-0 flex-col gap-1.5 overflow-hidden rounded-lg border-2 border-fg/30 bg-surface p-2`}
    >
      <Chrome />
      {children}
    </div>
  );
}

function Landing() {
  return (
    <Tile h="h-[226px]">
      <div className={`h-9 shrink-0 rounded-[3px] ${ACCENT}`} />
      <Bar w="w-2/3" h="h-2" />
      <Bar w="w-1/2" tone={NEUTRAL_SOFT} />
      <div className="grid shrink-0 grid-cols-3 gap-1.5">
        <div className={`h-8 rounded-[3px] ${NEUTRAL_SOFT}`} />
        <div className={`h-8 rounded-[3px] ${NEUTRAL_SOFT}`} />
        <div className={`h-8 rounded-[3px] ${NEUTRAL_SOFT}`} />
      </div>
      <div className={`mt-auto h-4 shrink-0 rounded-[3px] ${ACCENT}`} />
    </Tile>
  );
}

function Shop() {
  return (
    <Tile h="h-[256px]">
      <div className="flex shrink-0 items-center justify-between">
        <Bar w="w-8" />
        <Bar w="w-5" tone={NEUTRAL_SOFT} />
      </div>
      <div className="grid shrink-0 grid-cols-3 gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className={`aspect-square rounded-[3px] ${NEUTRAL_SOFT}`} />
            <Bar w="w-3/4" h="h-1.5" tone={NEUTRAL_SOFT} />
          </div>
        ))}
      </div>
      <div className={`mt-auto h-3.5 shrink-0 rounded-[3px] ${ACCENT}`} />
    </Tile>
  );
}

function Article() {
  return (
    <Tile h="h-[282px]">
      <Bar w="w-4/5" h="h-2.5" />
      <Bar w="w-1/3" h="h-1.5" tone={NEUTRAL_SOFT} />
      <div className={`h-14 shrink-0 rounded-[3px] ${NEUTRAL_SOFT}`} />
      <div className="flex flex-col gap-1">
        {["w-full", "w-full", "w-5/6", "w-full", "w-2/3"].map((w, i) => (
          <Bar key={i} w={w} h="h-1.5" tone={NEUTRAL_SOFT} />
        ))}
      </div>
      <Bar w="w-1/4" h="h-3" tone={ACCENT} />
    </Tile>
  );
}

function Portfolio() {
  return (
    <Tile h="h-[205px]">
      <div className="flex shrink-0 items-center justify-between">
        <Bar w="w-7" />
        <div className="flex gap-1">
          <Bar w="w-4" h="h-1.5" tone={NEUTRAL_SOFT} />
          <Bar w="w-4" h="h-1.5" tone={ACCENT} />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        <div className={`rounded-[3px] ${NEUTRAL_SOFT}`} />
        <div className={`rounded-[3px] ${NEUTRAL}`} />
        <div className={`rounded-[3px] ${NEUTRAL}`} />
        <div className={`rounded-[3px] ${NEUTRAL_SOFT}`} />
      </div>
    </Tile>
  );
}

function Booking() {
  return (
    <Tile h="h-[237px]">
      <Bar w="w-1/2" h="h-2" />
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-4 shrink-0 rounded-[3px] border-2 border-fg/30 bg-canvas"
          />
        ))}
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-1.5">
        <div className="h-4 rounded-[3px] border-2 border-fg/30 bg-canvas" />
        <div className="h-4 rounded-[3px] border-2 border-fg/30 bg-canvas" />
      </div>
      <div className={`mt-auto h-4 shrink-0 rounded-[3px] ${ACCENT}`} />
    </Tile>
  );
}

function Menu() {
  return (
    <Tile h="h-[216px]">
      <div className={`h-8 shrink-0 rounded-[3px] ${NEUTRAL}`} />
      <Bar w="w-2/5" h="h-1.5" tone={ACCENT} />
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Bar w="flex-1" h="h-1.5" tone={NEUTRAL_SOFT} />
            <Bar w="w-3" h="h-1.5" tone={ACCENT} />
          </div>
        ))}
      </div>
    </Tile>
  );
}

const columns = [
  [Landing, Shop, Article, Portfolio, Menu],
  [Portfolio, Booking, Landing, Menu, Article],
  [Menu, Article, Portfolio, Booking, Shop],
  [Shop, Landing, Booking, Article, Portfolio],
];

export function HeroWall() {
  return (
    <div aria-hidden className="hero-wall">
      <div className="hero-wall-inner">
        {columns.map((tiles, i) => (
          <div key={i} className={`hero-wall-col hero-wall-col-${i + 1}`}>
            {/* Listed twice so translateY(-50%) loops back with no jump. */}
            {[...tiles, ...tiles].map((TileComponent, j) => (
              <TileComponent key={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
