app.post('/register', async (req, res) => {
  console.log("收到提交数据：", req.body);

  try {
    const data = req.body;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyXllF-BSjXm1AQfc1la28ibOVryaWjMcP6gJmO4dJRAgg2sWJtp07PR96moHv9rW-F/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const text = await response.text(); // 接收原始回应内容

    console.log("Google Script 返回内容：", text);

    // 检查是否是 JSON 格式
    if (text.startsWith('{') || text.startsWith('[')) {
      const result = JSON.parse(text);
      res.status(200).json({ success: true, result });
    } else {
      res.status(500).json({ success: false, error: 'Google Script 返回的不是 JSON', raw: text });
    }

  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});