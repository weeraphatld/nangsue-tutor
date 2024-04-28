document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // ดึงข้อมูลจาก API
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/log?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // สร้างฟังก์ชันเพื่อตรวจสอบข้อมูลการล็อกอิน
      checkLogin(data, username, password);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});

function checkLogin(data, username, password) {
  const rows = data.values;

  if (rows.length > 0) {
    // ตรวจสอบว่ามีข้อมูล username และ password ที่ตรงกันหรือไม่
    const matchedUser = rows.find(row => row[0] === username && row[1] === password);
    if (matchedUser) {
      // แสดง sweetalert เมื่อล็อกอินสำเร็จ
      swal({
        title: "Login Successful!",
        text: "Welcome to the home page.",
        icon: "success",
        button: "Go to Home",
      }).then(() => {
        // เปลี่ยนเส้นทางไปยังหน้า home.html หลังจากกดปุ่ม "Go to Home"
        window.location.href = "home.html";
      });
    } else {
      // แจ้งเตือนเมื่อไม่พบข้อมูลผู้ใช้
      swal("Login Failed!", "Invalid username or password.", "error");
    }
  } else {
    console.log('No data available.');
  }
}
