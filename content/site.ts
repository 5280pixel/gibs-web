export const site = {
  name: "Paul Gibson II",
  shortName: "Gibby.",
  title: "Creative Marketing Leader | Helping Companies Clarify Their Message, Support Sales, Build Trust, and Grow",
  description:
    "Paul Gibson II is a creative marketing and brand leader with 14+ years of experience helping organizations clarify their message, strengthen customer trust, and build practical marketing tools that support sales and growth.",
  email: "p.gibson2@me.com",
  linkedin: "https://www.linkedin.com/in/gibsgibson/",
  why: "My WHY is to help people and organizations find clarity, build trust, and move forward by seeking creative, practical solutions rooted in sincere selfless service.",
  greeting: "Hello,",
  roleLineBefore: "Creative marketing leader who builds clarity people can ",
  roleLineHighlight: "Trust",
  roleLineAfter: ".",
  roleSupport:
    "I help organizations clarify their message, support sales, and earn trust through creative, practical work.",
} as const;

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/creative-leadership", label: "Leadership" },
] as const;

export const caseStudyOrder = [
  "miracle-truss",
  "veritas",
  "schneitter",
] as const;

export type CaseStudySlug = (typeof caseStudyOrder)[number];
