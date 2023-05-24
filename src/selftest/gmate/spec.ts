export const GMateMax = 45;

export const GMateDistribution: Record<string, number> = {
  a:3, b:1, c:1, d:3, e:2, f:2, g:1, h:2, i:3,
  j:1, k:1, l:1, m:3, n:1, o:2, p:2, q:2, r:1,
  s:2, t:1, u:2, v:2, w:1, x:1, y:3, z:1,
}

export const GMateMap: Record<string, number> = {
  credibility: 4,   // 1
  evidence: 17,     // 2
  explanation: 15,  // 3
  find: 17,         // 4
  formulating: 20,  // 5
  inference: 28,    // 6
  pattern: 14,      // 7
  premises: 20,     // 8
  search: 25,       // 9
  sufficiency: 2,   // 10
}

export const GMateElements: Record<string, string[]> = {
  a1: ["find", "search", "premises"],
  a2: ["find", "search"],
  a3: ["find", "search", "premises"],
  b1: ["search", "premises"],
  c1: ["formulating", "inference", "evidence"],
  d1: ["find", "premises"],
  d2: ["find", "search", "premises"],
  d3: ["find", "search", "premises", "formulating"],
  e1: ["formulating", "evidence"],
  e2: ["formulating", "inference", "evidence"],
  f1: ["pattern", "formulating", "inference", "evidence"],
  f2: ["pattern", "formulating", "inference", "evidence"],
  g1: ["formulating", "inference", "evidence", "explanation"],
  h1: ["formulating", "inference", "evidence", "explanation"],
  h2: ["formulating", "inference", "evidence", "explanation", "search"],
  i1: ["pattern", "premises", "formulating", "inference"],
  i2: ["pattern", "premises", "formulating", "inference"],
  i3: ["pattern", "premises", "formulating", "inference"],
  j1: ["search", "formulating", "inference"],
  k1: ["formulating", "inference", "explanation", "evidence"],
  l1: ["premises", "sufficiency"],
  m1: ["find", "search", "premises", "formulating", "inference", "evidence"],
  m2: ["find", "search", "premises", "formulating", "inference", "evidence"],
  m3: ["find", "search", "premises", "formulating", "inference", "evidence"],
  n1: ["pattern", "premises", "formulating", "inference"],
  o1: ["find", "search", "inference"],
  o2: ["find", "search", "inference"],
  p1: ["search", "pattern", "premises"],
  p2: ["search", "pattern", "premises"],
  q1: ["find", "search", "explanation"],
  q2: ["find", "search", "explanation"],
  r1: ["find", "premises", "sufficiency"],
  s1: ["search", "formulating", "inference"],
  s2: ["explanation", "search", "formulating", "inference"],
  t1: ["inference", "explanation", "evidence"],
  u1: ["search", "pattern", "premises"],
  u2: ["search", "pattern", "premises"],
  v1: ["inference", "explanation", "evidence", "credibility"],
  v2: ["inference", "explanation", "evidence", "credibility"],
  w1: ["inference", "explanation", "evidence", "credibility"],
  x1: ["search", "pattern", "premises", "find"],
  y1: ["search", "pattern", "inference", "explanation", "find"],
  y2: ["search", "pattern", "inference", "explanation"],
  y3: ["find", "search", "pattern", "inference", "explanation"],
  z1: ["inference", "explanation", "evidence", "credibility"],
}