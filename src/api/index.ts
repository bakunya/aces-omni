import { Hono } from "hono";
import { fillables } from "../constants";
import { getApiUser } from "../session";
import { acesid, filterFields, notFound } from "../utils";
import { acesAuth, switchAccount } from "../auth";

const api = new Hono<{ Bindings: Env }>()

api.post("/auth", async (c) => acesAuth(c))

/// 🏡 W H O A M I =================================================

api.get("/whoami", async (c) => {
  const user = await getApiUser(c)
  const sql = `SELECT uid,tid,org_name FROM accounts WHERE status='active' AND uid=?`
  const rs = await c.env.DB.prepare(sql).bind(user?.uid).all()
  return c.json(rs.results)
});

api.get("/switch-to/:tid", async (c) => {
  console.log("/switch-to/:tid")
  const user = await getApiUser(c)
  const tid = c.req.param("tid")
  const sql = `SELECT uid, tid, default_org, username, org_name FROM accounts WHERE status='active' AND uid=? AND tid=?`
  console.log(`SELECT uid, tid, default_org, username, org_name FROM accounts WHERE status='active' AND uid=${user.pid} AND tid=${tid}`)
  const found = await c.env.DB.prepare(sql).bind(user.uid, tid).first()
  console.log(found)
  if (!found) return c.json({ info: "Not Found"}, 404)
  return c.json(found)
})

// Switch account
api.post("/switch-to/:tid", async (c) => switchAccount(c))


/// 🏡 O R G =======================================================

api.get("/org", async (c) => {
  const user = await getApiUser(c)
  const stm = "SELECT * FROM tenants WHERE id=?"
  const found = await c.env.DB.prepare(stm).bind(user?.tid).first()
  console.log("FOUND", found)
  if (!found) return notFound(c)
  return c.json(found)
})


/// 🪣 C O L L E C T I O N S =======================================

// Users
api.get("/users", async (c) => {
  const gau = await getApiUser(c)
  const stm = `SELECT * FROM accounts WHERE tid=?`
  const rs = await c.env.DB.prepare(stm).bind(gau?.tid).all()
  if (!rs.results?.length) return c.json([])
  return c.json(rs.results)
})

// Clients
api.get("/clients", async (c) => {
  const gau = await getApiUser(c)
  const stm = `SELECT * FROM clients WHERE tid=?`
  const rs = await c.env.DB.prepare(stm).bind(gau?.tid).all()
  if (!rs.results?.length) return c.json([])
  return c.json(rs.results)
})

// Projects
api.get("/projects", async (c) => {
  const gau = await getApiUser(c)
  const stm = `SELECT * FROM projects WHERE tid=?`
  const rs = await c.env.DB.prepare(stm).bind(gau?.tid).all()
  if (!rs.results?.length) return c.json([])
  return c.json(rs.results)
})

// Personae (all)
api.get("/personae", async (c) => {
  const gau = await getApiUser(c)
  const stm = `SELECT ps.* FROM persona ps
    LEFT JOIN projects pj ON ps.pid=pj.id
    LEFT JOIN tenants tn ON pj.tid=tn.id
    WHERE tn.id=?`;
  const rs = await c.env.DB.prepare(stm).bind(gau?.tid).all()
  if (!rs.results?.length) return c.json([])
  return c.json(rs.results)
})

// Project Personae
api.get("/projects/:id/personae", async (c) => {
  const au = await getApiUser(c)
  const id = c.req.param("id")
  const stm = `SELECT ps.* FROM persona ps
    LEFT JOIN projects pj ON ps.pid=pj.id
    LEFT JOIN tenants tn ON pj.tid=tn.id
    WHERE tn.id=? AND pj.id=?`;
  const rs = await c.env.DB.prepare(stm).bind(au?.tid, id).all()
  if (!rs.results?.length) return c.json([])
  return c.json(rs.results)
})


/// 🎁 E N T I T I E S =============================================

// User U
api.get("/users/:id", async (c) => {
  const gau = await getApiUser(c)
  const uid = c.req.param("id")
  const stm = `SELECT * FROM accounts WHERE uid=? AND tid=?`;
  const found = await c.env.DB.prepare(stm).bind(uid, gau?.tid).first()
  if (!found) return c.notFound()
  return c.json(found)
})

// Client C
api.get("/clients/:id", async (c) => {
  const gau = await getApiUser(c)
  const cid = c.req.param("id")
  const stm = `SELECT * FROM clients WHERE id=? AND tid=?`;
  const found = await c.env.DB.prepare(stm).bind(cid, gau?.tid).first()
  if (!found) return c.notFound()
  return c.json(found)
})

// Project P
api.get("/projects/:id", async (c) => {
  const gau = await getApiUser(c)
  const pid = c.req.param("id")
  const stm = `SELECT * FROM projects WHERE id=? AND tid=?`;
  const found = await c.env.DB.prepare(stm).bind(pid, gau?.tid).first()
  if (!found) return c.notFound()
  return c.json(found)
})

// Persona N
api.get("/personae/:id", async (c) => {
  const gau = await getApiUser(c)
  const pid = c.req.param("id")
  const stm = `SELECT ps.* FROM persona ps
  LEFT JOIN projects pj ON ps.pid=pj.id
  LEFT JOIN tenants tn ON pj.tid=tn.id
  WHERE ps.id=? AND tn.id=?`;
  const found = await c.env.DB.prepare(stm).bind(pid, gau?.tid).first()
  if (!found) return c.notFound()
  return c.json(found)
})



/// 🧱 U P D A T E =================================================

/* Testing */
api.put("/users/:id", async (c) => {
  const id = c.req.param("id") as string
  const { username, fullname } = await c.req.json()
  const stm = "UPDATE users SET username=?, fullname=? WHERE id=?"
  const rs = await c.env.DB.prepare(stm).bind(username, fullname, id).run();
  console.log(rs.meta);
  return c.json({ info: "Updated" })
})

/// 🎉 C R E A T E =================================================

/**
 * Create client
 */
api.post("/clients", async (c) => {
  const user: any = await getApiUser(c);
  const { org_name, short_name, org_info, npwp } = await c.req.json();

  const db = c.env.DB;
  const new_id = acesid();
  const csql = `INSERT INTO clients (id, tid, org_name, short_name) VALUES (?,?,?,?)`;
  await db.prepare(csql).bind(new_id, user.tid, org_name, short_name).run();

  /**
   * New client will trigger creation of npwp and org_info,
   * hence we do update
   */

  if (npwp) {
    const { columns, values } = filterFields(npwp, fillables.npwp)
    if (columns.length) {
      const sets = columns.join("=?, ") + "=?";
      const binds = [...values, new_id];
      const sql = `UPDATE npwp SET ${sets} WHERE id=?`;
      await db.prepare(sql).bind(...binds).run()
    }
  }

  if (org_info) {
    const { columns, values } = filterFields(org_info, fillables.org_info)
    if (columns.length) {
      const sets = columns.join("=?, ") + "=?";
      const binds = [...values, new_id];
      const sql = `UPDATE org_info SET ${sets} WHERE id=?`;
      await db.prepare(sql).bind(...binds).run()
    }
  }

  return c.text("Create client");
})

/**
 * Create project
 */
api.post("/projects", async (c) => {
  const user = await getApiUser(c)
  console.log(user)
  const { tid, title, description } = await c.req.json()
  console.log(tid, title, description)

  const id = acesid()
  const sql = 'INSERT INTO projects (id, admin_id, tid, title, description) VALUES (?,?,?,?,?,?)'
  await c.env.DB.prepare(sql).bind(id, user.uid, tid, title, description).run()
  return c.json({ id })
})


/// 🧨 D E L E T E =================================================

api.delete("/projects/:id", async (c) => {

  return c.text('Delete project')
})



export { api }