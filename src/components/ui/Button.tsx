import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Gradient only ever darkens the fill, so white text keeps at least the
  // flat fill's contrast (6.1:1 light, 5.1:1 dark).
  primary:
    "bg-[linear-gradient(180deg,var(--accent-fill),color-mix(in_srgb,var(--accent-fill)_80%,#000))] text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_24px_-12px_var(--accent-fill)] hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_14px_30px_-12px_var(--accent-fill)]",
  secondary:
    "border border-hairline-strong bg-surface text-fg hover:-translate-y-px hover:border-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-sm",
};

/** Class string for anything that should look like a button. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type Common = { variant?: Variant; size?: Size; className?: string };

/** An in-page or external link styled as a button. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props} />
  );
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}
