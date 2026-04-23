-- ============================================================
-- LinkBase — Bank Accounts migration
-- Run this in your Supabase SQL editor AFTER supabase-schema.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS bank_accounts (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id    UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  bank_name      TEXT NOT NULL,
  account_name   TEXT NOT NULL,
  account_number TEXT NOT NULL,
  branch         TEXT,
  display_order  INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bank_accounts_business_id ON bank_accounts(business_id);

ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read bank_accounts"
  ON bank_accounts FOR SELECT
  USING (true);

CREATE POLICY "Users can insert bank_accounts for own businesses"
  ON bank_accounts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses WHERE businesses.id = bank_accounts.business_id AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update bank_accounts for own businesses"
  ON bank_accounts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE businesses.id = bank_accounts.business_id AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete bank_accounts for own businesses"
  ON bank_accounts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE businesses.id = bank_accounts.business_id AND businesses.user_id = auth.uid()
    )
  );
