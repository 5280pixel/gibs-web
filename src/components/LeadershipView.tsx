"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { HighlightMark } from "@/components/HighlightMark";
import { MotionReveal } from "@/components/MotionReveal";
import type { LeadershipContent } from "@/lib/content";
import { site } from "../../content/site";

const ease = [0.16, 1, 0.3, 1] as const;
const QUOTE_INTERVAL_MS = 8000;

function QuoteCycle({
  quotes,
}: {
  quotes: LeadershipContent["quotes"];
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = quotes[index];

  useEffect(() => {
    if (reduceMotion || paused || quotes.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % quotes.length);
    }, QUOTE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, quotes.length, reduceMotion]);

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative" aria-live="polite" aria-atomic="true">
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[12%] font-display text-[7rem] leading-none font-extrabold text-[var(--accent)] opacity-20 select-none sm:text-[9rem] md:text-[11rem]"
        >
          &ldquo;
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={active.attribution}
            className="relative pt-10 sm:pt-14"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.45, ease }
            }
          >
            <p className="text-2xl leading-snug font-medium tracking-tight text-[var(--ink)] text-balance sm:text-3xl md:text-[2rem]">
              {active.text}
            </p>
            <footer className="mt-8 text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
              {active.attribution}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {quotes.length > 1 ? (
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Collaborator quotes"
        >
          {quotes.map((quote, quoteIndex) => {
            const selected = quoteIndex === index;
            return (
              <button
                key={quote.attribution}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show quote ${quoteIndex + 1} of ${quotes.length}`}
                onClick={() => setIndex(quoteIndex)}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                  selected
                    ? "w-8 bg-[var(--accent)]"
                    : "w-2 bg-[var(--rule)] hover:bg-[var(--muted)]"
                }`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function LeadershipView({
  page,
  faqs,
}: {
  page: LeadershipContent;
  faqs: readonly { question: string; answer: string }[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <article>
      <section
        aria-labelledby="leadership-heading"
        className="relative overflow-hidden"
      >
        <div className="atmosphere opacity-55" aria-hidden>
          <div className="atmosphere-mid" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-24">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <MotionReveal>
                <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                  {page.label}
                </p>
              </MotionReveal>
              <MotionReveal delay={0.08}>
                <h1
                  id="leadership-heading"
                  className="max-w-3xl text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl"
                >
                  <HighlightMark delay={0.4}>Strategy</HighlightMark>
                  {" first. Creative that "}
                  <HighlightMark delay={0.7}>sells</HighlightMark>
                  {". Execution that lasts."}
                </h1>
              </MotionReveal>
              <MotionReveal delay={0.16}>
                <p className="leadership-answer mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] text-pretty">
                  {page.support}
                </p>
              </MotionReveal>
            </div>

            <MotionReveal delay={0.2} className="lg:col-span-5" y={24}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-[#1a1a1a] lg:ml-auto lg:mr-0">
                <motion.div
                  className="absolute inset-0"
                  initial={
                    reduceMotion ? false : { opacity: 0, scale: 1.04 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 1.05, delay: 0.15, ease }
                  }
                >
                  <Image
                    src={page.portrait}
                    alt={`${site.name}, creative marketing leader`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </motion.div>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.28} className="mt-14 border-t border-[var(--rule)] pt-8 sm:mt-16 sm:pt-10">
            <h2 className="sr-only">Experience footprint</h2>
            <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {page.footprint.map((item, index) => (
                <li key={item.label} className="min-w-0">
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--accent)] uppercase sm:text-xs">
                    {String(index + 1).padStart(2, "0")} · {item.label}
                  </p>
                  <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-[var(--ink)] text-balance sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-[var(--muted)] text-pretty sm:text-base">
                    {item.caption}
                  </p>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </section>

      <section
        id="why"
        aria-labelledby="why-heading"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <MotionReveal delay={0.05} className="lg:col-span-5">
            <h2
              id="why-heading"
              className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase"
            >
              {page.whyTitle}
            </h2>
            <p
              id="why-statement"
              className="border-l-[3px] border-[var(--accent)] pl-6 text-2xl leading-snug font-medium tracking-tight text-[var(--ink)] text-pretty sm:pl-8 sm:text-3xl md:text-[2rem]"
            >
              {page.whyStatement}
            </p>
          </MotionReveal>
          <MotionReveal delay={0.12} className="lg:col-span-7 lg:pt-10">
            <p className="max-w-[65ch] text-lg leading-relaxed text-[var(--ink)] text-pretty">
              {page.whyBody}
            </p>
          </MotionReveal>
        </div>
      </section>

      <section
        id="how"
        aria-labelledby="how-heading"
        className="border-y border-[var(--rule)] bg-[color-mix(in_srgb,var(--glow-b)_35%,var(--bg))]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <MotionReveal className="lg:col-span-4">
              <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                {page.howTitle}
              </p>
              <h2
                id="how-heading"
                className="max-w-[16ch] text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl"
              >
                Serve first. Then clarify.
              </h2>
            </MotionReveal>
            <MotionReveal delay={0.08} className="prose-body lg:col-span-8">
              {page.howParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="max-w-[65ch] text-lg leading-relaxed text-[var(--ink)] text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </MotionReveal>
          </div>
        </div>
      </section>

      <section
        id="strengths"
        aria-labelledby="strengths-heading"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <MotionReveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            {page.strengthsTitle}
          </p>
          <h2
            id="strengths-heading"
            className="text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl"
          >
            Skills that carry the work
          </h2>
        </MotionReveal>
        <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
          {page.strengths.map((strength, index) => (
            <motion.li
              key={strength}
              className="flex items-start justify-between gap-4 border-t border-[var(--rule)] py-5"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.04 + index * 0.04, ease }
              }
            >
              <span className="text-lg leading-snug font-medium tracking-tight text-[var(--ink)] text-pretty">
                {strength}
              </span>
              <span className="shrink-0 pt-1 text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section
        id="beyond"
        aria-labelledby="beyond-heading"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionReveal className="lg:col-span-5">
            <h2
              id="beyond-heading"
              className="mb-6 text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl"
            >
              {page.beyondTitle}
            </h2>
            <p className="max-w-[42ch] text-lg leading-relaxed text-[var(--ink)] text-pretty sm:text-xl">
              {page.beyondBody}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.12} className="lg:col-span-7" y={24}>
            <div className="relative mx-auto w-full max-w-2xl lg:ml-auto lg:mr-0 lg:max-w-none">
              <div className="portrait-backdrop" aria-hidden>
                <span className="portrait-glow portrait-glow-a" />
                <span className="portrait-glow portrait-glow-b" />
                <span className="portrait-ring" />
              </div>
              <div className="relative z-10 aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-[#1a1a1a] sm:rounded-[2rem]">
                <Image
                  src={page.beyondImage}
                  alt={page.beyondImageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section
        id="leadership-faq"
        aria-labelledby="leadership-faq-heading"
        className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <MotionReveal>
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            FAQ
          </p>
          <h2
            id="leadership-faq-heading"
            className="text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl"
          >
            Quick answers
          </h2>
        </MotionReveal>
        <div className="mt-10 flex flex-col gap-8">
          {faqs.map((faq, index) => (
            <MotionReveal key={faq.question} delay={0.04 + index * 0.05}>
              <h3 className="text-xl font-extrabold tracking-tight text-[var(--ink)] text-balance">
                {faq.question}
              </h3>
              <p className="mt-3 max-w-[65ch] text-lg leading-relaxed text-[var(--muted)] text-pretty">
                {faq.answer}
              </p>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section
        id="connect"
        aria-labelledby="connect-heading"
        className="relative overflow-hidden border-y border-[var(--rule)]"
      >
        <div className="atmosphere opacity-40" aria-hidden>
          <div className="atmosphere-mid" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <MotionReveal className="mx-auto max-w-2xl text-center">
            <h2 id="connect-heading" className="sr-only">
              Connect with {site.name}
            </h2>
            <p className="text-base leading-relaxed text-[var(--muted)] text-pretty sm:text-lg">
              {page.closing}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.08} className="mt-12 sm:mt-16">
            <p className="mb-2 text-center text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
              From collaborators
            </p>
            <QuoteCycle quotes={page.quotes} />
          </MotionReveal>

          <MotionReveal delay={0.14} className="mx-auto mt-14 max-w-md text-center sm:mt-16">
            <p className="mb-6 text-lg leading-relaxed text-[var(--muted)] text-pretty">
              If you need a marketing leader who can clarify the story and
              still build the system behind it, let&apos;s talk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Email Paul
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Connect on LinkedIn
              </a>
            </div>
          </MotionReveal>
        </div>
      </section>
    </article>
  );
}
