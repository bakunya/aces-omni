export const CSIMax = 72;

export const CSIMapping = {
  PS: ["s1", "s9", "s17", "s25", "s33", "s41", "s49", "s57", "s65"],
  CR: ["s2", "s10", "s18", "s26", "s34", "s42", "s50", "s58", "s66"],
  EE: ["s3", "s11", "s19", "s27", "s35", "s43", "s51", "s59", "s67"],
  SS: ["s4", "s12", "s20", "s28", "s36", "s44", "s52", "s60", "s68"],
  PA: ["s5", "s13", "s21", "s29", "s37", "s45", "s53", "s61", "s69"],
  WT: ["s6", "s14", "s22", "s30", "s38", "s46", "s54", "s62", "s70"],
  SC: ["s7", "s15", "s23", "s31", "s39", "s47", "s55", "s63", "s71"],
  SW: ["s8", "s16", "s24", "s32", "s40", "s48", "s56", "s64", "s72"],
};

type TrendKey = "ENG" | "DIS"
export const CSITrend: Record<TrendKey, string> = {
  ENG: "Engagement",
  DIS: "Disengagement",
}

type FocusKey = "PRO" | "EMO"
export const CSIFocus: Record<FocusKey, string> = {
  PRO: "Problem",
  EMO: "Emotional",
}

type ActionKey = "PS" | "CR"| "EE"| "SS"| "PA"| "WT"| "SC"| "SW"
export const CSIAction: Record<ActionKey, string> = {
  PS: "Problem Solving",
  CR: "Cognitive Restructuring",
  EE: "Express Emotion",
  SS: "Social Support",
  PA: "Problem Avoidance",
  WT: "Wishful Thinking",
  SC: "Self Criticsim",
  SW: "Social Withdrawal",
}
export const CSILikert = {
  1: "Tidak sama sekali",
  2: "Sedikit ya",
  3: "Ya",
  4: "Sangat ya",
  5: "Amat sangat ya",
}