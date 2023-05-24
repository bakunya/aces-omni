import { Context } from 'hono';
import { GPROPage } from './page';
import { GPROMax } from './spec';
import { getItemFromDoc } from '@/utils';
import { resetUserData } from '../utils';

const type = 'gpro';
const table = 'gpro_userdata';

const index = async (c: Context<{ Bindings: Env }>, p: Persona, rowid: string) => {
  // Check rowid
  const sql = `SELECT * FROM ${table} WHERE id=?`;
  const row: any = await c.env.DB.prepare(sql).bind(rowid).first();
  if (!row || row.uid != p.id) return c.text('Invalid row id', 400);

  // DEV: Reset
  // TODO: Decide what should be when user re-enter
  await resetUserData(c.env.DB, p, type, rowid);

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
  const item = await getItemFromDoc(c.env.DB, 'gpro', version, reqid);
  return c.json({
    ts: new Date().getTime(),
    item: item,
  });
};

const GPRO = { index, post };
export default GPRO;
