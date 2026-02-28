import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody, Button } from "@heroui/react";

export default async function PolicyPage() {
  const policies = await prisma.policy.findMany();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Policy"
        description="Privacy & policy pages"
        action={
          <Button as={Link} href={ROUTES.CONTENT} variant="bordered" size="sm">
            ← Content
          </Button>
        }
      />
      <div className="space-y-4">
        {policies.map((p) => (
          <Card key={p.id} className="border border-border/50 shadow-sm">
            <CardBody className="p-5">
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                {p.content}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
