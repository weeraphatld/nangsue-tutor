document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/log?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8');
    const data = await response.json();
    
    if (!data || !data.values || data.values.length === 0) {
      console.log('ไม่พบข้อมูลผู้ใช้');
      return;
    }

    const userFound = data.values.some(row => row[0] === username && row[1] === password);
    if (userFound) {
      // ล็อกอินสำเร็จ
      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ!',
        text: 'กำลังเปลี่ยนไปยังหน้าหลัก...',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          window.location.href = 'home.html';
        }
      });
    } else {
      // ล็อกอินไม่สำเร็จ
      Swal.fire({
        icon: 'error',
        title: 'ล็อกอินไม่สำเร็จ',
        text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      });
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
  }
});
