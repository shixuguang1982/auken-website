-- AUKEN 访客统计 D1 数据库建表
-- 在 Cloudflare 部署后执行：wrangler d1 execute auken_visits --file=./worker/schema.sql

CREATE TABLE IF NOT EXISTS visits (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  day  TEXT    NOT NULL,   -- 日期 YYYY-MM-DD
  ip   TEXT    NOT NULL,   -- 匿名化后的访客标识（如 41.22.x.x）
  path TEXT    NOT NULL,   -- 访问的页面路径
  ts   INTEGER NOT NULL    -- 访问时间戳（毫秒）
);

CREATE INDEX IF NOT EXISTS idx_visits_day  ON visits(day);
CREATE INDEX IF NOT EXISTS idx_visits_path ON visits(path);
CREATE INDEX IF NOT EXISTS idx_visits_ts   ON visits(ts);
