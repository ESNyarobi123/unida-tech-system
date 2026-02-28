"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { resetPasswordSchema } from "@/schemas/auth";
import { cn } from "@/lib/utils";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) setError("Missing reset token");
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    const parsed = resetPasswordSchema.safeParse({
      token,
      password,
      confirmPassword,
    });
    if (!parsed.success) {
      const msg =
        parsed.error.flatten().fieldErrors.password?.[0] ??
        parsed.error.flatten().fieldErrors.confirmPassword?.[0] ??
        "Invalid input";
      setError(msg);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: parsed.data.password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to reset password");
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
        <h1 className="text-2xl font-bold">Password updated</h1>
        <p className="mt-2 text-muted-foreground">
          You can now sign in with your new password.
        </p>
        <Link href={ROUTES.LOGIN} className="mt-4 inline-block text-primary hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
        <p className="text-destructive">Invalid or missing reset link.</p>
        <Link href={ROUTES.FORGOT_PASSWORD} className="mt-4 inline-block text-primary hover:underline">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-center">Reset password</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            New password
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
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              error && "border-destructive"
            )}
          />
          {error && (
            <p className="mt-1 text-sm text-destructive">{error}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
