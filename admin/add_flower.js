document.addEventListener('DOMContentLoaded', function() {
    populateCategories();
});

function populateCategories() {
    const categoriesUrl = 'https://flowerworld-modified.onrender.com/categories/';

    fetch(categoriesUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Categories:', data);  // Add this line to check the fetched categories
        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '';
        data.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching categories:', error));
}


document.getElementById('addFlowerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const flowerName = document.getElementById('flower_name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').files[0];
    console.log('Form Data:', {
        flowerName,
        description,
        price,
        stock,
        category,
        image
    });
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append('flower_name', flowerName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    if (image) formData.append('image', image);

    const addFlowerUrl = 'https://flowerworld-modified.onrender.com/flowers/';

    fetch(addFlowerUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => { throw new Error(err.detail); });
    })
    .then(data => {
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';

        document.getElementById('flower_name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('category').value = '';
        document.getElementById('image').value = '';
    })
    .catch(error => {
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
        console.error('Error:', error);
    });
});

