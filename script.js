// สร้าง function สำหรับดึงข้อมูลจาก API
async function fetchData() {
    try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/LoginUser?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8');
        const data = await response.json();

        // เลือกเฉพาะข้อมูลที่เราต้องการจาก JSON
        return data.values.slice(1); // เริ่มต้นที่ index 1 เพื่อข้าม header row
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// เมื่อมีการ submit form
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // หยุดการส่ง form แบบปกติ

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = await fetchData();

    const user = users.find(user => user[0] === username && user[1] === password);

    if (user) {
        // หากล็อกอินสำเร็จ จะ redirect ไปยังหน้า home.html
        window.location.href = `home.html?name=${user[2]}`;
    } else {
        alert('Invalid username or password');
    }
});
