export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nahu-capital.vercel.app/sitemap.xml",
    host: "https://nahu-capital.vercel.app",
  };
}
