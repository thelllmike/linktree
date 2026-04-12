-- ============================================================
-- LinkBase — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  type        TEXT NOT NULL DEFAULT 'linkpage',
  description TEXT,
  avatar_url  TEXT,
  theme_color TEXT NOT NULL DEFAULT '#000000',
  card_config JSONB,
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

-- Index for fetching businesses by user
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);

-- Index for fetching links by business
CREATE INDEX IF NOT EXISTS idx_social_links_business_id ON social_links(business_id);

-- ============================================================
-- Row Level Security
-- ============================================================

-- Businesses: owners can CRUD their own, anyone can read (for public pages)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read businesses"
  ON businesses FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own businesses"
  ON businesses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own businesses"
  ON businesses FOR DELETE
  USING (auth.uid() = user_id);

-- Social links: readable by all (public pages), writable by business owner
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read social_links"
  ON social_links FOR SELECT
  USING (true);

CREATE POLICY "Users can insert links for own businesses"
  ON social_links FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses WHERE businesses.id = social_links.business_id AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update links for own businesses"
  ON social_links FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE businesses.id = social_links.business_id AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete links for own businesses"
  ON social_links FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE businesses.id = social_links.business_id AND businesses.user_id = auth.uid()
    )
  );
