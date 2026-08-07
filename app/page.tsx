import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("sq");
}

export default function HomePage() {
  return <LandingPage locale="sq" />;
}
