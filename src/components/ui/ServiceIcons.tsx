import type { ServiceIcon } from "@/content/services";

/* 24px line icons in one consistent stroke weight. Decorative: each sits
   next to the service's visible title. */
const paths: Record<ServiceIcon, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18M6.5 6.25h.01M9 6.25h.01" />
      <path d="m10 12.5-2 2 2 2M14 12.5l2 2-2 2" />
    </>
  ),
  domain: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  hosting: (
    <>
      <rect x="3.5" y="4" width="17" height="7" rx="2" />
      <rect x="3.5" y="13" width="17" height="7" rx="2" />
      <path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h5.5M11 16.5h5.5" />
    </>
  ),
  care: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5l-5.6 5.6a1.9 1.9 0 0 0 2.7 2.7l5.6-5.6a4 4 0 0 0 5-5.4l-2.5 2.5-2.3-.5-.5-2.3 2.5-2.5Z" />
  ),
  brand: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z" />
      <path d="M7.5 11.5h.01M10 7.5h.01M14.5 7.5h.01" />
    </>
  ),
  seo: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      <path d="m4 7 6-3 6 6 5-4" />
    </>
  ),
};

export function ServiceIconGlyph({ name }: { name: ServiceIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
