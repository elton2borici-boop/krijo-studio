import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] font-semibold transition-[transform,color,border-color] duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-deep text-white shadow-[0_6px_18px_-8px_rgba(31,95,191,0.6)] hover:-translate-y-0.5",
  secondary:
    "border border-hairline-strong bg-white text-fg hover:border-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13.5px]",
  md: "h-12 px-7 text-[14px]",
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
