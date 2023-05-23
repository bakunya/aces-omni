-- 5 csi
DROP TABLE IF EXISTS csi_userdata;
CREATE TABLE csi_userdata (
    [id] TEXT PRIMARY KEY,
    [uid] TEXT DEFAULT '',
    [batch] TEXT DEFAULT '',
    [version] TEXT DEFAULT '',
    [length] INTEGER DEFAULT 72,
    [lastseq] INTEGER DEFAULT 0,
    [enter] INTEGER DEFAULT 0, -- timestamp
    [intro] INTEGER DEFAULT 0, -- timestamp
    [sims] INTEGER DEFAULT 0,-- timestamp
    [start] INTEGER DEFAULT 0, -- timestamp (start s1)
    [finish] INTEGER DEFAULT 0, -- timestamp (finish s72)
    --
    [s1] INTEGER DEFAULT 0, -- user-entered value
    [t1] INTEGER DEFAULT 0, -- elapsed time
    [s2] INTEGER DEFAULT 0, [t2] INTEGER DEFAULT 0,
    [s3] INTEGER DEFAULT 0, [t3] INTEGER DEFAULT 0,
    [s4] INTEGER DEFAULT 0, [t4] INTEGER DEFAULT 0,
    [s5] INTEGER DEFAULT 0, [t5] INTEGER DEFAULT 0,
    [s6] INTEGER DEFAULT 0, [t6] INTEGER DEFAULT 0,
    [s7] INTEGER DEFAULT 0, [t7] INTEGER DEFAULT 0,
    [s8] INTEGER DEFAULT 0, [t8] INTEGER DEFAULT 0,
    [s9] INTEGER DEFAULT 0, [t9] INTEGER DEFAULT 0,
    [s10] INTEGER DEFAULT 0, [t10] INTEGER DEFAULT 0,
    [s11] INTEGER DEFAULT 0, [t11] INTEGER DEFAULT 0,
    [s12] INTEGER DEFAULT 0, [t12] INTEGER DEFAULT 0,
    [s13] INTEGER DEFAULT 0, [t13] INTEGER DEFAULT 0,
    [s14] INTEGER DEFAULT 0, [t14] INTEGER DEFAULT 0,
    [s15] INTEGER DEFAULT 0, [t15] INTEGER DEFAULT 0,
    [s16] INTEGER DEFAULT 0, [t16] INTEGER DEFAULT 0,
    [s17] INTEGER DEFAULT 0, [t17] INTEGER DEFAULT 0,
    [s18] INTEGER DEFAULT 0, [t18] INTEGER DEFAULT 0,
    [s19] INTEGER DEFAULT 0, [t19] INTEGER DEFAULT 0,
    [s20] INTEGER DEFAULT 0, [t20] INTEGER DEFAULT 0,
    [s21] INTEGER DEFAULT 0, [t21] INTEGER DEFAULT 0,
    [s22] INTEGER DEFAULT 0, [t22] INTEGER DEFAULT 0,
    [s23] INTEGER DEFAULT 0, [t23] INTEGER DEFAULT 0,
    [s24] INTEGER DEFAULT 0, [t24] INTEGER DEFAULT 0,
    [s25] INTEGER DEFAULT 0, [t25] INTEGER DEFAULT 0,
    [s26] INTEGER DEFAULT 0, [t26] INTEGER DEFAULT 0,
    [s27] INTEGER DEFAULT 0, [t27] INTEGER DEFAULT 0,
    [s28] INTEGER DEFAULT 0, [t28] INTEGER DEFAULT 0,
    [s29] INTEGER DEFAULT 0, [t29] INTEGER DEFAULT 0,
    [s30] INTEGER DEFAULT 0, [t30] INTEGER DEFAULT 0,
    [s31] INTEGER DEFAULT 0, [t31] INTEGER DEFAULT 0,
    [s32] INTEGER DEFAULT 0, [t32] INTEGER DEFAULT 0,
    [s33] INTEGER DEFAULT 0, [t33] INTEGER DEFAULT 0,
    [s34] INTEGER DEFAULT 0, [t34] INTEGER DEFAULT 0,
    [s35] INTEGER DEFAULT 0, [t35] INTEGER DEFAULT 0,
    [s36] INTEGER DEFAULT 0, [t36] INTEGER DEFAULT 0,
    [s37] INTEGER DEFAULT 0, [t37] INTEGER DEFAULT 0,
    [s38] INTEGER DEFAULT 0, [t38] INTEGER DEFAULT 0,
    [s39] INTEGER DEFAULT 0, [t39] INTEGER DEFAULT 0,
    [s40] INTEGER DEFAULT 0, [t40] INTEGER DEFAULT 0,
    [s41] INTEGER DEFAULT 0, [t41] INTEGER DEFAULT 0,
    [s42] INTEGER DEFAULT 0, [t42] INTEGER DEFAULT 0,
    [s43] INTEGER DEFAULT 0, [t43] INTEGER DEFAULT 0,
    [s44] INTEGER DEFAULT 0, [t44] INTEGER DEFAULT 0,
    [s45] INTEGER DEFAULT 0, [t45] INTEGER DEFAULT 0,
    [s46] INTEGER DEFAULT 0, [t46] INTEGER DEFAULT 0,
    [s47] INTEGER DEFAULT 0, [t47] INTEGER DEFAULT 0,
    [s48] INTEGER DEFAULT 0, [t48] INTEGER DEFAULT 0,
    [s49] INTEGER DEFAULT 0, [t49] INTEGER DEFAULT 0,
    [s50] INTEGER DEFAULT 0, [t50] INTEGER DEFAULT 0,
    [s51] INTEGER DEFAULT 0, [t51] INTEGER DEFAULT 0,
    [s52] INTEGER DEFAULT 0, [t52] INTEGER DEFAULT 0,
    [s53] INTEGER DEFAULT 0, [t53] INTEGER DEFAULT 0,
    [s54] INTEGER DEFAULT 0, [t54] INTEGER DEFAULT 0,
    [s55] INTEGER DEFAULT 0, [t55] INTEGER DEFAULT 0,
    [s56] INTEGER DEFAULT 0, [t56] INTEGER DEFAULT 0,
    [s57] INTEGER DEFAULT 0, [t57] INTEGER DEFAULT 0,
    [s58] INTEGER DEFAULT 0, [t58] INTEGER DEFAULT 0,
    [s59] INTEGER DEFAULT 0, [t59] INTEGER DEFAULT 0,
    [s60] INTEGER DEFAULT 0, [t60] INTEGER DEFAULT 0,
    [s61] INTEGER DEFAULT 0, [t61] INTEGER DEFAULT 0,
    [s62] INTEGER DEFAULT 0, [t62] INTEGER DEFAULT 0,
    [s63] INTEGER DEFAULT 0, [t63] INTEGER DEFAULT 0,
    [s64] INTEGER DEFAULT 0, [t64] INTEGER DEFAULT 0,
    [s65] INTEGER DEFAULT 0, [t65] INTEGER DEFAULT 0,
    [s66] INTEGER DEFAULT 0, [t66] INTEGER DEFAULT 0,
    [s67] INTEGER DEFAULT 0, [t67] INTEGER DEFAULT 0,
    [s68] INTEGER DEFAULT 0, [t68] INTEGER DEFAULT 0,
    [s69] INTEGER DEFAULT 0, [t69] INTEGER DEFAULT 0,
    [s70] INTEGER DEFAULT 0, [t70] INTEGER DEFAULT 0,
    [s71] INTEGER DEFAULT 0, [t71] INTEGER DEFAULT 0,
    [s72] INTEGER DEFAULT 0, [t72] INTEGER DEFAULT 0,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);
DROP VIEW IF EXISTS csi_view;
CREATE VIEW csi_view AS SELECT
    id, uid, batch, version, lastseq,
    s1+s9+s17+s25+s33+s41+s49+s57+s65 AS PS,
    s2+s10+s18+s26+s34+s42+s50+s58+s66 AS CR,
    s3+s11+s19+s27+s35+s43+s51+s59+s67 AS EE,
    s4+s12+s20+s28+s36+s44+s52+s60+s68 AS SS,
    s5+s13+s21+s29+s37+s45+s53+s61+s69 AS PA,
    s6+s14+s22+s30+s38+s46+s54+s62+s70 AS WT,
    s7+s15+s23+s31+s39+s47+s55+s63+s71 AS SC,
    s8+s16+s24+s32+s40+s48+s56+s64+s72 AS SW,
    s1+s9+s17+s25+s33+s41+s49+s57+s65+s2+s10+s18+s26+s34+s42+s50+s58+s66 AS ENGPRO,
    s3+s11+s19+s27+s35+s43+s51+s59+s67+s4+s12+s20+s28+s36+s44+s52+s60+s68 AS ENGEMO,
    s5+s13+s21+s29+s37+s45+s53+s61+s69+s6+s14+s22+s30+s38+s46+s54+s62+s70 AS DISPRO,
    s7+s15+s23+s31+s39+s47+s55+s63+s71+s8+s16+s24+s32+s40+s48+s56+s64+s72 AS DISEMO
FROM csi_userdata;
CREATE TRIGGER update_csi_userdata AFTER UPDATE ON csi_userdata
    BEGIN UPDATE csi_userdata SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;

-- 6 gmate
DROP TABLE IF EXISTS gmate_userdata;
CREATE TABLE gmate_userdata (
    [id] TEXT PRIMARY KEY,
    [uid] TEXT DEFAULT '',
    [batch] TEXT DEFAULT '',
    [version] TEXT DEFAULT '',
    [length] INTEGER DEFAULT 45,
    [lastseq] INTEGER DEFAULT 0,
    [enter] INTEGER DEFAULT 0, -- timestamp
    [intro] INTEGER DEFAULT 0, -- timestamp
    [sims] INTEGER DEFAULT 0,-- timestamp
    [start] INTEGER DEFAULT 0, -- timestamp (start s1)
    [finish] INTEGER DEFAULT 0, -- timestamp (finish s25)
    --
    [credibility] INTEGER DEFAULT 0,
    [evidence] INTEGER DEFAULT 0,
    [explanation] INTEGER DEFAULT 0,
    [find] INTEGER DEFAULT 0,
    [formulating] INTEGER DEFAULT 0,
    [inference] INTEGER DEFAULT 0,
    [pattern] INTEGER DEFAULT 0,
    [premises] INTEGER DEFAULT 0,
    [search] INTEGER DEFAULT 0,
    [sufficiency] INTEGER DEFAULT 0,
    --
    [sequence] TEXT DEFAULT '', -- -> 'b1 f1 f2 r1 o1 o2 ...'
    [a1s] TEXT DEFAULT '', [a1v] INTEGER DEFAULT 0, [a1t] INTEGER DEFAULT 0,
    [a2s] TEXT DEFAULT '', [a2v] INTEGER DEFAULT 0, [a2t] INTEGER DEFAULT 0,
    [a3s] TEXT DEFAULT '', [a3v] INTEGER DEFAULT 0, [a3t] INTEGER DEFAULT 0,
    [b1s] TEXT DEFAULT '', [b1v] INTEGER DEFAULT 0, [b1t] INTEGER DEFAULT 0,
    [c1s] TEXT DEFAULT '', [c1v] INTEGER DEFAULT 0, [c1t] INTEGER DEFAULT 0,
    [d1s] TEXT DEFAULT '', [d1v] INTEGER DEFAULT 0, [d1t] INTEGER DEFAULT 0,
    [d2s] TEXT DEFAULT '', [d2v] INTEGER DEFAULT 0, [d2t] INTEGER DEFAULT 0,
    [d3s] TEXT DEFAULT '', [d3v] INTEGER DEFAULT 0, [d3t] INTEGER DEFAULT 0,
    [e1s] TEXT DEFAULT '', [e1v] INTEGER DEFAULT 0, [e1t] INTEGER DEFAULT 0,
    [e2s] TEXT DEFAULT '', [e2v] INTEGER DEFAULT 0, [e2t] INTEGER DEFAULT 0,
    [f1s] TEXT DEFAULT '', [f1v] INTEGER DEFAULT 0, [f1t] INTEGER DEFAULT 0,
    [f2s] TEXT DEFAULT '', [f2v] INTEGER DEFAULT 0, [f2t] INTEGER DEFAULT 0,
    [g1s] TEXT DEFAULT '', [g1v] INTEGER DEFAULT 0, [g1t] INTEGER DEFAULT 0,
    [h1s] TEXT DEFAULT '', [h1v] INTEGER DEFAULT 0, [h1t] INTEGER DEFAULT 0,
    [h2s] TEXT DEFAULT '', [h2v] INTEGER DEFAULT 0, [h2t] INTEGER DEFAULT 0,
    [i1s] TEXT DEFAULT '', [i1v] INTEGER DEFAULT 0, [i1t] INTEGER DEFAULT 0,
    [i2s] TEXT DEFAULT '', [i2v] INTEGER DEFAULT 0, [i2t] INTEGER DEFAULT 0,
    [i3s] TEXT DEFAULT '', [i3v] INTEGER DEFAULT 0, [i3t] INTEGER DEFAULT 0,
    [j1s] TEXT DEFAULT '', [j1v] INTEGER DEFAULT 0, [j1t] INTEGER DEFAULT 0,
    [k1s] TEXT DEFAULT '', [k1v] INTEGER DEFAULT 0, [k1t] INTEGER DEFAULT 0,
    [l1s] TEXT DEFAULT '', [l1v] INTEGER DEFAULT 0, [l1t] INTEGER DEFAULT 0,
    [m1s] TEXT DEFAULT '', [m1v] INTEGER DEFAULT 0, [m1t] INTEGER DEFAULT 0,
    [m2s] TEXT DEFAULT '', [m2v] INTEGER DEFAULT 0, [m2t] INTEGER DEFAULT 0,
    [m3s] TEXT DEFAULT '', [m3v] INTEGER DEFAULT 0, [m3t] INTEGER DEFAULT 0,
    [n1s] TEXT DEFAULT '', [n1v] INTEGER DEFAULT 0, [n1t] INTEGER DEFAULT 0,
    [o1s] TEXT DEFAULT '', [o1v] INTEGER DEFAULT 0, [o1t] INTEGER DEFAULT 0,
    [o2s] TEXT DEFAULT '', [o2v] INTEGER DEFAULT 0, [o2t] INTEGER DEFAULT 0,
    [p1s] TEXT DEFAULT '', [p1v] INTEGER DEFAULT 0, [p1t] INTEGER DEFAULT 0,
    [p2s] TEXT DEFAULT '', [p2v] INTEGER DEFAULT 0, [p2t] INTEGER DEFAULT 0,
    [q1s] TEXT DEFAULT '', [q1v] INTEGER DEFAULT 0, [q1t] INTEGER DEFAULT 0,
    [q2s] TEXT DEFAULT '', [q2v] INTEGER DEFAULT 0, [q2t] INTEGER DEFAULT 0,
    [r1s] TEXT DEFAULT '', [r1v] INTEGER DEFAULT 0, [r1t] INTEGER DEFAULT 0,
    [s1s] TEXT DEFAULT '', [s1v] INTEGER DEFAULT 0, [s1t] INTEGER DEFAULT 0,
    [s2s] TEXT DEFAULT '', [s2v] INTEGER DEFAULT 0, [s2t] INTEGER DEFAULT 0,
    [t1s] TEXT DEFAULT '', [t1v] INTEGER DEFAULT 0, [t1t] INTEGER DEFAULT 0,
    [u1s] TEXT DEFAULT '', [u1v] INTEGER DEFAULT 0, [u1t] INTEGER DEFAULT 0,
    [u2s] TEXT DEFAULT '', [u2v] INTEGER DEFAULT 0, [u2t] INTEGER DEFAULT 0,
    [v1s] TEXT DEFAULT '', [v1v] INTEGER DEFAULT 0, [v1t] INTEGER DEFAULT 0,
    [v2s] TEXT DEFAULT '', [v2v] INTEGER DEFAULT 0, [v2t] INTEGER DEFAULT 0,
    [w1s] TEXT DEFAULT '', [w1v] INTEGER DEFAULT 0, [w1t] INTEGER DEFAULT 0,
    [x1s] TEXT DEFAULT '', [x1v] INTEGER DEFAULT 0, [x1t] INTEGER DEFAULT 0,
    [y1s] TEXT DEFAULT '', [y1v] INTEGER DEFAULT 0, [y1t] INTEGER DEFAULT 0,
    [y2s] TEXT DEFAULT '', [y2v] INTEGER DEFAULT 0, [y2t] INTEGER DEFAULT 0,
    [y3s] TEXT DEFAULT '', [y3v] INTEGER DEFAULT 0, [y3t] INTEGER DEFAULT 0,
    [z1s] TEXT DEFAULT '', [z1v] INTEGER DEFAULT 0, [z1t] INTEGER DEFAULT 0,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);
DROP VIEW IF EXISTS gmate_view;
CREATE VIEW gmate_view AS SELECT
    id, uid, batch, version, lastseq,
    a1v+a2v+a3v+b1v+c1v+d1v+d2v+d3v+e1v+e2v+f1v+f2v+g1v+h1v+h2v+i1v+i2v+i3v+j1v+k1v+l1v+m1v+m2v+m3v+n1v+o1v+o2v+p1v+p2v+q1v+q2v+r1v+s1v+s2v+t1v+u1v+u2v+v1v+v2v+w1v+x1v+y1v+y2v+y3v+z1v AS total,
    credibility, evidence, explanation, find, formulating, inference, pattern, premises, search, sufficiency
FROM gmate_userdata;
CREATE TRIGGER update_gmate_userdata AFTER UPDATE ON gmate_userdata
    BEGIN UPDATE gmate_userdata SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;

-- 7 gpq
DROP TABLE IF EXISTS gpq_userdata;
CREATE TABLE gpq_userdata (
    [id] TEXT PRIMARY KEY,
    [uid] TEXT DEFAULT '',
    [batch] TEXT DEFAULT '',
    [version] TEXT DEFAULT '',
    [length] INTEGER DEFAULT 120,
    [lastseq] INTEGER DEFAULT 0,
    [enter] INTEGER DEFAULT 0, -- timestamp
    [intro] INTEGER DEFAULT 0, -- timestamp
    [sims] INTEGER DEFAULT 0,-- timestamp
    [start] INTEGER DEFAULT 0, -- timestamp (start s1)
    [finish] INTEGER DEFAULT 0, -- timestamp (finish 120)
    -------------------------------
    -- Reasoning
    [CON] INTEGER DEFAULT 0,
    [STR] INTEGER DEFAULT 0,
    [ANA] INTEGER DEFAULT 0,
    [CRE] INTEGER DEFAULT 0,
    -- Tasking
    [ORG] INTEGER DEFAULT 0,
    [PLA] INTEGER DEFAULT 0,
    [CTR] INTEGER DEFAULT 0,
    -- Others
    [SOC] INTEGER DEFAULT 0,
    [NET] INTEGER DEFAULT 0,
    [PER] INTEGER DEFAULT 0,
    [COL] INTEGER DEFAULT 0,
    [COM] INTEGER DEFAULT 0,
    -- Oneself
    [ADA] INTEGER DEFAULT 0,
    [SLD] INTEGER DEFAULT 0,
    [SLC] INTEGER DEFAULT 0,
    [ACH] INTEGER DEFAULT 0,
    -------------------------------
    [s1] TEXT DEFAULT '', -- selected element
    [t1] INTEGER DEFAULT 0, -- waktu pengerjaan (elapsed time)
    [s2] TEXT DEFAULT '', [t2] INTEGER DEFAULT 0,
    [s3] TEXT DEFAULT '', [t3] INTEGER DEFAULT 0,
    [s4] TEXT DEFAULT '', [t4] INTEGER DEFAULT 0,
    [s5] TEXT DEFAULT '', [t5] INTEGER DEFAULT 0,
    [s6] TEXT DEFAULT '', [t6] INTEGER DEFAULT 0,
    [s7] TEXT DEFAULT '', [t7] INTEGER DEFAULT 0,
    [s8] TEXT DEFAULT '', [t8] INTEGER DEFAULT 0,
    [s9] TEXT DEFAULT '', [t9] INTEGER DEFAULT 0,
    [s10] TEXT DEFAULT '', [t10] INTEGER DEFAULT 0,
    [s11] TEXT DEFAULT '', [t11] INTEGER DEFAULT 0,
    [s12] TEXT DEFAULT '', [t12] INTEGER DEFAULT 0,
    [s13] TEXT DEFAULT '', [t13] INTEGER DEFAULT 0,
    [s14] TEXT DEFAULT '', [t14] INTEGER DEFAULT 0,
    [s15] TEXT DEFAULT '', [t15] INTEGER DEFAULT 0,
    [s16] TEXT DEFAULT '', [t16] INTEGER DEFAULT 0,
    [s17] TEXT DEFAULT '', [t17] INTEGER DEFAULT 0,
    [s18] TEXT DEFAULT '', [t18] INTEGER DEFAULT 0,
    [s19] TEXT DEFAULT '', [t19] INTEGER DEFAULT 0,
    [s20] TEXT DEFAULT '', [t20] INTEGER DEFAULT 0,
    [s21] TEXT DEFAULT '', [t21] INTEGER DEFAULT 0,
    [s22] TEXT DEFAULT '', [t22] INTEGER DEFAULT 0,
    [s23] TEXT DEFAULT '', [t23] INTEGER DEFAULT 0,
    [s24] TEXT DEFAULT '', [t24] INTEGER DEFAULT 0,
    [s25] TEXT DEFAULT '', [t25] INTEGER DEFAULT 0,
    [s26] TEXT DEFAULT '', [t26] INTEGER DEFAULT 0,
    [s27] TEXT DEFAULT '', [t27] INTEGER DEFAULT 0,
    [s28] TEXT DEFAULT '', [t28] INTEGER DEFAULT 0,
    [s29] TEXT DEFAULT '', [t29] INTEGER DEFAULT 0,
    [s30] TEXT DEFAULT '', [t30] INTEGER DEFAULT 0,
    [s31] TEXT DEFAULT '', [t31] INTEGER DEFAULT 0,
    [s32] TEXT DEFAULT '', [t32] INTEGER DEFAULT 0,
    [s33] TEXT DEFAULT '', [t33] INTEGER DEFAULT 0,
    [s34] TEXT DEFAULT '', [t34] INTEGER DEFAULT 0,
    [s35] TEXT DEFAULT '', [t35] INTEGER DEFAULT 0,
    [s36] TEXT DEFAULT '', [t36] INTEGER DEFAULT 0,
    [s37] TEXT DEFAULT '', [t37] INTEGER DEFAULT 0,
    [s38] TEXT DEFAULT '', [t38] INTEGER DEFAULT 0,
    [s39] TEXT DEFAULT '', [t39] INTEGER DEFAULT 0,
    [s40] TEXT DEFAULT '', [t40] INTEGER DEFAULT 0,
    [s41] TEXT DEFAULT '', [t41] INTEGER DEFAULT 0,
    [s42] TEXT DEFAULT '', [t42] INTEGER DEFAULT 0,
    [s43] TEXT DEFAULT '', [t43] INTEGER DEFAULT 0,
    [s44] TEXT DEFAULT '', [t44] INTEGER DEFAULT 0,
    [s45] TEXT DEFAULT '', [t45] INTEGER DEFAULT 0,
    [s46] TEXT DEFAULT '', [t46] INTEGER DEFAULT 0,
    [s47] TEXT DEFAULT '', [t47] INTEGER DEFAULT 0,
    [s48] TEXT DEFAULT '', [t48] INTEGER DEFAULT 0,
    [s49] TEXT DEFAULT '', [t49] INTEGER DEFAULT 0,
    [s50] TEXT DEFAULT '', [t50] INTEGER DEFAULT 0,
    [s51] TEXT DEFAULT '', [t51] INTEGER DEFAULT 0,
    [s52] TEXT DEFAULT '', [t52] INTEGER DEFAULT 0,
    [s53] TEXT DEFAULT '', [t53] INTEGER DEFAULT 0,
    [s54] TEXT DEFAULT '', [t54] INTEGER DEFAULT 0,
    [s55] TEXT DEFAULT '', [t55] INTEGER DEFAULT 0,
    [s56] TEXT DEFAULT '', [t56] INTEGER DEFAULT 0,
    [s57] TEXT DEFAULT '', [t57] INTEGER DEFAULT 0,
    [s58] TEXT DEFAULT '', [t58] INTEGER DEFAULT 0,
    [s59] TEXT DEFAULT '', [t59] INTEGER DEFAULT 0,
    [s60] TEXT DEFAULT '', [t60] INTEGER DEFAULT 0,
    [s61] TEXT DEFAULT '', [t61] INTEGER DEFAULT 0,
    [s62] TEXT DEFAULT '', [t62] INTEGER DEFAULT 0,
    [s63] TEXT DEFAULT '', [t63] INTEGER DEFAULT 0,
    [s64] TEXT DEFAULT '', [t64] INTEGER DEFAULT 0,
    [s65] TEXT DEFAULT '', [t65] INTEGER DEFAULT 0,
    [s66] TEXT DEFAULT '', [t66] INTEGER DEFAULT 0,
    [s67] TEXT DEFAULT '', [t67] INTEGER DEFAULT 0,
    [s68] TEXT DEFAULT '', [t68] INTEGER DEFAULT 0,
    [s69] TEXT DEFAULT '', [t69] INTEGER DEFAULT 0,
    [s70] TEXT DEFAULT '', [t70] INTEGER DEFAULT 0,
    [s71] TEXT DEFAULT '', [t71] INTEGER DEFAULT 0,
    [s72] TEXT DEFAULT '', [t72] INTEGER DEFAULT 0,
    [s73] TEXT DEFAULT '', [t73] INTEGER DEFAULT 0,
    [s74] TEXT DEFAULT '', [t74] INTEGER DEFAULT 0,
    [s75] TEXT DEFAULT '', [t75] INTEGER DEFAULT 0,
    [s76] TEXT DEFAULT '', [t76] INTEGER DEFAULT 0,
    [s77] TEXT DEFAULT '', [t77] INTEGER DEFAULT 0,
    [s78] TEXT DEFAULT '', [t78] INTEGER DEFAULT 0,
    [s79] TEXT DEFAULT '', [t79] INTEGER DEFAULT 0,
    [s80] TEXT DEFAULT '', [t80] INTEGER DEFAULT 0,
    [s81] TEXT DEFAULT '', [t81] INTEGER DEFAULT 0,
    [s82] TEXT DEFAULT '', [t82] INTEGER DEFAULT 0,
    [s83] TEXT DEFAULT '', [t83] INTEGER DEFAULT 0,
    [s84] TEXT DEFAULT '', [t84] INTEGER DEFAULT 0,
    [s85] TEXT DEFAULT '', [t85] INTEGER DEFAULT 0,
    [s86] TEXT DEFAULT '', [t86] INTEGER DEFAULT 0,
    [s87] TEXT DEFAULT '', [t87] INTEGER DEFAULT 0,
    [s88] TEXT DEFAULT '', [t88] INTEGER DEFAULT 0,
    [s89] TEXT DEFAULT '', [t89] INTEGER DEFAULT 0,
    [s90] TEXT DEFAULT '', [t90] INTEGER DEFAULT 0,
    [s91] TEXT DEFAULT '', [t91] INTEGER DEFAULT 0,
    [s92] TEXT DEFAULT '', [t92] INTEGER DEFAULT 0,
    [s93] TEXT DEFAULT '', [t93] INTEGER DEFAULT 0,
    [s94] TEXT DEFAULT '', [t94] INTEGER DEFAULT 0,
    [s95] TEXT DEFAULT '', [t95] INTEGER DEFAULT 0,
    [s96] TEXT DEFAULT '', [t96] INTEGER DEFAULT 0,
    [s97] TEXT DEFAULT '', [t97] INTEGER DEFAULT 0,
    [s98] TEXT DEFAULT '', [t98] INTEGER DEFAULT 0,
    [s99] TEXT DEFAULT '', [t99] INTEGER DEFAULT 0,
    [s100] TEXT DEFAULT '', [t100] INTEGER DEFAULT 0,
    [s101] TEXT DEFAULT '', [t101] INTEGER DEFAULT 0,
    [s102] TEXT DEFAULT '', [t102] INTEGER DEFAULT 0,
    [s103] TEXT DEFAULT '', [t103] INTEGER DEFAULT 0,
    [s104] TEXT DEFAULT '', [t104] INTEGER DEFAULT 0,
    [s105] TEXT DEFAULT '', [t105] INTEGER DEFAULT 0,
    [s106] TEXT DEFAULT '', [t106] INTEGER DEFAULT 0,
    [s107] TEXT DEFAULT '', [t107] INTEGER DEFAULT 0,
    [s108] TEXT DEFAULT '', [t108] INTEGER DEFAULT 0,
    [s109] TEXT DEFAULT '', [t109] INTEGER DEFAULT 0,
    [s110] TEXT DEFAULT '', [t110] INTEGER DEFAULT 0,
    [s111] TEXT DEFAULT '', [t111] INTEGER DEFAULT 0,
    [s112] TEXT DEFAULT '', [t112] INTEGER DEFAULT 0,
    [s113] TEXT DEFAULT '', [t113] INTEGER DEFAULT 0,
    [s114] TEXT DEFAULT '', [t114] INTEGER DEFAULT 0,
    [s115] TEXT DEFAULT '', [t115] INTEGER DEFAULT 0,
    [s116] TEXT DEFAULT '', [t116] INTEGER DEFAULT 0,
    [s117] TEXT DEFAULT '', [t117] INTEGER DEFAULT 0,
    [s118] TEXT DEFAULT '', [t118] INTEGER DEFAULT 0,
    [s119] TEXT DEFAULT '', [t119] INTEGER DEFAULT 0,
    [s120] TEXT DEFAULT '', [t120] INTEGER DEFAULT 0,
    -- /////////////////////////////////////
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);
DROP VIEW IF EXISTS gpq_view;
CREATE VIEW gpq_view AS SELECT
    id, uid, batch, version, lastseq,
    CON+STR+ANA+CRE AS reasoning,
    ORG+PLA+CTR AS tasking,
    SOC+NET+PER+COL+COM AS others,
    ADA+SLD+SLC+ACH AS oneself,
    CON, STR, ANA, CRE, ORG, PLA, CTR, SOC, NET, PER, COL, COM, ADA, SLD, SLC, ACH
FROM gpq_userdata;
CREATE TRIGGER update_gpq_userdata AFTER UPDATE ON gpq_userdata
BEGIN UPDATE gpq_userdata SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
DROP VIEW IF EXISTS gpq_eff;
CREATE VIEW gpq_eff AS SELECT
    [id], [version], [uid], [batch], [updated],
    (t1+t2+t3+t4+t5) gef5,
    (t6+t7+t8+t9+t10) gef10,
    (t11+t12+t13+t14+t15) gef15,
    (t16+t17+t18+t19+t20) gef20,
    (t21+t22+t23+t24+t25) gef25,
    (t26+t27+t28+t29+t30) gef30,
    (t31+t32+t33+t34+t35) gef35,
    (t36+t37+t38+t39+t40) gef40,
    (t41+t42+t43+t44+t45) gef45,
    (t46+t47+t48+t49+t50) gef50,
    (t51+t52+t53+t54+t55) gef55,
    (t56+t57+t58+t59+t60) gef60,
    (t61+t62+t63+t64+t65) gef65,
    (t66+t67+t68+t69+t70) gef70,
    (t71+t72+t73+t74+t75) gef75,
    (t71+t72+t73+t74+t75) gef80,
    (t81+t82+t83+t84+t85) gef85,
    (t86+t87+t88+t89+t90) gef90,
    (t91+t92+t93+t94+t95) gef95,
    (t96+t97+t98+t99+t100) gef100,
    (t101+t102+t103+t104+t105) gef105,
    (t106+t107+t108+t109+t110) gef110,
    (t111+t112+t113+t114+t115) gef115,
    (t116+t117+t118+t119+t120) gef120
FROM gpq_userdata;

-- 8 gpro
DROP TABLE IF EXISTS gpro_userdata;
CREATE TABLE gpro_userdata (
    [id] TEXT PRIMARY KEY,
    [uid] TEXT DEFAULT '',
    [batch] TEXT DEFAULT '',
    [version] TEXT DEFAULT '',
    [length] INTEGER DEFAULT 60,
    [lastseq] INTEGER DEFAULT 0,
    [enter] INTEGER DEFAULT 0, -- timestamp
    [intro] INTEGER DEFAULT 0, -- timestamp
    [sims] INTEGER DEFAULT 0,-- timestamp
    [start] INTEGER DEFAULT 0, -- timestamp (start 1)
    [finish] INTEGER DEFAULT 0, -- timestamp (finish 60)
    --
    [a1] INTEGER DEFAULT 0, -- user-entered value
    [b1] INTEGER DEFAULT 0, -- user-entered value
    [t1] INTEGER DEFAULT 0, -- elapsed time
    [a2] INTEGER DEFAULT 0, [b2] INTEGER DEFAULT 0, [t2] INTEGER DEFAULT 0,
    [a3] INTEGER DEFAULT 0, [b3] INTEGER DEFAULT 0, [t3] INTEGER DEFAULT 0,
    [a4] INTEGER DEFAULT 0, [b4] INTEGER DEFAULT 0, [t4] INTEGER DEFAULT 0,
    [a5] INTEGER DEFAULT 0, [b5] INTEGER DEFAULT 0, [t5] INTEGER DEFAULT 0,
    [a6] INTEGER DEFAULT 0, [b6] INTEGER DEFAULT 0, [t6] INTEGER DEFAULT 0,
    [a7] INTEGER DEFAULT 0, [b7] INTEGER DEFAULT 0, [t7] INTEGER DEFAULT 0,
    [a8] INTEGER DEFAULT 0, [b8] INTEGER DEFAULT 0, [t8] INTEGER DEFAULT 0,
    [a9] INTEGER DEFAULT 0, [b9] INTEGER DEFAULT 0, [t9] INTEGER DEFAULT 0,
    [a10] INTEGER DEFAULT 0, [b10] INTEGER DEFAULT 0, [t10] INTEGER DEFAULT 0,
    [a11] INTEGER DEFAULT 0, [b11] INTEGER DEFAULT 0, [t11] INTEGER DEFAULT 0,
    [a12] INTEGER DEFAULT 0, [b12] INTEGER DEFAULT 0, [t12] INTEGER DEFAULT 0,
    [a13] INTEGER DEFAULT 0, [b13] INTEGER DEFAULT 0, [t13] INTEGER DEFAULT 0,
    [a14] INTEGER DEFAULT 0, [b14] INTEGER DEFAULT 0, [t14] INTEGER DEFAULT 0,
    [a15] INTEGER DEFAULT 0, [b15] INTEGER DEFAULT 0, [t15] INTEGER DEFAULT 0,
    [a16] INTEGER DEFAULT 0, [b16] INTEGER DEFAULT 0, [t16] INTEGER DEFAULT 0,
    [a17] INTEGER DEFAULT 0, [b17] INTEGER DEFAULT 0, [t17] INTEGER DEFAULT 0,
    [a18] INTEGER DEFAULT 0, [b18] INTEGER DEFAULT 0, [t18] INTEGER DEFAULT 0,
    [a19] INTEGER DEFAULT 0, [b19] INTEGER DEFAULT 0, [t19] INTEGER DEFAULT 0,
    [a20] INTEGER DEFAULT 0, [b20] INTEGER DEFAULT 0, [t20] INTEGER DEFAULT 0,
    [a21] INTEGER DEFAULT 0, [b21] INTEGER DEFAULT 0, [t21] INTEGER DEFAULT 0,
    [a22] INTEGER DEFAULT 0, [b22] INTEGER DEFAULT 0, [t22] INTEGER DEFAULT 0,
    [a23] INTEGER DEFAULT 0, [b23] INTEGER DEFAULT 0, [t23] INTEGER DEFAULT 0,
    [a24] INTEGER DEFAULT 0, [b24] INTEGER DEFAULT 0, [t24] INTEGER DEFAULT 0,
    [a25] INTEGER DEFAULT 0, [b25] INTEGER DEFAULT 0, [t25] INTEGER DEFAULT 0,
    [a26] INTEGER DEFAULT 0, [b26] INTEGER DEFAULT 0, [t26] INTEGER DEFAULT 0,
    [a27] INTEGER DEFAULT 0, [b27] INTEGER DEFAULT 0, [t27] INTEGER DEFAULT 0,
    [a28] INTEGER DEFAULT 0, [b28] INTEGER DEFAULT 0, [t28] INTEGER DEFAULT 0,
    [a29] INTEGER DEFAULT 0, [b29] INTEGER DEFAULT 0, [t29] INTEGER DEFAULT 0,
    [a30] INTEGER DEFAULT 0, [b30] INTEGER DEFAULT 0, [t30] INTEGER DEFAULT 0,
    [a31] INTEGER DEFAULT 0, [b31] INTEGER DEFAULT 0, [t31] INTEGER DEFAULT 0,
    [a32] INTEGER DEFAULT 0, [b32] INTEGER DEFAULT 0, [t32] INTEGER DEFAULT 0,
    [a33] INTEGER DEFAULT 0, [b33] INTEGER DEFAULT 0, [t33] INTEGER DEFAULT 0,
    [a34] INTEGER DEFAULT 0, [b34] INTEGER DEFAULT 0, [t34] INTEGER DEFAULT 0,
    [a35] INTEGER DEFAULT 0, [b35] INTEGER DEFAULT 0, [t35] INTEGER DEFAULT 0,
    [a36] INTEGER DEFAULT 0, [b36] INTEGER DEFAULT 0, [t36] INTEGER DEFAULT 0,
    [a37] INTEGER DEFAULT 0, [b37] INTEGER DEFAULT 0, [t37] INTEGER DEFAULT 0,
    [a38] INTEGER DEFAULT 0, [b38] INTEGER DEFAULT 0, [t38] INTEGER DEFAULT 0,
    [a39] INTEGER DEFAULT 0, [b39] INTEGER DEFAULT 0, [t39] INTEGER DEFAULT 0,
    [a40] INTEGER DEFAULT 0, [b40] INTEGER DEFAULT 0, [t40] INTEGER DEFAULT 0,
    [a41] INTEGER DEFAULT 0, [b41] INTEGER DEFAULT 0, [t41] INTEGER DEFAULT 0,
    [a42] INTEGER DEFAULT 0, [b42] INTEGER DEFAULT 0, [t42] INTEGER DEFAULT 0,
    [a43] INTEGER DEFAULT 0, [b43] INTEGER DEFAULT 0, [t43] INTEGER DEFAULT 0,
    [a44] INTEGER DEFAULT 0, [b44] INTEGER DEFAULT 0, [t44] INTEGER DEFAULT 0,
    [a45] INTEGER DEFAULT 0, [b45] INTEGER DEFAULT 0, [t45] INTEGER DEFAULT 0,
    [a46] INTEGER DEFAULT 0, [b46] INTEGER DEFAULT 0, [t46] INTEGER DEFAULT 0,
    [a47] INTEGER DEFAULT 0, [b47] INTEGER DEFAULT 0, [t47] INTEGER DEFAULT 0,
    [a48] INTEGER DEFAULT 0, [b48] INTEGER DEFAULT 0, [t48] INTEGER DEFAULT 0,
    [a49] INTEGER DEFAULT 0, [b49] INTEGER DEFAULT 0, [t49] INTEGER DEFAULT 0,
    [a50] INTEGER DEFAULT 0, [b50] INTEGER DEFAULT 0, [t50] INTEGER DEFAULT 0,
    [a51] INTEGER DEFAULT 0, [b51] INTEGER DEFAULT 0, [t51] INTEGER DEFAULT 0,
    [a52] INTEGER DEFAULT 0, [b52] INTEGER DEFAULT 0, [t52] INTEGER DEFAULT 0,
    [a53] INTEGER DEFAULT 0, [b53] INTEGER DEFAULT 0, [t53] INTEGER DEFAULT 0,
    [a54] INTEGER DEFAULT 0, [b54] INTEGER DEFAULT 0, [t54] INTEGER DEFAULT 0,
    [a55] INTEGER DEFAULT 0, [b55] INTEGER DEFAULT 0, [t55] INTEGER DEFAULT 0,
    [a56] INTEGER DEFAULT 0, [b56] INTEGER DEFAULT 0, [t56] INTEGER DEFAULT 0,
    [a57] INTEGER DEFAULT 0, [b57] INTEGER DEFAULT 0, [t57] INTEGER DEFAULT 0,
    [a58] INTEGER DEFAULT 0, [b58] INTEGER DEFAULT 0, [t58] INTEGER DEFAULT 0,
    [a59] INTEGER DEFAULT 0, [b59] INTEGER DEFAULT 0, [t59] INTEGER DEFAULT 0,
    [a60] INTEGER DEFAULT 0, [b60] INTEGER DEFAULT 0, [t60] INTEGER DEFAULT 0,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);
CREATE TRIGGER update_gpro_userdata AFTER UPDATE ON gpro_userdata
BEGIN UPDATE gpro_userdata SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
DROP VIEW IF EXISTS gpro_view;
CREATE VIEW gpro_view AS SELECT
    id, uid, batch, version, lastseq,
    a1+b7+a13+b19+b25+b31+b37+b43+b49+b55  AS instruksi,
    b1+a7+b13+a19+a25+a31+a37+a43+a49+a55  AS motivasi,
    a2+a8+a14+a20+b26+b32+a38+b44+b50+b56  AS asertif,
    b2+b8+b14+b20+a26+a32+b38+a44+a50+a56  AS responsif,
    a3+a9+a15+a21+a27+b33+a39+b45+a51+a57  AS progresif,
    b3+b9+b15+b21+b27+a33+b39+a45+b51+b57  AS stabil,
    a4+a10+b16+a22+a28+b34+b40+b46+b52+b58 AS sistematis,
    b4+b10+a16+b22+b28+a34+a40+a46+a52+a58 AS situasional,
    a5+a11+a17+a23+a29+a35+b41+a47+a53+b59 AS konsisten,
    b5+b11+b17+b23+b29+b35+a41+b47+b53+a59 AS fleksibel,
    a6+a12+a18+a24+b30+a36+b42+a48+a54+a60 AS independen,
    b6+b12+b18+b24+a30+b36+a42+b48+b54+b60 AS afiliatif
FROM gpro_userdata;