import { Context } from 'hono';
import { GPQPage } from './page';
import { GPQMax } from './spec';
import { getItemFromDoc } from '@/utils';

const table = 'gpq_userdata';

const reset = async (db: D1Database, p: Persona, rowid: string) => {
  const ts = new Date().getTime();
  const sql1 = `DELETE FROM ${table} WHERE id=?`;
  const sql2 = `INSERT INTO ${table} (id, uid, pid, version, enter) VALUES (?,?,?,?,?)`;

  try {
    await db.batch([
      // Delete
      db.prepare(sql1).bind(rowid),
      // Recreate
      db.prepare(sql2).bind(rowid, p.id, p.pid, p.tests.gpq, ts),
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
  await reset(c.env.DB, p, rowid);

  const title = 'Tes GPQ';
  const css = '';
  const js = '/static/js/gpq.js';

  return c.html(
    <GPQPage
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
    const c2 = 't' + seq;
    if (seq == GPQMax) {
      const sql = `UPDATE ${table}
      SET lastseq=?, finish=?, ${c1}=?, ${c2}=?, ${sel}=${sel}+1
      WHERE id=?`;
      const ts = new Date().getTime();
      await c.env.DB.prepare(sql).bind(seq, ts, sel, elp, rowid).run();
    } else if (seq > 0 && seq < GPQMax) {
      const sql = `UPDATE ${table}
      SET lastseq=?, ${c1}=?, ${c2}=?, ${sel}=${sel}+1
      WHERE id=?`;
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
  const item = await getItemFromDoc(c.env.DB, 'gpq', version, reqid);
  return c.json({
    ts: new Date().getTime(),
    item: item,
  });
};

const GPQ = { index, post };
export default GPQ;
