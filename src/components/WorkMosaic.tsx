import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function WorkMosaic({ studies }: { studies: CaseStudy[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-12 md:gap-6">
      {studies.map((study, index) => {
        const featured = index === 0;
        return (
          <Reveal
            key={study.slug}
            delay={index * 90}
            className={
              featured
                ? "md:col-span-12 lg:col-span-7 lg:row-span-2"
                : "md:col-span-6 lg:col-span-5"
            }
          >
            <Link
              href={`/work/${study.slug}`}
              prefetch={false}
              className={`mosaic-tile group relative block overflow-hidden rounded-[1.75rem] bg-[#1a1a1a] ${
                featured ? "min-h-[22rem] sm:min-h-[28rem]" : "min-h-[16rem] sm:min-h-[18rem]"
              }`}
            >
              <div className="tile-media absolute inset-0">
                <Image
                  src={study.heroImage}
                  alt={study.heroAlt}
                  fill
                  className="object-cover"
                  sizes={
                    featured
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 1024px) 50vw, 42vw"
                  }
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">
                  Case study
                </p>
                <h3
                  className={`font-extrabold tracking-[-0.03em] text-white text-balance ${
                    featured
                      ? "text-3xl sm:text-4xl"
                      : "text-2xl sm:text-3xl"
                  }`}
                >
                  {study.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-white/85 text-pretty sm:text-base">
                  {study.subtitle}
                </p>
                <span className="mt-2 inline-flex text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors group-hover:decoration-white">
                  View case study
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
