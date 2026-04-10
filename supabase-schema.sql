-- ============================================================
-- LinkBase — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  avatar_url  TEXT,
  theme_color TEXT NOT NULL DEFAULT '#000000',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Social links table
CREATE TABLE IF NOT EXISTS social_links (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id   UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  platform      TEXT NOT NULL,
  url           TEXT NOT NULL,
  label         TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);

-- Index for fetching links by business
CREATE INDEX IF NOT EXISTS idx_social_links_business_id ON social_links(business_id);

-- Optional: Enable Row Level Security (RLS) if you add auth later
-- ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- For now, allow all reads and writes (no auth):
-- If using anon key only, make sure RLS is OFF or add permissive policies.

-- Example seed data (optional — delete if not needed):
-- INSERT INTO businesses (name, slug, description, theme_color)
-- VALUES ('Anura Optical', 'anura-optical', 'Free eye tests in Colombo! Book your frames & lenses today!', '#1A1A2E');
