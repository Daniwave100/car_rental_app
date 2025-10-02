const signupForm = document.getElementById("signup-form");
const signupMsg = document.getElementById("signup-msg");

// Signup JS
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirm = document.getElementById("confirm-password").value;

        if (!email || !password || !confirm) {
            signupMsg.textContent = "Please fill in all field values.";
            signupMsg.classList.add("error");
            return;
        }

        if (password !== confirm) {
            signupMsg.textContent = "Passwords do not match.";
            signupMsg.classList.add("error");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/sign-up", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({email: email, password: password })
            });

            if (!response.ok) {
                throw new Error("Sign up failed.");
            }

            const data = await response.json();
            console.log("Signup response:", data);

            signupMsg.textContent = "Signup successful! You can now log in.";
            signupMsg.classList.add("ok");
        } catch (error) {
            console.error("Error during signup:", error);
            signupMsg.textContent = "Signup failed. Try again.";
            signupMsg.classList.remove("ok");
            signupMsg.classList.add("error");
        }
    });
}

// Sign in JS
const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-msg");


if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if (!email || !password) {
            signupMsg.textContent = "Please fill in all field values.";
            signupMsg.classList.add("error");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/sign-in", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({email: email, password: password })
            });

            if (!response.ok) {
                throw new Error("Log in failed.");
            }

            const data = await response.json();
            console.log("Log in response:", data);

            signupMsg.textContent = "Log in successful!";
            signupMsg.classList.add("ok");
        } catch (error) {
            console.error("Error during log in:", error);
            signupMsg.textContent = "Log in failed. Try again.";
            signupMsg.classList.remove("ok");
            signupMsg.classList.add("error");
        }
    });
}