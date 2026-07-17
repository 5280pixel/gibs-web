import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { caseStudyOrder, type CaseStudySlug } from "../../content/site";

const contentRoot = path.join(process.cwd(), "content");

export type IntroContent = {
  label: string;
  headline: string;
  closing: string;
  stats: { value: string; caption: string }[];
  body: string;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  order: number;
  content: string;
};

export type LeadershipFootprint = {
  label: string;
  value: string;
  caption: string;
};

export type LeadershipContent = {
  label: string;
  portrait: string;
  support: string;
  whyTitle: string;
  whyStatement: string;
  whyBody: string;
  howTitle: string;
  howParagraphs: string[];
  strengthsTitle: string;
  strengths: string[];
  footprint: LeadershipFootprint[];
  beyondTitle: string;
  beyondImage: string;
  beyondImageAlt: string;
  beyondBody: string;
  quotes: { text: string; attribution: string }[];
  closing: string;
};

function readFile(relativePath: string) {
  return fs.readFileSync(path.join(contentRoot, relativePath), "utf8");
}

export function getIntroduction(): IntroContent {
  const { data, content } = matter(readFile("introduction.mdx"));
  return {
    label: data.label,
    headline: data.headline,
    closing: data.closing,
    stats: data.stats,
    body: content.trim(),
  };
}

export function getLeadership(): LeadershipContent {
  const { data } = matter(readFile("creative-leadership.mdx"));
  return {
    label: data.label,
    portrait: data.portrait,
    support: data.support,
    whyTitle: data.whyTitle,
    whyStatement: data.whyStatement,
    whyBody: data.whyBody,
    howTitle: data.howTitle,
    howParagraphs: data.howParagraphs,
    strengthsTitle: data.strengthsTitle,
    strengths: data.strengths,
    footprint: data.footprint,
    beyondTitle: data.beyondTitle,
    beyondImage: data.beyondImage,
    beyondImageAlt: data.beyondImageAlt,
    beyondBody: data.beyondBody,
    quotes: data.quotes,
    closing: data.closing,
  };
}

export function getCaseStudy(slug: CaseStudySlug): CaseStudy {
  const { data, content } = matter(readFile(`case-studies/${slug}.mdx`));
  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    heroImage: data.heroImage,
    heroAlt: data.heroAlt,
    order: data.order,
    content: content.trim(),
  };
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudyOrder.map(getCaseStudy);
}

export function getAdjacentCaseStudies(slug: CaseStudySlug) {
  const index = caseStudyOrder.indexOf(slug);
  const prevSlug = index > 0 ? caseStudyOrder[index - 1] : null;
  const nextSlug =
    index < caseStudyOrder.length - 1 ? caseStudyOrder[index + 1] : null;

  return {
    prev: prevSlug ? getCaseStudy(prevSlug) : null,
    next: nextSlug ? getCaseStudy(nextSlug) : null,
  };
}
