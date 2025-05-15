// otp-timer.js
let otpSeconds = 60;
const timerEl = document.getElementById("otp-timer");

const otpInterval = setInterval(() => {
  if (otpSeconds > 0) {
    otpSeconds--;
    if (timerEl) {
      timerEl.innerText = otpSeconds + " 秒";
    }
  } else {
    clearInterval(otpInterval);
    if (timerEl) {
      timerEl.innerText = "OTP 已失效，请重新申请";
    }
    const verifyBtn = document.getElementById("otp-verify-btn");
    if (verifyBtn) {
      verifyBtn.disabled = true;
    }
  }
}, 1000);