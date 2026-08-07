import { NextResponse } from "next/server";
import {
  checkPassword,
  createSession,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || !checkPassword(body.password)) {
      return NextResponse.json({ error: "invalid" }, { status: 401 });
    }
    const token = await createSession();
    await setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
