export const GPQMax = 120;

type GPQElementKey =
  | "CON"
  | "STR"
  | "ANA"
  | "ORG"
  | "CRE"
  | "SOC"
  | "PLA"
  | "NET"
  | "CTR"
  | "PER"
  | "COL"
  | "ADA"
  | "COM"
  | "SLD"
  | "SLC"
  | "ACH";

export const GPQElement: Record<GPQElementKey, { domain: string; name: string }> = {
  CON: { domain: "Reasoning", "name": "Conceptual" },
  STR: { domain: "Reasoning", "name": "Strategic" },
  ANA: { domain: "Reasoning", "name": "Analytical" },
  CRE: { domain: "Reasoning", "name": "Creativity" },
  ORG: { domain: "Tasking", "name": "Organizing" },
  PLA: { domain: "Tasking", "name": "Planning" },
  CTR: { domain: "Tasking", "name": "Controlling" },
  SOC: { domain: "Others", "name": "Social Awareness" },
  NET: { domain: "Others", "name": "Networking" },
  PER: { domain: "Others", "name": "Persuasiveness" },
  COL: { domain: "Others", "name": "Collaboration" },
  COM: { domain: "Others", "name": "Communication" },
  ADA: { domain: "Oneself", "name": "Adaptability" },
  SLD: { domain: "Oneself", "name": "Self Development" },
  SLC: { domain: "Oneself", "name": "Self-Control" },
  ACH: { domain: "Oneself", "name": "Achievement Drive" },
}