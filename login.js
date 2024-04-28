document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Fetch API to check login credentials
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/log?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process data to check login credentials
      const rows = data.values;
      let loggedIn = false;
      if (rows.length > 0) {
        rows.forEach(row => {
          if (row[0] === username && row[1] === password) {
            loggedIn = true;
          }
        });
      }

      // If login is successful, show SweetAlert and redirect to home.html
      if (loggedIn) {
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'You will be redirected to home page.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = 'home.html';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Invalid username or password!'
        });
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});
