import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const services = [
  { title: "App Development", desc: "Mobile & web applications" },
  { title: "Websites", desc: "Corporate sites, e‑commerce, landing pages" },
  { title: "Systems", desc: "Internal tools, dashboards, automation" },
  { title: "Tracking", desc: "GPS, fleet, asset tracking" },
  { title: "Hosting", desc: "Reliable hosting & deployment" },
  { title: "Ethical Hacking", desc: "Security audits & penetration testing" },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="mt-2 text-muted-foreground">
        What we offer at Unida Tech.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <li
            key={s.title}
            className="rounded-lg border bg-card p-6 text-card-foreground"
          >
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-1 text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href={ROUTES.CONTACT} className="text-primary hover:underline">
          Contact us →
        </Link>
      </p>
    </div>
  );
}
