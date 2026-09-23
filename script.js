// =========================================
// EDEN CLOTHING — WEBSITE JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // Mobile navigation toggle
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("nav-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("nav-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }

    // Newsletter demonstration form
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");

    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            newsletterMessage.textContent =
                "Thanks for your interest in Eden! This is a demonstration form and does not store email addresses.";

            newsletterForm.reset();
        });
    }

   
});