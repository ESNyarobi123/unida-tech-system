"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ROUTES } from "@/constants/routes";
import { Button, Avatar } from "@heroui/react";
import { PanelLeft, PanelLeftClose, LogOut } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export function DashboardHeader() {
  const { data: session } = useSession();
  const { isOpen, toggle } = useSidebar();
  const isAdmin = session?.user?.role === "ADMIN";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
        >
          {isOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {isAdmin && (
          <Button
            as={Link}
            href={ROUTES.REGISTER}
            size="sm"
            variant="flat"
            className="bg-primary text-primary-foreground font-medium"
          >
            Register user
          </Button>
        )}
        <Button as={Link} href={ROUTES.HOME} size="sm" variant="bordered">
          Public site
        </Button>
        <div className="relative flex items-center" ref={menuRef}>
          <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="Account menu"
          aria-expanded={menuOpen}
        >
          <Avatar
            name={session?.user?.name ?? session?.user?.email ?? "U"}
            className="h-9 w-9 bg-primary text-primary-foreground cursor-pointer"
            size="sm"
          />
          </button>

          {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-border bg-card shadow-lg py-2 z-50">
            <div className="px-4 py-3 border-b border-border/50">
              <p className="text-sm font-medium text-foreground truncate">
                {session?.user?.name ?? "Admin"}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {session?.user?.email}
              </p>
              <span className="inline-flex mt-2 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {session?.user?.role}
              </span>
            </div>
            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: ROUTES.HOME });
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </header>
  );
}
