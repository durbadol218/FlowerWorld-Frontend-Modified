const displayProfile = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    const parent = document.getElementById("profile-info");

    fetch(`https://flower-world.vercel.app/user/accounts/${user_id}/`)
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch user profile");
        }
        return res.json();
    })
    .then((user) => {
        parent.innerHTML = `
        <div class="card border-warning shadow-lg">
                <div class="card-body text-center">
                    <h3 class="card-title mb-4">${user.user.first_name} ${user.user.last_name}</h3>
                    <h5 class="card-text">Username: ${user.user.username}</h5>
                    <h5 class="card-text">Email: ${user.user.email}</h5>
                    <h5 class="card-text">User Type: ${user.user_type || 'N/A'}</h5>
                    <h5 class="card-text">Phone: ${user.phone || 'N/A'}</h5>
                    <button class="btn btn-outline-dark w-100 m-2 p-2">Update Profile</button>
                    <button class="btn btn-outline-dark w-100 m-2 p-2 btn-change-password">Change Password</button>
                </div>
            </div>
        `;
    })
    .catch((error) => {
        console.error("Error fetching profile:", error);
        parent.innerHTML = `<p class="text-danger">Failed to load profile information.</p>`;
    });
};

displayProfile();