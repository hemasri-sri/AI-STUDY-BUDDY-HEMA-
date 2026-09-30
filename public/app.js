async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!email || !password) {
        message.textContent = "Please enter email and password.";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("accessToken", data.accessToken);
            message.textContent = "Login successful! 🎉";
        } else {
            message.textContent = data.message || "Login failed.";
        }

    } catch (error) {
        message.textContent = "Cannot connect to the backend.";
        console.error(error);
    }
}