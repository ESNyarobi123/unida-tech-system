import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Unida Tech
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          App development, websites, systems, tracking, hosting & ethical
          hacking.
        </p>
        <p className="mt-2 text-muted-foreground">
          <a
            href="https://unidatechs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            unidatechs.com
          </a>
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href={ROUTES.PORTFOLIO}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Portfolio
          </Link>
          <Link
            href={ROUTES.SERVICES}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Services
          </Link>
          <Link
            href={ROUTES.CONTACT}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Contact
          </Link>
          <Link
            href={ROUTES.LOGIN}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Staff Login
          </Link>
        </div>
      </section>
    </div>
  );
}
