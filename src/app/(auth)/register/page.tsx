"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { registerSchema, type RegisterInput } from "@/schemas/auth";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({});
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return <div className="text-center text-muted-foreground">Loading…</div>;
  }
  if (status !== "authenticated" || session.user.role !== "ADMIN") {
    router.replace(ROUTES.DASHBOARD);
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      confirmPassword: (form.elements.namedItem("confirmPassword") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value as "EMPLOYEE" | "ADMIN",
    };
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      const field: Record<string, string> = {};
      parsed.error.flatten().fieldErrors &&
        Object.entries(parsed.error.flatten().fieldErrors).forEach(([k, v]) => {
          field[k] = (v as string[])?.[0] ?? "";
        });
      setErrors(field as Partial<Record<keyof RegisterInput, string>>);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsed.data.email,
          password: parsed.data.password,
          name: parsed.data.name,
          role: parsed.data.role,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors({ email: json.error ?? "Failed to register" });
        setLoading(false);
        return;
      }
      router.push(ROUTES.USERS);
    } catch {
      setErrors({ email: "Failed to register" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-center">Register user</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Admin only – create Employee or Admin
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              errors.name && "border-destructive"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              errors.email && "border-destructive"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              errors.password && "border-destructive"
            )}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">{errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              errors.confirmPassword && "border-destructive"
            )}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create user"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link href={ROUTES.DASHBOARD} className="text-primary hover:underline">
          Back to dashboard
        </Link>
      </p>
    </div>
  );
}
