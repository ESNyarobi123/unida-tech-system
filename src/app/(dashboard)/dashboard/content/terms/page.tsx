import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default async function TermsPage() {
  const terms = await prisma.termsOfUse.findMany();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Terms of Use</h1>
        <Link href={ROUTES.CONTENT} className="text-sm text-primary hover:underline">
          ← Content
        </Link>
      </div>
      <p className="mt-1 text-muted-foreground">Terms of use pages</p>
      <div className="mt-6 space-y-4">
        {terms.map((t) => (
          <div key={t.id} className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">{t.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
