import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const origin = "https://www.eliteproinfra.com/";
const publicDir = path.join(root, "public");
const mirrorDir = path.join(publicDir, "mirror", "pages");
const assetRoot = path.join(publicDir, "assets");
const maxPages = 260;

const seedPages = [
  "index.php",
  "our-story.php",
  "leadership.php",
  "social-commitment.php",
  "sales-expert.php",
  "lease-expert.php",
  "crm-accounts.php",
  "investment-sales-advisory.php",
  "nri-advisory.php",
  "property-management.php",
  "land-acquisition.php",
  "properties.php",
  "pr-media.php",
  "insight-blog.php",
  "news-update.php",
  "life-at-elite.php",
  "awards.php",
  "nri-corner.php",
  "career.php",
  "contact.php",
  "privacy-policy.php",
  "terms-conditions.php",
];

const pageQueue = [...seedPages.map((href) => new URL(href, origin).href)];
const seenPages = new Set();
const assetUrls = new Set();
const routes = {};

await fs.mkdir(mirrorDir, { recursive: true });
await fs.mkdir(assetRoot, { recursive: true });

while (pageQueue.length && seenPages.size < maxPages) {
  const pageUrl = pageQueue.shift();
  if (seenPages.has(pageUrl) || !isInternalPage(pageUrl)) continue;
  seenPages.add(pageUrl);

  try {
    const html = await fetchText(pageUrl);
    const route = routeForUrl(pageUrl);
    const fileName = fileNameForUrl(pageUrl);
    const rewritten = rewriteHtml(html, pageUrl);
    await fs.writeFile(path.join(mirrorDir, fileName), rewritten, "utf8");
    routes[route] ??= `/mirror/pages/${fileName}`;

    for (const href of extractLinks(html, pageUrl)) {
      if (isInternalPage(href) && !seenPages.has(href) && seenPages.size + pageQueue.length < maxPages) {
        pageQueue.push(href);
      }
    }

    for (const asset of extractAssets(html, pageUrl)) assetUrls.add(asset);
    process.stdout.write(`page ${seenPages.size}: ${route}\n`);
  } catch (error) {
    process.stderr.write(`failed page ${pageUrl}: ${error.message}\n`);
  }
}

let downloaded = 0;
for (const assetUrl of assetUrls) {
  try {
    await downloadAsset(assetUrl);
    downloaded += 1;
    if (downloaded % 25 === 0) process.stdout.write(`assets ${downloaded}/${assetUrls.size}\n`);
  } catch (error) {
    process.stderr.write(`failed asset ${assetUrl}: ${error.message}\n`);
  }
}

await fs.writeFile(
  path.join(publicDir, "mirror", "routes.json"),
  JSON.stringify({ origin, generatedAt: new Date().toISOString(), routes }, null, 2),
  "utf8",
);

process.stdout.write(`mirrored ${Object.keys(routes).length} pages and ${downloaded}/${assetUrls.size} assets\n`);

function fetchText(url) {
  return request(url).then((buffer) => buffer.toString("utf8"));
}

function request(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
          accept: "*/*",
        },
      },
      (res) => {
        const location = res.headers.location;
        if (location && res.statusCode >= 300 && res.statusCode < 400 && redirects < 5) {
          res.resume();
          resolve(request(new URL(location, url).href, redirects + 1));
          return;
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      },
    );
    req.setTimeout(25000, () => req.destroy(new Error("request timeout")));
    req.on("error", reject);
  });
}

function extractLinks(html, baseUrl) {
  return [...html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)]
    .map((match) => toAbsolute(match[1], baseUrl))
    .filter(Boolean);
}

function extractAssets(html, baseUrl) {
  const assets = [];
  const attrPattern = /\b(?:src|href|data-default-logo|data-scrolled-logo)\s*=\s*["']([^"']+)["']/gi;
  const cssUrlPattern = /url\((?!['"]?data:)(['"]?)([^)'"]+)\1\)/gi;

  for (const match of html.matchAll(attrPattern)) {
    const absolute = toAbsolute(match[1], baseUrl);
    if (absolute && isInternalAsset(absolute)) assets.push(absolute);
  }
  for (const match of html.matchAll(cssUrlPattern)) {
    const absolute = toAbsolute(match[2], baseUrl);
    if (absolute && isInternalAsset(absolute)) assets.push(absolute);
  }
  return assets;
}

function rewriteHtml(html, baseUrl) {
  let next = html.replace(/\b(href|src|action|data-default-logo|data-scrolled-logo)\s*=\s*["']([^"']+)["']/gi, (all, attr, value) => {
    const absolute = toAbsolute(value, baseUrl);
    if (!absolute) return all;
    if (isInternalPage(absolute)) return `${attr}="${routeForUrl(absolute)}"`;
    if (isInternalAsset(absolute)) return `${attr}="${localAssetPath(absolute)}"`;
    return all;
  });

  next = next.replace(/url\((?!['"]?data:)(['"]?)([^)'"]+)\1\)/gi, (all, quote, value) => {
    const absolute = toAbsolute(value, baseUrl);
    if (absolute && isInternalAsset(absolute)) return `url(${quote}${localAssetPath(absolute)}${quote})`;
    return all;
  });

  return next;
}

function toAbsolute(value, baseUrl) {
  const cleaned = value.replaceAll("&amp;", "&");
  if (!cleaned || cleaned.startsWith("#") || cleaned.startsWith("tel:") || cleaned.startsWith("mailto:") || cleaned.startsWith("javascript:")) {
    return null;
  }
  try {
    return new URL(cleaned, baseUrl).href;
  } catch {
    return null;
  }
}

function isInternalPage(url) {
  const parsed = new URL(url);
  if (parsed.origin !== new URL(origin).origin) return false;
  const last = parsed.pathname.split("/").pop() || "index.php";
  return last.endsWith(".php") || parsed.pathname === "/";
}

function isInternalAsset(url) {
  const parsed = new URL(url);
  if (parsed.origin !== new URL(origin).origin) return false;
  return parsed.pathname.startsWith("/assets/");
}

function routeForUrl(url) {
  const parsed = new URL(url);
  const page = (parsed.pathname.split("/").pop() || "index.php").replace(/\.php$/, "");
  const base = page === "index" ? "/" : `/${page}`;
  if (!parsed.search) return base;
  const params = parsed.searchParams;
  if (params.has("id")) return `${base}/${params.get("id")}`;
  const entries = [...params.entries()];
  if (entries.length === 1 && params.has("category")) return `${base}/category-${params.get("category")}`;
  if (entries.length === 1 && params.has("location")) return `${base}/location-${params.get("location")}`;
  return `${base}/${encodeURIComponent(parsed.search.slice(1))}`;
}

function fileNameForUrl(url) {
  const parsed = new URL(url);
  const page = (parsed.pathname.split("/").pop() || "index.php").replace(/\.php$/, ""); 
  const suffix = parsed.search
    ? `-${parsed.search.slice(1).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}`
    : "";
  return `${page || "index"}${suffix}.html`;
}

function localAssetPath(url) {
  const parsed = new URL(url);
  return parsed.pathname;
}

async function downloadAsset(url) {
  const parsed = new URL(url);
  const destination = path.join(publicDir, decodeURIComponent(parsed.pathname));
  if (!destination.startsWith(assetRoot)) throw new Error("asset path escaped public assets");
  await fs.mkdir(path.dirname(destination), { recursive: true });
  try {
    await fs.access(destination);
    return;
  } catch {
    const data = await request(url);
    await fs.writeFile(destination, data);
  }
}
