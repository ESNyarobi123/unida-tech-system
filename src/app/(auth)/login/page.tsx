"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { loginSchema } from "@/schemas/auth";
import { cn } from "@/lib/utils";
import { OrgLogo } from "@/components/OrgLogo";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.flatten().fieldErrors.email?.[0] ?? "Invalid input");
      return;
    }
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    const callback = searchParams.get("callbackUrl");
    window.location.href = callback ?? ROUTES.DASHBOARD;
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex flex-col items-center gap-3 mb-2">
        <OrgLogo size={64} className="ring-2 ring-primary/20" />
        <h1 className="text-2xl font-bold text-center">Staff Login</h1>
        <p className="text-center text-sm text-muted-foreground">Unida Tech</p>
      </div>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              error && "border-destructive"
            )}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              error && "border-destructive"
            )}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
        <Link href={ROUTES.FORGOT_PASSWORD} className="text-primary hover:underline">
          Forgot password?
        </Link>
        <Link href={ROUTES.HOME} className="text-muted-foreground hover:underline">
          Back to site
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-lg border bg-card p-6 shadow-sm min-h-[320px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
