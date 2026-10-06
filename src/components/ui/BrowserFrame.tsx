import { cn } from "@/lib/utils";

/** A minimal browser window around an illustrative page mock. */
export function BrowserFrame({
  domain,
  children,
  interactive = true,
}: {
  domain: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-hairline bg-canvas-raised shadow-card",
        interactive &&
          // Border and shadow respond on hover so the frame reads as
          // something you can open.
          "transition-[box-shadow,border-color] duration-300 group-hover:border-accent group-hover:shadow-raised"
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </span>
        <div className="min-w-0 flex-1 truncate rounded-md border border-hairline bg-surface px-2.5 py-1 text-[9px] text-fg-muted">
          https://{domain}
        </div>
      </div>
      <div className="aspect-[4/3] overflow-hidden border-t border-hairline bg-surface">
        {/* Inner layer zooms very slightly on hover — a hint it can be opened. */}
        <div
          className={cn(
            "h-full",
            interactive &&
              "transition-transform duration-500 ease-out-soft group-hover:scale-[1.02]"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
