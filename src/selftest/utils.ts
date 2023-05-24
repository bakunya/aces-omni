import { shuffle } from "@/utils";
import { GMateElements } from "./gmate/spec";

function gmateRandomSequence() {
  const sequence: string[] = [];
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  const seed = shuffle(alpha.split(''));
  const keys = Object.keys(GMateElements);
  seed.forEach(async (prefix) => {
    keys
      .filter((k) => k.startsWith(prefix))
      .forEach((item) => {
        sequence.push(item);
      });
  });
  return sequence;
}

export const resetUserData = async (db: D1Database, p: Persona, type: string, rowid: string) => {
  console.log("resetUserData()")
  const { id, pid, tests } = p;
  // @ts-ignore
  const version = tests[type]
  const ts = new Date().getTime()

  const cols = type == 'gmate'
    ? '(id, uid, pid, version, enter, sequence)'
    : '(id, uid, pid, version, enter)';

  const sequence = type == 'gmate' ? gmateRandomSequence() : []
  const values = type == 'gmate' ? '(?,?,?,?,?,?)' : '(?,?,?,?,?)'

  const binds = type == 'gmate'
    ? [rowid, id, pid, version, ts, sequence.join(' ')]
    : [rowid, id, pid, version, ts]

  const table = type + "_userdata"
  const sql1 = `DELETE FROM ${table} WHERE id=?`;
  const sql2 = `INSERT INTO ${table} ${cols} VALUES ${values}`;

  try {
    await db.batch([
      // Delete
      db.prepare(sql1).bind(rowid),
      // Recreate
      db.prepare(sql2).bind(...binds),
    ]);
  } catch (e: any) {
    console.log({
      message: e.message,
      cause: e.cause.message,
    })
  }
};