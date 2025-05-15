// face-check.js
document.addEventListener("DOMContentLoaded", () => {
  const faceInput = document.getElementById("face-photo");
  if (!faceInput) return;

  faceInput.addEventListener("change", () => {
    const file = faceInput.files[0];
    if (file) {
      alert("已读取图像，准备进行人脸识别（模拟）");
      // TODO: 上传到 Face++ 或第三方人脸 API 验证
      // 示例接口调用可写在这里
    }
  });
});