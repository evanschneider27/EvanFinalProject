const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fztxnrkmmfhujqmkckra.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  const API_KEY = 'f1b60f4625fc97005832109becaa7ade';

  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`);
    const data = await response.json();

    if (!data.current || !data.location) {
      return res.status(500).json({ error: 'Unexpected API response format' });
    }

    const temp = data.current.temperature;
    const condition = data.current.weather_descriptions[0];
    const location = data.location.name;

    let suggestion = '';
    if (temp < 40) suggestion = 'Wear a heavy coat and scarf.';
    else if (temp < 60) suggestion = 'Bring a light jacket.';
    else if (temp < 75) suggestion = 'A long-sleeve or hoodie should be fine.';
    else suggestion = 'T-shirt and shorts weather!';

    res.json({
      location,
      temperature: temp,
      condition,
      suggestion
    });

  } catch (err) {
    console.error('Weather API error:', err);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});

app.post('/api/save', async (req, res) => {
  const { city, temperature, suggestion } = req.body;
  if (!city || !temperature || !suggestion) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const { error } = await supabase
    .from('search_history')
    .insert([{ city, temperature, suggestion }]);

    if (error) {
        console.error('Supabase fetch error:', error);
        return res.status(500).json({ error: error.message });
      }      

  res.json({ success: true });
});

app.get('/api/history', async (req, res) => {
  const { data, error } = await supabase
    .from('search_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
})