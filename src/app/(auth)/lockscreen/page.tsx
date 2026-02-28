"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function LockscreenPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      setError("Enter your password");
      return;
    }
    setError("");
    setLoading(true);
    // In a full implementation, you'd pass the locked user email from session/cookie
    const res = await signIn("credentials", {
      email: "", // Would come from session when locked
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Wrong password");
      return;
    }
    router.push(ROUTES.DASHBOARD);
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-center">Locked</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Enter your password to continue
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Unlocking…" : "Unlock"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
          Sign in as different user
        </Link>
      </p>
    </div>
  );
}
