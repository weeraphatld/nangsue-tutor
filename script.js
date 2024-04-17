// สร้าง function สำหรับดึงข้อมูลจาก API
async function fetchData() {
    try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/LoginUser?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8');
        const data = await response.json();

        // เลือกเฉพาะข้อมูลที่เราต้องการจาก JSON
        const users = data.values.slice(1); // เริ่มต้นที่ index 1 เพื่อข้าม header row

        // เลือก element table body
        const tableBody = document.querySelector('#userTable tbody');

        // สร้าง rows และเติมข้อมูลลงในตาราง
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user[0]}</td>
                <td>${user[1]}</td>
                <td>${user[2]}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// เรียกใช้ function fetchData เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
window.onload = fetchData;
