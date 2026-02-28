import { ROUTES } from "@/constants/routes";
import { PORTFOLIO_SAMPLES } from "@/constants/sample-media";
import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@heroui/react";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-unida-text-dark">Portfolio</h1>
      <p className="mt-2 text-unida-text-muted">
        Our projects: web apps, mobile, tracking, systems.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_SAMPLES.map((item) => (
          <Card
            key={item.id}
            as={Link}
            href={item.url}
            isPressable
            className="overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute top-3 left-3 rounded-md bg-primary/90 px-2 py-1 text-xs font-medium text-white">
                {item.tag}
              </span>
            </div>
            <CardBody className="gap-1">
              <h3 className="font-semibold text-unida-text-dark">{item.title}</h3>
              <p className="text-sm text-unida-text-muted line-clamp-2">
                {item.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
      <p className="mt-10">
        <Link
          href={ROUTES.CONTACT}
          className="inline-flex items-center gap-2 text-primary-main font-semibold hover:underline"
        >
          Get a quote <ArrowRight className="h-4 w-4" />
        </Link>
      </p>
    </div>
  );
}
