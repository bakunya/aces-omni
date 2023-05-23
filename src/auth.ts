import { Context } from "hono";
import { setCookie } from 'hono/cookie'
import { decrypt } from "./crypto";
import { sealData } from "iron-session/edge";

//
export const acesAuth = async (c: Context<{ Bindings: Env}>) => {
  console.log('Headers', c.req.header())
  const { username, password } = (await c.req.json()) as unknown as any;
  if (!username || !password) return c.json({ info: 'Required: username and password' }, 400)

  const stmt = `SELECT * FROM accounts WHERE status='active' AND (email=? OR username=?)`
  const found: any = await c.env.DB.prepare(stmt).bind(username, username).first();
  if (!found) return c.json({ info: 'Not Found'}, 400);

  const hash = await decrypt(found.hash);
  if (password != hash) return c.json({ info: 'Error username/password' }, 400);

  const acesUser = {
    ts: new Date().getTime(),
    uid: found.uid,
    tid: found.tid,
    default_org: found.default_org,
    email: found.email,
    fullname: found.fullname,
    username: found.username,
    role: found.role,
    status: found.status,
    mems: found.mems,
    active_mems: found.active_mems,
    org_name: found.org_name,
    type: found.type,
    license: found.license,
    admin_id: found.admin_id,
    exp_date: found.exp_date,
  }

  console.log("acesUser", acesUser)

  const sealedData = await sealData(acesUser, {password: c.env.COOKIE_PASSWORD})
  setCookie(c, c.env.COOKIE_NAME, sealedData, {
    path: "/",
    secure: true,
  })
  c.status(200)
  c.res.headers.append('Access-Control-Allow-Origin', '*')
  return c.json({ user: acesUser, cookie: sealedData })
}

//
export async function switchAccount(c: Context<{ Bindings: Env}>) {
  console.log('Headers', c.req.header())
  // const { username, password } = (await c.req.json()) as unknown as any;
  const { uid, tid, password } = (await c.req.json()) as unknown as any;
  console.log(uid, tid, password)
  if (!password) return c.json({ info: 'Required: password' }, 400)

  const stmt = `SELECT * FROM accounts WHERE status='active' AND uid=? AND tid=?`
  const found: any = await c.env.DB.prepare(stmt).bind(uid, tid).first();
  console.log("found", found)

  if (!found) return c.json({ info: 'Not Found'}, 400);

  const hash = await decrypt(found.hash);
  if (password != hash) return c.json({ info: 'Error username/password' }, 400);

  const acesUser = {
    ts: new Date().getTime(),
    uid: found.uid,
    tid: found.tid,
    default_org: found.default_org,
    email: found.email,
    fullname: found.fullname,
    username: found.username,
    role: found.role,
    status: found.status,
    mems: found.mems,
    active_mems: found.active_mems,
    org_name: found.org_name,
    type: found.type,
    license: found.license,
    admin_id: found.admin_id,
    exp_date: found.exp_date,
  }

  const sealedData = await sealData(acesUser, {password: c.env.COOKIE_PASSWORD})
  setCookie(c, c.env.COOKIE_NAME, sealedData)
  c.status(200)
  c.res.headers.append('Access-Control-Allow-Origin', '*')
  return c.json({ user: acesUser, cookie: sealedData })
}