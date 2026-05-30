import http from "node:http";
import { handleApiRequest, sendJson } from "./api-store.mjs";

const port = Number(process.env.API_PORT || process.argv[2] || 5174);
const host = process.env.API_HOST || process.env.HOST || "0.0.0.0";

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.setHeader("access-control-allow-headers", "content-type,x-admin-token");

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (await handleApiRequest(request, response, url)) return;
  sendJson(response, 404, { error: "Not found." });
});

server.listen(port, host, () => {
  console.log(`API server running at http://${host}:${port}/api/health`);
});
