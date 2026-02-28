import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DashboardWidgets } from "@/components/features/DashboardWidgets";

export default async function DashboardOverviewPage() {
  const session = await getServerSession(authOptions);

  const [taskCount, invoiceCount, contactUnread, supportOpen] = await Promise.all([
    prisma.task.count(),
    prisma.invoice.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.supportTicket.count({ where: { status: "OPEN" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome, {session?.user?.name ?? session?.user?.email}. Role: {session?.user?.role}.
        </p>
      </div>

      {/* Widgets */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href={ROUTES.TASKS}
          className="rounded-xl border bg-card p-4 shadow-sm transition hover:bg-muted/50"
        >
          <p className="text-sm font-medium text-muted-foreground">Tasks</p>
          <p className="mt-1 text-2xl font-bold text-primary">{taskCount}</p>
        </Link>
        <Link
          href={ROUTES.BILLING_INVOICES}
          className="rounded-xl border bg-card p-4 shadow-sm transition hover:bg-muted/50"
        >
          <p className="text-sm font-medium text-muted-foreground">Invoices</p>
          <p className="mt-1 text-2xl font-bold text-primary">{invoiceCount}</p>
        </Link>
        <Link
          href={ROUTES.CONTACTS}
          className="rounded-xl border bg-card p-4 shadow-sm transition hover:bg-muted/50"
        >
          <p className="text-sm font-medium text-muted-foreground">Unread contacts</p>
          <p className="mt-1 text-2xl font-bold text-primary">{contactUnread}</p>
        </Link>
        <Link
          href={ROUTES.SUPPORT}
          className="rounded-xl border bg-card p-4 shadow-sm transition hover:bg-muted/50"
        >
          <p className="text-sm font-medium text-muted-foreground">Open support</p>
          <p className="mt-1 text-2xl font-bold text-primary">{supportOpen}</p>
        </Link>
      </div>

      {/* Charts (Recharts) */}
      <DashboardWidgets />

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={ROUTES.TASKS} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
          <h3 className="font-semibold">Tasks</h3>
          <p className="text-sm text-muted-foreground">Kanban & to-do</p>
        </Link>
        <Link href={ROUTES.CALENDAR} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
          <h3 className="font-semibold">Calendar</h3>
          <p className="text-sm text-muted-foreground">Events & schedule</p>
        </Link>
        <Link href={ROUTES.BILLING_INVOICES} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
          <h3 className="font-semibold">Invoices</h3>
          <p className="text-sm text-muted-foreground">Billing</p>
        </Link>
        <Link href={ROUTES.ANALYTICS} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
          <h3 className="font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">Charts & reports</p>
        </Link>
        {session?.user?.role === "ADMIN" && (
          <>
            <Link href={ROUTES.USERS} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
              <h3 className="font-semibold">Users</h3>
              <p className="text-sm text-muted-foreground">Employees & admins</p>
            </Link>
            <Link href={ROUTES.MAINTENANCE} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
              <h3 className="font-semibold">Maintenance</h3>
              <p className="text-sm text-muted-foreground">Audit logs & cache</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
