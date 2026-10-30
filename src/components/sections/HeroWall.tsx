/* Drifting page sketches behind the hero. Each sketch is one element — the
   bars are painted with backgrounds, not nested divs — so the column can move
   as a single layer. At the wall's opacity the extra markup was invisible
   and it was most of the homepage's HTML. */
const columns = [
  ["landing", "shop", "article", "portfolio", "menu"],
  ["portfolio", "booking", "landing", "menu", "article"],
  ["menu", "article", "portfolio", "booking", "shop"],
  ["shop", "landing", "booking", "article", "portfolio"],
] as const;

export function HeroWall() {
  return (
    <div aria-hidden className="hero-wall">
      <div className="hero-wall-inner">
        {columns.map((tiles, i) => (
          <div key={i} className={`hero-wall-col hero-wall-col-${i + 1}`}>
            {/* Listed twice so translateY(-50%) loops back with no jump. */}
            {[...tiles, ...tiles].map((name, j) => (
              <div key={j} className={`wall-card wall-${name}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
