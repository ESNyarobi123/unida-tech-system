import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import { Button, Card, CardBody } from "@heroui/react";
import { HERO_IMAGE, ABOUT_IMAGE, INSIGHT_IMAGES, SAMPLE_VIDEO_URL } from "@/constants/sample-media";
import {
  Cpu,
  Globe,
  Layers,
  MapPin,
  Server,
  Shield,
  Code2,
  Mail,
  Target,
  Users,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const stats = [
  { value: "5+", label: "Years of Experience", icon: Sparkles },
  { value: "47+", label: "Projects Completed", icon: Target },
  { value: "90%", label: "Client Satisfaction", icon: Users },
  { value: "1+", label: "Global Partners", icon: Globe },
];

const services = [
  { title: "App Development", desc: "Mobile & web applications built for scale.", icon: Code2, badge: null },
  { title: "Websites", desc: "Corporate sites, e‑commerce, landing pages.", icon: Globe, badge: "New" },
  { title: "Systems", desc: "Internal tools, dashboards, automation.", icon: Layers, badge: null },
  { title: "Tracking", desc: "GPS, fleet, asset tracking solutions.", icon: MapPin, badge: null },
  { title: "Hosting", desc: "Reliable hosting & deployment.", icon: Server, badge: "New" },
  { title: "Ethical Hacking", desc: "Security audits & penetration testing.", icon: Shield, badge: "Coming Soon" },
];

const whyChoose = [
  {
    title: "Proven Expertise",
    desc: "Experienced professionals delivering software, systems, and security solutions across industries.",
    icon: Target,
  },
  {
    title: "Trusted Partnerships",
    desc: "Strong focus on reliability and long-term relationships with local and international clients.",
    icon: Users,
  },
  {
    title: "Reliable & Secure",
    desc: "Best practices in security, data protection, and system reliability for your operations.",
    icon: Lock,
  },
  {
    title: "Client-Centric",
    desc: "We work closely with you to understand needs and deliver solutions aligned with your goals.",
    icon: Cpu,
  },
];

const insights = [
  {
    title: "Why choose custom software for your business",
    category: "software-solutions",
    href: ROUTES.SERVICES,
    image: INSIGHT_IMAGES[0],
  },
  {
    title: "Web presence and growth in Tanzania",
    category: "digital-strategy",
    href: ROUTES.PORTFOLIO,
    image: INSIGHT_IMAGES[1],
  },
  {
    title: "Security first: audits and best practices",
    category: "security",
    href: ROUTES.CONTACT,
    image: INSIGHT_IMAGES[2],
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-primary-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary-dark/80 to-primary-main/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2MkgyNHYtMmgxMnoiLz48L2g+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <p className="text-unida-accent-light text-sm font-medium uppercase tracking-widest mb-4">
            Software development & IT solutions
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight">
            Your Digital Transformation Partner
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            We deliver innovative, reliable, and scalable digital solutions for businesses and institutions.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button
              as={Link}
              href={ROUTES.CONTACT}
              size="lg"
              className="bg-[#F59E0B] text-[#0F172A] font-semibold hover:opacity-90 min-w-[160px]"
            >
              Get in Touch
            </Button>
            <Button
              as={Link}
              href={ROUTES.SERVICES}
              size="lg"
              variant="bordered"
              className="border-2 border-white/50 text-white bg-transparent hover:bg-white/10 min-w-[160px]"
            >
              Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-unida-warning py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-unida-text-dark">{value}</p>
                <div className="mt-2 flex justify-center">
                  <Icon className="h-8 w-8 text-unida-text-dark/80" />
                </div>
                <p className="mt-1 text-sm font-medium text-unida-text-dark/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="bg-unida-bg-light">
        <div className="grid md:grid-cols-2 min-h-[400px]">
          <div className="bg-primary-main text-white flex flex-col justify-center px-8 py-16 md:px-12 lg:px-16">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-unida-accent-light">
              About Us
            </h2>
            <h3 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
              Driving innovation. Empowering transformation.
            </h3>
            <p className="mt-6 text-white/90 leading-relaxed">
              Unida Tech is a technology company delivering transformative digital solutions—from app
              development and websites to systems, tracking, hosting, and ethical hacking. We focus
              on operational efficiency, security, and measurable results for businesses and
              institutions.
            </p>
            <Link
              href={ROUTES.CONTACT}
              className="mt-8 inline-flex items-center gap-2 text-unida-accent-light font-semibold hover:underline"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[280px] md:min-h-full bg-primary-dark">
            <Image
              src={ABOUT_IMAGE}
              alt="Unida Tech – technology and teamwork"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-unida-text-dark">
              What We Offer
            </h2>
            <p className="mt-4 text-unida-text-muted">
              Integrated technology and business solutions to strengthen operations, enhance
              visibility, and enable growth.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, desc, icon: Icon, badge }) => (
              <Card key={title} className="relative border border-border shadow-sm hover:shadow-md transition-shadow">
                {badge && (
                  <span
                    className={`absolute top-4 right-4 z-10 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      badge === "New" ? "bg-[#10B981] text-white" : "bg-[#F59E0B] text-[#0F172A]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
                <CardBody className="gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary-main">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-unida-text-dark">{title}</h3>
                  <p className="text-sm text-unida-text-muted">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={ROUTES.SERVICES}
              className="inline-flex items-center gap-2 text-primary-main font-semibold hover:underline"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Solutions CTA */}
      <section className="bg-primary-main py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Technology Solutions That Drive Growth
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            We provide reliable software, systems, hosting, and security services to help
            organizations operate efficiently and scale with confidence.
          </p>
          <Button
            as={Link}
            href={ROUTES.CONTACT}
            size="lg"
            variant="flat"
            className="mt-8 bg-white text-[#1E40AF] font-semibold hover:bg-unida-bg-light"
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* Get a Quote CTA */}
      <section className="bg-primary-dark py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Get a Custom Quote for Your Project
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/80">
            Our team is ready to discuss your project and provide a tailored solution.
          </p>
          <Button
            as={Link}
            href={ROUTES.CONTACT}
            size="lg"
            className="mt-8 bg-[#F59E0B] text-[#0F172A] font-semibold hover:opacity-90 min-w-[200px]"
          >
            Request a Quote
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-unida-text-dark">
              Why Choose Unida Tech
            </h2>
            <p className="mt-4 text-unida-text-muted">
              We combine technical expertise and a client-focused approach to deliver reliable,
              measurable digital solutions.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map(({ title, desc, icon: Icon }) => (
              <Card key={title} className="border border-border text-center">
                <CardBody className="items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-main">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-unida-text-dark">{title}</h3>
                  <p className="text-sm text-unida-text-muted">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insights & Updates */}
      <section className="py-16 md:py-24 bg-unida-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-main">
              Insights & Updates
            </h2>
            <p className="mt-4 text-unida-text-muted">
              Expert insights on technology, digital transformation, and business solutions.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {insights.map(({ title, category, href, image }) => (
              <Card key={title} as={Link} href={href} isPressable className="group border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="gap-2 p-0 overflow-hidden rounded-xl">
                  <div className="relative h-40 w-full rounded-t-xl overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-unida-text-muted">
                      {category}
                    </p>
                    <h3 className="mt-2 font-semibold text-unida-text-dark group-hover:text-primary-main transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-main">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={ROUTES.PORTFOLIO}
              className="inline-flex items-center gap-2 text-primary-main font-semibold hover:underline"
            >
              View portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sample video section – replace with your own promo/demo video */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-unida-text-dark text-center mb-6">
              See us in action
            </h2>
            <p className="text-center text-unida-text-muted mb-8">
              Sample video – replace with your company demo or product tour.
            </p>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted shadow-md">
              <video
                className="w-full h-full object-cover"
                src={SAMPLE_VIDEO_URL}
                controls
                poster={INSIGHT_IMAGES[0]}
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-medium">Ready to start your project?</p>
          <Button
            as={Link}
            href={ROUTES.CONTACT}
            size="md"
            className="bg-[#F59E0B] text-[#0F172A] font-semibold hover:opacity-90"
            startContent={<Mail className="h-4 w-4" />}
          >
            Contact us
          </Button>
        </div>
      </section>
    </div>
  );
}
