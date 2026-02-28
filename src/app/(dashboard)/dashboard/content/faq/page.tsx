import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">FAQ Management</h1>
        <Link href={ROUTES.CONTENT} className="text-sm text-primary hover:underline">
          ← Content
        </Link>
      </div>
      <p className="mt-1 text-muted-foreground">Manage frequently asked questions</p>
      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
