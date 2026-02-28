import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Routes that require login (employee or admin)
const dashboardPath = "/dashboard";

// Admin-only paths (register, dashboard/users, etc.)
const adminOnlyPaths = ["/register", "/dashboard/users"];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Admin-only: only ADMIN role can access
    const isAdminPath = adminOnlyPaths.some((p) => pathname.startsWith(p));
    if (isAdminPath && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // Public and auth pages: allow
        if (
          pathname === "/" ||
          pathname.startsWith("/portfolio") ||
          pathname.startsWith("/services") ||
          pathname.startsWith("/contact") ||
          pathname.startsWith("/testimonials") ||
          pathname.startsWith("/subscribe") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/forgot-password") ||
          pathname.startsWith("/reset-password") ||
          pathname.startsWith("/lockscreen") ||
          pathname.startsWith("/api/")
        ) {
          return true;
        }
        // Register: only authenticated users (admin check in middleware above)
        if (pathname.startsWith("/register")) {
          return !!token;
        }
        // Dashboard and nested: require auth
        if (pathname.startsWith(dashboardPath)) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/register",
    // Don't run on static files and api
    "/((?!_next/static|_next/image|favicon.ico|api/trpc|uploads).*)",
  ],
};
