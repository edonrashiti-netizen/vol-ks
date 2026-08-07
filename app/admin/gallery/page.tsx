import { GalleryAdmin } from "@/components/admin/GalleryAdmin";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const content = await getContent();
  return <GalleryAdmin initialGallery={content.gallery} />;
}
