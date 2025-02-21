document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const loginButton = document.querySelector(".login-button");
    const registerButton = document.querySelector(".register-button");
    const profileLink = document.querySelector(".profile-link");
    const logoutButton = document.querySelector(".logout-button");

    if (token) {
        if (loginButton) loginButton.classList.add("d-none");
        if (registerButton) registerButton.classList.add("d-none");
        if (profileLink) profileLink.classList.remove("d-none");
        if (logoutButton) logoutButton.classList.remove("d-none");
    } else {
        if (loginButton) loginButton.classList.remove("d-none");
        if (registerButton) registerButton.classList.remove("d-none");
        if (profileLink) profileLink.classList.add("d-none");
        if (logoutButton) logoutButton.classList.add("d-none");
    }
});



const handleRegister = (event) => {
    event.preventDefault();

    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);
    const registerData = {
        username: formData.get("username"),
        email: formData.get("email"),
        first_name: formData.get("firstname"),
        last_name: formData.get("lastname"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        user_type: formData.get("user_type"),
        phone: formData.get("phonenumber"),
    };

    const successAlert = document.getElementById("regi-alert-success");
    const errorAlert = document.getElementById("regi-alert-error");
    successAlert.classList.add("d-none");
    errorAlert.classList.add("d-none");

    console.log("Register Data: ", registerData);

    fetch("https://flower-world.vercel.app/user/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    })
    .then((response) => {
        console.log("Response Status: ", response.status);
        if (!response.ok) {
            return response.json().then((data) => {
                throw new Error(data.error || "Registration failed");
            });
        }
        return response.json();
    })
    .then((data) => {
        console.log("Response Data: ", data);
        successAlert.classList.remove("d-none");
        successAlert.innerText = "Registration successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);
    })
    .catch((err) => {
        console.error("Registration error:", err.message);
        errorAlert.classList.remove("d-none");
        errorAlert.innerText = err.message || "Registration failed. Please try again.";
    });
};

const handleLogin = (event) => {
    event.preventDefault();

    const form = document.getElementById("loginForm");
    const formData = new FormData(form);
    const loginData = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    const successAlert = document.getElementById("login-alert-success");
    const errorAlert = document.getElementById("login-alert-error");
    successAlert.classList.add("d-none");
    errorAlert.classList.add("d-none");

    console.log("Login Data: ", loginData);

    // Make the login request
    fetch("https://flower-world.vercel.app/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then((data) => {
                console.error("Login Error Data: ", data);
                throw new Error(data.error || "Login failed");
            });
        }
        return response.json();
    })
    .then((data) => {
        console.log("Login Response Data: ", data);
        if (!data.token || !data.user_id) {
            throw new Error("Invalid login response from server");
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);

        // Fetch user data to determine user type
        return fetch(`https://flower-world.vercel.app/user/accounts/${data.user_id}/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${data.token}`,
            }
        });
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        return response.json();
    })
    .then((userData) => {
        console.log("User Data: ", userData);
        // Redirect based on user_type
        if (userData.user_type === "User") {
            window.location.href = "index.html";
        } else if (userData.user_type === "Admin") {
            window.location.href = "admin/index.html";
        } else {
            throw new Error(`Unexpected user type: ${userData.user_type}`);
        }
    })
    .catch((err) => {
        console.error("Login error:", err.message);
        errorAlert.classList.remove("d-none");
        errorAlert.innerText = err.message || "Login failed. Please try again.";
    });
};



const handleLogout = () => {
    const token = localStorage.getItem('token')
    if(!token) {
        console.log('No token found in localStorage');
        return;
    }
    fetch("https://flower-world.vercel.app/user/logout/", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Token ${token}`,
        }
    })
    .then((res)=> res.json())
    .then((data)=> {
        console.log('Logout response:',data);
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")

        window.location.href ="index.html"
    })
    .catch((err)=> console.log("logout error:: ",err))

}


