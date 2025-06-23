document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flowerworld-api.vercel.app/flowers/";
    const categoryApiUrl = "https://flowerworld-api.vercel.app/categories/";
    const cartApiUrl = "https://flowerworld-api.vercel.app/orders/carts/";
    const flowerContainer = document.getElementById("flower-container");
    const categorySelect = document.getElementById("category-select");

    async function loadCategories() {
        try {
            const response = await fetch(categoryApiUrl);
            const categories = await response.json();
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    async function loadFlowers(categoryId = "") {
        try {
            const url = categoryId ? `${apiUrl}category/${categoryId}/` : apiUrl;
            const response = await fetch(url);
            const flowers = await response.json();
            console.log(flowers);
            const displayedFlowers = flowers.slice(0, 10);
            console.log(displayedFlowers);
            flowerContainer.innerHTML = displayedFlowers
                .map((flower) => {
                    console.log(flower.image_url);
                    return `
                    <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div class="rounded position-relative fruite-item">
                            <div class="fruite-img">
                                <img src="${flower.image_url
                        }" class="flower-image img-fluid w-100 rounded-top" alt="Hello World ${flower.flower_name
                        }" onerror="this.src='fallback-image.jpg'">
                                <!-- Info icon positioned on top of the image -->
                                <div class="position-absolute" style="top: 10px; right: 10px;">
                                    
                                </div>
                            </div>
                            <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
                                ${flower.category?.name || "No Category"}
                            </div>
                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4>${flower.flower_name}</h4>
                                <p>${flower.description.slice(0, 100)}</p>
                                <div class="d-flex justify-content-between flex-lg-wrap">
                                    <p class="text-dark fs-5 fw-bold mb-0">$${flower.price
                        }</p>
                                    <button class="btn btn-sm px-4 py-2 more-info-btn" onclick="location.href='flower_details.html?flowerId=${flower.id
                        }'">More Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                })
                .join("");
            attachAddToCartListeners();
        } catch (error) {
            console.error("Error fetching flowers:", error);
        }
    }
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    async function handleAddToCart(flowerId) {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to add items to the cart.");
            return;
        }

        try {
            const headers = {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            };

            const cartResponse = await fetch(cartApiUrl, { headers });

            if (!cartResponse.ok) {
                throw new Error(
                    "Failed to retrieve cart. Status: " + cartResponse.statusText
                );
            }

            const carts = await cartResponse.json();
            let cart = carts.find((c) => c.is_active);

            if (!cart) {
                const createResponse = await fetch(cartApiUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({}),
                });
                if (!createResponse.ok) {
                    throw new Error(
                        "Failed to create cart. Status: " + createResponse.statusText
                    );
                }

                cart = await createResponse.json();
            }
            const addItemUrl = `${cartApiUrl}${cart.id}/items/`;
            const addItemResponse = await fetch(addItemUrl, {
                method: "POST",
                headers,
                body: JSON.stringify({ flower_id: flowerId }),
            });

            if (!addItemResponse.ok) {
                throw new Error(
                    "Failed to add item to cart. Status: " + addItemResponse.statusText
                );
            }

            alert("Item added to cart successfully.");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            alert("An error occurred: " + error.message);
        }
    }

    function attachAddToCartListeners() {
        document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const flowerId = button.getAttribute("data-flower-id");
                handleAddToCart(flowerId);
            });
        });
    }
    categorySelect.addEventListener("change", () => {
        loadFlowers(categorySelect.value);
    });
    loadCategories();
    loadFlowers();
});

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flowerworld-api.vercel.app/flowers/";
    const cartApiUrl = "https://flowerworld-api.vercel.app/orders/carts/";
    const flowerContainer = document.getElementById("flower-container");
    const searchInput = document.getElementById("modal-flower-search");
    const applyFiltersButton = document.getElementById("apply-filters");

    async function loadFlowers(searchTerm = "") {
        try {
            const response = await fetch(apiUrl);
            const flowers = await response.json();
            const filteredFlowers = flowers.filter((flower) =>
                flower.flower_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            flowerContainer.innerHTML = filteredFlowers
                .map(
                    (flower) => `
                <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
    <div class="rounded position-relative fruite-item d-flex flex-column">
        <div class="fruite-img position-relative">
            <img src="${flower.image_url
                        }" class="flower-image img-fluid w-100 rounded-top" alt="Hello World! ${flower.flower_name
                        }">
            <div class="position-absolute" style="top: 10px; right: 10px;">
                
            </div>
        </div>
        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
            ${flower.category?.name || "No Category"}
        </div>

        <div class="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column flex-grow-1">
            <h4>${flower.flower_name}</h4>
            <p class="flex-grow-1">${flower.description.slice(0, 100)}...</p>

            <!-- Pushes this to the bottom of card -->
            <div class="d-flex justify-content-between align-items-center mt-auto">
                <p class="text-dark fs-5 fw-bold mb-0">$${flower.price}</p>
                <button class="btn btn-sm px-4 py-2 more-info-btn" onclick="location.href='flower_details.html?flowerId=${flower.id
                        }'">More Info</button>
            </div>
        </div>
    </div>
</div>

            `
                )
                .join("");
            attachAddToCartListeners();
        } catch (error) {
            console.error("Error fetching flowers:", error);
        }
    }
    async function handleAddToCart(flowerId) {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
            alert("You must be logged in to add items to the cart.");
            return;
        }

        try {
            const headers = {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            };

            const cartResponse = await fetch(cartApiUrl, { headers });
            if (!cartResponse.ok) {
                throw new Error(
                    "Failed to retrieve cart. Status: " + cartResponse.statusText
                );
            }
            const carts = await cartResponse.json();
            let cart = carts.find((c) => c.is_active);
            if (!cart) {
                const createResponse = await fetch(cartApiUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({}),
                });
                if (!createResponse.ok) {
                    throw new Error(
                        "Failed to create cart. Status: " + createResponse.statusText
                    );
                }
                cart = await createResponse.json();
            }
            const addItemUrl = `${cartApiUrl}${cart.id}/items/`;
            const addItemResponse = await fetch(addItemUrl, {
                method: "POST",
                headers,
                body: JSON.stringify({ flower_id: flowerId }),
            });
            if (!addItemResponse.ok) {
                throw new Error(
                    "Failed to add item to cart. Status: " + addItemResponse.statusText
                );
            }
            alert("Item added to cart successfully.");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            alert("An error occurred: " + error.message);
        }
    }

    function attachAddToCartListeners() {
        document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const flowerId = button.getAttribute("data-flower-id");
                handleAddToCart(flowerId);
            });
        });
    }
    applyFiltersButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;
        loadFlowers(searchTerm);
    });
    loadFlowers();
});

document.addEventListener("DOMContentLoaded", () => {
    const ordersApiUrl = "https://flowerworld-api.vercel.app/orders/orders/";
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
                                <th scope="col">Trx ID</th>
                                <th scope="col">Items</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Payment Status</th>
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
                        const items = order.items
                            .map((item) => `${item.flower_name} (${item.quantity})`)
                            .join(", ");
                        const orderRow = `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.transaction_id}</td>
                            <td>${items || "N/A"}</td>
                            <td>$${order.total_amount}</td>
                            <td>${order.status}</td>
                            <td>${order.payment_status}</td>
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
    fetch(`https://flowerworld-api.vercel.app/flowers/${flowerID}/`)
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

    function isLoggedIn() {
        return (
            localStorage.getItem("token") !== null &&
            localStorage.getItem("user_id") !== null
        );
    }

    modalBody.innerHTML = `
    <div class="card shadow-lg border-0 position-relative">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center bg-light rounded-start">
                <img src="${flower.image_url
        }" class="img-fluid rounded-3" alt="${flower.flower_name
        }" style="height: 150px; width:400px;">
            </div>
            <div class="col-md-8">
                <div class="card-body p-4">
                    <h4 class="card-title text-primary mb-3">${flower.flower_name
        }</h4>
                    <p class="card-text mb-2">
                        <span class="badge bg-success text-white fs-5">$${flower.price
        }</span>
                    </p>
                    <p class="card-text mb-2">
                        <span class="badge bg-secondary">${flower.category ? flower.category.name : "No Category"
        }</span>
                    </p>
                    <p class="text-muted mb-4"><strong>Description:</strong> ${flower.description.slice(
            0,
            180
        )}...</p>
                    <div class="d-flex justify-content-between">
                        ${isLoggedIn()
            ? `
                        <button class="btn border border-secondary rounded-pill px-3 add-to-cart-btn" 
                                data-flower-id="${flower.id}">
                            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                        </button>`
            : `<p class="text-muted">Log in to purchase</p>`
        }
                        <button class="btn btn-outline-info btn-sm px-4 py-2" onclick="location.href='flower_details.html?flowerId=${flower.id
        }'">More Info</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    if (isLoggedIn()) {
        const cartApiUrl = "https://flowerworld-api.vercel.app/orders/carts/";
        async function handleAddToCart(flowerId) {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to add items to the cart.");
                return;
            }
            try {
                const headers = {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                };
                const cartResponse = await fetch(cartApiUrl, { headers });
                if (!cartResponse.ok) {
                    throw new Error(
                        "Failed to retrieve cart. Status: " + cartResponse.statusText
                    );
                }
                const carts = await cartResponse.json();
                let cart = carts.find((c) => c.is_active);
                if (!cart) {
                    const createResponse = await fetch(cartApiUrl, {
                        method: "POST",
                        headers,
                        body: JSON.stringify({}),
                    });
                    if (!createResponse.ok) {
                        throw new Error(
                            "Failed to create cart. Status: " + createResponse.statusText
                        );
                    }
                    cart = await createResponse.json();
                }
                const addItemUrl = `${cartApiUrl}${cart.id}/items/`;
                const addItemResponse = await fetch(addItemUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ flower_id: flowerId }),
                });
                if (!addItemResponse.ok) {
                    throw new Error(
                        "Failed to add item to cart. Status: " + addItemResponse.statusText
                    );
                }
                alert("Item added to cart successfully.");
            } catch (error) {
                console.error("Error adding item to cart:", error);
                alert("An error occurred: " + error.message);
            }
        }

        modalBody.addEventListener("click", (event) => {
            if (event.target.closest(".add-to-cart-btn")) {
                const flowerId = event.target
                    .closest(".add-to-cart-btn")
                    .getAttribute("data-flower-id");
                handleAddToCart(flowerId);
            }
        });
    }
    const flowerDetailsModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
    );
    flowerDetailsModal.show();
};