const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  const { city } = req.query;
  const API_KEY = process.env.API_KEY; // <-- Make sure this exists in Vercel

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
    );
    const data = await response.json();

    // DEBUG: log if unexpected format
    if (!data.current || !data.location) {
      console.error('Weatherstack raw response:', data);
      return res.status(500).json({
        error: 'Unexpected API response format',
        data
      });
    }

    const temp = data.current.temperature;
    const condition = data.current.weather_descriptions[0];
    const location = data.location.name;

    let suggestion = '';
    if (temp < 40) suggestion = 'Wear a heavy coat and scarf.';
    else if (temp < 60) suggestion = 'Bring a light jacket.';
    else if (temp < 75) suggestion = 'A long-sleeve or hoodie should be fine.';
    else suggestion = 'T-shirt and shorts weather!';

    res.status(200).json({
      location,
      temperature: temp,
      condition,
      suggestion
    });
  } catch (err) {
    console.error('Weather API error:', err);
    res.status(500).json({
      error: 'Something went wrong',
      details: err.message
    });
  }
}
