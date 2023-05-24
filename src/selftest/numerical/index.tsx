import { Context } from 'hono';
import { NumericalPage } from './page';
import { getItemFromDoc, getNumericalKeys } from '@/utils';
import { Data1, Data2, Data3, Data4, Data5 } from './data';
import { resetUserData } from '../utils';

const type = 'numerical';
const table = 'numerical_userdata';
const MAX = 20;

const getScore = async (c: Context, seq: number, sel: string) => {
  const keys = await getNumericalKeys(c);
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

  const title = 'Tes Numerical';
  const css = '';
  const js = '/static/js/numerical.js';

  return c.html(
    <NumericalPage
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
    const rs = await c.env.DB.prepare(sql).bind(seq, finish, sel, score, elp, rowid).run();
    console.log("RS", rs)
  }

  // Case figures (first request)
  // Return figures data and item 1
  if (reqid == 'figures') {
    const item = await getItemFromDoc(c.env.DB, 'numerical', version, 1);
    return c.json({
      ts: new Date().getTime(),
      item: item,
      figures: [
        //
        Data1().toString(),
        Data2().toString(),
        Data3().toString(),
        Data4().toString(),
        Data5().toString(),
      ],
    });
  }

  // Simply return timestamp if req is falsy
  if (reqid == null) {
    return c.json({
      ts: new Date().getTime(),
      item: null,
    });
  }

  // Return timestamp with item
  const item = await await getItemFromDoc(c.env.DB, 'numerical', version, reqid);
  return c.json({
    ts: new Date().getTime(),
    item: item,
  });
};

const Numerical = { index, post };
export default Numerical;
