import { put, list, del } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { seedContent } from "./seed";
import type { GalleryItem, ServiceItem, SiteContent } from "./types";

const BLOB_PATHNAME = "vol-ks/content.json";
const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "content.json");

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readLocal(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

async function writeLocal(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(content, null, 2), "utf8");
}

async function readBlob(): Promise<SiteContent | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    const match = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (!match) return null;
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as SiteContent;
  } catch {
    return null;
  }
}

async function writeBlob(content: SiteContent): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(content), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getContent(): Promise<SiteContent> {
  const stored = hasBlobToken() ? await readBlob() : await readLocal();
  if (!stored) return structuredClone(seedContent);

  return {
    services: [...stored.services].sort((a, b) => a.order - b.order),
    gallery: [...stored.gallery].sort((a, b) => a.order - b.order),
  };
}

export async function saveContent(content: SiteContent): Promise<void> {
  const normalized: SiteContent = {
    services: content.services.map((s, i) => ({ ...s, order: i })),
    gallery: content.gallery.map((g, i) => ({ ...g, order: i })),
  };

  if (hasBlobToken()) {
    await writeBlob(normalized);
  } else {
    await writeLocal(normalized);
  }
}

export async function saveServices(services: ServiceItem[]): Promise<SiteContent> {
  const content = await getContent();
  content.services = services.map((s, i) => ({ ...s, order: i }));
  await saveContent(content);
  return content;
}

export async function saveGallery(gallery: GalleryItem[]): Promise<SiteContent> {
  const content = await getContent();
  content.gallery = gallery.map((g, i) => ({ ...g, order: i }));
  await saveContent(content);
  return content;
}

export async function uploadGalleryImage(
  file: File,
): Promise<{ url: string }> {
  if (hasBlobToken()) {
    const blob = await put(`vol-ks/gallery/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { url: blob.url };
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, safeName), buffer);
  return { url: `/uploads/${safeName}` };
}

export async function deleteBlobIfNeeded(src: string): Promise<void> {
  if (!hasBlobToken()) return;
  if (!src.startsWith("http")) return;
  try {
    await del(src);
  } catch {
    // ignore missing blob
  }
}
