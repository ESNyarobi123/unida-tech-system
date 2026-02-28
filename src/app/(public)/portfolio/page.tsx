import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      <p className="mt-2 text-muted-foreground">
        Our projects: web apps, mobile, tracking, systems.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards – replace with real data from API/CMS */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6 text-card-foreground"
          >
            <h3 className="font-semibold">Project {i}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              App dev / Website / System
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6">
        <Link href={ROUTES.CONTACT} className="text-primary hover:underline">
          Get a quote →
        </Link>
      </p>
    </div>
  );
}
