import { getItemFromDoc, getVerbalKeys } from '@/utils';
import { Context } from 'hono';
import { VerbalPage } from './page';

const table = 'verbal_userdata';
const MAX = 25;

const getScore = async (c: Context, seq: number, sel: string) => {
  const keys = await getVerbalKeys(c);
  const key = keys[seq - 1];
  return key == sel ? 1 : 0;
}

const reset = async (db: D1Database, p: Persona, rowid: string) => {
  // const { uid, batch, tests } = user;
  const ts = new Date().getTime();
  // const version = tests[TEST_NAME];
  // const cols = 'id, uid, batch, version, enter';
  const sql1 = `DELETE FROM ${table} WHERE id=?`;
  const sql2 = `INSERT INTO ${table} (id, uid, pid, version, enter) VALUES (?,?,?,?,?)`;

  try {
    await db.batch([
      // Delete
      db.prepare(sql1).bind(rowid),
      // Recreate
      db.prepare(sql2).bind(rowid, p.id, p.pid, p.tests.verbal, ts),
    ]);
  } catch (error) {
    //
  }
};


const index = async (c: Context<{ Bindings: Env }>, p: Persona, rowid: string) => {
  // Check rowid
  const sql = `SELECT * FROM ${table} WHERE id=?`;
  const row: any = await c.env.DB.prepare(sql).bind(rowid).first();
  if (!row || row.uid != p.id) return c.text('Invalid row id', 400);

  // DEV: Reset
  // TODO: Decide what should be when user re-enter
  await reset(c.env.DB, p, rowid)

  const title = 'Tes Abstract';
  const css = '';
  const js = '/static/js/verbal.js';

  return c.html(
    <VerbalPage
      //
      title={title}
      rowid={rowid}
      user={p}
      css={css}
      script={js}
    />
  );
};

const post = async (c: Context<{ Bindings: Env }>, p: Persona) => {
  const json = await c.req.json();
  const { version, rowid, reqid, data } = json;

  // Save userdata
  if (data) {
    const { seq, sel, elp } = data;
    const c1 = 's' + seq;
    const c2 = 'v' + seq;
    const c3 = 't' + seq;
    const score = await getScore(c, seq, sel);
    const finish = seq == MAX ? new Date().getTime() : 0;
    const sql = `UPDATE ${table}
    SET laststep=?, finish=?, ${c1}=?, ${c2}=?, ${c3}=?
    WHERE id=?`;
    await c.env.DB.prepare(sql).bind(seq, finish, sel, score, elp, rowid).run();
  }

  // Simply return timestamp if req is falsy
  if (reqid == null) {
    return c.json({
      ts: new Date().getTime(),
      item: null,
    });
  }

  // Return timestamp with item
  const item = await getItemFromDoc(c.env.DB, 'verbal', version, reqid);
  return c.json({
    ts: new Date().getTime(),
    item: item,
  });
};

const Verbal = { index, post };
export default Verbal;
