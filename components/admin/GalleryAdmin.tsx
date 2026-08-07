"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryItem } from "@/lib/types";
import { AdminNav } from "@/components/admin/AdminNav";

type Props = {
  initialGallery: GalleryItem[];
};

export function GalleryAdmin({ initialGallery }: Props) {
  const [gallery, setGallery] = useState(initialGallery);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function move(index: number, dir: -1 | 1) {
    const next = index + dir;
    if (next < 0 || next >= gallery.length) return;
    setGallery((prev) => {
      const copy = [...prev];
      const tmp = copy[index];
      copy[index] = copy[next];
      copy[next] = tmp;
      return copy;
    });
  }

  function updateAlt(
    index: number,
    locale: "sq" | "en",
    value: string,
  ) {
    setGallery((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, alt: { ...item.alt, [locale]: value } }
          : item,
      ),
    );
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gallery }),
      });
      const data = (await res.json()) as {
        gallery?: GalleryItem[];
        error?: string;
      };
      if (!res.ok) {
        setMessage(data.error || "Diçka shkoi keq.");
        return;
      }
      if (data.gallery) setGallery(data.gallery);
      setMessage("U ruajt.");
    } catch {
      setMessage("Diçka shkoi keq.");
    } finally {
      setSaving(false);
    }
  }

  async function onUpload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setMessage("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: form,
      });
      const data = (await res.json()) as {
        item?: GalleryItem;
        error?: string;
      };
      if (!res.ok) {
        setMessage(data.error || "Ngarkimi dështoi.");
        return;
      }
      if (data.item) setGallery((prev) => [...prev, data.item!]);
      setMessage("Fotoja u ngarkua. Ruaj për të konfirmuar renditjen.");
    } catch {
      setMessage("Ngarkimi dështoi.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(index: number) {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <AdminNav active="gallery" />
      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl">Galeria</h1>
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onUpload(e.target.files?.[0])}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="border border-navy/20 px-4 py-2 text-sm hover:border-navy disabled:opacity-60"
            >
              {uploading ? "..." : "Ngarko foto"}
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="bg-navy px-4 py-2 text-sm text-white hover:bg-blue disabled:opacity-60"
            >
              {saving ? "..." : "Ruaj"}
            </button>
          </div>
        </div>
        {message && <p className="mt-3 text-sm text-blue">{message}</p>}

        <div className="mt-8 space-y-6">
          {gallery.map((item, index) => (
            <article
              key={item.id}
              className="grid gap-4 border border-navy/10 bg-white p-5 md:grid-cols-[160px_1fr]"
            >
              <div className="relative aspect-square overflow-hidden bg-mist">
                <Image
                  src={item.src}
                  alt={item.alt.sq || "Gallery"}
                  fill
                  className="object-cover"
                  sizes="160px"
                  unoptimized={item.src.startsWith("http")}
                />
              </div>
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    className="border border-navy/15 px-2 py-1 text-xs"
                  >
                    Lart
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    className="border border-navy/15 px-2 py-1 text-xs"
                  >
                    Poshtë
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-auto border border-red-200 px-2 py-1 text-xs text-red-700"
                  >
                    Fshi
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm">
                    Alt tekst (SQ)
                    <input
                      className="mt-1 w-full border border-navy/20 px-3 py-2"
                      value={item.alt.sq}
                      onChange={(e) => updateAlt(index, "sq", e.target.value)}
                    />
                  </label>
                  <label className="text-sm">
                    Alt tekst (EN)
                    <input
                      className="mt-1 w-full border border-navy/20 px-3 py-2"
                      value={item.alt.en}
                      onChange={(e) => updateAlt(index, "en", e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
