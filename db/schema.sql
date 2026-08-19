-- Orders for the dental storefront. One row per checkout attempt.
-- status lifecycle: PENDING (created at initiate) -> PAID | FAILED | TAMPERED
-- (set by the Omniware callback after hash + amount verification).
CREATE TABLE IF NOT EXISTS orders (
  id               SERIAL PRIMARY KEY,
  order_id         TEXT UNIQUE NOT NULL,          -- our TW... merchant reference
  amount           NUMERIC(12,2) NOT NULL,
  currency         TEXT NOT NULL DEFAULT 'INR',
  status           TEXT NOT NULL DEFAULT 'PENDING',
  customer_name    TEXT NOT NULL,
  customer_email   TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  address_line_1   TEXT,
  city             TEXT NOT NULL,
  state            TEXT,
  zip_code         TEXT NOT NULL,
  items            JSONB,                          -- cart snapshot at checkout
  transaction_id   TEXT,                           -- Omniware transaction_id
  payment_mode     TEXT,                           -- e.g. "Credit Card", "UPI"
  response_code    TEXT,
  response_message TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
