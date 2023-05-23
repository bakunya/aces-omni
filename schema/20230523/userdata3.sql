-- 9 interview
DROP TABLE IF EXISTS interview_userdata;
CREATE TABLE interview_userdata (
    [id] TEXT PRIMARY KEY,
    [uid] TEXT DEFAULT '', -- persona
    [pid] TEXT NOT NULL,
    [xid] TEXT DEFAULT '', -- expert
    [version] TEXT DEFAULT '',
    [start] INTEGER DEFAULT 0, -- timestamp
    [finish] INTEGER DEFAULT 0, -- timestamp
    --
    [kpi] REAL DEFAULT 0.0,
    [goat] REAL DEFAULT 0.0,
    [pdca] REAL DEFAULT 0.0,
    [cdo] REAL DEFAULT 0.0,
    [pica] REAL DEFAULT 0.0,
    [chpar] REAL DEFAULT 0.0,
    [compass] REAL DEFAULT 0.0,
    [cds] REAL DEFAULT 0.0,
    [cs] REAL DEFAULT 0.0,
    [sma] REAL DEFAULT 0.0,
    [satt] REAL DEFAULT 0.0,
    [kpi_ev] TEXT,
    [goat_ev] TEXT,
    [pdca_ev] TEXT,
    [cdo_ev] TEXT,
    [pica_ev] TEXT,
    [chpar_ev] TEXT,
    [compass_ev] TEXT,
    [cds_ev] TEXT,
    [cs_ev] TEXT,
    [sma_ev] TEXT,
    [satt_ev] TEXT,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    UNIQUE ([uid], [pid])
);
CREATE TRIGGER update_interview_userdata AFTER UPDATE ON interview_userdata
    BEGIN UPDATE interview_userdata SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;

-- 10 lgd
DROP TABLE IF EXISTS lgd_userdata;
CREATE TABLE lgd_userdata (
    [id] TEXT PRIMARY KEY,
    [uid] TEXT DEFAULT '', -- persona
    [pid] TEXT NOT NULL,
    [xid] TEXT DEFAULT '', -- expert
    [version] TEXT DEFAULT '',
    [start] INTEGER DEFAULT 0, -- timestamp
    [finish] INTEGER DEFAULT 0, -- timestamp
    --
    [observing] REAL DEFAULT 0.0,
    [involvement] REAL DEFAULT 0.0,
    [asking] REAL DEFAULT 0.0,
    [telling] REAL DEFAULT 0.0,
    [sit_handling] REAL DEFAULT 0.0,
    [observing_ev] TEXT,
    [involvement_ev] TEXT,
    [asking_ev] TEXT,
    [telling_ev] TEXT,
    [sit_handling_ev] TEXT,
    [created] TEXT NOT NULL DEFAULT (datetime('now')||'Z'),
    [updated] TEXT,
    UNIQUE ([uid], [pid])
);
CREATE TRIGGER update_lgd_userdata AFTER UPDATE ON lgd_userdata
    BEGIN UPDATE interview_userdata SET updated = datetime('now')||'Z' WHERE id = NEW.id;
END;