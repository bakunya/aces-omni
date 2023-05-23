import { Hono } from "hono";
import { dev } from "./dev";
import { Signin } from "./login";
import { acesAuth } from "./auth";
import { getApiUser, getTestUser } from "./session";
import { api } from "./api";
import { selftest } from "./selftest";
import { decrypt, encrypt } from "./crypto";
import { sealData } from "iron-session/edge";
import { setCookie } from "hono/cookie";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono<{ Bindings: Env }>()

//
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.use("/favicon-32x32.png", serveStatic({ path: "./favicon-32x32.png" }));
app.use("/favicon-16x16.png", serveStatic({ path: "./favicon-16x16.png" }));
app.use("/site.webmanifest", serveStatic({ path: "./site.webmanifest" }));
app.use("/apple-touch-icon.png", serveStatic({ path: "./apple-touch-icon.png" }));


app.get("/whoami", async (c) => {
  const user = await getTestUser(c);
  return user ? c.json(user) : c.json({ info: 'Guest' });
})

app.get("/login/:slug", async (c) => {
  const slug = c.req.param("slug")
  const sql = "SELECT id, slug FROM projects WHERE slug=?"
  const found = await c.env.DB.prepare(sql).bind(slug).first()
  if (!found) return c.notFound()
  return Signin(c, slug)
})

app.post("/login/:slug", async (c) => {
  const slug = c.req.param("slug")
  const { username, password } = await c.req.json()
  const hash = await encrypt(password)
  const cols = "id,pid,tid,cid,ref_ids,tests,fullname,username,phone,tgl_lahir,nip,position,c_level,t_level,slug,org_name,client_org_name"
  const sql = `SELECT ${cols} FROM persona WHERE username=? AND slug=? AND hash=?`
  const found: any = await c.env.DB.prepare(sql).bind(username, slug, hash).first()
  if (!found) return c.json({ info: 'Error username/password' }, 400);

  console.log(found.id, found.slug)
  const array: string[] = JSON.parse(found.tests)
  const tests: Record<string, string> = {}
  array.forEach((str) => {
    const [type, version] = str.split(':')
    // tests[type] = version
    if (version.length) {
      tests[type] = version
    }
  })

  const person = {
    ...found,
    tests: tests,
    ref_ids: JSON.parse(found.ref_ids),
  }

  const sealedData = await sealData(person, {password: c.env.COOKIE_PASSWORD})
  setCookie(c, c.env.COOKIE_NAME, sealedData, { path: "/", })
  c.status(200)
  c.res.headers.append('Access-Control-Allow-Origin', '*')
  return c.json(person)
})


/* ----------------------- */

app.route("/v0", api)
app.route("/dev", dev)
app.route("/selftest", selftest)

export default app