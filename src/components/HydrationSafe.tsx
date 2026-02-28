"use client";

import { useState, useEffect } from "react";

/**
 * Renders children only after client mount (e.g. to avoid hydration mismatch).
 * Optional: use only on specific routes if needed.
 */
export function HydrationSafe({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"
        aria-hidden
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0A2540] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
