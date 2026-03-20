/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

function safeUnlink(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    if (err && err.code === "ENOENT") return;
    throw err;
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const buildDir = path.join(__dirname, "..", "build");
  ensureDir(buildDir);

  const siteUrl = "https://craaaapcontent.com";
  const generatedAt = new Date().toISOString();

  const robotsLines = ["User-agent: *", "Allow: /", ""];
  robotsLines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
  robotsLines.push("");
  fs.writeFileSync(path.join(buildDir, "robots.txt"), robotsLines.join("\n"), "utf8");

  const sitemapPath = path.join(buildDir, "sitemap.xml");
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url>\n` +
    `    <loc>${siteUrl}/</loc>\n` +
    `    <lastmod>${generatedAt}</lastmod>\n` +
    `    <changefreq>weekly</changefreq>\n` +
    `    <priority>1.0</priority>\n` +
    `  </url>\n` +
    `</urlset>\n`;

  fs.writeFileSync(sitemapPath, sitemapXml, "utf8");
  console.log(`[seo] Wrote robots.txt and sitemap.xml for ${siteUrl}`);
}

main();
