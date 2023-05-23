
DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
    [id] TEXT PRIMARY KEY NOT NULL,
    [email] TEXT UNIQUE NOT NULL,
    [username] TEXT UNIQUE NOT NULL,
    [fullname] TEXT NOT NULL,
    [is_active] INTEGER DEFAULT 1,
    [role] TEXT,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS experts;
CREATE TABLE experts (
    [id] TEXT PRIMARY KEY NOT NULL,
    [email] TEXT UNIQUE NOT NULL,
    [username] TEXT UNIQUE NOT NULL,
    [fullname] TEXT NOT NULL,
    [is_active] INTEGER DEFAULT 1,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS project_experts;
CREATE TABLE project_experts (
    [pid] TEXT NOT NULL, -- project
    [xid] TEXT NOT NULL, -- expert
    [role] TEXT,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY (pid, xid)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    [id] TEXT PRIMARY KEY NOT NULL,
    [email] TEXT UNIQUE NOT NULL,
    [username] TEXT UNIQUE NOT NULL,
    [fullname] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS hashes;
CREATE TABLE hashes (
    [id] TEXT PRIMARY KEY NOT NULL,
    [type] TEXT, -- admin aces expert persona
    [hash] TEXT,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS members;
CREATE TABLE members (
    [uid] TEXT NOT NULL,
    [tid] TEXT NOT NULL,
    [default_org] TEXT,
    [role] TEXT DEFAULT '',
    [status] TEXT DEFAULT 'active',
    -- [status] INTEGER DEFAULT 1, -- 1 active,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS tenants;
CREATE TABLE tenants (
    [id] TEXT PRIMARY KEY NOT NULL,
    [admin_id] TEXT,
    [org_name] TEXT NOT NULL,
    [short_name] TEXT,
    [type] TEXT NOT NULL DEFAULT 'partner', -- 'corporate'
    [license] TEXT NOT NULL DEFAULT 'pro', -- 'basic'
    [exp_date] TEXT,
    [ref_date] TEXT,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
    [id] TEXT PRIMARY KEY NOT NULL,
    [tid] TEXT NOT NULL,
    [org_name] TEXT NOT NULL,
    [short_name] TEXT,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS org_info;
CREATE TABLE org_info (
    [id] TEXT PRIMARY KEY NOT NULL,
    [address1] TEXT DEFAULT '',
    [address2] TEXT DEFAULT '',
    [city] TEXT DEFAULT '',
    [province] TEXT DEFAULT '',
    [postcode] TEXT DEFAULT '',
    [phone] TEXT DEFAULT '',
    [email] TEXT DEFAULT '',
    [website] TEXT DEFAULT '',
    [org_type] TEXT DEFAULT '',
    [biz_types] TEXT DEFAULT '[]',
    [logo] TEXT DEFAULT '',
    [contact_name] TEXT DEFAULT '',
    [contact_phone] TEXT DEFAULT '',
    [contact_email] TEXT DEFAULT '',
    [tech_contact_name] TEXT DEFAULT '',
    [tech_contact_phone] TEXT DEFAULT '',
    [tech_contact_email] TEXT DEFAULT '',
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS npwp;
CREATE TABLE npwp (
    [id] TEXT PRIMARY KEY NOT NULL,
    [nomor] TEXT DEFAULT '',
    [nama] TEXT DEFAULT '',
    [nik] TEXT DEFAULT '',
    [alamat] TEXT DEFAULT '',
    [kelurahan] TEXT DEFAULT '',
    [kecamatan] TEXT DEFAULT '',
    [kota] TEXT DEFAULT '',
    [provinsi] TEXT DEFAULT '',
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT
);

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
    [id] TEXT PRIMARY KEY NOT NULL,
    [admin_id] TEXT NOT NULL,
    [tid] TEXT NOT NULL,
    [cid] TEXT,
    [slug] TEXT NOT NULL,
    [type] TEXT DEFAULT '', -- recruitment / competence / preference
    [title] TEXT NOT NULL,
    [description] TEXT DEFAULT '',
    [modules] TEXT DEFAULT '[]',
    [criteria] TEXT DEFAULT '[]',
    [start_date] TEXT DEFAULT '',
    [end_date] TEXT DEFAULT '',
    [contract_date] TEXT DEFAULT '',
    [contract_value] INTEGER DEFAULT 0,
    [invoice_date] TEXT DEFAULT '',
    [report_lang] TEXT NOT NULL DEFAULT 'ID',
    [client_contract_date] TEXT DEFAULT '',
    [client_invoice_date] TEXT DEFAULT '',
    [contact_name] TEXT DEFAULT '',
    [contact_phone] TEXT DEFAULT '',
    [contact_email] TEXT DEFAULT '',
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    UNIQUE (slug)
);

DROP TABLE IF EXISTS persons;
CREATE TABLE persons (
    [id] TEXT PRIMARY KEY NOT NULL,
    [pid] TEXT NOT NULL,
    [ref_ids] TEXT DEFAULT '[]',
    [tests] TEXT DEFAULT '[]',
    [fullname] TEXT NOT NULL,
    [username] TEXT NOT NULL, -- username or email
    [phone] TEXT DEFAULT '',
    [tgl_lahir] TEXT DEFAULT '',
    [nip] TEXT DEFAULT '',
    [position] TEXT DEFAULT '',
    [c_level] TEXT DEFAULT '',
    [t_level] TEXT DEFAULT '',
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    UNIQUE (username, pid)
);

-- Views

DROP VIEW IF EXISTS assessors;
CREATE VIEW assessors AS SELECT
x.id, email, username, fullname, is_active, hash
FROM experts x LEFT JOIN hashes h ON x.id=h.id;

DROP VIEW IF EXISTS accounts;
CREATE VIEW accounts AS SELECT
    m.uid, m.tid, m.default_org, m.role, m.status,
    (SELECT COUNT(*) FROM members WHERE uid=m.uid) as mems, -- memberships
    (SELECT COUNT(*) FROM members WHERE status='active' AND uid=m.uid) as active_mems,
    u.email, u.fullname, u.username,
    t.org_name, t.type, t.license, t.admin_id, t.exp_date,
    h.hash
FROM members m LEFT JOIN tenants t ON m.tid=t.id
LEFT JOIN hashes h ON m.uid=h.id
LEFT JOIN users u ON m.uid=u.id;

DROP VIEW IF EXISTS persona;
CREATE VIEW persona AS SELECT
    p1.*, p2.tid, p2.cid, p2.slug, h.hash,
    t.org_name org_name, c.org_name client_org_name
FROM persons p1
LEFT JOIN projects p2 ON p1.pid=p2.id
LEFT JOIN tenants t ON p2.tid=t.id
LEFT JOIN clients c ON p2.cid=c.id
LEFT JOIN hashes h ON p1.id=h.id;

-- Triggers

CREATE TRIGGER create_admin AFTER INSERT ON admins BEGIN INSERT INTO hashes (id, type) VALUES (NEW.id, 'admin'); END;
CREATE TRIGGER detete_admin AFTER DELETE ON admins BEGIN DELETE FROM hashes WHERE id=OLD.id; END;
CREATE TRIGGER update_admin AFTER UPDATE ON admins BEGIN UPDATE admins SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;

CREATE TRIGGER create_expert AFTER INSERT ON experts BEGIN INSERT INTO hashes (id, type) VALUES (NEW.id, 'expert'); END;
CREATE TRIGGER detete_expert AFTER DELETE ON experts BEGIN DELETE FROM hashes WHERE id=OLD.id; END;
CREATE TRIGGER update_expert AFTER UPDATE ON experts BEGIN UPDATE experts SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;

CREATE TRIGGER create_user AFTER INSERT ON users BEGIN INSERT INTO hashes (id, type) VALUES (NEW.id, 'aces'); END;
CREATE TRIGGER detete_user AFTER DELETE ON users BEGIN DELETE FROM hashes WHERE id=OLD.id; DELETE FROM members WHERE uid=OLD.id; END;
CREATE TRIGGER update_user AFTER UPDATE ON users BEGIN UPDATE users SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;

CREATE TRIGGER create_persons AFTER INSERT ON persons BEGIN INSERT INTO hashes (id, type) VALUES (NEW.id, 'persona'); END;
CREATE TRIGGER detete_persons AFTER DELETE ON persons BEGIN DELETE FROM hashes WHERE id=OLD.id; END;
CREATE TRIGGER update_persons AFTER UPDATE ON persons BEGIN UPDATE persons SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;

CREATE TRIGGER create_tenant AFTER INSERT ON tenants BEGIN INSERT INTO org_info (id) VALUES (NEW.id); INSERT INTO npwp (id) VALUES (NEW.id); END;
CREATE TRIGGER update_tenant AFTER UPDATE ON tenants BEGIN UPDATE tenants SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;
CREATE TRIGGER detete_tenant AFTER DELETE ON tenants BEGIN DELETE FROM org_info WHERE id=OLD.id; DELETE FROM npwp WHERE id=OLD.id; END;

CREATE TRIGGER create_client AFTER INSERT ON clients BEGIN INSERT INTO org_info (id) VALUES (NEW.id); INSERT INTO npwp (id) VALUES (NEW.id); END;
CREATE TRIGGER detete_client AFTER DELETE ON clients BEGIN DELETE FROM org_info WHERE id=OLD.id; DELETE FROM npwp WHERE id=OLD.id; END;
CREATE TRIGGER update_client AFTER UPDATE ON clients BEGIN UPDATE clients SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;

CREATE TRIGGER update_org_info AFTER UPDATE ON org_info BEGIN UPDATE org_info SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;
CREATE TRIGGER update_npwp AFTER UPDATE ON npwp BEGIN UPDATE npwp SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;
CREATE TRIGGER update_project AFTER UPDATE ON projects BEGIN UPDATE projects SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;
CREATE TRIGGER update_hash AFTER UPDATE ON hashes BEGIN UPDATE hashes SET updated = datetime('now')||'Z' WHERE id = NEW.id; END;
CREATE TRIGGER update_project_expert AFTER UPDATE ON project_experts BEGIN UPDATE project_experts SET updated = datetime('now')||'Z' WHERE eid = NEW.eid AND pid=NEW.pid; END;
CREATE TRIGGER update_member AFTER UPDATE ON members BEGIN UPDATE members SET updated = datetime('now')||'Z' WHERE uid = NEW.uid AND tid=NEW.tid; END;
