import type { Metadata } from "next";
import Link from "next/link";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HeroPortrait } from "@/components/HeroPortrait";
import { IntroStats } from "@/components/IntroStats";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { WorkMosaic } from "@/components/WorkMosaic";
import { getAllCaseStudies, getIntroduction } from "@/lib/content";
import { buildFaqJsonLd, seo } from "@/lib/seo";
import { site } from "../../content/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} | Creative Marketing Leader`,
  },
  description: seo.answer,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} | Creative Marketing Leader`,
    description: seo.answer,
    url: "/",
  },
};

export default function HomePage() {
  const intro = getIntroduction();
  const paragraphs = intro.body.split(/\n\n+/).filter(Boolean);
  const studies = getAllCaseStudies();

  return (
    <>
      <JsonLd data={buildFaqJsonLd()} />

      <section className="relative min-h-[calc(100svh-4.75rem)] overflow-hidden lg:min-h-[88vh]">
        <div className="atmosphere" aria-hidden>
          <div className="atmosphere-mid" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(100svh-4.75rem)] max-w-7xl flex-col justify-center gap-2.5 px-5 py-4 sm:gap-6 sm:px-8 sm:py-10 lg:grid lg:min-h-[88vh] lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-32">
          <Reveal delay={100} className="order-1 shrink-0 lg:order-2 lg:col-span-5">
            <HeroPortrait />
          </Reveal>

          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal>
              <div className="mb-2 leading-[1.02] sm:mb-5">
                <p className="text-base text-[var(--muted)] sm:text-2xl">
                  {site.greeting}
                </p>
                <p className="text-lg font-medium tracking-tight text-[var(--ink)] sm:text-3xl">
                  I&apos;m {site.name}
                </p>
              </div>
              <HeroHeadline
                before={site.roleLineBefore}
                highlight={site.roleLineHighlight}
                after={site.roleLineAfter}
              />
              <p className="mt-3 hidden max-w-xl text-lg leading-relaxed text-[var(--muted)] text-pretty sm:mt-7 sm:block sm:text-xl">
                {site.roleSupport}
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-3 sm:mt-12 lg:mt-16">
              <a
                href="#introduction"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-70"
              >
                Scroll on
                <span aria-hidden className="translate-y-px">
                  ↓
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="introduction"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                {intro.label}
              </p>
              <h2 className="max-w-3xl text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl">
                {intro.headline}
              </h2>
            </Reveal>
            <Reveal delay={100} className="prose-body mt-8">
              <p className="max-w-[65ch] text-lg leading-relaxed text-[var(--ink)] text-pretty">
                {seo.answer}
              </p>
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="max-w-[65ch] text-lg leading-relaxed text-[var(--ink)] text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal delay={180}>
              <figure className="mt-10 max-w-2xl">
                <blockquote className="border-l-[3px] border-[var(--accent)] pl-6 sm:pl-8">
                  <p className="text-xl leading-snug font-medium tracking-tight text-[var(--accent)] text-pretty sm:text-2xl md:text-[1.75rem]">
                    &ldquo;{intro.closing}&rdquo;
                  </p>
                </blockquote>
              </figure>
            </Reveal>
          </div>

          <IntroStats stats={intro.stats} />
        </div>
      </section>

      <section
        id="work"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            Selected work
          </p>
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl">
            Brands people believe in
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)] text-pretty">
            Brand and marketing ownership across multi-brand alignment, a
            ground-up launch, and 10+ years of wholesale brand systems.
          </p>
        </Reveal>
        <WorkMosaic studies={studies} />
      </section>

      <section className="relative overflow-hidden border-y border-[var(--rule)]">
        <div className="atmosphere opacity-60" aria-hidden>
          <div className="atmosphere-mid" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
              Creative leadership
            </p>
            <h2 className="max-w-3xl text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl">
              Serve first. Clarify the story. Help teams move forward.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)] text-pretty">
              {site.why}
            </p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:text-right">
            <Link
              href="/creative-leadership"
              prefetch={false}
              className="inline-flex items-center border border-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Read how I lead
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <Reveal>
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl"
          >
            Quick answers
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-8">
          {seo.faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 60}>
              <h3 className="text-xl font-extrabold tracking-tight text-[var(--ink)] text-balance">
                {faq.question}
              </h3>
              <p className="mt-3 max-w-[65ch] text-lg leading-relaxed text-[var(--muted)] text-pretty">
                {faq.answer}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="next"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
      >
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
            So, what&apos;s next?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] text-pretty sm:text-xl">
            If you&apos;re looking for a marketing leader who brings clarity,
            sincerity, and practical creative systems, let&apos;s talk.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Email me
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Find me on LinkedIn
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
