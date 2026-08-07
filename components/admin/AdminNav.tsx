"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  active: "services" | "gallery";
};

export function AdminNav({ active }: Props) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-navy/10 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-6">
          <p className="font-display text-lg text-navy">VOL-KS Admin</p>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/admin/services"
              className={
                active === "services"
                  ? "font-semibold text-blue"
                  : "text-navy/60 hover:text-navy"
              }
            >
              Shërbimet
            </Link>
            <Link
              href="/admin/gallery"
              className={
                active === "gallery"
                  ? "font-semibold text-blue"
                  : "text-navy/60 hover:text-navy"
              }
            >
              Galeria
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-navy/60 hover:text-navy">
            Faqja
          </Link>
          <button
            type="button"
            onClick={logout}
            className="border border-navy/20 px-3 py-1.5 hover:border-navy"
          >
            Dil
          </button>
        </div>
      </div>
    </header>
  );
}
