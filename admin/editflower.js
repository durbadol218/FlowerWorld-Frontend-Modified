document.addEventListener("DOMContentLoaded", () => {
    const flowerId = new URLSearchParams(window.location.search).get('Id');

    if (!flowerId) {
        console.error('No flower ID found in the URL');
        return;
    }
    fetch(`https://flowerworld-api.vercel.app/flowers/${flowerId}/`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching flower data: ${response.status}`);
            }
            return res.json();
        })
        .then(flower => {
            console.log('Fetched Flower Data:', flower);
            document.getElementById('flower_name').value = flower.flower_name || '';
            document.getElementById('price').value = flower.price || '';
            document.getElementById('stock').value = flower.stock || '';
            document.getElementById('description').value = flower.description || '';
            const categorySelect = document.getElementById('category');
            const categoryOption = new Option(flower.category.name, flower.category.id, true, true);
            categorySelect.add(categoryOption);
            document.getElementById('image').value = '';
        })
        .catch(error => {
            console.error('Error fetching flower data:', error);
        });

    document.getElementById('editFlowerForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('flower_name', document.getElementById('flower_name').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('stock', document.getElementById('stock').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('category', document.getElementById('category').value);

        const imageFile = document.getElementById('image').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        console.log('Form Data:', formData);

        fetch(`https://flowerworld-api.vercel.app/flowers/${flowerId}/`, {
            method: 'PATCH',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    console.error('Error updating flower:', response.status, text);
                    throw new Error('Failed to update flower.');
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Flower updated successfully');
            window.location.href = 'all_flowers.html';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Failed to update flower. Please try again later.');
        });
    });
});


