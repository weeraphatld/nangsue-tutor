function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var email = profile.getEmail();

  // Fetch data from API
  fetch("https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/LoginUser?alt=json&key=YOUR_API_KEY")
    .then(response => response.json())
    .then(data => {
      var users = data.values; // Get the values from the API response

      // Check if the email matches any record
      var isAuthenticated = users.some(user => user[0] === email);

      if (isAuthenticated) {
        // Redirect to home.html if authenticated
        window.location.href = 'home.html?email=' + encodeURIComponent(email);
      } else {
        alert("Unauthorized access. Please log in with a valid Google account.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while trying to login. Please try again later.");
    });
}
