import { ROUTES } from "@/constants/routes";
import { TESTIMONIAL_SAMPLES } from "@/constants/sample-media";
import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@heroui/react";
import { ArrowRight, Star } from "lucide-react";

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-unida-text-dark">Testimonials</h1>
      <p className="mt-2 text-unida-text-muted">
        What clients say about Unida Tech.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIAL_SAMPLES.map((t) => (
          <Card
            key={t.id}
            className="border border-border bg-card shadow-sm"
          >
            <CardBody className="gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#F59E0B] text-[#F59E0B]"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="italic text-unida-text-dark">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={t.avatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-unida-text-dark">{t.author}</p>
                  <p className="text-sm text-unida-text-muted">{t.role}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <p className="mt-10">
        <Link
          href={ROUTES.CONTACT}
          className="inline-flex items-center gap-2 text-primary-main font-semibold hover:underline"
        >
          Work with us <ArrowRight className="h-4 w-4" />
        </Link>
      </p>
    </div>
  );
}
