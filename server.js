const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name, email, phone } = req.body;
  console.log("✅ 收到注册信息：", name, email, phone);

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, error: "请填写所有栏位" });
  }

  return res.status(200).json({ success: true, message: "注册成功" });
});

app.get("/", (req, res) => {
  res.send("服务器运行中 - Astral Time API");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});