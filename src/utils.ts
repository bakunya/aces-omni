import { Context } from "hono";
import { ulidFactory } from "ulid-workers";

const ulid = ulidFactory()

/**
 * Generate random value, can only be performed while handling a request.
 * @returns string ULID
 */
export const acesid = () => {
  return ulid().toLowerCase()
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