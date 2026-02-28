import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Testimonials</h1>
      <p className="mt-2 text-muted-foreground">
        What clients say about Unida Tech.
      </p>
      <div className="mt-8 space-y-6">
        {/* Placeholder – load from DB via API */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground">
          <p className="italic">&ldquo;Professional and delivered on time.&rdquo;</p>
          <p className="mt-2 font-medium">— Client</p>
        </div>
      </div>
      <p className="mt-8">
        <Link href={ROUTES.CONTACT} className="text-primary hover:underline">
          Work with us →
        </Link>
      </p>
    </div>
  );
}
