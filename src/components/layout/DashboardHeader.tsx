"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@heroui/react";

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
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Button as={Link} href={ROUTES.REGISTER} size="sm" variant="light" color="primary">
            Register user
          </Button>
        )}
        <Button as={Link} href={ROUTES.HOME} size="sm" variant="light">
          Public site
        </Button>
        <Button
          size="sm"
          variant="light"
          color="danger"
          onPress={() => signOut({ callbackUrl: ROUTES.HOME })}
        >
          Sign out
        </Button>
      </div>
    </header>
  );
}
