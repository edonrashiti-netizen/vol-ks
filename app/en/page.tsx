import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("en");
}

export default function EnglishPage() {
  return <LandingPage locale="en" />;
}
