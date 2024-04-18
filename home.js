window.onload = function() {
  // Get email from query parameter
  var queryParams = new URLSearchParams(window.location.search);
  var email = queryParams.get('email');

  // Display welcome message
  var welcomeMessage = document.getElementById('welcomeMessage');
  welcomeMessage.innerHTML = 'Welcome, ' + email + '!';
};
