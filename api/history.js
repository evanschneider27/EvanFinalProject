import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fztxnrkmmfhujqmkckra.supabase.co',
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('search_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
