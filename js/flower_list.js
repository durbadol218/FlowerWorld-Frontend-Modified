document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flower-world.vercel.app/flowers/";
    const flowerContainer = document.getElementById("flower-container");

    async function loadAllFlowers() {
        try {
            const response = await fetch(apiUrl);
            const flowers = await response.json();

            flowerContainer.innerHTML = flowers.map(flower => `
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
                        <div class="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column flex-grow-1">
                            <h4>${flower.flower_name}</h4>
                            <p class="flex-grow-1">${flower.description.slice(0, 100)}...</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <p class="text-dark fs-5 fw-bold mb-0">$${flower.price}</p>
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
        } catch (error) {
            console.error("Error loading all flowers:", error);
        }
    }
    loadAllFlowers();
});
