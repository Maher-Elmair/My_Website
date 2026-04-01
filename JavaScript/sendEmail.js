(function () {
  // Initialize EmailJS with the public key
  emailjs.init("gMvnhfV-l_oM4kXqm");
})();

const form = document.querySelector(".contact-form");
const toastContainer = document.getElementById("toastContainer");

function showToast(type, text) {
  if (!toastContainer) return;

  // Reset classes before applying new state
  toastContainer.className = "toast-container";
  toastContainer.classList.add("show", type);

  // Build DOM nodes manually to prevent XSS via innerHTML
  const icon = document.createElement("i");
  icon.className = `uil ${type === "success" ? "uil-check-circle" : "uil-times-circle"}`;

  const message = document.createElement("span");
  message.textContent = text; // textContent is safe — never parses HTML

  toastContainer.replaceChildren(icon, message);

  setTimeout(() => {
    toastContainer.classList.remove("show");
  }, 5000);
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = form.querySelector("[name='user_name']");
    const emailInput = form.querySelector("[name='user_email']");
    const hiddenAvatar = form.querySelector("#user_avatar");
    const submitButton = form.querySelector("button[type='submit']");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

    if (!name || !email) {
      showToast("error", "Please enter your name and email before sending.");
      return;
    }

    // Disable button to prevent duplicate submissions
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Generate Gravatar URL from hashed email for the email template avatar
    const emailHash = CryptoJS.MD5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon&s=80`;

    if (hiddenAvatar) {
      hiddenAvatar.value = gravatarUrl;
    }

    emailjs.sendForm("service_rcbiktg", "template_lbooy4d", this).then(
      function () {
        showToast("success", "Your message has been sent successfully!");
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      },
      function (error) {
        // Avoid leaking raw API error objects to the user
        showToast("error", "Failed to send message. Please try again.");
        console.error("EmailJS error:", error);
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      },
    );
  });
} else {
  console.error("Form not found!");
}
