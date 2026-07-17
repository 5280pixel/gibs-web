import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import {
  getAdjacentCaseStudies,
  getAllCaseStudies,
  getCaseStudy,
} from "@/lib/content";
import { MdxContent } from "@/lib/mdx";
import {
  buildBreadcrumbJsonLd,
  buildCaseStudyJsonLd,
} from "@/lib/seo";
import { caseStudyOrder, type CaseStudySlug } from "../../../../content/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudyOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!caseStudyOrder.includes(slug as CaseStudySlug)) {
    return { title: "Case study" };
  }
  const study = getCaseStudy(slug as CaseStudySlug);
  const path = `/work/${study.slug}/`;
  return {
    title: study.title,
    description: study.subtitle,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${study.title} | Case Study`,
      description: study.subtitle,
      url: path,
      type: "article",
      images: [{ url: study.heroImage, alt: study.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | Case Study`,
      description: study.subtitle,
      images: [study.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  if (!caseStudyOrder.includes(slug as CaseStudySlug)) {
    notFound();
  }

  const typedSlug = slug as CaseStudySlug;
  const study = getCaseStudy(typedSlug);
  const { prev, next } = getAdjacentCaseStudies(typedSlug);
  const all = getAllCaseStudies();

  return (
    <article>
      <JsonLd
        data={[
          buildCaseStudyJsonLd(study),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/#work" },
            { name: study.title, path: `/work/${study.slug}/` },
          ]),
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="atmosphere opacity-50" aria-hidden>
          <div className="atmosphere-mid" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-14">
          <Reveal>
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
              Case study
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)] text-pretty sm:text-xl">
              {study.subtitle}
            </p>
          </Reveal>
        </div>
        <Reveal delay={80} className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-[#1a1a1a] sm:aspect-[21/9]">
            <Image
              src={study.heroImage}
              alt={study.heroAlt}
              fill
              priority
              className="hero-image object-cover"
              sizes="100vw"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <MdxContent source={study.content} />
        </Reveal>
      </section>

      <nav
        aria-label="Case study navigation"
        className="border-t border-[var(--rule)]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8">
          <div>
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                prefetch={false}
                className="group block transition-opacity hover:opacity-80"
              >
                <p className="text-sm tracking-[0.12em] text-[var(--muted)] uppercase">
                  Previous
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <Link
                href="/creative-leadership"
                prefetch={false}
                className="group block transition-opacity hover:opacity-80"
              >
                <p className="text-sm tracking-[0.12em] text-[var(--muted)] uppercase">
                  Explore
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">
                  Creative Leadership
                </p>
              </Link>
            )}
          </div>
          <div className="sm:text-right">
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                prefetch={false}
                className="group block transition-opacity hover:opacity-80"
              >
                <p className="text-sm tracking-[0.12em] text-[var(--muted)] uppercase">
                  Next
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">
                  {next.title}
                </p>
              </Link>
            ) : (
              <Link
                href="/#work"
                prefetch={false}
                className="group block transition-opacity hover:opacity-80"
              >
                <p className="text-sm tracking-[0.12em] text-[var(--muted)] uppercase">
                  Back
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">
                  All work
                </p>
              </Link>
            )}
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 border-t border-[var(--rule)] px-5 py-6 text-sm text-[var(--muted)] sm:px-8">
          {all.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              prefetch={false}
              className={
                item.slug === study.slug
                  ? "text-[var(--accent)]"
                  : "hover:text-[var(--accent)]"
              }
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
