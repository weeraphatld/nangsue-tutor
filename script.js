document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // ดึงค่า username และ password จาก input fields
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // เรียกใช้ฟังก์ชัน fetchData เพื่อดึงข้อมูลจาก API
  fetchData(username, password);
});

function fetchData(username, password) {
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/log?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // ตรวจสอบว่า username และ password ตรงกับข้อมูลใน API หรือไม่
      const rows = data.values;
      const foundUser = rows.find(row => row[0] === username && row[1] === password);

      if (foundUser) {
        // แสดง SweetAlert เมื่อล็อกอินสำเร็จ
        swal({
          title: 'Login Successful!',
          text: 'You will be redirected to home.html',
          icon: 'success',
          buttons: false,
          timer: 2000
        }).then(() => {
          // พาผู้ใช้ไปยังหน้า home.html
          window.location.href = 'home.html';
        });
      } else {
        // แสดง SweetAlert เมื่อล็อกอินไม่สำเร็จ
        swal({
          title: 'Login Failed',
          text: 'Invalid username or password',
          icon: 'error',
          button: 'OK'
        });
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
