import { Context } from 'hono';
import { getCookie } from 'hono/cookie'
import { unsealData } from 'iron-session/edge';

/**
 *
 * @param c Context
 * @returns API user or null
 */
export async function getApiUser(c: Context) {
  // Check custom header
  const cHeader = c.req.headers.get(c.env.CUSTOM_HEADER)
  // console.log("cHeader", cHeader)
  if (cHeader) {
    const data = await unsealData(cHeader, { password: c.env.COOKIE_PASSWORD })
    console.log("data", data)
    const user: any = data.user
    console.log("user ->", user)
    if (user.ts && user.uid && user.tid && user.fullname ) return user
  }

  // Check cookie
  const cookie = c.req.headers.get('cookie')
  if (cookie) {
    const data = cookie.substring(c.env.COOKIE_NAME.length + 1)
    const user = await unsealData(data, { password: c.env.COOKIE_PASSWORD })
    // Validate shape
    const { uid, tid, org_name, email, fullname } = user;
    if (uid && tid && fullname && email && org_name) return user;
  }

  return null;
}

export async function getTestUser(c: Context) {
  console.log("getTestUser(c)")
  // Test user uses cookie
  const cookie = getCookie(c, c.env.COOKIE_NAME)
  if (cookie) {
    const user = await unsealData(cookie, { password: c.env.COOKIE_PASSWORD })

    // Validate shape
    const { id, pid, tid, slug, org_name, username, fullname } = user;
    if (id && pid && tid && slug && fullname && username && org_name) return user as unknown as Persona;
  }

  return null;
}