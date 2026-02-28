import { NextResponse } from "next/server";
import { subscribeSchema } from "@/schemas/contact";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    await prisma.subscriber.upsert({
      where: { email: parsed.data.email },
      create: {
        email: parsed.data.email,
        name: parsed.data.name ?? null,
      },
      update: { name: parsed.data.name ?? undefined },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
