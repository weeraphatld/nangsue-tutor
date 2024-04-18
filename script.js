// สร้าง function สำหรับดึงข้อมูลจาก API
async function authenticateUser(username, password) {
    try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/LoginUser?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8');
        const data = await response.json();

        // เลือกเฉพาะข้อมูลที่เราต้องการจาก JSON
        const users = data.values.slice(1); // เริ่มต้นที่ index 1 เพื่อข้าม header row

        // ตรวจสอบว่ามี username และ password ที่ถูกต้องหรือไม่
        const authenticatedUser = users.find(user => user[0] === username && user[1] === password);

        if (authenticatedUser) {
            return authenticatedUser[2]; // ส่งชื่อของผู้ใช้กลับไป
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
}

// รับค่าจากฟอร์มและตรวจสอบการเข้าสู่ระบบ
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginStatus = document.getElementById('loginStatus');

    const username = await authenticateUser(username, password);

    if (username) {
        loginStatus.textContent = `Login successful! Welcome, ${username}!`;
        // ทำการเปลี่ยนหน้าไปยัง home.html
        window.location.href = 'home.html';
    } else {
        loginStatus.textContent = 'Invalid username or password. Please try again.';
    }
});
