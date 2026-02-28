import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link href={ROUTES.HOME} className="hover:text-foreground">
            Home
          </Link>
          <Link href={ROUTES.PORTFOLIO} className="hover:text-foreground">
            Portfolio
          </Link>
          <Link href={ROUTES.SERVICES} className="hover:text-foreground">
            Services
          </Link>
          <Link href={ROUTES.CONTACT} className="hover:text-foreground">
            Contact
          </Link>
          <a href="https://unidatechs.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            unidatechs.com
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Unida Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
