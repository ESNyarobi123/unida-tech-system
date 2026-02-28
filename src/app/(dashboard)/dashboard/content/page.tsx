import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@heroui/react";
import { HelpCircle, Shield, FileText } from "lucide-react";

const contentLinks = [
  { href: ROUTES.CONTENT_FAQ, label: "FAQ", desc: "Manage FAQs", icon: HelpCircle },
  { href: ROUTES.CONTENT_POLICY, label: "Policy", desc: "Privacy & policy", icon: Shield },
  { href: ROUTES.CONTENT_TERMS, label: "Terms of Use", desc: "Terms pages", icon: FileText },
];

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content"
        description="FAQ, Policy, Terms, Portfolio, Testimonials"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contentLinks.map(({ href, label, desc, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <CardBody className="flex flex-row items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground">{label}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
