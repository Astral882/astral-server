const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // 如使用 Node 18+ 可改为原生 fetch

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 测试用首页
app.get('/', (req, res) => {
  res.send('Server is working');
});

// 注册 API
app.post('/register', async (req, res) => {
  try {
    const formData = req.body;

    // 你的 Google Script Webhook 地址（改成你自己的）
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyXllF-BSjXm1AQfc1la28ibOVryaWjMcP6gJmO4dJRAgg2sWJtp07PR96moHv9rW-F/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('POST Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
