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
  PanelLeftClose,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { OrgLogo } from "@/components/OrgLogo";

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
  const { isOpen, toggle } = useSidebar();
  const isAdmin = session?.user?.role === "ADMIN";
  const links = nav.filter((item) => !item.adminOnly || isAdmin);

  return (
    <>
      <aside
        className={cn(
          "flex flex-col bg-[#0A2540] text-white shadow-xl transition-[width] duration-300 ease-in-out overflow-hidden shrink-0",
          isOpen ? "w-64" : "w-0"
        )}
      >
        <div className="w-64 flex flex-col h-full min-w-64">
          {/* Logo + toggle */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5 shrink-0">
            <Link href={ROUTES.DASHBOARD} className="flex items-center gap-3 min-w-0">
              <OrgLogo size={36} className="ring-2 ring-white/20" />
              <span className="font-semibold tracking-tight truncate">Unida Tech</span>
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="p-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Hide sidebar"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
            <ul className="space-y-0.5 px-3">
              {links.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== ROUTES.DASHBOARD && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-[#2563EB] text-white shadow-md"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0 opacity-90" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] shrink-0" />
        </div>
      </aside>
    </>
  );
}
