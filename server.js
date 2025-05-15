const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 通用 CORS 设置
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ✅ 测试首页
app.get('/', (req, res) => {
  res.json({ message: 'Astral Server' });
});

// ✅ 注册 POST 接口
app.post('/register', async (req, res) => {
  try {
    const formData = req.body;

    // ✅ Google Script 接收地址
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyXllF-BSjXm1AQfc1la28ibOVryaWjMcP6gJmO4dJRAgg2sWJtp07PR96moHv9rW-F/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});