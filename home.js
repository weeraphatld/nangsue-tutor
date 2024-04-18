document.addEventListener('DOMContentLoaded', function() {
    // ดึงชื่อผู้ใช้จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    // แสดงชื่อผู้ใช้บนหน้าเว็บ
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = `Welcome, ${username}!`;
});
