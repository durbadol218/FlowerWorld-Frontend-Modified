document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flowerworld-api.vercel.app/flowers/";
    const categoryApiUrl = "https://flowerworld-api.vercel.app/categories/";
    const cartApiUrl = "https://flowerworld-api.vercel.app/orders/carts/";
    const ordersApiUrl = "https://flowerworld-api.vercel.app/orders/orders/";

    const flowerContainer = document.getElementById("flower-container");
    const categorySelect = document.getElementById("category-select");
    const searchInput = document.getElementById("modal-flower-search");
    const applyFiltersButton = document.getElementById("apply-filters");
    const ordersContainer = document.getElementById("orders-container");

    async function loadCategories() {
        try {
            const response = await fetch(categoryApiUrl);
            const categories = await response.json();
            categorySelect.innerHTML = '<option value="">All Categories</option>';
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

    async function loadFlowers(categoryId = "", searchTerm = "") {
        try {
            flowerContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2 text-success">Loading flowers...</p>
                </div>
            `;

            let url = categoryId ? `${apiUrl}category/${categoryId}/` : apiUrl;
            const response = await fetch(url);
            const flowers = await response.json();
            let filteredFlowers = flowers;
            if (searchTerm) {
                filteredFlowers = flowers.filter(flower =>
                    flower.flower_name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            const displayedFlowers = filteredFlowers.slice(0, 8);
            if (displayedFlowers.length === 0) {
                flowerContainer.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <p class="text-muted">No flowers found matching your criteria.</p>
                    </div>
                `;
                return;
            }

            flowerContainer.innerHTML = displayedFlowers.map(flower => `
                <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                    <div class="rounded position-relative fruite-item d-flex flex-column h-100">
                        <div class="fruite-img position-relative">
                            <img src="${flower.image_url}" 
                                 class="flower-image img-fluid w-100 rounded-top" 
                                 alt="${flower.flower_name}" 
                                 onerror="this.src='fallback-image.jpg'">
                            <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" 
                                 style="top: 10px; left: 10px;">
                                ${flower.category?.name || "No Category"}
                            </div>
                        </div>
                        <div class="p-4 border-top-0 rounded-bottom d-flex flex-column flex-grow-1">
                            <h4>${flower.flower_name}</h4>
                            <p class="flex-grow-1">${flower.description.slice(0, 100)}...</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <p class="text-dark fs-5 fw-bold mb-0">৳${flower.price}</p>
                                <div>
                                    <button class="btn btn-sm px-3 py-1 more-info-btn" 
                                            onclick="location.href='flower_details.html?flowerId=${flower.id}'">
                                        More Info</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join("");
            attachAddToCartListeners();
        } catch (error) {
            console.error("Error fetching flowers:", error);
            flowerContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="alert alert-danger">
                        Failed to load flowers. Please try again later.
                    </div>
                </div>
            `;
        }
    }

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
            if (!cartResponse.ok) throw new Error("Failed to retrieve cart");
            
            let cart = (await cartResponse.json()).find(c => c.is_active);
            if (!cart) {
                const createResponse = await fetch(cartApiUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({}),
                });
                if (!createResponse.ok) throw new Error("Failed to create cart");
                cart = await createResponse.json();
            }
            const addItemResponse = await fetch(`${cartApiUrl}${cart.id}/items/`, {
                method: "POST",
                headers,
                body: JSON.stringify({ flower_id: flowerId }),
            });
            if (!addItemResponse.ok) throw new Error("Failed to add item to cart");

            const toast = createToast("Item added to cart successfully!", "success");
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);

        } catch (error) {
            console.error("Error adding item to cart:", error);
            const toast = createToast(`Error: ${error.message}`, "danger");
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }

    function attachAddToCartListeners() {
        document.querySelectorAll(".add-to-cart-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const flowerId = button.getAttribute("data-flower-id");
                handleAddToCart(flowerId);
            });
        });
    }

    function loadOrders() {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            showLoginPrompt();
            return;
        }

        fetch(ordersApiUrl, {
            method: "GET",
            headers: { Authorization: `Token ${token}` },
        })
        .then(response => response.json())
        .then(orders => {
            const userOrders = orders.filter(order => String(order.user) === String(userId));
            
            if (userOrders.length === 0) {
                ordersContainer.innerHTML = `
                    <div class="text-center py-5">
                        <img src="./image/undraw_empty_cart_co35.svg" 
                             alt="No orders" 
                             style="height: 200px; width: 100%; max-width: 400px;">
                        <p class="mt-3 text-muted">No orders found</p>
                    </div>
                `;
                return;
            }

            ordersContainer.innerHTML = `
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userOrders.map(order => `
                                <tr>
                                    <td>${order.id}</td>
                                    <td>${order.items.map(i => `${i.flower_name} (${i.quantity})`).join(", ")}</td>
                                    <td>$${order.total_amount}</td>
                                    <td>
                                        <span class="badge ${getStatusBadgeClass(order.status)}">
                                            ${order.status}
                                        </span>
                                    </td>
                                    <td>${new Date(order.placed_time).toLocaleDateString()}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error loading orders:", error);
            ordersContainer.innerHTML = `
                <div class="alert alert-danger">
                    Failed to load orders. Please try again.
                </div>
            `;
        });
    }

    function showLoginPrompt() {
        ordersContainer.innerHTML = `
            <div class="alert alert-warning">
                Please <a href="../login.html" class="alert-link">login</a> to view your orders.
            </div>
        `;
    }

    function showFlowerDetails(flowerId) {
        fetch(`${apiUrl}${flowerId}/`)
            .then(res => res.json())
            .then(flower => {
                const modalBody = document.getElementById("singleFlowerbody");
                const isLoggedIn = localStorage.getItem("token") !== null;

                modalBody.innerHTML = `
                    <div class="card border-0">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <img src="${flower.image_url}" 
                                     class="img-fluid rounded-start h-100 object-fit-cover" 
                                     alt="${flower.flower_name}">
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <h3 class="card-title">${flower.flower_name}</h3>
                                    <p class="text-muted">${flower.category?.name || "No Category"}</p>
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="fs-4 fw-bold text-primary me-3">$${flower.price}</span>
                                        ${isLoggedIn ? `
                                        <button class="btn btn-primary add-to-cart-btn" 
                                                data-flower-id="${flower.id}">
                                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                                        </button>
                                        ` : `
                                        <button class="btn btn-outline-secondary" disabled>
                                            Login to Purchase
                                        </button>
                                        `}
                                    </div>
                                    <p class="card-text">${flower.description}</p>
                                    <div class="d-flex gap-2 mt-4">
                                        <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <a href="flower_details.html?flowerId=${flower.id}" 
                                           class="btn btn-primary">
                                            More Info
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                if (isLoggedIn) {
                    modalBody.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
                        handleAddToCart(flower.id);
                    });
                }
                new bootstrap.Modal(document.getElementById("exampleModal")).show();
            })
            .catch(error => {
                console.error("Error loading flower details:", error);
                alert("Failed to load flower details");
            });
    }
    function createToast(message, type) {
        const toast = document.createElement("div");
        toast.className = `position-fixed bottom-0 end-0 p-3`;
        toast.innerHTML = `
            <div class="toast show align-items-center text-white bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                            data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        return toast;
    }

    function getStatusBadgeClass(status) {
        switch(status.toLowerCase()) {
            case 'completed': return 'bg-success';
            case 'pending': return 'bg-warning';
            case 'cancelled': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }
    categorySelect.addEventListener("change", () => {
        loadFlowers(categorySelect.value, searchInput.value);
    });
    applyFiltersButton.addEventListener("click", () => {
        loadFlowers(categorySelect.value, searchInput.value);
    });
    loadCategories();
    loadFlowers();
    if (ordersContainer) loadOrders();
    window.showFlowerDetails = showFlowerDetails;
});