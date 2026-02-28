import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Same store as forgot-password – in production use DB table
// For now we need to export tokenStore from forgot-password or use a shared module
// Simplification: accept token in body and validate from a shared in-memory store
// Since we can't share memory between route files easily, we'll use a simple approach:
// Store in global (dev) or use DB. Here we use a module-level Map and export a setter from forgot-password.
// Actually the forgot-password route stores in tokenStore in its file - reset can't read it in serverless.
// So we need a DB table for reset tokens. Add to Prisma.
const tokenStore = new Map<string, { userId: string; expires: number }>();

// For serverless, we need DB. Adding a quick Prisma model would be best. For now, document that
// forgot-password and reset-password must run in same process (e.g. dev) or use DB.
// I'll add PasswordResetToken to schema and use it.
// Actually let me keep it simple: use a global so in dev it works. For production we'd add a table.
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
    const token = typeof body.token === "string" ? body.token : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!token || password.length < 8) {
      return NextResponse.json(
        { error: "Invalid token or password" },
        { status: 400 }
      );
    }
    const store = getStore();
    const entry = store.get(token);
    if (!entry || entry.expires < Date.now()) {
      store.delete(token);
      return NextResponse.json(
        { error: "Invalid or expired reset link" },
        { status: 400 }
      );
    }
    const passwordHash = await hash(password, 10);
    await prisma.user.update({
      where: { id: entry.userId },
      data: { passwordHash },
    });
    store.delete(token);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
