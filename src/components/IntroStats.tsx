import { Reveal } from "@/components/Reveal";

type Stat = {
  value: string;
  caption: string;
};

export function IntroStats({ stats }: { stats: Stat[] }) {
  return (
    <Reveal delay={120} className="lg:col-span-5">
      <div className="flex flex-col gap-5 border-t border-[var(--rule)] pt-8 sm:gap-6 sm:pt-10 lg:border-t-0 lg:pt-0">
        {stats.map((stat, index) => (
          <div
            key={stat.caption}
            className="flex items-end justify-between gap-4 border-t border-[var(--rule)] pt-5 first:border-t-0 first:pt-0 sm:pt-6"
          >
            <div className="flex min-w-0 items-end gap-3 sm:gap-4">
              <p className="shrink-0 font-display text-[clamp(2.75rem,8vw,5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--accent)]">
                {stat.value}
              </p>
              <p className="pb-0.5 text-base font-medium leading-snug tracking-tight text-[var(--ink)] text-pretty sm:max-w-[18ch] sm:text-lg">
                {stat.caption}
              </p>
            </div>
            <span className="shrink-0 pb-1 text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] uppercase sm:text-xs">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
