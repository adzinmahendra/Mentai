import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { user_id, total } = req.body;

  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id, total, status: 'pending' }])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ status: 'error' });
  }

  res.status(200).json({
    status: 'success',
    order: data
  });
}