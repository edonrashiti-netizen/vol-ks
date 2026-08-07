"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Fjalëkalimi është i gabuar.");
        return;
      }
      router.replace("/admin/services");
      router.refresh();
    } catch {
      setError("Diçka shkoi keq.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-navy/10 bg-white p-8 shadow-sm"
      >
        <Image
          src="/brand/logo.png"
          alt="VOL-KS"
          width={72}
          height={72}
          className="mx-auto h-16 w-16 object-contain"
        />
        <h1 className="font-display mt-6 text-center text-2xl text-navy">
          Hyrje në admin
        </h1>
        <label className="mt-8 block text-sm font-medium text-navy/70">
          Fjalëkalimi
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-navy/20 px-3 py-2.5 outline-none focus:border-blue"
            required
            autoFocus
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-navy py-3 font-medium text-white transition hover:bg-blue disabled:opacity-60"
        >
          {loading ? "..." : "Hyr"}
        </button>
        <Link
          href="/"
          className="mt-4 block text-center text-sm text-navy/60 hover:text-blue"
        >
          Kthehu te faqja
        </Link>
      </form>
    </div>
  );
}
