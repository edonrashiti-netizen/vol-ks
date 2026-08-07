"use client";

import { useState } from "react";
import type { ServiceItem } from "@/lib/types";
import { AdminNav } from "@/components/admin/AdminNav";

type Props = {
  initialServices: ServiceItem[];
};

function emptyService(): ServiceItem {
  return {
    id: `svc-${crypto.randomUUID()}`,
    title: { sq: "", en: "" },
    description: { sq: "", en: "" },
    order: 0,
  };
}

export function ServicesAdmin({ initialServices }: Props) {
  const [services, setServices] = useState(initialServices);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function update(index: number, patch: Partial<ServiceItem>) {
    setServices((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  function move(index: number, dir: -1 | 1) {
    const next = index + dir;
    if (next < 0 || next >= services.length) return;
    setServices((prev) => {
      const copy = [...prev];
      const tmp = copy[index];
      copy[index] = copy[next];
      copy[next] = tmp;
      return copy;
    });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services }),
      });
      if (!res.ok) throw new Error("fail");
      const data = (await res.json()) as { services: ServiceItem[] };
      setServices(data.services);
      setMessage("U ruajt.");
    } catch {
      setMessage("Diçka shkoi keq.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminNav active="services" />
      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl">Shërbimet</h1>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setServices((s) => [...s, emptyService()])}
              className="border border-navy/20 px-4 py-2 text-sm hover:border-navy"
            >
              Shto
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
          {services.map((service, index) => (
            <article
              key={service.id}
              className="border border-navy/10 bg-white p-5"
            >
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
                  onClick={() =>
                    setServices((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="ml-auto border border-red-200 px-2 py-1 text-xs text-red-700"
                >
                  Fshi
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm">
                  Titulli (SQ)
                  <input
                    className="mt-1 w-full border border-navy/20 px-3 py-2"
                    value={service.title.sq}
                    onChange={(e) =>
                      update(index, {
                        title: { ...service.title, sq: e.target.value },
                      })
                    }
                  />
                </label>
                <label className="text-sm">
                  Titulli (EN)
                  <input
                    className="mt-1 w-full border border-navy/20 px-3 py-2"
                    value={service.title.en}
                    onChange={(e) =>
                      update(index, {
                        title: { ...service.title, en: e.target.value },
                      })
                    }
                  />
                </label>
                <label className="text-sm md:col-span-1">
                  Përshkrimi (SQ)
                  <textarea
                    className="mt-1 w-full border border-navy/20 px-3 py-2"
                    rows={3}
                    value={service.description.sq}
                    onChange={(e) =>
                      update(index, {
                        description: {
                          ...service.description,
                          sq: e.target.value,
                        },
                      })
                    }
                  />
                </label>
                <label className="text-sm">
                  Përshkrimi (EN)
                  <textarea
                    className="mt-1 w-full border border-navy/20 px-3 py-2"
                    rows={3}
                    value={service.description.en}
                    onChange={(e) =>
                      update(index, {
                        description: {
                          ...service.description,
                          en: e.target.value,
                        },
                      })
                    }
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
