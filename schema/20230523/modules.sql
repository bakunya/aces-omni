DROP TABLE IF EXISTS modules;
CREATE TABLE modules (
    [id] TEXT PRIMARY KEY NOT NULL,
    [title] TEXT NOT NULL,
    [doctable] TEXT NOT NULL,
    [usertable] TEXT NOT NULL
);

INSERT INTO modules (id, doctable, usertable, title) VALUES
('abstract', 'abstract_doc', 'abstract_userdata', 'Tes Abstract'),
('aime', 'aime_doc', 'aime_userdata', 'Tes AIME'),
('csi', 'csi_doc', 'csi_userdata', 'Tes CSI'),
('gmate', 'gmate_doc', 'gmate_userdata', 'Tes GMATE'),
('gpq', 'gpq_doc', 'gpq_userdata', 'Tes GPQ'),
('gpro', 'gpro_doc', 'gpro_userdata', 'Tes GPRO'),
('numerical', 'numerical_doc', 'numerical_userdata', 'Tes Numerical'),
('verbal', 'verbal_doc', 'verbal_userdata', 'Tes Verbal');

DROP TABLE IF EXISTS abstract_doc;
CREATE TABLE abstract_doc (
    [id] INTEGER NOT NULL,
    [version] TEXT NOT NULL,
    [figure] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);
DROP TABLE IF EXISTS numerical_doc;
CREATE TABLE numerical_doc (
    [id] INTEGER NOT NULL,
    [version] TEXT NOT NULL,
    [figure] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [a] TEXT NOT NULL,
    [b] TEXT NOT NULL,
    [c] TEXT NOT NULL,
    [d] TEXT NOT NULL,
    [e] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);
DROP TABLE IF EXISTS verbal_doc;
CREATE TABLE verbal_doc (
    [id] INTEGER NOT NULL,
    [version] TEXT NOT NULL,
    [article] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);
DROP TABLE IF EXISTS aime_doc;
CREATE TABLE aime_doc (
    [id] INTEGER NOT NULL,
    [version] TEXT NOT NULL,
    [elm] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);
DROP TABLE IF EXISTS csi_doc;
CREATE TABLE csi_doc (
    [id] INTEGER NOT NULL,
    [version] TEXT NOT NULL,
    [trend] TEXT NOT NULL,
    [focus] TEXT NOT NULL,
    [action] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);
DROP TABLE IF EXISTS gmate_doc;
CREATE TABLE gmate_doc (
    [id] TEXT NOT NULL,
    [version] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [a] TEXT NOT NULL,
    [b] TEXT NOT NULL,
    [c] TEXT NOT NULL,
    [d] TEXT NOT NULL,
    [e] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);
DROP TABLE IF EXISTS gpq_doc;
CREATE TABLE gpq_doc (
    [id] INTEGER NOT NULL,
    [version] TEXT NOT NULL,
    [elm_a] TEXT NOT NULL,
    [elm_b] TEXT NOT NULL,
    [prompt_a] TEXT NOT NULL,
    [prompt_b] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);
DROP TABLE IF EXISTS gpro_doc;
CREATE TABLE gpro_doc (
    [id] INTEGER NOT NULL,
    [version] TEXT NOT NULL,
    [elm_a] TEXT NOT NULL,
    [elm_b] TEXT NOT NULL,
    [prompt_a] TEXT NOT NULL,
    [prompt_b] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    PRIMARY KEY ([id], [version])
);

-- TRIGGERS
CREATE TRIGGER update_abstract_doc AFTER UPDATE ON abstract_doc
BEGIN
    UPDATE abstract_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
CREATE TRIGGER update_numerical_doc AFTER UPDATE ON numerical_doc
BEGIN
    UPDATE numerical_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
CREATE TRIGGER update_verbal_doc AFTER UPDATE ON verbal_doc
BEGIN
    UPDATE verbal_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
CREATE TRIGGER update_aime_doc AFTER UPDATE ON aime_doc
BEGIN
    UPDATE aime_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
CREATE TRIGGER update_csi_doc AFTER UPDATE ON csi_doc
BEGIN
    UPDATE csi_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
CREATE TRIGGER update_gmate_doc AFTER UPDATE ON gmate_doc
BEGIN
    UPDATE gmate_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
CREATE TRIGGER update_gpq_doc AFTER UPDATE ON gpq_doc
BEGIN
    UPDATE gpq_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;
CREATE TRIGGER update_gpro_doc AFTER UPDATE ON gpro_doc
BEGIN
    UPDATE gpro_doc SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;