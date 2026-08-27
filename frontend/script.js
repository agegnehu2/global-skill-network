// =========================
// GLOBAL SKILL NETWORK
// Frontend JavaScript
// =========================

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// =========================
// REGISTER
// =========================

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
      document.getElementById("confirmPassword").value;

    const message = document.getElementById("registerMessage");

    if (name.length < 2) {
      message.textContent = "Please enter your full name.";
      return;
    }

    if (password.length < 8) {
      message.textContent =
        "Password must contain at least 8 characters.";
      return;
    }

    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match.";
      return;
    }

    message.textContent =
      "Account form is valid. Backend registration comes next.";

    console.log("Registration:", {
      name,
      email
    });
  });
}

// =========================
// LOGIN
// =========================

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password =
      document.getElementById("loginPassword").value;

    const message = document.getElementById("loginMessage");

    if (!email || !password) {
      message.textContent =
        "Please enter your email and password.";
      return;
    }

    message.textContent =
      "Login form is valid. Backend authentication comes next.";

    console.log("Login:", {
      email
    });
  });
}
