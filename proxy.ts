import { NextResponse, type NextRequest } from "next/server";
import { siteUrls } from "@/lib/site";

// One app, three sites:
//   main host    → app/(main)/*
//   funded host  → app/(funded)/funded-accounts
//   it host      → app/(it)/it-services
// Each subdomain only serves its own page at "/"; any other path is sent to the
// main site. Visiting /funded-accounts or /it-services on the main host
// redirects to the subdomain, so old links keep working.

const hostOf = (url: string) => new URL(url).hostname;

const subsites = [
  { host: hostOf(siteUrls.funded), url: siteUrls.funded, path: "/funded-accounts" },
  { host: hostOf(siteUrls.it), url: siteUrls.it, path: "/it-services" },
];

export function proxy(request: NextRequest) {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").split(",")[0].trim().split(":")[0];
  const { pathname, search } = request.nextUrl;

  const subsite = subsites.find((s) => s.host === host);
  if (subsite) {
    if (pathname === "/") {
      const res = NextResponse.rewrite(new URL(subsite.path + search, request.url));
      // Next marks these static pages `s-maxage=31536000`, so the hosting CDN
      // kept serving day-old HTML after a redeploy. That HTML pointed at JS
      // chunks the new build had deleted (404) → "This page couldn't load".
      // Make the CDN revalidate with the server on every request instead.
      res.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
      return res;
    }
    if (pathname === subsite.path) return NextResponse.redirect(new URL("/" + search, subsite.url));
    return NextResponse.redirect(new URL(pathname + search, siteUrls.main));
  }

  const legacy = subsites.find((s) => pathname === s.path || pathname.startsWith(s.path + "/"));
  if (legacy) return NextResponse.redirect(new URL("/" + search, legacy.url), 308);

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and static files (anything with an extension).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
