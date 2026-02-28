"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@heroui/react";
import { Menu, Phone, Mail, X } from "lucide-react";
import { useState } from "react";
import { OrgLogo } from "@/components/OrgLogo";

const mainNav = [
  { label: "Home", href: ROUTES.HOME },
  { label: "About", href: ROUTES.HOME + "#about" },
  { label: "Services", href: ROUTES.SERVICES },
  { label: "Portfolio", href: ROUTES.PORTFOLIO },
  { label: "Resources", href: ROUTES.TESTIMONIALS },
  { label: "Contact", href: ROUTES.CONTACT },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar – contact + quick links */}
      <div className="bg-primary-dark text-unida-bg-light border-b border-white/10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs md:text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+255656759165"
              className="flex items-center gap-1.5 hover:text-unida-accent-light transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+255 656 759 165</span>
            </a>
            <a
              href="mailto:info@unidatechs.com"
              className="flex items-center gap-1.5 hover:text-unida-accent-light transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">info@unidatechs.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href={ROUTES.PORTFOLIO} className="hover:text-unida-accent-light transition-colors">
              Portfolio
            </Link>
            <Link href={ROUTES.SUBSCRIBE} className="hover:text-unida-accent-light transition-colors">
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-primary shadow-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-3 text-xl font-bold tracking-tight text-white hover:text-unida-accent-light transition-colors"
          >
            <OrgLogo size={40} circle className="ring-2 ring-white/20" />
            <span>Unida Tech</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/95">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-unida-accent-light transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button
              as={Link}
              href={ROUTES.LOGIN}
              size="sm"
              className="bg-[#F59E0B] text-[#0F172A] font-semibold hover:opacity-90"
            >
              Staff Login
            </Button>
          </nav>

          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-white hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-primary-dark/95" onClick={() => setMobileOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-primary-dark border-l border-white/10 shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-bold text-white">Menu</span>
              <button
                type="button"
                className="p-2 text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                as={Link}
                href={ROUTES.LOGIN}
                size="md"
                className="mt-4 w-full bg-[#F59E0B] text-[#0F172A] font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Staff Login
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
