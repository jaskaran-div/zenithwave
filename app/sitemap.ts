import type { MetadataRoute } from "next";
import { programmes } from "@/lib/programmes";
import { site } from "@/lib/site";

const routes = [
  "",
  "/courses",
  "/about",
  "/contact",
  "/legal/terms-and-conditions",
  "/legal/privacy-policy",
  "/legal/refund-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...programmes.map((p) => `/courses/${p.slug}`)].map((r) => ({ url: `${site.url}${r}` }));
}
