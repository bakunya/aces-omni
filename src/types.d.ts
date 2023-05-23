type Env = {
  __STATIC_CONTENT: KVNamespace;
  API_KEY: string;
  DB: D1Database;
  COOKIE_NAME: string;
  COOKIE_PASSWORD: string;
  CUSTOM_HEADER: string;
  COGNITIVE_KEYS: string;
}

interface Cognitive {
  abstract: string;
  numerical: string;
  verbal: string;
  gmate: string;
}

interface Preference {
  aime: string;
  csi: string;
  gpro: string;
  gpq: string;
}

interface Assissted {
  interview: string;
  intray: string;
  lgd: string;
}

interface AcesType<string, unkown> extends Cognitive, Preference, Assissted {}

interface Persona {
  id: string;
  pid: string;
  tid: string;
  cid: string;
  // slug: string;
  ref_ids: any[];
  tests: AcesType; // Record<string, string>;
  fullname: string;
  username: string;
  phone: string;
  tgl_lahir: string;
  nip: string;
  position: string;
  c_level: string;
  t_level: string;
  // created: string;
  // updated: string;
  // hash: string;
  org_name: string;
  client_org_name: string;
}

interface LayoutProps {
  version: string;
  rowid: string;
  sequence?: string;
  user: User;
  css?: string;
  script: string;
  title: string;
  children?: any;
}

interface PageProps {
  rowid: string;
  sequence?: string;
  user: User;
  css?: string;
  script: string;
  title: string;
}

/*

api user
test user
assessor

*/