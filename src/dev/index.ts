import { Hono } from "hono";
import { dbseed } from "./seeds";
import { serveAsset } from "../utils";

const dev = new Hono<{ Bindings: Env }>()

dev.get("/seed", async (c) => dbseed(c))

dev.get("/pragma", async (c) => serveAsset(c, "static/pragma.html"));

dev.get("/pragma/:table", async (c) => {
  const table = c.req.param("table");
  const sql = `PRAGMA table_info('${table}')`;
  const rs = await c.env.DB.prepare(sql).all();
  if (rs.results?.length) return c.json(rs.results);
  return c.json(null, 404);
});

export { dev }