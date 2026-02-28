import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ContentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Content</h1>
      <p className="mt-1 text-muted-foreground">FAQ, Policy, Terms, Portfolio, Testimonials</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href={ROUTES.CONTENT_FAQ} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
          <h3 className="font-semibold">FAQ</h3>
          <p className="text-sm text-muted-foreground">Manage FAQs</p>
        </Link>
        <Link href={ROUTES.CONTENT_POLICY} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
          <h3 className="font-semibold">Policy</h3>
          <p className="text-sm text-muted-foreground">Privacy & policy</p>
        </Link>
        <Link href={ROUTES.CONTENT_TERMS} className="rounded-xl border bg-card p-4 transition hover:bg-muted/50">
          <h3 className="font-semibold">Terms of Use</h3>
          <p className="text-sm text-muted-foreground">Terms pages</p>
        </Link>
      </div>
    </div>
  );
}
