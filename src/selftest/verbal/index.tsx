import { Context } from 'hono';

const table = 'verbal_userdata';

const index = async (c: Context<{ Bindings: Env }>, p: Persona, rowid: string) => {
  return c.json({ p, rowid });
};

const post = async (c: Context<{ Bindings: Env }>, p: Persona) => {};

const Verbal = { index, post };
export default Verbal;
