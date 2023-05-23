import { Context } from 'hono';

const table = 'aime_userdata';

const index = async (c: Context<{ Bindings: Env }>, p: Persona, rowid: string) => {
  return c.json({ p, rowid });
};

const post = async (c: Context<{ Bindings: Env }>, p: Persona) => {};

const AIME = { index, post };
export default AIME;
