const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // 开放所有来源测试
app.use(express.json());

// 首页测试用
app.get('/', (req, res) => {
  res.json({ message: 'Astral Server is live' });
});

// 注册提交接口
app.post('/register', async (req, res) => {
  console.log("收到提交数据：", req.body);  // 关键日志！

  try {
    const data = req.body;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyXllF-BSjXm1AQfc1la28ibOVryaWjMcP6gJmO4dJRAgg2sWJtp07PR96moHv9rW-F/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});