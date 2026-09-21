// Simple welcome message when the site loads
window.onload = function() {
  console.log("Welcome to Eden Clothing!");
};

// Contact form validation
function validateForm(event) {
  event.preventDefault(); // stop default submission

  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const message = document.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting.");
    return false;
  }

  // Basic email check
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return false;
  }

  alert("Thank you for contacting Eden Clothing! We’ll get back to you soon.");
  return true;
}

// Attach validation to the form
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", validateForm);
  }
});
