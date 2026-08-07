import { put, list, del, get } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { seedContent } from "./seed";
import type { GalleryItem, ServiceItem, SiteContent } from "./types";

const BLOB_PATHNAME = "vol-ks/content.json";
const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "content.json");
const BLOB_ACCESS = "private" as const;

export function isBlobConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID,
  );
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
    const result = await get(BLOB_PATHNAME, {
      access: BLOB_ACCESS,
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as SiteContent;
  } catch {
    try {
      const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 5 });
      const match = blobs.find((b) => b.pathname === BLOB_PATHNAME);
      if (!match) return null;
      const viaGet = await get(match.url, {
        access: BLOB_ACCESS,
        useCache: false,
      });
      if (!viaGet || viaGet.statusCode !== 200 || !viaGet.stream) return null;
      const text = await new Response(viaGet.stream).text();
      return JSON.parse(text) as SiteContent;
    } catch {
      return null;
    }
  }
}

async function writeBlob(content: SiteContent): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(content), {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getContent(): Promise<SiteContent> {
  const stored = isBlobConfigured() ? await readBlob() : await readLocal();
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

  if (isBlobConfigured()) {
    await writeBlob(normalized);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Blob nuk është i lidhur. Lidh Blob store me projektin dhe ridéploy.",
    );
  }

  await writeLocal(normalized);
}

export async function saveServices(services: ServiceItem[]): Promise<SiteContent> {
  const content = await getContent();
  content.services = services.map((s, i) => ({ ...s, order: i }));
  await saveContent(content);
  return getContent();
}

export async function saveGallery(gallery: GalleryItem[]): Promise<SiteContent> {
  const content = await getContent();
  content.gallery = gallery.map((g, i) => ({ ...g, order: i }));
  await saveContent(content);
  return getContent();
}

/** Public URL path for serving a private blob through our API. */
export function blobProxyPath(pathname: string): string {
  return `/api/blob/${pathname.replace(/^\/+/, "")}`;
}

export function isBlobProxySrc(src: string): boolean {
  return src.startsWith("/api/blob/");
}

export function pathnameFromProxySrc(src: string): string | null {
  if (!isBlobProxySrc(src)) return null;
  return decodeURIComponent(src.replace(/^\/api\/blob\//, ""));
}

export async function uploadGalleryImage(
  file: File,
): Promise<{ url: string }> {
  if (isBlobConfigured()) {
    const blob = await put(`vol-ks/gallery/${Date.now()}-${file.name}`, file, {
      access: BLOB_ACCESS,
      addRandomSuffix: true,
    });
    return { url: blobProxyPath(blob.pathname) };
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Blob nuk është i lidhur. Lidh Blob store me projektin dhe ridéploy.",
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, safeName), buffer);
  return { url: `/uploads/${safeName}` };
}

export async function deleteBlobIfNeeded(src: string): Promise<void> {
  if (!isBlobConfigured()) return;
  const pathname = pathnameFromProxySrc(src);
  if (!pathname && !src.startsWith("http")) return;
  try {
    await del(pathname || src);
  } catch {
    // ignore missing blob
  }
}

export async function streamBlob(
  pathname: string,
): Promise<{ stream: ReadableStream<Uint8Array>; contentType: string } | null> {
  const result = await get(pathname, { access: BLOB_ACCESS });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  return {
    stream: result.stream,
    contentType: result.blob.contentType || "application/octet-stream",
  };
}
