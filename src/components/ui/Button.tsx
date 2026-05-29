"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  children?: ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    md: "h-11 px-5 text-[14px]",
    lg: "h-[52px] px-7 text-[15px]",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-paper shadow-sm shadow-accent/20 hover:opacity-[0.93]",
    outline:
      "border border-ink/30 text-ink bg-transparent hover:border-ink hover:bg-ink hover:text-paper",
    link:
      "px-0 text-ink link-underline",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
      {variant !== "link" && (
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  );
}
