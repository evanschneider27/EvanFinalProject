const { createClient } = await import('@supabase/supabase-js');

const supabase = createClient(
  'https://fztxnrkmmfhujqmkckra.supabase.co',
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { city, temperature, suggestion } = req.body;

  if (!city || !temperature || !suggestion) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const { error } = await supabase
    .from('search_history')
    .insert([{ city, temperature, suggestion }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ success: true });
}
