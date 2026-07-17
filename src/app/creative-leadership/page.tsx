import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LeadershipView } from "@/components/LeadershipView";
import { getLeadership } from "@/lib/content";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLeadershipPageJsonLd,
  seo,
} from "@/lib/seo";
import { site } from "../../../content/site";

const description = seo.leadershipAnswer;

export const metadata: Metadata = {
  title: "Creative Leadership",
  description,
  keywords: [
    "Paul Gibson II",
    "Gibby",
    "creative marketing leader",
    "Senior Marketing Manager",
    "Growth Director",
    "Senior Marketing & Creative Services Manager",
    "brand strategy",
    "creative direction",
    "sales enablement",
    "Google Ads",
    "Meta Ads",
    "product catalogs",
    "regulated advertising",
    "marketing leadership",
  ],
  alternates: {
    canonical: "/creative-leadership/",
  },
  openGraph: {
    title: `Creative Leadership | ${site.name}`,
    description,
    url: "/creative-leadership/",
    type: "profile",
    images: [
      {
        url: "/images/paul-gibson.png",
        width: 1200,
        height: 1500,
        alt: `${site.name}, creative marketing leader`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Creative Leadership | ${site.name}`,
    description,
    images: ["/images/paul-gibson.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function CreativeLeadershipPage() {
  const page = getLeadership();

  return (
    <>
      <JsonLd
        data={[
          buildLeadershipPageJsonLd(),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Creative Leadership", path: "/creative-leadership/" },
          ]),
          buildFaqJsonLd(seo.leadershipFaqs),
        ]}
      />
      <LeadershipView page={page} faqs={seo.leadershipFaqs} />
    </>
  );
}
