document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const loginButton = document.querySelector(".login-button");
    const registerButton = document.querySelector(".register-button");
    const profileLink = document.querySelector(".profile-link"); // Assuming a profile link if it exists
    const logoutButton = document.querySelector(".logout-button"); // Assuming you have a logout button if needed

    if (token) {
        // User is logged in
        if (loginButton) loginButton.classList.add("d-none"); // Hide Login button
        if (registerButton) registerButton.classList.add("d-none"); // Hide Register button
        if (profileLink) profileLink.classList.remove("d-none"); // Show Profile link (if applicable)
        if (logoutButton) logoutButton.classList.remove("d-none"); // Show Logout button (if applicable)
    } else {
        // User is not logged in
        if (loginButton) loginButton.classList.remove("d-none"); // Show Login button
        if (registerButton) registerButton.classList.remove("d-none"); // Show Register button
        if (profileLink) profileLink.classList.add("d-none"); // Hide Profile link (if applicable)
        if (logoutButton) logoutButton.classList.add("d-none"); // Hide Logout button (if applicable)
    }
});



// const handleLogin = (event) => {
//     event.preventDefault();

//     const form = document.getElementById("loginForm");
//     const formData = new FormData(form);
//     const loginData = {
//         username: formData.get("username"),
//         password: formData.get("password"),
//     };
//     const successAlert = document.getElementById("login-alert-success");
//     const errorAlert = document.getElementById("login-alert-error");
//     successAlert.classList.add("d-none");
//     errorAlert.classList.add("d-none");

//     fetch("https://flowerworld.onrender.com/user/login/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//     })
//     .then((response) => {
//         console.log(response); // Log the response to see what's coming back
//         if (!response.ok) {
//             return response.json().then((data) => {
//                 throw new Error(data.error || "Invalid username or password");
//             });
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data); // Log the data to see what is returned from the backend
//         if (!data.token || !data.user_id) {
//             throw new Error("Invalid login response from server");
//         }
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user_id", data.user_id);
//         successAlert.classList.remove("d-none");
//         setTimeout(() => {
//             window.location.href = "index.html";
//         }, 3000);
//     })
//     .catch((err) => {
//         console.error("Login error:", err);
//         errorAlert.classList.remove("d-none");
//         errorAlert.innerText = err.message || "Invalid username or password. Please try again.";
//     });
// };



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

    fetch("https://flowerworld-modified.onrender.com/user/register/", {
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
    fetch("https://flowerworld-modified.onrender.com/user/login/", {
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
        return fetch(`https://flowerworld-modified.onrender.com/user/accounts/${data.user_id}/`, {
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
    fetch("https://flowerworld-modified.onrender.com/user/logout/", {
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


