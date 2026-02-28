"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  ListTodo,
  Calendar,
  ClipboardList,
  MessageSquare,
  FileText,
  DollarSign,
  FolderOpen,
  Package,
  HelpCircle,
  FileCode,
  BarChart3,
  Settings,
  Wrench,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const nav = [
  { href: ROUTES.DASHBOARD, label: "Overview", icon: LayoutDashboard },
  { href: ROUTES.USERS, label: "Users", icon: Users, adminOnly: true },
  { href: ROUTES.TASKS, label: "Tasks", icon: ListTodo },
  { href: ROUTES.CALENDAR, label: "Calendar", icon: Calendar },
  { href: ROUTES.ATTENDANCE, label: "Attendance", icon: ClipboardList },
  { href: ROUTES.CONTACTS, label: "Contacts", icon: MessageSquare },
  { href: ROUTES.CHAT, label: "Chat", icon: MessageSquare },
  { href: ROUTES.BILLING_INVOICES, label: "Invoices", icon: FileText },
  { href: ROUTES.BILLING_QUOTES, label: "Quotes", icon: DollarSign },
  { href: ROUTES.FILE_MANAGER, label: "File manager", icon: FolderOpen },
  { href: ROUTES.ASSET_MANAGEMENT, label: "Assets", icon: Package },
  { href: ROUTES.SUPPORT, label: "Support", icon: HelpCircle },
  { href: ROUTES.CONTENT, label: "Content", icon: FileCode },
  { href: ROUTES.ANALYTICS, label: "Analytics", icon: BarChart3 },
  { href: ROUTES.SETTINGS, label: "Settings", icon: Settings },
  { href: ROUTES.MAINTENANCE, label: "Maintenance", icon: Wrench, adminOnly: true },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const links = nav.filter((item) => !item.adminOnly || isAdmin);

  return (
    <aside className="w-56 border-r bg-card flex flex-col">
      <div className="p-4 font-semibold">Unida Tech</div>
      <nav className="flex-1 space-y-0.5 px-2">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== ROUTES.DASHBOARD && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
