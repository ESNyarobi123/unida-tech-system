import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default async function PolicyPage() {
  const policies = await prisma.policy.findMany();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Policy</h1>
        <Link href={ROUTES.CONTENT} className="text-sm text-primary hover:underline">
          ← Content
        </Link>
      </div>
      <p className="mt-1 text-muted-foreground">Privacy & policy pages</p>
      <div className="mt-6 space-y-4">
        {policies.map((p) => (
          <div key={p.id} className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
