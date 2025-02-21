// document.addEventListener('DOMContentLoaded', function() {
//     populateCategories();
// });

// function populateCategories() {
//     const categoriesUrl = 'https://flower-world.vercel.app/categories/';

//     fetch(categoriesUrl, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem("token")}`,
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Categories:', data);
//         const categorySelect = document.getElementById('category');
//         categorySelect.innerHTML = '';
//         data.forEach(category => {
//             const option = document.createElement('option');
//             option.value = category.id;
//             option.textContent = category.name;
//             categorySelect.appendChild(option);
//         });
//     })
//     .catch(error => console.error('Error fetching categories:', error));
// }


// document.getElementById('addFlowerForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const flowerName = document.getElementById('flower_name').value;
//     const description = document.getElementById('description').value;
//     const price = document.getElementById('price').value;
//     const stock = document.getElementById('stock').value;
//     const category = document.getElementById('category').value;
//     const image = document.getElementById('image').files[0];
//     console.log('Form Data:', {
//         flowerName,
//         description,
//         price,
//         stock,
//         category,
//         image
//     });
//     const token = localStorage.getItem("token");

//     const formData = new FormData();
//     formData.append('flower_name', flowerName);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('stock', stock);
//     formData.append('category', category);
//     if (image) formData.append('image', image);

//     const addFlowerUrl = 'https://flower-world.vercel.app/flowers/';

//     fetch(addFlowerUrl, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         },
//         body: formData
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         return response.json().then(err => { throw new Error(err.detail); });
//     })
//     .then(data => {
//         document.getElementById('success-message').style.display = 'block';
//         document.getElementById('error-message').style.display = 'none';

//         document.getElementById('flower_name').value = '';
//         document.getElementById('description').value = '';
//         document.getElementById('price').value = '';
//         document.getElementById('stock').value = '';
//         document.getElementById('category').value = '';
//         document.getElementById('image').value = '';
//     })
//     .catch(error => {
//         document.getElementById('success-message').style.display = 'none';
//         document.getElementById('error-message').style.display = 'block';
//         console.error('Error:', error);
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    populateCategories();
});

function populateCategories() {
    const categoriesUrl = 'https://flower-world.vercel.app/categories/';
    // const categoriesUrl = 'http://127.0.0.1:8000/categories/';

    fetch(categoriesUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Categories:', data);
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

document.getElementById('addFlowerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const flowerName = document.getElementById('flower_name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const imageFile = document.getElementById('image').files[0];

    console.log('Form Data:', {
        flowerName,
        description,
        price,
        stock,
        category,
        imageFile
    });

    const token = localStorage.getItem("token");

    let imageUrl = '';

    //upload to ImgBB
    if (imageFile) {
        const imgFormData = new FormData();
        imgFormData.append('image', imageFile);

        try {
            const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=f70cca306429fe4e2b2dd26a61bbfe3f', {
                method: 'POST',
                body: imgFormData
            });

            const imgbbData = await imgbbResponse.json();
            if (imgbbData.status === 200) {
                imageUrl = imgbbData.data.url;
            } else {
                alert('Image upload to ImgBB failed!');
                return;
            }
        } catch (error) {
            console.error('Error uploading to ImgBB:', error);
            alert('Error uploading image.');
            return;
        }
    }

    const flowerData = {
        flower_name: flowerName,
        description: description,
        price: price,
        stock: stock,
        category: category,
        image_url: imageUrl
    };

    const addFlowerUrl = 'https://flower-world.vercel.app/flowers/';
    // const addFlowerUrl = 'http://127.0.0.1:8000/flowers/';

    fetch(addFlowerUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(flowerData)
    })
    .then(response => response.json())
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
