import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { saveServices } from "@/lib/content";
import type { ServiceItem } from "@/lib/types";

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { services?: ServiceItem[] };
    if (!Array.isArray(body.services)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const content = await saveServices(body.services);
    return NextResponse.json({ services: content.services });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
