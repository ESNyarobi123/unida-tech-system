import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@heroui/react";
import { Wrench } from "lucide-react";

export default async function MaintenancePage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect(ROUTES.DASHBOARD);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance"
        description="Admin-only: audit logs & cache (placeholder)"
      />
      <Card className="border border-border/50 shadow-sm">
        <CardBody className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Wrench className="h-7 w-7 text-primary" />
          </div>
          <p className="text-muted-foreground">Maintenance tools coming soon.</p>
        </CardBody>
      </Card>
    </div>
  );
}
