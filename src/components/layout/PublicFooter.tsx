import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Services", href: ROUTES.SERVICES },
  { label: "Portfolio", href: ROUTES.PORTFOLIO },
  { label: "Testimonials", href: ROUTES.TESTIMONIALS },
  { label: "Contact", href: ROUTES.CONTACT },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Disclaimer", href: "#" },
];

const social = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function PublicFooter() {
  return (
    <footer className="bg-primary-dark text-unida-bg-light mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              About Us
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Unida Tech – App development, websites, systems, tracking, hosting & ethical hacking.
              We deliver innovative digital solutions for businesses and institutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-unida-accent-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
              <li>
                <a
                  href="tel:+255656759165"
                  className="flex items-center gap-2 hover:text-unida-accent-light transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +255 656 759 165
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@unidatechs.com"
                  className="flex items-center gap-2 hover:text-unida-accent-light transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@unidatechs.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-unida-accent-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} Unida Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {social.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/70 hover:text-unida-accent-light transition-colors p-1"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
