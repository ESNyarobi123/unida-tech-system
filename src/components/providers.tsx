"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
