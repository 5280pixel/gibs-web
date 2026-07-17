"use client";

import { HighlightMark } from "@/components/HighlightMark";

type HeroHeadlineProps = {
  before: string;
  highlight: string;
  after?: string;
};

export function HeroHeadline({ before, highlight, after = "" }: HeroHeadlineProps) {
  return (
    <h1 className="max-w-3xl text-[clamp(1.35rem,4.8vw,4.75rem)] leading-[1.08] font-extrabold tracking-[-0.035em] text-balance sm:leading-[1.05]">
      <span className="text-[var(--accent)]">– </span>
      {before}
      <HighlightMark delay={0.45}>{highlight}</HighlightMark>
      {after}
    </h1>
  );
}
