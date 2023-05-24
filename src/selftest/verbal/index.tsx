import { Context } from 'hono';
import { VerbalPage } from './page';
import { getItemFromDoc, getVerbalKeys } from '@/utils';
import { resetUserData } from '../utils';

const type = 'verbal';
const table = 'verbal_userdata';
const MAX = 25;

const getScore = async (c: Context, seq: number, sel: string) => {
  const keys = await getVerbalKeys(c);
  const key = keys[seq - 1];
  return key == sel ? 1 : 0;
}

const index = async (c: Context<{ Bindings: Env }>, p: Persona, rowid: string) => {
  // Check rowid
  const sql = `SELECT * FROM ${table} WHERE id=?`;
  const row: any = await c.env.DB.prepare(sql).bind(rowid).first();
  if (!row || row.uid != p.id) return c.text('Invalid row id', 400);

  // DEV: Reset
  // TODO: Decide what should be when user re-enter
  await resetUserData(c.env.DB, p, type, rowid);

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
