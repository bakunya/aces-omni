import { Context } from "hono";
import { unsealData } from "iron-session/edge";
import { ulidFactory } from "ulid-workers";

const ulid = ulidFactory()

/**
 * Generate random value, can only be performed while handling a request.
 * @returns string ULID
 */
export const acesid = () => {
  return ulid().toLowerCase()
}

/**
 * Returns shuffled copy of an array. ES6 version
 * @param {Array} array items An array containing the items.
 */
export function shuffle(array: any[]) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const notFound = (c: Context) => {
  return c.json({ info: "Not Found" }, 404)
}

export function filterFields(o: Record<string, any>, filter: string[]) {
  const columns: string[] = []
  const values: any[] = []
  Object.keys(o).forEach(k => {
    if (filter.includes(k)) {
      columns.push(k);
      values.push(o[k])
    }
  })
  return { columns, values }
}

export const logHeader = (c: Context) => {
  const h = c.req.header()
  console.log(Object.keys(h))

  console.log('c.req.url:', c.req.url)
  console.log(c.req.headers.get('host'))

  console.log('accept:', c.req.header('accept'))
  console.log('accept-encoding:', c.req.header('accept-encoding'))
  console.log('accept-language:', c.req.header('accept-language'))
  console.log('cache-control:', c.req.header('cache-control'))
  console.log('connection:', c.req.header('connection'))
  console.log('cookie:', c.req.header('cookie'))
  console.log('host:', c.req.header('host'))
  console.log('sec-ch-ua:', c.req.header('sec-ch-ua'))
  console.log('sec-ch-ua-mobile:', c.req.header('sec-ch-ua-mobile'))
  console.log('sec-ch-ua-platform:', c.req.header('sec-ch-ua-platform'))
  console.log('sec-fetch-dest:', c.req.header('sec-fetch-dest'))
  console.log('sec-fetch-mode:', c.req.header('sec-fetch-mode'))
  console.log('sec-fetch-site:', c.req.header('sec-fetch-site'))
  console.log('sec-fetch-user:', c.req.header('sec-fetch-user'))
  console.log('upgrade-insecure-requests:', c.req.header('upgrade-insecure-requests'))
  console.log('user-agent:', c.req.header('user-agent'))

  console.log('x-aces-auth:', c.req.headers.get('x-aces-auth'))
}

export async function serveAsset(c: Context, path: string) {
  const splits = path.split('.')
  if (splits.length < 2) return c.text("Server Error!", 500)

  const env: Env = c.env
  const prefix = splits[0] + '.'
  const kv = env.__STATIC_CONTENT
  const { keys } = await kv.list({ prefix })
  if (keys.length == 0) return c.text("Server Error!", 500)

  const src = await kv.get(keys[0].name) || '';
  return c.html(src)
}

export function validReferer(c: Context) {
  const referer = c.req.header("referer");
  if (!referer) return false

  const url = new URL(c.req.url);
  const host = url.host;
  const origin = url.origin;
  const hostFromOrigin = origin.substring(origin.lastIndexOf("/") + 1);
  return host == hostFromOrigin;
}

export async function getAbstractKeys(c: Context) {
  const data: Cognitive = await unsealData(c.env.COGNITIVE_KEYS, { password: c.env.COOKIE_PASSWORD })
  return data.abstract ? data.abstract?.split('') : []
}

export async function getNumericalKeys(c: Context) {
  const data: Cognitive = await unsealData(c.env.COGNITIVE_KEYS, { password: c.env.COOKIE_PASSWORD })
  return data.numerical ? data.numerical?.split('') : []
}

export async function getVerbalKeys(c: Context) {
  const data: Cognitive = await unsealData(c.env.COGNITIVE_KEYS, { password: c.env.COOKIE_PASSWORD })
  return data.verbal ? data.verbal?.split('') : []
}

export async function getGMateKeys(c: Context) {
  const data: Cognitive = await unsealData(c.env.COGNITIVE_KEYS, { password: c.env.COOKIE_PASSWORD })
  return data.gmate ? data.gmate.split(' ') : []
}