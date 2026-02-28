import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button, Chip, Card, CardBody } from "@heroui/react";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect(ROUTES.DASHBOARD);

  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Employees & admins (Admin only)"
        action={
          <Button
            as={Link}
            href={ROUTES.REGISTER}
            className="bg-primary text-primary-foreground font-medium"
          >
            Register user
          </Button>
        }
      />

      <Card className="border border-border/50 shadow-sm">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Users table">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-border/30 last:border-0 transition-colors hover:bg-muted/20"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {u.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <Chip
                        size="sm"
                        variant="flat"
                        className={
                          u.role === "ADMIN"
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {u.role}
                      </Chip>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
