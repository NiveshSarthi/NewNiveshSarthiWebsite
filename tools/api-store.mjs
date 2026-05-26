import fs from "node:fs/promises";
import path from "node:path";

export const dataDir = path.resolve(process.cwd(), "data");
export const propertiesFile = path.join(dataDir, "properties.json");
export const leadsFile = path.join(dataDir, "leads.json");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await ensureDataDir();
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProperty(input, existing = {}) {
  const title = String(input.title || existing.title || "").trim();
  const slug = slugify(input.slug || existing.slug || title);
  return {
    ...existing,
    title,
    slug,
    categories: normalizeList(input.categories || existing.categories || ["residential"]),
    developer: String(input.developer || existing.developer || "").trim(),
    location: String(input.location || existing.location || "").trim(),
    corridor: String(input.corridor || existing.corridor || "").trim(),
    image: String(input.image || existing.image || "/assets/images/hero section real estate.jpeg").trim(),
    gallery: normalizeList(input.gallery || existing.gallery || []),
    status: String(input.status || existing.status || "Available").trim(),
    type: String(input.type || existing.type || "").trim(),
    area: String(input.area || existing.area || "").trim(),
    price: String(input.price || existing.price || "").trim(),
    description: String(input.description || existing.description || "").trim(),
    highlights: normalizeList(input.highlights || existing.highlights || []),
    updatedAt: new Date().toISOString(),
  };
}

export async function getProperties() {
  const value = await readJson(propertiesFile, []);
  return Array.isArray(value) ? value : [];
}

export async function saveProperties(properties) {
  await writeJson(propertiesFile, properties);
  return properties;
}

export async function upsertProperty(input, slug) {
  const properties = await getProperties();
  const index = slug ? properties.findIndex((item) => item.slug === slug) : -1;
  const property = normalizeProperty(input, index >= 0 ? properties[index] : {});
  if (!property.title || !property.slug) {
    const error = new Error("Property title is required.");
    error.statusCode = 400;
    throw error;
  }
  const duplicate = properties.find((item, itemIndex) => item.slug === property.slug && itemIndex !== index);
  if (duplicate) {
    const error = new Error("A property with this slug already exists.");
    error.statusCode = 409;
    throw error;
  }
  if (index >= 0) properties[index] = property;
  else properties.unshift({ ...property, createdAt: new Date().toISOString() });
  await saveProperties(properties);
  return property;
}

export async function deleteProperty(slug) {
  const properties = await getProperties();
  const nextProperties = properties.filter((item) => item.slug !== slug);
  await saveProperties(nextProperties);
  return { deleted: nextProperties.length !== properties.length };
}

export async function getLeads() {
  const value = await readJson(leadsFile, []);
  return Array.isArray(value) ? value : [];
}

export async function createLead(input) {
  const leads = await getLeads();
  const lead = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(input.name || input.full_name || "").trim(),
    phone: String(input.phone || input.mobile || "").trim(),
    email: String(input.email || "").trim(),
    requirement: String(input.requirement || input.interest || input.subject || "").trim(),
    message: String(input.message || input.cover_letter || "").trim(),
    source: String(input.source || "website").trim(),
    propertySlug: String(input.propertySlug || "").trim(),
    createdAt: new Date().toISOString(),
  };
  leads.unshift(lead);
  await writeJson(leadsFile, leads);
  return lead;
}

export async function deleteLead(id) {
  const leads = await getLeads();
  const nextLeads = leads.filter((item) => item.id !== id);
  await writeJson(leadsFile, nextLeads);
  return { deleted: nextLeads.length !== leads.length };
}

export async function readRequestJson(request) {
  let body = "";
  for await (const chunk of request) body += chunk;
  if (!body) return {};
  return JSON.parse(body);
}

export function sendJson(response, statusCode, value) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(value));
}

export async function handleApiRequest(request, response, url) {
  try {
    const method = request.method || "GET";
    const pathname = url.pathname;

    if (pathname === "/api/health") {
      sendJson(response, 200, { ok: true });
      return true;
    }

    if (pathname === "/api/properties" && method === "GET") {
      sendJson(response, 200, await getProperties());
      return true;
    }

    if (pathname === "/api/properties" && method === "POST") {
      sendJson(response, 201, await upsertProperty(await readRequestJson(request)));
      return true;
    }

    const propertyMatch = pathname.match(/^\/api\/properties\/([^/]+)$/);
    if (propertyMatch && method === "PUT") {
      sendJson(response, 200, await upsertProperty(await readRequestJson(request), decodeURIComponent(propertyMatch[1])));
      return true;
    }

    if (propertyMatch && method === "DELETE") {
      sendJson(response, 200, await deleteProperty(decodeURIComponent(propertyMatch[1])));
      return true;
    }

    if (pathname === "/api/leads" && method === "GET") {
      sendJson(response, 200, await getLeads());
      return true;
    }

    if (pathname === "/api/leads" && method === "POST") {
      sendJson(response, 201, await createLead(await readRequestJson(request)));
      return true;
    }

    const leadMatch = pathname.match(/^\/api\/leads\/([^/]+)$/);
    if (leadMatch && method === "DELETE") {
      sendJson(response, 200, await deleteLead(decodeURIComponent(leadMatch[1])));
      return true;
    }

    if (pathname.startsWith("/api/")) {
      sendJson(response, 404, { error: "API route not found." });
      return true;
    }

    return false;
  } catch (error) {
    sendJson(response, error.statusCode || 500, { error: error.message || "Server error." });
    return true;
  }
}
