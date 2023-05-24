import { Context } from 'hono';
import { GPQPage } from './page';
import { GPQMax } from './spec';
import { getItemFromDoc } from '@/utils';
import { resetUserData } from '../utils';

const type = 'gpq';
const table = 'gpq_userdata';

const index = async (c: Context<{ Bindings: Env }>, p: Persona, rowid: string) => {
  // Check rowid
  const sql = `SELECT * FROM ${table} WHERE id=?`;
  const row: any = await c.env.DB.prepare(sql).bind(rowid).first();
  if (!row || row.uid != p.id) return c.text('Invalid row id', 400);

  // DEV: Reset
  // TODO: Decide what should be when user re-enter
  await resetUserData(c.env.DB, p, type, rowid);

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
