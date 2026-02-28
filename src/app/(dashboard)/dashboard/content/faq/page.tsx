import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody, Button } from "@heroui/react";

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQ Management"
        description="Manage frequently asked questions"
        action={
          <Button as={Link} href={ROUTES.CONTENT} variant="bordered" size="sm">
            ← Content
          </Button>
        }
      />
      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className="border border-border/50 shadow-sm">
            <CardBody className="p-5">
              <h3 className="font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
