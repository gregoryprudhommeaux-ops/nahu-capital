import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/editorial/hero-cdmx.jpg", destination: "/hero.jpg" },
      { source: "/editorial/contact-cdmx.jpg", destination: "/hero.jpg" },
      { source: "/editorial/paris.jpg", destination: "/hero.jpg" },
      { source: "/editorial/hospitality.jpg", destination: "/shots/hospitality.jpg" },
      { source: "/editorial/hospitality-city.jpg", destination: "/shots/hospitality.jpg" },
      { source: "/editorial/district-city.jpg", destination: "/shots/district-city.jpg" },
      { source: "/editorial/mixed-use.jpg", destination: "/shots/district-city.jpg" },
      { source: "/editorial/grand-projet.jpg", destination: "/shots/district-city.jpg" },
      { source: "/editorial/quartier-night.jpg", destination: "/shots/district-city.jpg" },
      { source: "/editorial/datacenter.jpg", destination: "/shots/datacenter.jpg" },
      { source: "/editorial/data-hall.jpg", destination: "/shots/datacenter.jpg" },
      { source: "/team/juan-balbontin.jpg", destination: "/team/juan.jpg" },
      { source: "/team/ana-almeida.jpg", destination: "/team/ana.jpg" },
      { source: "/team/p-portrait.jpg", destination: "/team/patrick.jpg" },
      { source: "/team/g-portrait.jpg", destination: "/team/gregory.jpg" },
      { source: "/brand/logo-horizontal.svg", destination: "/logo.png" },
    ];
  },
};

export default nextConfig;
