import { Hono } from "hono";
import { acesid, validReferer } from "../utils";
import { getTestUser } from "../session";
import Abstract from "./abstract";
import AIME from "./aime";
import CSI from "./csi";
import GMATE from "./gmate";
import GPQ from "./gpq";
import GPRO from "./gpro";
import Numerical from "./numerical";
import Verbal from "./verbal";
import { gmateRandomSequence } from "./utils";

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

// We dont use auth middleware to prevent redundance calls
// selftest.use("*", async (c, next) => {
//   const u = await getTestUser(c)
//   if (!u) return c.json({ info: '401 Unauthorized' }, 401)
//   await next()
// })

/**
 * Persona home
 */
selftest.get("/", async (c) => {
  const u = await getTestUser(c)
  if (!u) return c.json({ info: '401 Unauthorized' }, 401)

  const tests: string[] = []
  Object.entries(u?.tests).forEach(([type, ]) => {
    tests.push(
      ` -  <a style="color:blue;" href="/selftest/${u?.pid}/${modules[type].slug}">${modules[type].name}</a><br/>`
    )
  })
  const html = `<p style="font-family:monospace;line-height:1.5">
  DAFTAR TES ANDA<br/>${tests.join('')}</p>`
  return c.html(html)
})

/**
 * Check and redirect
 */
selftest.get("/:pid/:test_type", async (c) => {
  const u = await getTestUser(c) //as Persona
  const pid = c.req.param("pid")
  const type = c.req.param("test_type")

  if (!u) return c.text('Unauthorized', 401)
  if (!modules[type]) return c.notFound()
  if (!validReferer(c)) return c.text("Missing referer", 401);

  const tests = u.tests as unknown as Record<string, string>
  if (!tests[type] || !tests[type].trim().length) return c.text('Unauthorized', 401)

  ////////////////////////////////////////////
  // Check if userdata been created
  ////////////////////////////////////////////
  const table = type + "_userdata"
  const sql = `SELECT * FROM ${table} WHERE uid=? AND pid=?`;
  const found: any = await c.env.DB.prepare(sql).bind(u.id, u.pid).first();

  let rowid;
  if (!found) {
    rowid = acesid()
    const ts = new Date().getTime();
    const version = tests[type];

    if (type == "gmate") {
      // const sequence = "TBD"
      const sequence = gmateRandomSequence()
      const cols = "id, uid, pid, version, enter, sequence";
      const sql = `INSERT INTO ${table} (${cols}) VALUES (?,?,?,?,?,?)`;
      await c.env.DB.prepare(sql).bind(rowid, u.id, u.pid, version, ts, sequence).run();
    } else {
      const cols = "id, uid, pid, version, enter";
      const sql = `INSERT INTO ${table} (${cols}) VALUES (?,?,?,?,?)`;
      await c.env.DB.prepare(sql).bind(rowid, u.id, u.pid, version, ts).run();
    }
  } else {
    rowid = found.id
  }

  /////////////////////////////////////////////
  // TODO: What if user have done this before
  /////////////////////////////////////////////
  return c.redirect(`/selftest/${pid}/${type}/${rowid}`);
})

/**
 * Show test page
 */
selftest.get("/:pid/:test_type/:rowid", async (c) => {
  if (!validReferer(c)) return c.text("Missing referer", 401);

  const pid = c.req.param("pid")
  const type = c.req.param("test_type")
  const rowid = c.req.param("rowid")
  const u = await getTestUser(c) as Persona

  if (!modules[type]) return c.notFound()
  if (pid != u.pid) return c.text('401 Unauthorized', 401);

  if (type == "abstract")   return await Abstract.index(c, u, rowid);
  if (type == "numerical")  return await Numerical.index(c, u, rowid);
  if (type == "verbal")     return await Verbal.index(c, u, rowid);
  if (type == "aime")       return await AIME.index(c, u, rowid);
  if (type == "csi")        return await CSI.index(c, u, rowid);
  if (type == "gmate")      return await GMATE.index(c, u, rowid);
  if (type == "gpq")        return await GPQ.index(c, u, rowid);
  if (type == "gpro")       return await GPRO.index(c, u, rowid);

  return c.notFound()
})

/**
 * POST handlers
 */
selftest.post("/:test_type", async (c) => {
  const type = c.req.param("test_type")
  const u = await getTestUser(c) as Persona

  if (!modules[type]) return c.notFound()

  if (type == "abstract")   return await Abstract.post(c, u);
  if (type == "numerical")  return await Numerical.post(c, u);
  if (type == "verbal")     return await Verbal.post(c, u);
  if (type == "aime")       return await AIME.post(c, u);
  if (type == "csi")        return await CSI.post(c, u);
  if (type == "gmate")      return await GMATE.post(c, u);
  if (type == "gpq")        return await GPQ.post(c, u);
  if (type == "gpro")       return await GPRO.post(c, u);
})

export { selftest }