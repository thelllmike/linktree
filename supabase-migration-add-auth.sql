-- ============================================================
-- LinkBase — Migration: Add user authentication
-- Run this in your Supabase SQL editor if you already have the tables
-- ============================================================

-- 1. Add user_id column to businesses
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Add type and card_config columns
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'linkpage';

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS card_config JSONB;

-- 3. Create index for user lookups
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);

-- 3. Enable RLS on businesses
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read businesses" ON businesses;
CREATE POLICY "Public can read businesses"
  ON businesses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own businesses" ON businesses;
CREATE POLICY "Users can insert own businesses"
  ON businesses FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own businesses" ON businesses;
CREATE POLICY "Users can update own businesses"
  ON businesses FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own businesses" ON businesses;
CREATE POLICY "Users can delete own businesses"
  ON businesses FOR DELETE USING (auth.uid() = user_id);

-- 4. Enable RLS on social_links
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read social_links" ON social_links;
CREATE POLICY "Public can read social_links"
  ON social_links FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert links for own businesses" ON social_links;
CREATE POLICY "Users can insert links for own businesses"
  ON social_links FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM businesses WHERE businesses.id = social_links.business_id AND businesses.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can update links for own businesses" ON social_links;
CREATE POLICY "Users can update links for own businesses"
  ON social_links FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE businesses.id = social_links.business_id AND businesses.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete links for own businesses" ON social_links;
CREATE POLICY "Users can delete links for own businesses"
  ON social_links FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE businesses.id = social_links.business_id AND businesses.user_id = auth.uid())
  );
