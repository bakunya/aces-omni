import { Context } from 'hono';
import { GPROPage } from './page';
import { GPROMax } from './spec';

const table = 'gpro_userdata';

const getItemFromDoc = async (db: D1Database, version: string, id: number) => {
  const sql = `SELECT * FROM gpro_doc WHERE id=? AND version=?`;
  return await db.prepare(sql).bind(id, version).first();
};

const reset = async (db: D1Database, p: Persona, rowid: string) => {
  const ts = new Date().getTime();
  const sql1 = `DELETE FROM ${table} WHERE id=?`;
  const sql2 = `INSERT INTO ${table} (id, uid, pid, version, enter) VALUES (?,?,?,?,?)`;

  try {
    await db.batch([
      // Delete
      db.prepare(sql1).bind(rowid),
      // Recreate
      db.prepare(sql2).bind(rowid, p.id, p.pid, p.tests.gpro, ts),
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

  const title = 'Tes GPRO';
  const css = '';
  const js = '/static/js/gpro.js';

  return c.html(
    <GPROPage
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
    const { seq, va, vb, elp } = data;
    const ca = 'a' + seq;
    const cb = 'b' + seq;
    const t = 't' + seq;
    if (seq == GPROMax) {
      const sql = `UPDATE ${table}
      SET lastseq=?, finish=?, ${ca}=?, ${cb}=?, ${t}=?
      WHERE id=?`;
      const ts = new Date().getTime();
      await c.env.DB.prepare(sql).bind(seq, ts, va, vb, elp, rowid).run();
    } else if (seq > 0 && seq < GPROMax) {
      const sql = `UPDATE ${table}
      SET lastseq=?, ${ca}=?, ${cb}=?, ${t}=?
      WHERE id=?`;
      await c.env.DB.prepare(sql).bind(seq, va, vb, elp, rowid).run();
    }
  }

  // Simply return timestamp if req is falsy
  if (reqid == null) {
    return c.json({
      ts: new Date().getTime(),
      item: null,
    });
  }

  // Return item with timestamp
  const item = await getItemFromDoc(c.env.DB, version, reqid);
  return c.json({
    ts: new Date().getTime(),
    item: item,
  });
};

const GPRO = { index, post };
export default GPRO;
