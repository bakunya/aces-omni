import { Context } from 'hono';
import { AIMEPage } from './page';
import { AIMEMax } from './spec';
import { getItemFromDoc } from '@/utils';

const table = 'aime_userdata';

const resetRow = async (db: D1Database, p: Persona, rowid: string) => {
  const ts = new Date().getTime();
  const cols = 'id, uid, pid, version, enter';
  const sql0 = `DELETE FROM ${table} WHERE id=?`;
  const sql1 = `INSERT INTO ${table} (${cols}) VALUES (?,?,?,?,?)`;

  try {
    await db.batch([
      // Delete
      db.prepare(sql0).bind(rowid),
      // Recreate
      db.prepare(sql1).bind(rowid, p.id, p.pid, p.tests.aime, ts),
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
  await resetRow(c.env.DB, p, rowid);

  const title = 'Tes AIME';
  const css = '';
  const js = '/static/js/aime.js';

  return c.html(
    <AIMEPage
      title={title}
      rowid={rowid}
      user={p}
      css={css}
      script={js}
      // item={item}
    />
  );
};

const post = async (c: Context<{ Bindings: Env }>, p: Persona) => {
  const json = await c.req.json();
  const { version, rowid, reqid, data } = json;

  if (data) {
    const { seq, sel, elp } = data;
    const c1 = 's' + seq;
    const c2 = 't' + seq;
    if (seq == AIMEMax) {
      const sql = `UPDATE ${table}
      SET lastseq=?, finish=?, ${c1}=?, ${c2}=?
      WHERE id=?`;
      const ts = new Date().getTime();
      await c.env.DB.prepare(sql).bind(seq, ts, sel, elp, rowid).run();
    } else if (seq > 0 && seq < AIMEMax) {
      const sql = `UPDATE ${table} SET lastseq=?, ${c1}=?, ${c2}=? WHERE id=?`;
      await c.env.DB.prepare(sql).bind(seq, sel, elp, rowid).run();
    }
  }

  // Simply return timestamp if req is falsy
  if (reqid == null)
    return c.json({
      ts: new Date().getTime(),
      item: null,
    });

  // Return item with timestamp
  const item = await getItemFromDoc(c.env.DB, 'aime', version, reqid);
  return c.json({
    ts: new Date().getTime(),
    item: item,
  });
};

const AIME = { index, post };
export default AIME;
