import midtransClient from 'midtrans-client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

export default async function handler(req, res) {
  const { user_id, total } = req.body;

  const order_id = 'ORDER-' + Date.now();

  // simpan order ke DB
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      user_id,
      total,
      status: 'pending',
      midtrans_order_id: order_id
    }]);

  if (error) {
    return res.status(400).json({ status: 'error' });
  }

  const parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: total
    },
    credit_card: {
      secure: true
    }
  };

  try {
    const transaction = await snap.createTransaction(parameter);

    res.status(200).json({
      snap_token: transaction.token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}