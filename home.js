document.addEventListener("DOMContentLoaded", function() {
  // Check if username exists in Local Storage
  var username = localStorage.getItem("username");

  if (username) {
    // Display welcome message with username
    document.getElementById("userInfo").innerHTML = "Welcome, " + name + "!";
  } else {
    // Redirect to login page if username is not found
    window.location.href = "index.html";
  }
});
