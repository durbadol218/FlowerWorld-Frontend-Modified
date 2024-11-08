const loadCategories = () => {
  fetch("https://flowerworld-modified.onrender.com/categories/")
    .then((response) => response.json())
    .then((data) => {
      const categorySelect = document.getElementById("flower_category");
      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading categories:", error));
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  fetchFlowers();
});

const fetchFlowers = () => {
  const flowerTableBody = document.getElementById("flower_table");
  console.log("Flower table body:", flowerTableBody);

  if (!flowerTableBody) {
    console.error('Element with ID "flower_table" not found');
    return;
  }

  fetch("https://flowerworld-modified.onrender.com/flowers/")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      flowerTableBody.innerHTML = ""; // Clear existing rows

      data.forEach((flower) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = flower.flower_name;
        nameCell.style.textAlign = "center";
        nameCell.style.verticalAlign = "middle";
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${flower.price}`;
        priceCell.style.textAlign = "center";
        priceCell.style.verticalAlign = "middle";
        row.appendChild(priceCell);

        const quantityCell = document.createElement("td");
        quantityCell.textContent = flower.stock;
        quantityCell.style.textAlign = "center";
        quantityCell.style.verticalAlign = "middle";
        row.appendChild(quantityCell);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = flower.category.name;
        categoryCell.style.textAlign = "center";
        categoryCell.style.verticalAlign = "middle";
        row.appendChild(categoryCell);

        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = flower.image;
        img.alt = flower.flower_name;
        img.style.width = "100px";
        img.style.height = "80px";
        imageCell.classList.add("center-content");
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        const actionsCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-primary", "me-2");
        editButton.onclick = () => {
          window.location.href = `edit_flower.html?Id=${flower.id}`;
        };

        const editIcon = document.createElement("i");
        editIcon.classList.add("fas","fa-edit");
        editButton.appendChild(editIcon);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "ms-2");
        deleteButton.onclick = () => deleteFlower(flower.id);

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas","fa-trash");
        deleteButton.appendChild(deleteIcon);

        actionsCell.style.textAlign = "center";
        actionsCell.style.verticalAlign = "middle";
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        flowerTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching flower data:", error);
    });
};

const deleteFlower = (id) => {
  if (confirm("Are you sure you want to delete this flower?")) {
    fetch(`https://flowerworld-modified.onrender.com/flowers/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        alert("Flower deleted successfully.");
        fetchFlowers(); // Refresh the list
      })
      .catch((error) => {
        console.error("Error deleting flower:", error);
        alert("Failed to delete flower. Please try again later.");
      });
  }
};
function loadAllUsers() {
  const token = localStorage.getItem("token");

  // Check if token exists; if not, redirect to login
  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  fetch("https://flowerworld-modified.onrender.com/user/users/", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.href = "/login.html";
      } else if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const parent = document.getElementById("user_table");
      parent.innerHTML = "";

      if (data && Array.isArray(data)) {
        data.forEach((user, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                    `;
          parent.appendChild(row);
        });
      } else {
        parent.innerHTML = "<tr><td colspan='5'>No users found.</td></tr>";
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}

window.onload = loadAllUsers;

const handleLogout = () => {
  const token = localStorage.getItem("token");

  fetch("https://flowerworld-modified.onrender.com/user/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      window.location.href = "../login.html";
    })
    .catch((err) => console.log("logout error:: ", err));
};

document.addEventListener("DOMContentLoaded", function () {
  const orderCountApiUrl =
    "https://flowerworld-modified.onrender.com/orders/orders/order_count/";
  const userCountApiUrl = "https://flowerworld-modified.onrender.com/user/user-count/";

  const flowerCountApiUrl = "https://flowerworld-modified.onrender.com/flower/count/";

  function fetchOrderCount() {
    fetch(orderCountApiUrl)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("total-orders-count").innerText =
          data.total_orders;
      })
      .catch((error) => {
        console.error("Error fetching order count:", error);
        document.getElementById("total-orders-count").innerText =
          "Error loading count";
      });
  }

  function fetchUserCount() {
    fetch(userCountApiUrl)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("total-users-count").innerText =
          data.total_users;
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
        document.getElementById("total-users-count").innerText =
          "Error loading count";
      });
  }
  function fetchFlowerCategoryCount() {
    fetch(flowerCountApiUrl)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("total-revenue-count").innerText =
          data.total_flowers;
        document.getElementById("pending-orders-count").innerText =
          data.total_categories;
      })
      .catch((error) => {
        console.error("Error fetching flower and category count:", error);
        document.getElementById("total-revenue-count").innerText = "Error loading count";
        document.getElementById("pending-orders-count").innerText = "Error loading count";
      });
  }

  fetchFlowerCategoryCount();
  fetchOrderCount();
  fetchUserCount();
  setInterval(() => {
    fetchOrderCount();
    fetchUserCount();
    fetchFlowerCategoryCount();
  }, 5000);
});
