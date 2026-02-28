import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { absoluteUrl } from "@/lib/utils";
import crypto from "crypto";

declare global {
  // eslint-disable-next-line no-var
  var __passwordResetTokens: Map<string, { userId: string; expires: number }> | undefined;
}
const getStore = () => {
  if (typeof globalThis.__passwordResetTokens === "undefined") {
    globalThis.__passwordResetTokens = new Map();
  }
  return globalThis.__passwordResetTokens;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't leak existence
      return NextResponse.json({ ok: true });
    }
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour
    getStore().set(token, { userId: user.id, expires });
    const link = absoluteUrl(
      `/reset-password?token=${encodeURIComponent(token)}`
    );
    await sendPasswordResetEmail(user.email, link);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
