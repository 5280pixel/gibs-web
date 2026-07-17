"use client";

import { useEffect, useState } from "react";

type CaseImageProps = {
  /** Intentionally not named `src` so Next does not emit unused image preloads */
  path?: string;
  label?: string;
  className?: string;
};

/**
 * Renders images after mount so the static HTML does not emit
 * unused <link rel="preload"> hints for below-the-fold photos.
 */
export function CaseImage({
  path = "",
  label = "",
  className = "",
}: CaseImageProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!path) return null;

  if (!ready) {
    return (
      <span
        aria-hidden
        className={`my-10 block aspect-[16/10] w-full rounded-[1.25rem] bg-[color-mix(in_srgb,var(--rule)_70%,transparent)] ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={path}
      alt={label}
      className={`my-10 w-full rounded-[1.25rem] object-cover ${className}`}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
    />
  );
}
