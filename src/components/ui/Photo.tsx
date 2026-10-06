import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A framed photograph, graded to sit inside the page's palette.
 *
 * The source images are warm daylight shots; the page's only chromatic voice is
 * blue (--color-accent-fill). A low-opacity `mix-blend-mode: color` layer
 * shifts hue toward that blue while leaving luminance alone, so the photos read
 * as part of the same system without going cold or muddy. Strength is one
 * token: --photo-tint (see globals.css).
 *
 * `sizes` matters here — without it next/image ships the largest candidate to
 * every viewport, which would undo the byte savings on mobile.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("photo", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
