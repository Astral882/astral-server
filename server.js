const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const vision = require('@google-cloud/vision');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 设置静态资源路径，只开放 /investor 文件夹
app.use('/investor', express.static(path.join(__dirname, 'investor')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 上传文件配置
const upload = multer({ dest: 'uploads/' });

// Google Vision 初始化
const client = new vision.ImageAnnotatorClient({
  keyFilename: './google-vision-key.json',
});

// Google Sheets 授权
const auth = new google.auth.GoogleAuth({
  keyFile: './google-sheets-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// 邮件发送器
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 首页测试
app.get('/', (req, res) => {
  res.send('Server is working.');
});

// ======= 临时密码生成函数 =======
function generateTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

// ======= 注册接口 =======
app.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body;

    const uid = Math.random().toString(36).substring(2, 10).toUpperCase();
    const accountNo = `A${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tempPassword = generateTempPassword();

    console.log('临时密码：', tempPassword);

    // === 写入 Google Sheet（使用 Webhook） ===
    const fetch = (await import('node-fetch')).default;
    await fetch('https://script.google.com/macros/s/AKfycbzbcIdAaa4JqzS8p1lxB4Q1NXeuQ0RRXQsqZyqAV9BwxIsQtKDs-yx2a2WnzDzka2YdUQ/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid,
        name,
        email,
        password: tempPassword,
        accountNo,
        timestamp: new Date().toISOString()
      })
    });

    // === 发电邮通知 ===
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: '欢迎注册 Astral Time Limited',
      html: `
        <p>亲爱的 ${name}，您好：</p>
        <p>感谢您注册 <strong>Astral Time Limited</strong> 平台。</p>
        <p><strong>临时 User ID：</strong> ${uid}</p>
        <p><strong>临时密码：</strong> ${tempPassword}</p>
        <p><strong>投资账户编号：</strong> ${accountNo}</p>
        <p style="color:red;">请在 1 小时内登入并更换密码。</p>
      `
    });

    res.json({ success: true, message: '注册成功，临时密码已发电邮。' });

  } catch (error) {
    console.error('注册失败：', error);
    res.status(500).json({ success: false, message: '注册失败，请稍后再试。' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});