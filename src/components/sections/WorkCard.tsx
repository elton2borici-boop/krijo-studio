"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
    <article className="group w-full">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="block w-full cursor-zoom-in rounded-card text-left focus-visible:outline-offset-4"
      >
        <span className="sr-only">Shiko {title} nga afër</span>
        {/* The thumbnail is a picture of a page; its micro-copy is read in
            the dialog, at a legible size. */}
        <span aria-hidden className="block">
          <BrowserFrame domain={domain}>{children}</BrowserFrame>
        </span>
      </button>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-fg">
          {title}
        </h3>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          {tag}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
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
              <h3 className="truncate font-display text-lg font-semibold text-fg">
                {title}
              </h3>
              <p className="mt-0.5 text-sm leading-snug text-fg-muted">
                {caption}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={close}
              className="shrink-0 px-3.5"
            >
              Mbyll
            </Button>
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
