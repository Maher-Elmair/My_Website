(function () {
  // Initialize EmailJS with your user ID
  // Your Public Key from your EmailJS account
  // You can change it here if you update the key in the dashboard
  emailjs.init("gMvnhfV-l_oM4kXqm");
})();

const form = document.querySelector(".contact-form");
const toastContainer = document.getElementById("toastContainer");

function showToast(type, text) {
  if (!toastContainer) return;

  toastContainer.className = "toast-container";

  toastContainer.classList.add("show", type);

  toastContainer.innerHTML = `
    <i class="uil ${
      type === "success" ? "uil-check-circle" : "uil-times-circle"
    }"></i>
    <span>${text}</span>
  `;

  setTimeout(() => {
    toastContainer.classList.remove("show");
  }, 5000);
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = form.querySelector("[name='user_name']");
    const emailInput = form.querySelector("[name='user_email']");
    const hiddenAvatar = form.querySelector("#user_avatar"); // the hidden input
    const submitButton = form.querySelector("button[type='submit']");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

    if (!name || !email) {
      showToast("error", "Please enter your name and email before sending.");
      return;
    }
    
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";



    // Generate gravatar URL
    const emailHash = CryptoJS.MD5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon&s=80`;

    if (hiddenAvatar) {
      hiddenAvatar.value = gravatarUrl;
    }
    // "service_rcbiktg" => Your Service ID in EmailJS
    // "template_lbooy4d" => Your Template ID for this form
    // this => The form element from which the data will be sent
    emailjs.sendForm("service_rcbiktg", "template_lbooy4d", this).then(
      function () {
        showToast("success", "Your message has been sent successfully!");
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      },
      function (error) {
        showToast(
          "error",
          "❌ Failed to send message: " + JSON.stringify(error)
        );
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    );
  });
} else {
  console.error("❌ Form not found!");
}
