const displayProfile = () => {
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);
  const parent = document.getElementById("profile-info");

  fetch(`https://flowerworld-api.vercel.app/user/accounts/${user_id}/`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return res.json();
    })
    .then((user) => {
      parent.innerHTML = `
        <div class="card p-4 m-2 shadow-md">
                <div class="card-body text-center">
                    <h3 class="card-title mb-4">${user.user.first_name} ${
        user.user.last_name
      }</h3>
                    <h5 class="card-text">Username: ${user.user.username}</h5>
                    <h5 class="card-text">Email: ${user.user.email}</h5>
                    <h5 class="card-text">User Type: ${
                      user.user_type || "N/A"
                    }</h5>
                    <h5 class="card-text">Phone: ${user.phone || "N/A"}</h5>
                    <button class="btn w-100 m-2 p-2 btn-profile-update" id="btn-profile-update">Update Profile</button>
                    <button class="btn w-100 m-2 p-2 btn-change-password" id="btn-change-password">Change Password</button>
                </div>
            </div>
        `;
        document.getElementById("btn-profile-update").addEventListener("click", () => {
          window.location.href = "../update-profile.html";
        });
        document.getElementById("btn-change-password").addEventListener("click", () =>  {
          window.location.href = "../change-password.html";
        });
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      parent.innerHTML = `<p class="text-danger">Failed to load profile information.</p>`;
    });
};

displayProfile();



document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to update profile.");
    return;
  }

  const successMessage = document.getElementById("profile-update-success");
  const errorMessage = document.getElementById("profile-update-error");
  const updateButton = document.getElementById("profile-update-button");
  const spinner = document.getElementById("profile-update-spinner");

  successMessage.classList.add("d-none");
  errorMessage.classList.add("d-none");

  fetch("https://flowerworld-api.vercel.app/user/profile/update/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("username").value = data.username;
      document.getElementById("first_name").value = data.first_name;
      document.getElementById("last_name").value = data.last_name;
      document.getElementById("email").value = data.email;
      document.getElementById("phone").value = data.phone;
      document.getElementById("user_type").value = data.user_type;
    })
    .catch(() => {
      errorMessage.classList.remove("d-none");
      errorMessage.innerText = "Failed to load profile data.";
    });

  document.getElementById("profile-update-form").addEventListener("submit", (e) => {
    e.preventDefault();

    spinner.classList.remove("d-none");
    updateButton.disabled = true;
    successMessage.classList.add("d-none");
    errorMessage.classList.add("d-none");

    const payload = {
      username: document.getElementById("username").value,
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      user_type: document.getElementById("user_type").value,
    };

    fetch("https://flowerworld-api.vercel.app/user/profile/update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        let data;
        try {
          data = await res.json();
        } catch {
          data = { error: "Invalid server response" };
        }
        return { status: res.status, data };
      })
      .then(({ status, data }) => {
        if (status === 200) {
          successMessage.classList.remove("d-none");
          successMessage.innerText = "Profile updated successfully!";
        } else {
          const errorText = typeof data === 'object' ? Object.values(data).flat().join(" ") : "Update failed";
          throw new Error(errorText);
        }
      })
      .catch((err) => {
        errorMessage.classList.remove("d-none");
        errorMessage.innerText = err.message;
      })
      .finally(() => {
        spinner.classList.add("d-none");
        updateButton.disabled = false;
      });
  });
});

