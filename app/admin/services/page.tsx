import { ServicesAdmin } from "@/components/admin/ServicesAdmin";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const content = await getContent();
  return <ServicesAdmin initialServices={content.services} />;
}
