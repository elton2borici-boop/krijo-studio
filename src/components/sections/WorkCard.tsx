"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A portfolio piece that opens to full size.
 *
 * The mocks are drawn at 6–13px type to fit a ~360px card, which makes their
 * micro-copy — the actual menu, the actual prices — illegible where it matters
 * most. Clicking a card reopens the same markup inside a native <dialog> at
 * roughly double scale, so a visitor can read what they'd be buying.
 *
 * `zoom` rather than `transform: scale()` because zoom participates in layout:
 * the frame's aspect-ratio box grows with the type instead of overflowing a
 * box sized for the unscaled content.
 */
export function WorkCard({
  domain,
  tag,
  title,
  caption,
  children,
}: {
  domain: string;
  tag: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <article className="group w-[82vw] max-w-[360px] shrink-0 snap-start lg:w-auto lg:max-w-none">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Shiko ${title} nga afër`}
        className="block w-full cursor-zoom-in rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <BrowserFrame domain={domain}>{children}</BrowserFrame>
      </button>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="serif text-[18px] font-semibold tracking-tight text-fg">
          {title}
        </h3>
        <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-accent">
          {tag}
        </span>
      </div>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
        {caption}
      </p>

      <dialog
        ref={dialogRef}
        className="work-dialog"
        aria-label={title}
        // Clicking the backdrop hits the dialog element itself, never its
        // contents, so this closes on outside-click without a wrapper listener.
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex flex-col items-center gap-4 p-4 sm:p-6">
          <div className="flex w-full items-baseline justify-between gap-4">
            <div className="min-w-0">
              <h3 className="serif truncate text-[17px] font-semibold tracking-tight text-fg">
                {title}
              </h3>
              <p className="mt-0.5 text-[13px] leading-snug text-fg-muted">
                {caption}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-[10px] border border-hairline-strong bg-white px-3.5 py-1.5 text-[13px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Mbyll
            </button>
          </div>

          <div className="work-dialog-zoom">
            <div className="w-[360px]">
              {/* Not interactive: this copy lives inside the card's `group`, so
                  the hover lift and 1.03 inner scale would fire whenever the
                  pointer sat over the card behind the dialog — cropping the
                  enlarged mock at its edges. */}
              <BrowserFrame domain={domain} interactive={false}>
                {children}
              </BrowserFrame>
            </div>
          </div>
        </div>
      </dialog>
    </article>
  );
}

function BrowserFrame({
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
        "overflow-hidden rounded-xl border border-hairline bg-canvas-raised shadow-[0_10px_30px_-14px_rgba(21,24,29,0.18)]",
        interactive &&
          // No lift: that gesture now belongs to the pricing cards alone.
          // The border and shadow still respond, so the frame still reads as
          // something you can click.
          "transition-[box-shadow,border-color] duration-500 ease-out group-hover:border-accent/50 group-hover:shadow-[0_18px_44px_-20px_rgba(31,95,191,0.3)]"
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </span>
        <div className="mono min-w-0 flex-1 truncate rounded border border-hairline bg-white px-2.5 py-1 text-[9px] tracking-wide text-fg-muted">
          https://{domain}
        </div>
      </div>
      <div className="aspect-[4/3] overflow-hidden border-t border-hairline bg-white">
        {/* Inner layer zooms slightly while the frame lifts — a subtle parallax. */}
        <div
          className={cn(
            "h-full",
            interactive &&
              "transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
