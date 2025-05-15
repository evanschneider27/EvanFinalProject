document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const city = document.querySelector('#city').value;
  const result = document.querySelector('#result');

  try {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    if (data.error) {
      result.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
      result.innerHTML = `
        <div class="animate__animated animate__fadeInUp">
          <h3>Weather in ${data.location}</h3>
          <p>Temperature: ${data.temperature}°F</p>
          <p>Condition: ${data.condition}</p>
          <p><strong>Suggestion:</strong> ${data.suggestion}</p>
        </div>
      `;

      const saveRes = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: data.location,
          temperature: data.temperature,
          suggestion: data.suggestion
        })
      });

      const saveResult = await saveRes.json();
      console.log('Save result:', saveResult);
    }
  } catch (err) {
    console.error('Weather fetch error:', err);
    result.textContent = 'Something went wrong.';
  }
});
