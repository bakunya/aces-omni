import { Context } from "hono";
import { encrypt } from "../crypto";
import { acesid } from "../utils";

/*
// ---1-------------------------------
// Admin 1
// Admin 2

// ---2-------------------------------
// Tenant 1: partner   - basic
//   User 1
//   Client 1
//   Project 1

// ---3-------------------------------
// Tenant 2: partner   - pro
//   User 2
//   User 3
//   Client 2
//   Project 2

// ---4-------------------------------
// Tenant 3: corporate - basic
//   User 4
//   Project 3
// ---5-------------------------------
// Tenant 4: corporate - pro
//   User 5
//   User 6
// ---6-------------------------------
// User 7
//   Tenant 2
//   Tenant 4
// ---7-------------------------------
// [Members]
// Tenant 1
//   User 1
// Tenant 2
//   User 2
//   User 3
//   User 7
// Tenant 3
//   User 4
// Tenant 4
//   User 5
//   User 6
//   User 7
// ---8-------------------------------
// Expert 1
// Expert 2
// Expert 3
// ---9-------------------------------
// [ProjectExperts ]
// Project 1
//   Expert 1
//   Expert 2
//   Expert 3
// Project 2
//   Expert 1
//   Expert 2
// Project 3
//   Expert 2
//   Expert 3
// ---10-------------------------------
// [Persona]
// Project 1
//   Person 1
//   Person 2
//   Person 3
// Project 2
//   Person 4
//   Person 5
//   Person 6
// Project 3
//   Person 7
//   Person 8
//   Person 9
// ---11-------------------------------
// [Hashes]
// Admin 1
// Admin 2
// User 1
// User 2
// User 3
// User 4
// User 5
// User 6
// User 7
// Expert 1
// Expert 2
// Expert 3
// Person 1
// Person 2
// Person 3
// Person 4
// Person 5
// Person 6
// Person 7
// Person 8
// Person 9
*/

export const dbseed = async (c: Context) => {
  const env: Env = c.env;
  const db = env.DB;

  // delete all
  await db.batch([
    db.prepare('DELETE FROM admins'),
    db.prepare('DELETE FROM experts'),
    db.prepare('DELETE FROM project_experts'),
    db.prepare('DELETE FROM users'),
    db.prepare('DELETE FROM members'),
    db.prepare('DELETE FROM persons'),
    db.prepare('DELETE FROM hashes'),
    db.prepare('DELETE FROM tenants'),
    db.prepare('DELETE FROM clients'),
    db.prepare('DELETE FROM projects'),
  ]);

  // ---1-------------------------------
  // Admin 1
  // Admin 2
  const admin1 = { id: acesid(), username: 'admin1', email: 'admin1@example.com', fullname: 'Admin 1' }
  const admin2 = { id: acesid(), username: 'admin2', email: 'admin2@example.com', fullname: 'Admin 2' }
  let sql = `INSERT INTO admins (id,email,username,fullname) VALUES (?,?,?,?)`;
  await db.batch([
    db.prepare(sql).bind(admin1.id, admin1.email, admin1.username, admin1.fullname),
    db.prepare(sql).bind(admin2.id, admin2.email, admin2.username, admin2.fullname),
  ]);

  // ---2-------------------------------
  // Tenant 1: partner   - basic
  //   User 1
  //   Client 1
  //   Project 1
  const user1 = { id: acesid(), username: 'user1', email: 'user1@example.com', fullname: 'User 1' }
  const tenant1 = { id: acesid(), admin_id: user1.id, org_name: 'PT Gaia Poltangan'}
  const client1 = { id: acesid(), tid: tenant1.id, org_name: 'PT Sanur Indah Pertama'}
  const project1 = { id: acesid(), tid: tenant1.id, cid: client1.id, title: 'Proyek Semester Behavioral', slug: 'semester-behave' }
  await db.batch([
    db.prepare(`INSERT INTO users (id,email,username,fullname) VALUES (?,?,?,?)`).bind(user1.id, user1.email, user1.username, user1.fullname),
    db.prepare(`INSERT INTO tenants (id,admin_id,org_name,type,license) VALUES (?,?,?,?,?)`).bind(tenant1.id, tenant1.admin_id, tenant1.org_name, 'partner', 'basic'),
    db.prepare(`INSERT INTO clients (id,tid,org_name) VALUES (?,?,?)`).bind(client1.id, client1.tid, client1.org_name),
    db.prepare(`INSERT INTO projects (id,admin_id,tid,cid,title,slug) VALUES (?,?,?,?,?,?)`).bind(project1.id, user1.id, tenant1.id, project1.cid, project1.title, project1.slug),
  ])

  // ---3-------------------------------
  // Tenant 2: partner   - pro
  //   User 2
  //   User 3
  //   Client 2
  //   Project 2
  const user2 = { id: acesid(), username: 'user2', email: 'user2@example.com', fullname: 'User 2' }
  const user3 = { id: acesid(), username: 'user3', email: 'user3@example.com', fullname: 'User 3' }
  const tenant2 = { id: acesid(), admin_id: user2.id, org_name: 'PT Tunas Belanja'}
  const client2 = { id: acesid(), tid: tenant2.id, org_name: 'PT Lukita Chemistry'}
  const project2 = { id: acesid(), tid: tenant2.id, cid: client2.id, title: 'Asesmen PT Lukita Chemistry', slug: 'lukita-chem' }
  await db.batch([
    db.prepare(`INSERT INTO users (id,email,username,fullname) VALUES (?,?,?,?)`).bind(user2.id, user2.email, user2.username, user2.fullname),
    db.prepare(`INSERT INTO users (id,email,username,fullname) VALUES (?,?,?,?)`).bind(user3.id, user3.email, user3.username, user3.fullname),
    db.prepare(`INSERT INTO tenants (id,admin_id,org_name,type,license) VALUES (?,?,?,?,?)`).bind(tenant2.id, tenant2.admin_id, tenant2.org_name, 'partner', 'pro'),
    db.prepare(`INSERT INTO clients (id,tid,org_name) VALUES (?,?,?)`).bind(client2.id, client2.tid, client2.org_name),
    db.prepare(`INSERT INTO projects (id,admin_id,tid,cid,title,slug) VALUES (?,?,?,?,?,?)`).bind(project2.id, user2.id, tenant2.id, project2.cid, project2.title, project2.slug),
  ])

  // ---4-------------------------------
  // Tenant 3: corporate - basic
  //   User 4
  //   Project 3
  const user4 = { id: acesid(), username: 'user4', email: 'user4@example.com', fullname: 'User 4' }
  const tenant3 = { id: acesid(), admin_id: user4.id, org_name: 'Senar Sakrti Resources'}
  const project3 = { id: acesid(), tid: tenant3.id, cid: null, title: 'Asesmen Tingkat Madya', slug: 'atm-2023' }
  await db.batch([
    db.prepare(`INSERT INTO users (id,email,username,fullname) VALUES (?,?,?,?)`).bind(user4.id, user4.email, user4.username, user4.fullname),
    db.prepare(`INSERT INTO tenants (id,admin_id,org_name,type,license) VALUES (?,?,?,?,?)`).bind(tenant3.id, tenant3.admin_id, tenant3.org_name, 'corporate', 'basic'),
    db.prepare(`INSERT INTO projects (id,admin_id,tid,cid,title,slug) VALUES (?,?,?,?,?,?)`).bind(project3.id, user4.id, tenant3.id, null, project3.title, project3.slug),
  ])

  // ---5-------------------------------
  // Tenant 4: corporate - pro
  //   User 5
  //   User 6
  const user5 = { id: acesid(), username: 'user5', email: 'user5@example.com', fullname: 'User 5' }
  const user6 = { id: acesid(), username: 'user6', email: 'user6@example.com', fullname: 'User 6' }
  const tenant4 = { id: acesid(), admin_id: user5.id, org_name: 'PT Lakola Beverages'}
  await db.batch([
    db.prepare(`INSERT INTO users (id,email,username,fullname) VALUES (?,?,?,?)`).bind(user5.id, user5.email, user5.username, user5.fullname),
    db.prepare(`INSERT INTO users (id,email,username,fullname) VALUES (?,?,?,?)`).bind(user6.id, user6.email, user6.username, user6.fullname),
    db.prepare(`INSERT INTO tenants (id,admin_id,org_name,type,license) VALUES (?,?,?,?,?)`).bind(tenant4.id, tenant4.admin_id, tenant4.org_name, 'corporate', 'pro'),
  ])

  // ---6-------------------------------
  // User 7  Tenant 2
  //         Tenant 4
  const user7 = { id: acesid(), username: 'user7', email: 'user7@example.com', fullname: 'User 7' }
  await db.prepare(`INSERT INTO users (id,email,username,fullname) VALUES (?,?,?,?)`).bind(user7.id, user7.email, user7.username, user7.fullname).run()

  // ---7-------------------------------
  // [Members]
  // Tenant 1   User 1
  // Tenant 2   User 2
  //            User 3
  //            User 7
  // Tenant 3   User 4
  // Tenant 4   User 5
  //            User 6
  //            User 7
  const m1 = { uid: user1.id, tid: tenant1.id }
  const m2 = { uid: user2.id, tid: tenant2.id }
  const m3 = { uid: user3.id, tid: tenant2.id }
  const m4 = { uid: user4.id, tid: tenant3.id }
  const m5 = { uid: user5.id, tid: tenant4.id }
  const m6 = { uid: user6.id, tid: tenant4.id }
  const m7 = { uid: user7.id, tid: tenant2.id }
  const m8 = { uid: user7.id, tid: tenant4.id }
  await db.batch([
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m1.uid, m1.tid),
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m2.uid, m2.tid),
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m3.uid, m3.tid),
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m4.uid, m4.tid),
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m5.uid, m5.tid),
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m6.uid, m6.tid),
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m7.uid, m7.tid),
    db.prepare(`INSERT INTO members (uid,tid) VALUES (?,?)`).bind(m8.uid, m8.tid),
  ])

  // update default_org
  const d1 = { uid: user1.id, default_org: tenant1.id }
  const d2 = { uid: user2.id, default_org: tenant2.id }
  const d3 = { uid: user3.id, default_org: tenant2.id }
  const d4 = { uid: user4.id, default_org: tenant3.id }
  const d5 = { uid: user5.id, default_org: tenant4.id }
  const d6 = { uid: user6.id, default_org: tenant4.id }
  const d7 = { uid: user7.id, default_org: tenant2.id }
  await db.batch([
    db.prepare(`UPDATE members SET default_org=? WHERE uid=?`).bind(d1.default_org, d1.uid),
    db.prepare(`UPDATE members SET default_org=? WHERE uid=?`).bind(d2.default_org, d2.uid),
    db.prepare(`UPDATE members SET default_org=? WHERE uid=?`).bind(d3.default_org, d3.uid),
    db.prepare(`UPDATE members SET default_org=? WHERE uid=?`).bind(d4.default_org, d4.uid),
    db.prepare(`UPDATE members SET default_org=? WHERE uid=?`).bind(d5.default_org, d5.uid),
    db.prepare(`UPDATE members SET default_org=? WHERE uid=?`).bind(d6.default_org, d6.uid),
    db.prepare(`UPDATE members SET default_org=? WHERE uid=?`).bind(d7.default_org, d7.uid),
  ])

  // ---8-------------------------------
  // Expert 1
  // Expert 2
  // Expert 3
  const x1 = { id: acesid(), username: 'expert1', email: 'expert1@example.com', fullname: 'Assessor 1' }
  const x2 = { id: acesid(), username: 'expert2', email: 'expert2@example.com', fullname: 'Assessor 2' }
  const x3 = { id: acesid(), username: 'expert3', email: 'expert3@example.com', fullname: 'Assessor 3' }
  await db.batch([
    db.prepare(`INSERT INTO experts (id,email,username,fullname) VALUES (?,?,?,?)`).bind(x1.id, x1.email, x1.username, x1.fullname),
    db.prepare(`INSERT INTO experts (id,email,username,fullname) VALUES (?,?,?,?)`).bind(x2.id, x2.email, x2.username, x2.fullname),
    db.prepare(`INSERT INTO experts (id,email,username,fullname) VALUES (?,?,?,?)`).bind(x3.id, x3.email, x3.username, x3.fullname),
  ])

  // ---9-------------------------------
  // [ProjectExperts ]
  // Project 1  Expert 1
  //            Expert 2
  //            Expert 3
  // Project 2  Expert 1
  //            Expert 2
  // Project 3  Expert 2
  //            Expert 3
  const pe1 = { pid: project1.id, xid: x1.id }
  const pe2 = { pid: project1.id, xid: x2.id }
  const pe3 = { pid: project1.id, xid: x3.id }
  const pe4 = { pid: project2.id, xid: x1.id }
  const pe5 = { pid: project2.id, xid: x2.id }
  const pe6 = { pid: project3.id, xid: x2.id }
  const pe7 = { pid: project3.id, xid: x3.id }
  await db.batch([
    db.prepare(`INSERT INTO project_experts (pid,xid) VALUES (?,?)`).bind(pe1.pid, pe1.xid),
    db.prepare(`INSERT INTO project_experts (pid,xid) VALUES (?,?)`).bind(pe2.pid, pe2.xid),
    db.prepare(`INSERT INTO project_experts (pid,xid) VALUES (?,?)`).bind(pe3.pid, pe3.xid),
    db.prepare(`INSERT INTO project_experts (pid,xid) VALUES (?,?)`).bind(pe4.pid, pe4.xid),
    db.prepare(`INSERT INTO project_experts (pid,xid) VALUES (?,?)`).bind(pe5.pid, pe5.xid),
    db.prepare(`INSERT INTO project_experts (pid,xid) VALUES (?,?)`).bind(pe6.pid, pe6.xid),
    db.prepare(`INSERT INTO project_experts (pid,xid) VALUES (?,?)`).bind(pe7.pid, pe7.xid),
  ])

  // ---10-------------------------------
  // [Persona]
  // Project 1  Person 1
  //            Person 2
  //            Person 3
  // Project 2  Person 4
  //            Person 5
  //            Person 6
  // Project 3  Person 7
  //            Person 8
  //            Person 9
  const p1 = { id: acesid(), pid: project1.id, username: 'person1', fullname: 'Persona 1'}
  const p2 = { id: acesid(), pid: project1.id, username: 'person2', fullname: 'Persona 2'}
  const p3 = { id: acesid(), pid: project1.id, username: 'person3', fullname: 'Persona 3'}
  const p4 = { id: acesid(), pid: project2.id, username: 'person4', fullname: 'Persona 4'}
  const p5 = { id: acesid(), pid: project2.id, username: 'person5', fullname: 'Persona 5'}
  const p6 = { id: acesid(), pid: project2.id, username: 'person6', fullname: 'Persona 6'}
  const p7 = { id: acesid(), pid: project3.id, username: 'person7', fullname: 'Persona 7'}
  const p8 = { id: acesid(), pid: project3.id, username: 'person8', fullname: 'Persona 8'}
  const p9 = { id: acesid(), pid: project3.id, username: 'person9', fullname: 'Persona 9'}
  await db.batch([
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p1.id, p1.pid, p1.username, p1.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p2.id, p2.pid, p2.username, p2.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p3.id, p3.pid, p3.username, p3.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p4.id, p4.pid, p4.username, p4.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p5.id, p5.pid, p5.username, p5.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p6.id, p6.pid, p6.username, p6.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p7.id, p7.pid, p7.username, p7.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p8.id, p8.pid, p8.username, p8.fullname),
    db.prepare(`INSERT INTO persons (id,pid,username,fullname) VALUES (?,?,?,?)`).bind(p9.id, p9.pid, p9.username, p9.fullname),
  ])

  // ---11-------------------------------
  // [Hashes]
  // Admin 1
  // Admin 2
  // User 1
  // User 2
  // User 3
  // User 4
  // User 5
  // User 6
  // User 7
  // Expert 1
  // Expert 2
  // Expert 3
  // Person 1
  // Person 2
  // Person 3
  // Person 4
  // Person 5
  // Person 6
  // Person 7
  // Person 8
  // Person 9
  const h1  = { id: admin1.id, hash: await encrypt(admin1.username) }
  const h2  = { id: admin2.id, hash: await encrypt(admin2.username) }
  const h3  = { id: user1.id, hash: await encrypt(user1.username) }
  const h4  = { id: user2.id, hash: await encrypt(user2.username) }
  const h5  = { id: user3.id, hash: await encrypt(user3.username) }
  const h6  = { id: user4.id, hash: await encrypt(user4.username) }
  const h7  = { id: user5.id, hash: await encrypt(user5.username) }
  const h8  = { id: user6.id, hash: await encrypt(user6.username) }
  const h9  = { id: user7.id, hash: await encrypt(user7.username) }
  const h10 = { id: x1.id, hash: await encrypt(x1.username) }
  const h11 = { id: x2.id, hash: await encrypt(x2.username) }
  const h12 = { id: x3.id, hash: await encrypt(x3.username) }
  const h13 = { id: p1.id, hash: await encrypt(p1.username) }
  const h14 = { id: p2.id, hash: await encrypt(p2.username) }
  const h15 = { id: p3.id, hash: await encrypt(p3.username) }
  const h16 = { id: p4.id, hash: await encrypt(p4.username) }
  const h17 = { id: p5.id, hash: await encrypt(p5.username) }
  const h18 = { id: p6.id, hash: await encrypt(p6.username) }
  const h19 = { id: p7.id, hash: await encrypt(p7.username) }
  const h20 = { id: p8.id, hash: await encrypt(p8.username) }
  const h21 = { id: p9.id, hash: await encrypt(p9.username) }
  await db.batch([
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h1.hash, h1.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h2.hash, h2.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h3.hash, h3.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h4.hash, h4.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h5.hash, h5.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h6.hash, h6.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h7.hash, h7.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h8.hash, h8.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h9.hash, h9.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h10.hash, h10.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h11.hash, h11.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h12.hash, h12.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h13.hash, h13.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h14.hash, h14.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h15.hash, h15.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h16.hash, h16.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h17.hash, h17.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h18.hash, h18.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h19.hash, h19.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h20.hash, h20.id),
    db.prepare(`UPDATE hashes SET hash=? WHERE id=?`).bind(h21.hash, h21.id),
  ])

  // Set tests
  const tests = [
    "abstract:202303",
    "aime:202303",
    "csi:202303",
    "gmate:202303",
    "gpro:202303",
    "numerical:202303",
    "verbal:202303",
    "gpq:202303",
    "interview:",
    "intray:",
    "lgd:",
  ]
  const update = "UPDATE persons SET tests=?"
  await db.prepare(update).bind(JSON.stringify(tests)).run()

  return c.text('DB refreshed')
}



/*
01h106zdgndkzv0kh95y5w11fe
01h106zdgnzecyw2kbt6cakz2f
01h106zdgnamkrsw71gsjh44br
01h106zdgnnzhy3fkqsmbh9zk5
01h106zdgn3wsamtaybv8sb6x3
01h106zdgn3da88qhkasga81ed
01h106zdgnx5d20e4zqsbj7wgg
01h106zdgndnwv2amwzgx9zevn
01h106zdgn8bq7fj4p39yvwjrr
01h106zdgnh0drbkhn39jzgy0s

01h106zdgnzecyw2kbt6cakz2f
01h106zdgnx5d20e4zqsbj7wgg
01h106zdgnnzhy3fkqsmbh9zk5
01h106zdgnh0drbkhn39jzgy0s
01h106zdgndnwv2amwzgx9zevn
01h106zdgndkzv0kh95y5w11fe
01h106zdgnamkrsw71gsjh44br
01h106zdgn8bq7fj4p39yvwjrr
01h106zdgn3wsamtaybv8sb6x3
01h106zdgn3da88qhkasga81ed

*/