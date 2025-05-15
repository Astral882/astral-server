const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件必须放在路由前
app.use(cors());
app.use(express.json());

// 注册路由
app.post("/register", (req, res) => {
  const { name, email, phone } = req.body;
  console.log("✅ 收到注册信息: ", name, email, phone);

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      error: "请填写所有栏位"
    });
  }

  res.status(200).json({
    success: true,
    message: "注册成功"
  });
});

// 默认根路由（测试用）
app.get("/", (req, res) => {
  res.send("服务器运行中 - Astral Time API");
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});