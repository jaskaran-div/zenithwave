import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old URLs (previous site versions, still indexed by Google) → new pages
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/programs", destination: "/courses", permanent: true },
      { source: "/programmes", destination: "/courses", permanent: true },
      { source: "/professional-programme", destination: "/courses/professional-programme", permanent: true },
      { source: "/course/partnered-funded-account", destination: "/courses/trader-accelerator", permanent: true },
      { source: "/course/financial-trading-internship-program", destination: "/courses/financial-trading-advanced-program", permanent: true },
      { source: "/course/foundation-of-global-investing", destination: "/courses/foundation-of-global-investing", permanent: true },
      { source: "/course/investment-strategy-and-portfolio-mastery", destination: "/courses/investment-strategy-and-portfolio-mastery", permanent: true },
      { source: "/course/:slug*", destination: "/courses", permanent: true },
      { source: "/programs/:slug", destination: "/courses/:slug", permanent: true },
      // /funded-accounts and /it-services are then sent on to their subdomains by proxy.ts
      { source: "/prop-firm-account", destination: "/funded-accounts", permanent: true },
      { source: "/it-consulting-services", destination: "/it-services", permanent: true },
      // Institutions page was removed
      { source: "/institutions", destination: "/", permanent: true },
      { source: "/for-institutions", destination: "/", permanent: true },
      { source: "/our-partnerships", destination: "/", permanent: true },
      { source: "/privacy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/terms", destination: "/legal/terms-and-conditions", permanent: true },
      { source: "/register", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
