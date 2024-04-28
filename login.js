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

