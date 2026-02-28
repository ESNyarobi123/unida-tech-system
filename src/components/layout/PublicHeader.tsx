import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function PublicHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="font-semibold">
          Unida Tech
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href={ROUTES.PORTFOLIO} className="text-muted-foreground hover:text-foreground">
            Portfolio
          </Link>
          <Link href={ROUTES.SERVICES} className="text-muted-foreground hover:text-foreground">
            Services
          </Link>
          <Link href={ROUTES.CONTACT} className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link href={ROUTES.TESTIMONIALS} className="text-muted-foreground hover:text-foreground">
            Testimonials
          </Link>
          <Link href={ROUTES.SUBSCRIBE} className="text-muted-foreground hover:text-foreground">
            Subscribe
          </Link>
          <Link href={ROUTES.LOGIN} className="text-primary font-medium hover:underline">
            Staff Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
