document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  fetch("https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/LoginUser?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8")
    .then(response => response.json())
    .then(data => {
      var users = data.values;

      var isAuthenticated = users.some(user => user[0] === username && user[1] === password);

      if (isAuthenticated) {
        // Save username in Local Storage
        localStorage.setItem("username", username);
        // Redirect to home page
        window.location.href = "home.html";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while trying to login. Please try again later.");
    });
});
