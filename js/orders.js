document.addEventListener("DOMContentLoaded", () => {
    const ordersApiUrl = "https://flowerworld-api.vercel.app/orders/orders/";
    const ordersContainer = document.getElementById("orders-container");

    function getStatusBadgeClass(status) {
        switch(status.toLowerCase()) {
            case 'completed': return 'bg-success';
            case 'pending': return 'bg-warning';
            case 'cancelled': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    function showLoginPrompt() {
        ordersContainer.innerHTML = `
            <div class="alert alert-warning">
                Please <a href="../login.html" class="alert-link">login</a> to view your orders.
            </div>
        `;
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
                                    <td>৳${order.total_amount}</td>
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

    if (ordersContainer) {
        loadOrders();
    } else {
        console.warn("No #orders-container found. Make sure you're on the correct page.");
    }
});
