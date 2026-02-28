"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function DashboardHeader() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="text-sm text-muted-foreground">
        Logged in as <span className="font-medium text-foreground">{session?.user?.email}</span>
        <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">
          {session?.user?.role}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            href={ROUTES.REGISTER}
            className="text-sm text-primary hover:underline"
          >
            Register user
          </Link>
        )}
        <Link href={ROUTES.HOME} className="text-sm text-muted-foreground hover:text-foreground">
          Public site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
