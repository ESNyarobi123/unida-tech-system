import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DashboardWidgets } from "@/components/features/DashboardWidgets";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { LayoutDashboard, FileText, MessageSquare, HelpCircle, ListTodo, Calendar, DollarSign, BarChart3, Users, Wrench } from "lucide-react";

export default async function DashboardOverviewPage() {
  const session = await getServerSession(authOptions);

  const [taskCount, invoiceCount, contactUnread, supportOpen] = await Promise.all([
    prisma.task.count(),
    prisma.invoice.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.supportTicket.count({ where: { status: "OPEN" } }),
  ]);

  const statCards = [
    { label: "Tasks", value: taskCount, href: ROUTES.TASKS, icon: ListTodo, color: "primary" as const },
    { label: "Invoices", value: invoiceCount, href: ROUTES.BILLING_INVOICES, icon: FileText, color: "secondary" as const },
    { label: "Unread contacts", value: contactUnread, href: ROUTES.CONTACTS, icon: MessageSquare, color: "warning" as const },
    { label: "Open support", value: supportOpen, href: ROUTES.SUPPORT, icon: HelpCircle, color: "success" as const },
  ];

  const quickLinks = [
    { label: "Tasks", desc: "Kanban & to-do", href: ROUTES.TASKS, icon: ListTodo },
    { label: "Calendar", desc: "Events & schedule", href: ROUTES.CALENDAR, icon: Calendar },
    { label: "Invoices", desc: "Billing", href: ROUTES.BILLING_INVOICES, icon: DollarSign },
    { label: "Analytics", desc: "Charts & reports", href: ROUTES.ANALYTICS, icon: BarChart3 },
    ...(session?.user?.role === "ADMIN"
      ? [
          { label: "Users", desc: "Employees & admins", href: ROUTES.USERS, icon: Users },
          { label: "Maintenance", desc: "Audit logs & cache", href: ROUTES.MAINTENANCE, icon: Wrench },
        ]
      : []),
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-muted-foreground">
          <span>Welcome back, <span className="font-medium text-foreground">{session?.user?.name ?? session?.user?.email}</span></span>
          <span>·</span>
          <Chip size="sm" variant="flat" className="bg-primary/10 text-primary">
            {session?.user?.role}
          </Chip>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, href, icon: Icon, color }) => (
          <Link key={href} href={href}>
            <Card className="border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
              <CardBody className="flex flex-row items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <DashboardWidgets />

      {/* Quick links */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Quick links</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map(({ label, desc, href, icon: Icon }) => (
            <Link key={href} href={href}>
              <Card className="border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                <CardBody className="flex flex-row items-center gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{label}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
