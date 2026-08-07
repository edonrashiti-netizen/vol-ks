import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  deleteBlobIfNeeded,
  getContent,
  saveGallery,
  uploadGalleryImage,
} from "@/lib/content";
import type { GalleryItem } from "@/lib/types";

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { gallery?: GalleryItem[] };
    if (!Array.isArray(body.gallery)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const content = await saveGallery(body.gallery);
    return NextResponse.json({ gallery: content.gallery });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Diçka shkoi keq.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const { url } = await uploadGalleryImage(file);
    const content = await getContent();
    const item: GalleryItem = {
      id: `gal-${crypto.randomUUID()}`,
      src: url,
      alt: { sq: "", en: "" },
      order: content.gallery.length,
    };
    const next = await saveGallery([...content.gallery, item]);
    return NextResponse.json({ item: next.gallery[next.gallery.length - 1] });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Diçka shkoi keq.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { src?: string };
    if (body.src) await deleteBlobIfNeeded(body.src);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
