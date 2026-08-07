import { NextResponse } from "next/server";
import { isBlobConfigured, streamBlob } from "@/lib/content";

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: Params) {
  if (!isBlobConfigured()) {
    return NextResponse.json({ error: "blob not configured" }, { status: 503 });
  }

  const { path } = await params;
  const pathname = path.map(decodeURIComponent).join("/");
  if (!pathname.startsWith("vol-ks/")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const file = await streamBlob(pathname);
    if (!file) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return new NextResponse(file.stream, {
      headers: {
        "Content-Type": file.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
