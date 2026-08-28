// =========================
// GLOBAL SKILL NETWORK
// Frontend Authentication
// =========================

const API_URL = "http://localhost:5000";


// =========================
// REGISTER
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
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

    message.textContent = "Creating your account...";

    try {
      const response = await fetch(
        `${API_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullName: name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        message.textContent =
          data.message || "Registration failed.";
        return;
      }

      message.textContent =
        "Account created successfully!";

      registerForm.reset();

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);

    } catch (error) {
      console.error(error);

      message.textContent =
        "Unable to connect to the server.";
    }
  });
}


// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email =
      document.getElementById("loginEmail").value.trim();

    const password =
      document.getElementById("loginPassword").value;

    const message =
      document.getElementById("loginMessage");

    if (!email || !password) {
      message.textContent =
        "Please enter your email and password.";
      return;
    }

    message.textContent = "Logging in...";

    try {
      const response = await fetch(
        `${API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        message.textContent =
          data.message || "Login failed.";
        return;
      }

      // Store token temporarily.
      sessionStorage.setItem(
        "authToken",
        data.token
      );

      sessionStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      message.textContent =
        "Login successful!";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 700);

    } catch (error) {
      console.error(error);

      message.textContent =
        "Unable to connect to the server.";
    }
  });
  }
