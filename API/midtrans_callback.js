import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const data = req.body;

  const order_id = data.order_id;
  const status = data.transaction_status;

  let finalStatus = 'pending';

  if (status === 'settlement') finalStatus = 'paid';
  if (status === 'pending') finalStatus = 'pending';
  if (status === 'expire') finalStatus = 'expired';
  if (status === 'cancel') finalStatus = 'cancel';

  await supabase
    .from('orders')
    .update({ status: finalStatus })
    .eq('midtrans_order_id', order_id);

  res.status(200).json({ message: 'ok' });
}