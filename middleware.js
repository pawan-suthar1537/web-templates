import { authMiddleware } from "@clerk/nextjs";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/login",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/:path*",
    "/templates/(.*)",
  ],
  // Routes that can always be accessed, and have no authentication information
  ignoredRoutes: ["/api/:path*"],

  // Handle redirects after authentication check
  afterAuth(auth, req, evt) {
    // If user is signed in and tries to access auth pages, redirect to dashboard
    if (auth.userId) {
      const isAuthRoute =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/sign-in") ||
        req.nextUrl.pathname.startsWith("/sign-up");

      if (isAuthRoute) {
        const dashboardUrl = new URL("/dashboard", req.url);
        return Response.redirect(dashboardUrl);
      }
    }

    // If user is NOT signed in and tries to access protected routes (like /dashboard), redirect to login
    if (!auth.userId) {
      const isProtectedRoute =
        req.nextUrl.pathname.startsWith("/dashboard");

      if (isProtectedRoute) {
        const loginUrl = new URL("/login", req.url);
        return Response.redirect(loginUrl);
      }
    }

    return null;
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
