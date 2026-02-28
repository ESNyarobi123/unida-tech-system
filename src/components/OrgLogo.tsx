import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/logo.jpeg";

type OrgLogoProps = {
  /** Size in pixels (width/height for the circle). */
  size?: number;
  /** If set, wrap in link to this path (e.g. ROUTES.HOME or ROUTES.DASHBOARD). */
  href?: string;
  className?: string;
  /** Show as circle (default true). */
  circle?: boolean;
};

export function OrgLogo({
  size = 40,
  href,
  className,
  circle = true,
}: OrgLogoProps) {
  const content = (
    <Image
      src={LOGO_SRC}
      alt="Unida Tech"
      width={size}
      height={size}
      className={cn(
        "object-contain shrink-0",
        circle && "rounded-full",
        className
      )}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="shrink-0" aria-label="Unida Tech">
        {content}
      </Link>
    );
  }

  return content;
}
