import { Hono } from "hono";
import { acesid, serveAsset, validReferer } from "../utils";
import { getTestUser } from "../session";
import Abstract from "./abstract";
import AIME from "./aime";
import CSI from "./csi";
import GMATE from "./gmate";
import GPQ from "./gpq";
import GPRO from "./gpro";
import Numerical from "./numerical";
import Verbal from "./verbal";

interface Module {
  slug: string;
  name: string;
}

export const modules: Record<string, Module> = {
  'abstract': { slug: 'abstract', name: 'Abstract' },
  'numerical': { slug: 'numerical', name: 'Numerical' },
  'verbal': { slug: 'verbal', name: 'Verbal' },
  'aime': { slug: 'aime', name: 'AIME' },
  'csi': { slug: 'csi', name: 'CSI' },
  'gmate': { slug: 'gmate', name: 'G-Mate' },
  'gpq': { slug: 'gpq', name: 'GPQ' },
  'gpro': { slug: 'gpro', name: 'GPRO' },
}

const selftest = new Hono<{ Bindings: Env }>()

selftest.use("*", async (c, next) => {
  const user = await getTestUser(c)
  if (!user) return c.json({ info: '401 Unauthorized' }, 401)
  await next()
})

selftest.get("/", async (c) => {
  const user = await getTestUser(c)

  const userTests: string[] = []
  Object.entries(user?.tests).forEach(([type, ]) => {
    userTests.push(
      ` -  <a style="color:blue;" href="/selftest/${user?.pid}/${modules[type].slug}">${modules[type].name}</a><br/>`
    )
  })
  const html = `<p style="font-family:monospace;line-height:1.5">
  DAFTAR TES ANDA<br/>${userTests.join('')}</p>`
  return c.html(html)
})

// Redirect
selftest.get("/:pid/:test_type", async (c) => {
  const type = c.req.param("test_type")
  const pid = c.req.param("pid")

  if (!modules[type]) return c.notFound()

  ////////////////////////////////////////////
  // Prevent from direct access
  ////////////////////////////////////////////
  const message = "Missing referer";
  if (!validReferer(c)) return c.text(message, 401);

  ////////////////////////////////////////////
  // Check if user has the test
  ////////////////////////////////////////////
  const user = await getTestUser(c) as Persona
  if (!user.tests[type]) return c.text('Unauthorized', 401)

  ////////////////////////////////////////////
  // Check if userdata been created
  ////////////////////////////////////////////
  const table = type + "_userdata"
  const sql = `SELECT * FROM ${table} WHERE uid=? AND pid=?`;
  const found: any = await c.env.DB.prepare(sql).bind(user.id, user.pid).first();
  console.log("found", found)

  let rowid;
  if (!found) {
    rowid = acesid()
    const ts = new Date().getTime();
    const version = user.tests[type];

    if (type == "gmate") {
      const sequence = "TBD"
      const cols = "id, uid, pid, version, enter, sequence";
      const sql = `INSERT INTO ${table} (${cols}) VALUES (?,?,?,?,?,?)`;
      await c.env.DB.prepare(sql).bind(rowid, user.id, user.pid, version, ts, sequence).run();
    } else {
      const cols = "id, uid, pid, version, enter";
      const sql = `INSERT INTO ${table} (${cols}) VALUES (?,?,?,?,?)`;
      await c.env.DB.prepare(sql).bind(rowid, user.id, user.pid, version, ts).run();
    }
  } else {
    rowid = found.id
  }

  /////////////////////////////////////////////
  // TODO: What if user have done this before
  /////////////////////////////////////////////
  return c.redirect(`/selftest/${pid}/${type}/${rowid}`);
})

// Test page
selftest.get("/:pid/:test_type/:rowid", async (c) => {
  const pid = c.req.param("pid")
  const type = c.req.param("test_type")
  const rowid = c.req.param("rowid")

  const p = await getTestUser(c) as Persona

  if (!modules[type]) return c.notFound()
  if (!validReferer(c)) return c.text("Missing referer", 401);
  if (pid != p.pid) return c.text('401 Unauthorized', 401);

  if (type == "abstract")   return await Abstract.index(c, p, rowid);
  if (type == "numerical")  return await Numerical.index(c, p, rowid);
  if (type == "verbal")     return await Verbal.index(c, p, rowid);
  if (type == "aime")       return await AIME.index(c, p, rowid);
  if (type == "csi")        return await CSI.index(c, p, rowid);
  if (type == "gmate")      return await GMATE.index(c, p, rowid);
  if (type == "gpq")        return await GPQ.index(c, p, rowid);
  if (type == "gpro")       return await GPRO.index(c, p, rowid);

  return c.notFound()
})

// Test post
selftest.post("/:test_type", async (c) => {
  const type = c.req.param("test_type")
  const p = await getTestUser(c) as Persona

  if (!modules[type]) return c.notFound()

  if (type == "abstract")   return await Abstract.post(c, p);
  if (type == "numerical")  return await Numerical.post(c, p);
  if (type == "verbal")     return await Verbal.post(c, p);
  if (type == "aime")       return await AIME.post(c, p);
  if (type == "csi")        return await CSI.post(c, p);
  if (type == "gmate")      return await GMATE.post(c, p);
  if (type == "gpq")        return await GPQ.post(c, p);
  if (type == "gpro")       return await GPRO.post(c, p);
})

export { selftest }