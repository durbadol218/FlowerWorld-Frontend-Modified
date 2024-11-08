const displayProfile = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    const parent = document.getElementById("profile-info");

    fetch(`https://flowerworld-modified.onrender.com/user/accounts/${user_id}/`)
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
                    <img src="${user.image || 'default-image.jpg'}" class="img-fluid rounded-circle mb-4" style="width: 150px; height: 150px; object-fit: cover;" alt="${user.first_name}">
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





// const displayProfile = () => {
//     const user_id = localStorage.getItem("user_id");
//     const parent = document.getElementById("profile-info");

//     fetch(`https://flowerworld.onrender.com/user/accounts/${user_id}/`)
//     .then((res) => {
//         if (!res.ok) {
//             throw new Error("Failed to fetch user profile");
//         }
//         return res.json();
//     })
//     .then((user) => {
//         parent.innerHTML = `
//         <div class="card border-warning shadow-lg">
//             <div class="card-body text-center">
//                 <h3 class="card-title mb-4">${user.user.first_name} ${user.user.last_name}</h3>
//                 <img src="${user.image || 'default-image.jpg'}" class="img-fluid rounded-circle mb-4" style="width: 150px; height: 150px; object-fit: cover;" alt="${user.first_name}">
//                 <h5 class="card-text">Username: ${user.user.username}</h5>
//                 <h5 class="card-text">Email: ${user.user.email}</h5>
//                 <h5 class="card-text">User Type: ${user.user_type || 'N/A'}</h5>
//                 <h5 class="card-text">Phone: ${user.phone || 'N/A'}</h5>
//                 <button class="btn btn-outline-dark w-100 m-2 p-2">Update Profile</button>
//                 <button class="btn btn-outline-dark w-100 m-2 p-2 btn-change-password">Change Password</button>
//             </div>
//         </div>
//         `;

//         // Add event listener for Change Password button
//         document.querySelector('.btn-change-password').addEventListener('click', () => {
//             const oldPassword = prompt('Enter your old password:');
//             const newPassword = prompt('Enter your new password:');

//             if (!oldPassword || !newPassword) {
//                 alert('Both old and new passwords are required.');
//                 return;
//             }

//             fetch('http://flowerworld.onrender.com/user/change-password/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     old_password: oldPassword,
//                     new_password: newPassword,
//                 }),
//             })
//             .then((response) => {
//                 if (response.ok) {
//                     alert('Password changed successfully!');
//                 } else {
//                     return response.json().then((data) => {
//                         throw new Error(data.detail || 'Failed to change password');
//                     });
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error changing password:', error);
//                 alert(`Error: ${error.message}`);
//             });
//         });
//     })
//     .catch((error) => {
//         console.error("Error fetching profile:", error);
//         parent.innerHTML = `<p class="text-danger">Failed to load profile information.</p>`;
//     });
// };

// // Call displayProfile function to fetch and display the profile
// displayProfile();
