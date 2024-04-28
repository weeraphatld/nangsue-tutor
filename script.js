// เรียกใช้งานฟังก์ชันเมื่อกดปุ่ม Login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // หยุดการส่งแบบฟอร์มแบบปกติ

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // เรียกใช้งานฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
  const userData = await fetchUserData();

  // ตรวจสอบข้อมูลผู้ใช้ที่ลงชื่อเข้าใช้
  const foundUser = userData.find(user => user.username === username && user.password === password);

  if (foundUser) {
    // ถ้าพบข้อมูลผู้ใช้ ให้แสดง SweetAlert และเปลี่ยนเส้นทางไปยังหน้า home.html
    swal("เข้าสู่ระบบสำเร็จ!", "ยินดีต้อนรับเข้าสู่ระบบ", "success")
      .then((value) => {
        window.location.href = "home.html";
      });
  } else {
    // ถ้าไม่พบข้อมูลผู้ใช้ ให้แสดง SweetAlert แจ้งเตือน
    swal("ข้อผิดพลาด!", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "error");
  }
});

// สร้างฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
async function fetchUserData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/log?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8');
    const data = await response.json();

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (!data || !data.values || data.values.length === 0) {
      console.log('ไม่พบข้อมูลผู้ใช้');
      return [];
    }

    // สร้างอาร์เรย์ของข้อมูลผู้ใช้
    const userData = data.values.map(row => {
      return {
        username: row[0], // คอลัมน์ A
        password: row[1], // คอลัมน์ B
        name: row[2], // คอลัมน์ C
        email: row[3] // คอลัมน์ D
      };
    });

    return userData;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    return [];
  }
}
