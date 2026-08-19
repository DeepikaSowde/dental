import { query } from "./db";

export interface NewOrder {
  orderId: string;
  amount: string; // "123.45"
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1?: string | null;
  city: string;
  state?: string | null;
  zipCode: string;
  items?: unknown;
}

export interface OrderRow {
  id: number;
  order_id: string;
  amount: string;
  currency: string;
  status: "PENDING" | "PAID" | "FAILED" | "TAMPERED";
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  transaction_id: string | null;
  payment_mode: string | null;
  [key: string]: unknown;
}

// Creates a PENDING order right before the customer is sent to Omniware.
export async function createOrder(o: NewOrder): Promise<OrderRow> {
  const { rows } = await query(
    `INSERT INTO orders
       (order_id, amount, currency, status, customer_name, customer_email,
        customer_phone, address_line_1, city, state, zip_code, items)
     VALUES ($1,$2,$3,'PENDING',$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      o.orderId, o.amount, o.currency, o.customerName, o.customerEmail,
      o.customerPhone, o.addressLine1 ?? null, o.city, o.state ?? null,
      o.zipCode, o.items ? JSON.stringify(o.items) : null,
    ],
  );
  return rows[0] as OrderRow;
}

export async function getOrder(orderId: string): Promise<OrderRow | null> {
  const { rows } = await query(`SELECT * FROM orders WHERE order_id = $1`, [orderId]);
  return (rows[0] as OrderRow) ?? null;
}

// Records the gateway outcome. Idempotent: a row already PAID is never
// downgraded (protects against duplicate/late callbacks).
export async function finalizeOrder(params: {
  orderId: string;
  status: "PAID" | "FAILED" | "TAMPERED";
  transactionId?: string;
  paymentMode?: string;
  responseCode?: string;
  responseMessage?: string;
}): Promise<OrderRow | null> {
  const { rows } = await query(
    `UPDATE orders SET
       status = CASE WHEN status = 'PAID' THEN status ELSE $2 END,
       transaction_id = COALESCE($3, transaction_id),
       payment_mode = COALESCE($4, payment_mode),
       response_code = COALESCE($5, response_code),
       response_message = COALESCE($6, response_message),
       updated_at = now()
     WHERE order_id = $1
     RETURNING *`,
    [
      params.orderId, params.status, params.transactionId ?? null,
      params.paymentMode ?? null, params.responseCode ?? null,
      params.responseMessage ?? null,
    ],
  );
  return (rows[0] as OrderRow) ?? null;
}
