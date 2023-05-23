import { Hono } from "hono";
import { dbseed } from "./seeds";
import { serveAsset } from "../utils";
import { sealData, unsealData } from "iron-session/edge";

const dev = new Hono<{ Bindings: Env }>()

dev.get("/etc", async (c) => {
  // const keys = {
  //   abstract: "................",
  //   numerical: "...............",
  //   verbal: "..................",
  //   gmate: "...................",
  // }

  // const enc = await sealData(keys, { password: c.env.COOKIE_PASSWORD })

  const keys = await unsealData(c.env.COGNITIVE_KEYS, { password: c.env.COOKIE_PASSWORD })
  return c.json(keys)
})

dev.get("/seed", async (c) => dbseed(c))

dev.get("/pragma", async (c) => serveAsset(c, "static/pragma.html"));

dev.get("/pragma/:table", async (c) => {
  const table = c.req.param("table");
  const sql = `PRAGMA table_info('${table}')`;
  const rs = await c.env.DB.prepare(sql).all();
  if (rs.results?.length) return c.json(rs.results);
  return c.json(null, 404);
});

dev.get("/tables", async (c) => {
  const sql = "SELECT name FROM sqlite_schema WHERE type=?"
  const [rs1, rs2] = await c.env.DB.batch([
    c.env.DB.prepare(sql).bind('table'),
    c.env.DB.prepare(sql).bind('view'),
  ])

  const tables = rs1?.results?.map((row: any) => row.name)
  const views = rs2?.results?.map((row: any) => row.name)
  const docs = tables?.filter((t: string) => t.endsWith("_doc"))
  const userdata = tables?.filter((t: string) => t.endsWith("_userdata"))
  const aces = tables?.filter((t: string) => !docs?.includes(t) && !userdata?.includes(t))

  return c.json({ aces, docs, userdata, views })
})

export { dev }