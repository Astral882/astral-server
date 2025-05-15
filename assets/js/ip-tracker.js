window.addEventListener('DOMContentLoaded', () => {
  const ipField = document.getElementById('ip');
  if (ipField) {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        ipField.innerText = `IP: ${data.ip}, 国家: ${data.country_name}, 地区: ${data.region}`;
      })
      .catch(() => {
        ipField.innerText = '无法加载 IP 信息';
      });
  }
});