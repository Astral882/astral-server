const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// 明确允许你的前端网址访问
app.use(cors({
  origin: 'https://www.astraltimeclient.com'
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Astral Server' });
});

app.post('/register', async (req, res) => {
  try {
    const formData = req.body;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyXllF-BSjXm1AQfc1la28ibOVryaWjMcP6gJmO4dJRAgg2sWJtp07PR96moHv9rW-F/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});