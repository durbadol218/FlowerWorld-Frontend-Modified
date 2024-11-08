document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flowerworld-modified.onrender.com/flowers/";
    const categoryApiUrl = "https://flowerworld-modified.onrender.com/categories/";
    const flowerContainer = document.getElementById("flower-container");
    const categorySelect = document.getElementById("category-select");

    function loadCategories() {
        fetch(categoryApiUrl)
            .then((response) => response.json())
            .then((categories) => {
                categories.forEach((category) => {
                    const option = document.createElement("option");
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }
    function loadFlowers(categoryId = "") {
        let url = apiUrl;
        if (categoryId) {
            url = `https://flowerworld-modified.onrender.com/flowers/category/${categoryId}/`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((flowers) => {
                flowerContainer.innerHTML = "";
                flowers.forEach((flower) => {
                    const flowerCard = `
                        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <div class="rounded position-relative fruite-item">
                                <div class="fruite-img">
                                    <img src="${flower.image
                        }" class="flower-image img-fluid w-100 rounded-top" alt="${flower.flower_name
                        }" data-flower-id="${flower.id}">
                                </div>
                                <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
                                    ${flower.category && flower.category.name
                            ? flower.category.name
                            : "No Category"
                        }
                                </div>
                                <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                    <h4>${flower.flower_name}</h4>
                                    <p>${flower.description.slice(0, 100)}</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold mb-0">$${flower.price
                        }</p>
                                        <button class="btn border border-secondary rounded-pill px-3 text-primary buy-now-btn" data-flower-id="${flower.id
                        }" data-flower-price="${flower.price}">
                                            <i class="fa-solid fa-cart-shopping text-primary"></i> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    flowerContainer.innerHTML += flowerCard;
                });
                attachBuyNowListeners();
            })
            .catch((error) => {
                console.error("Error fetching flowers:", error);
            });
    }

    function attachBuyNowListeners() {
        document.querySelectorAll(".buy-now-btn").forEach((button) => {
            button.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent default button behavior
                const flowerId = this.getAttribute("data-flower-id");
                const flowerPrice = this.getAttribute("data-flower-price");
                const quantity = 1;
                const userId = localStorage.getItem("user_id");
                const token = localStorage.getItem("token");

                fetch("https://flowerworld-modified.onrender.com/orders/orders/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                        flower: flowerId,
                        user: userId,
                        quantity: quantity,
                        total_amount: flowerPrice * quantity,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Order successfully placed:", data);
                        alert("Order placed successfully!");
                    })
                    .catch((error) => {
                        console.error("Error placing order:", error);
                        alert("Failed to place order.");
                    });
            });
        });
    }

    loadCategories();
    loadFlowers();

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        loadFlowers(selectedCategory);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flowerworld-modified.onrender.com/flowers/";
    const flowerContainer = document.getElementById("flower-container");
    const searchInput = document.getElementById("modal-flower-search");
    const applyFiltersBtn = document.getElementById("apply-filters");

    // Function to check if the user is logged in
    function isLoggedIn() {
        return localStorage.getItem("token") !== null && localStorage.getItem("user_id") !== null;
    }

    function loadFlowers(searchTerm = "") {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((flowers) => {
                flowerContainer.innerHTML = "";
                const filteredFlowers = flowers.filter((flower) =>
                    flower.flower_name.toLowerCase().includes(searchTerm.toLowerCase())
                );

                filteredFlowers.forEach((flower) => {
                    const flowerCard = `
                        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <div class="rounded position-relative fruite-item">
                                <div class="fruite-img">
                                    <img src="${flower.image}" class="flower-image img-fluid w-100 rounded-top" alt="${flower.flower_name}" data-flower-id="${flower.id}">
                                    <div class="position-absolute" style="top: 10px; right: 10px;">
                                        <i class="fa fa-info-circle fa-lg cursor-pointer" onclick="showFlowerDetails(${flower.id})"></i>
                                    </div>
                                </div>
                                <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
                                    ${flower.category && flower.category.name ? flower.category.name : "No Category"}
                                </div>
                                <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                    <h4>${flower.flower_name}</h4>
                                    <p>${flower.description.slice(0, 100)}</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold mb-0">$${flower.price}</p>
                                        ${isLoggedIn() ? `
                                        <button class="btn border border-secondary rounded-pill px-3 buy-now-btn" data-flower-id="${flower.id}" data-flower-price="${flower.price}">
                                            <i class="fa-solid fa-cart-shopping"></i> Buy Now
                                        </button>` : `<p class="text-muted"><a href="./login.html">Login</a> to purchase</p>`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    flowerContainer.innerHTML += flowerCard;
                });

                // Only add event listeners for "Buy Now" buttons if the user is logged in
                if (isLoggedIn()) {
                    document.querySelectorAll(".buy-now-btn").forEach((button) => {
                        button.addEventListener("click", function () {
                            const flowerId = this.getAttribute("data-flower-id");
                            const flowerPrice = this.getAttribute("data-flower-price");

                            const quantity = 1;
                            const userId = localStorage.getItem("user_id");
                            fetch("https://flowerworld-modified.onrender.com/orders/orders/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${localStorage.getItem("token")}`,
                                },
                                body: JSON.stringify({
                                    flower: flowerId,
                                    user: userId,
                                    quantity: quantity,
                                    total_amount: flowerPrice * quantity,
                                }),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log("Order successfully placed:", data);
                                    alert("Order placed successfully!");
                                })
                                .catch((error) => {
                                    console.error("Error placing order:", error);
                                    alert("Failed to place order.");
                                });
                        });
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching flowers:", error);
            });
    }

    applyFiltersBtn.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        loadFlowers(searchTerm);
        const modalElement = document.getElementById("searchModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    });

    loadFlowers();
});


// document.addEventListener("DOMContentLoaded", () => {
//     const ordersApiUrl = "https://flowerworld.onrender.com/orders/orders/";
//     const ordersContainer = document.getElementById("orders-container");
//     const userId = localStorage.getItem("user_id");
//     const token = localStorage.getItem("token");

//     console.log("Logged-in User ID:", userId);

//     function loadOrders() {
//         fetch(ordersApiUrl, {
//             method: "GET",
//             headers: {
//                 Authorization: `Token ${token}`,
//             },
//         })
//             .then((response) => response.json())
//             .then((orders) => {
//                 console.log("Fetched Orders:", orders);

//                 ordersContainer.innerHTML = "";
//                 const orderTable = `
//                         <table class="table table-bordered table-hover">
//                         <thead class="table-light">
//                             <tr>
//                                 <th scope="col">Order ID</th>
//                                 <th scope="col">Flower Name</th>
//                                 <th scope="col">Quantity</th>
//                                 <th scope="col">Total Amount</th>
//                                 <th scope="col">Status</th>
//                                 <th scope="col">Placed Time</th>
//                             </tr>
//                         </thead>
//                         <tbody id="orderTableBody">
//                             <!-- Dynamic order rows will be inserted here -->
//                         </tbody>
//                         </table>
//                     `;
//                 ordersContainer.innerHTML = orderTable;
//                 const user_orders = orders.filter(
//                     (order) => String(order.user) === String(userId)
//                 );
//                 console.log("Filtered User Orders:", user_orders); // Debugging: Verify filtered orders

//                 if (user_orders.length === 0) {
//                     ordersContainer.innerHTML = "<p>No orders found for this user.</p>";
//                 } else {
//                     user_orders.forEach((order) => {
//                         const orderRow = `
//                         <tr>
//                             <td>${order.id}</td>
//                             <td>${order.flower_name}</td>
//                             <td>${order.quantity}</td>
//                             <td>$${order.total_amount}</td>
//                             <td>${order.status}</td>
//                             <td>${new Date(
//                             order.placed_time
//                         ).toLocaleString()}</td>
//                         </tr>
//                     `;
//                         document
//                             .getElementById("orderTableBody")
//                             .insertAdjacentHTML("beforeend", orderRow);
//                     });
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching orders:", error);
//             });
//     }
//     loadOrders();
// });

document.addEventListener("DOMContentLoaded", () => {
    const ordersApiUrl = "https://flowerworld-modified.onrender.com/orders/orders/";
    const ordersContainer = document.getElementById("orders-container");
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    function showLoginPrompt() {
        ordersContainer.innerHTML = `
            <div class="alert alert-warning" role="alert">
                You must be logged in to view your orders. 
                <a href="../login.html" class="alert-link">Click here to login</a>.
            </div>`;
    }

    if (!userId || !token) {
        console.log("User is not logged in. Showing login prompt...");
        showLoginPrompt();
        return;
    }

    console.log("Logged-in User ID:", userId);

    function loadOrders() {
        fetch(ordersApiUrl, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((orders) => {
                console.log("Fetched Orders:", orders);

                ordersContainer.innerHTML = "";
                const orderTable = `
                        <table class="table table-bordered table-hover">
                        <thead class="table-light">
                            <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">Flower Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Status</th>
                                <th scope="col">Placed Time</th>
                            </tr>
                        </thead>
                        <tbody id="orderTableBody">
                            <!-- Dynamic order rows will be inserted here -->
                        </tbody>
                        </table>
                    `;
                ordersContainer.innerHTML = orderTable;
                const user_orders = orders.filter(
                    (order) => String(order.user) === String(userId)
                );
                console.log("Filtered User Orders:", user_orders);

                if (user_orders.length === 0) {
                    ordersContainer.innerHTML = `
                        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <img style="height: 300px; width: 500px;" src="./image/undraw_empty_cart_co35.svg" alt="No orders found for this user." />
                            <p style="margin-top: 20px; font-size: 18px;">No orders found for this user.</p>
                        </div>
                    `;
                } else {
                    user_orders.forEach((order) => {
                        const orderRow = `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.flower_name}</td>
                            <td>${order.quantity}</td>
                            <td>$${order.total_amount}</td>
                            <td>${order.status}</td>
                            <td>${new Date(
                            order.placed_time
                        ).toLocaleString()}</td>
                        </tr>
                    `;
                        document
                            .getElementById("orderTableBody")
                            .insertAdjacentHTML("beforeend", orderRow);
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }
    loadOrders();
});


const showFlowerDetails = (flowerID) => {
    fetch(`https://flowerworld-modified.onrender.com/flowers/${flowerID}/`)
        .then((res) => res.json())
        .then((data) => {
            viewSingleFlower(data);
        })
        .catch((error) => {
            console.error("Error fetching flower details:", error);
        });
};

const viewSingleFlower = (flower) => {
    const modalBody = document.getElementById("singleFlowerbody");

    // Function to check if the user is logged in
    function isLoggedIn() {
        return localStorage.getItem("token") !== null && localStorage.getItem("user_id") !== null;
    }

    modalBody.innerHTML = `
    <div class="card shadow-lg border-0 position-relative">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center bg-light rounded-start">
                <img src="${flower.image}" class="img-fluid rounded-3" alt="${flower.flower_name}" style="height: 150px; width:400px;">
            </div>
            <div class="col-md-8">
                <div class="card-body p-4">
                    <h4 class="card-title text-primary mb-3">${flower.flower_name}</h4>
                    <p class="card-text mb-2">
                        <span class="badge bg-success text-white fs-5">$${flower.price}</span>
                    </p>
                    <p class="card-text mb-2">
                        <span class="badge bg-secondary">${flower.category ? flower.category.name : "No Category"}</span>
                    </p>
                    <p class="text-muted mb-4"><strong>Description:</strong> ${flower.description.slice(0, 180)}...</p>
                    <div class="d-flex justify-content-between">
                        ${isLoggedIn() ? `
                        <button class="btn border border-secondary rounded-pill px-3 buy-now-btn" data-flower-id="${flower.id}" data-flower-price="${flower.price}">
                            <i class="fa-solid fa-cart-shopping"></i> Buy Now
                        </button>` : `<p class="text-muted">Log in to purchase</p>`}
                        <button class="btn btn-outline-info btn-sm px-4 py-2" onclick="location.href='flower_details.html?flowerId=${flower.id}'">More Info</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Only add event listeners for "Buy Now" buttons if the user is logged in
    if (isLoggedIn()) {
        document.querySelectorAll(".buy-now-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const flowerId = this.getAttribute("data-flower-id");
                const flowerPrice = this.getAttribute("data-flower-price");

                const quantity = 1;
                const userId = localStorage.getItem("user_id");
                fetch("https://flowerworld-modified.onrender.com/orders/orders/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        flower: flowerId,
                        user: userId,
                        quantity: quantity,
                        total_amount: flowerPrice * quantity,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Order successfully placed:", data);
                        alert("Order placed successfully!");
                    })
                    .catch((error) => {
                        console.error("Error placing order:", error);
                        alert("Failed to place order.");
                    });
            });
        });
    }

    const flowerDetailsModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    flowerDetailsModal.show();
};
