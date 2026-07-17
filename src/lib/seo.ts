import { site } from "../../content/site";
import { getAllCaseStudies } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gibbypaul.com";

export const seo = {
  baseUrl,
  keywords: [
    "Paul Gibson II",
    "Gibby",
    "creative marketing leader",
    "Senior Marketing Manager",
    "Growth Director",
    "Senior Marketing & Creative Services Manager",
    "brand strategist",
    "sales enablement marketing",
    "marketing communications",
    "creative director",
    "Google Ads",
    "Meta Ads",
    "brand clarity",
    "Miracle Truss marketing",
    "Veritas Built marketing",
    "Schneitter Fireworks marketing",
  ],
  /** Concise answer-engine definition */
  answer: `${site.name} (Gibby) is a creative marketing leader with 13+ years of experience helping companies clarify their message, generate sales leads, build social presence, create print and digital collateral, and run paid advertising that earns customer trust and supports growth.`,
  /** Leadership page answer-engine definition */
  leadershipAnswer: `${site.name} (Gibby) is a creative marketing leader and solution seeker. He helps companies clarify who they are, sharpen how they communicate, and build practical brand, content, sales-enablement, and paid-advertising systems. Best-fit roles include Senior Marketing Manager, Growth Director, and Senior Marketing & Creative Services Manager.`,
  faqs: [
    {
      question: "Who is Paul Gibson II?",
      answer: `${site.name}, also known as Gibby, is a creative marketing leader who helps organizations clarify their brand message, support sales with practical marketing tools, and build trust with customers through brand strategy, content, collateral, social, and paid advertising.`,
    },
    {
      question: "What does Paul Gibson II do?",
      answer:
        "He builds end-to-end marketing systems: brand and messaging, website and content, sales lead generation, social media presence, print and digital collateral, and paid advertising, so companies can communicate clearly and grow.",
    },
    {
      question: "What companies has Paul Gibson II led marketing for?",
      answer:
        "His portfolio case studies include Miracle Truss (phased brand transition from Team Perka), Veritas Built (repositioning a specialty erector into a full-service construction brand), and Schneitter Fireworks (transforming an importer into a full-service wholesale partner with scalable brand systems).",
    },
    {
      question: "What is Paul Gibson II’s WHY / leadership approach?",
      answer: site.why,
    },
  ],
  leadershipFaqs: [
    {
      question: "What roles is Paul Gibson II best suited for?",
      answer:
        "Senior Marketing Manager, Growth Director, and Senior Marketing & Creative Services Manager roles that sit at the intersection of brand strategy, sales enablement, content, creative direction, and growth marketing.",
    },
    {
      question: "What is Paul Gibson II’s leadership WHY?",
      answer: site.why,
    },
    {
      question: "How does Paul Gibson II lead marketing and creative work?",
      answer:
        "He listens first, finds the message inside complex problems, and turns it into clear stories and practical systems. Day-to-day that spans brand strategy, creative direction, content, sales enablement, Google and Meta advertising, catalogs, and regulated campaign work, including Marketing & Creative Director roles for Miracle Truss / Team Perka and Creative Director work for Schneitter Fireworks.",
    },
    {
      question: "What are Paul Gibson II’s core marketing strengths?",
      answer:
        "Brand strategy and rebranding, creative direction and visual storytelling, sales enablement and catalogs, full-funnel Google and Meta advertising, regulated campaign navigation, website content and product messaging, print production, digital video and sales collateral, cross-functional leadership, and practical business problem-solving.",
    },
  ],
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalized}`;
}

export function buildPersonJsonLd() {
  const studies = getAllCaseStudies();
  const sameAs = [site.linkedin].filter(
    (url) => Boolean(url) && !url.endsWith("/in/") && !url.includes("example"),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: site.name,
    alternateName: ["Gibby", "Gibby.", "Paul Gibson"],
    url: `${baseUrl}/`,
    image: absoluteUrl("/images/paul-gibson.png"),
    jobTitle: "Creative Marketing Leader",
    description: seo.answer,
    email: `mailto:${site.email}`,
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      "Brand strategy",
      "Creative direction",
      "Sales enablement",
      "Digital marketing",
      "Google Ads",
      "Meta Ads",
      "Paid advertising",
      "Print collateral",
      "Product catalogs",
      "Adobe InDesign",
      "Regulated advertising",
      "Social media marketing",
      "Lead generation",
      "Website content",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Senior Marketing Manager",
        description:
          "Full-funnel marketing leadership spanning brand strategy, Google and Meta advertising, and hands-on creative execution.",
      },
      {
        "@type": "Occupation",
        name: "Growth Director",
        description:
          "Cross-channel revenue growth, brand strategy, and campaign management in high-autonomy environments.",
      },
      {
        "@type": "Occupation",
        name: "Senior Marketing & Creative Services Manager",
        description:
          "Visual storytelling, product catalogs, pitch decks, and data-backed digital campaigns for small-to-mid-sized brands.",
      },
      {
        "@type": "Occupation",
        name: "Creative Marketing Leader",
        description: site.roleSupport,
      },
    ],
    subjectOf: studies.map((study) => ({
      "@type": "CreativeWork",
      name: study.title,
      description: study.subtitle,
      url: absoluteUrl(`/work/${study.slug}/`),
      image: absoluteUrl(study.heroImage),
    })),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: `${site.name} Portfolio`,
    alternateName: site.shortName,
    url: `${baseUrl}/`,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": `${baseUrl}/#person` },
    about: { "@id": `${baseUrl}/#person` },
  };
}

export function buildFaqJsonLd(
  faqs: readonly { question: string; answer: string }[] = seo.faqs,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildLeadershipPageJsonLd() {
  const pageUrl = absoluteUrl("/creative-leadership/");

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `Creative Leadership | ${site.name}`,
    headline: "Strategy first. Creative that sells. Execution that lasts.",
    description: seo.leadershipAnswer,
    inLanguage: "en-US",
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#person` },
    mainEntity: { "@id": `${baseUrl}/#person` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/paul-gibson.png"),
      description: `${site.name}, creative marketing leader`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        ".leadership-answer",
        "#why-statement",
        "#leadership-faq",
      ],
    },
  };
}

export function buildCaseStudyJsonLd(input: {
  title: string;
  subtitle: string;
  slug: string;
  heroImage: string;
  heroAlt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`/work/${input.slug}/`),
    headline: input.title,
    name: input.title,
    description: input.subtitle,
    url: absoluteUrl(`/work/${input.slug}/`),
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(input.heroImage),
      description: input.heroAlt,
    },
    author: { "@id": `${baseUrl}/#person` },
    creator: { "@id": `${baseUrl}/#person` },
    about: input.title,
    inLanguage: "en-US",
    isPartOf: { "@id": `${baseUrl}/#website` },
    mainEntityOfPage: absoluteUrl(`/work/${input.slug}/`),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
