// document.addEventListener("DOMContentLoaded", () => {
//     const flowerId = new URLSearchParams(window.location.search).get('Id');

//     if (!flowerId) {
//         console.error('No flower ID found in the URL');
//         return;
//     }

//     // Fetch existing flower data
//     fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error fetching flower data: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(flower => {
//             document.getElementById('flower_name').value = flower.flower_name || '';
//             document.getElementById('price').value = flower.price || '';
//             document.getElementById('stock').value = flower.stock || '';
//             document.getElementById('description').value = flower.description || '';
//             document.getElementById('category').value = flower.category || ''; // Adjust according to the actual data structure
//             document.getElementById('image').value = flower.image || ''; // Adjust if using a file input
//         })
//         .catch(error => {
//             console.error('Error fetching flower data:', error);
//         });

//     // Handle form submission
//     document.getElementById('editFlowerForm').addEventListener('submit', (event) => {
//         event.preventDefault();

//         const formData = new FormData(event.target);

//         // Create a flower data object
//         const flowerData = {
//             flower_name: formData.get('flower_name'),
//             price: formData.get('price'),
//             stock: formData.get('stock'),
//             description: formData.get('description'),
//             category: formData.get('category'),
//             image: formData.get('image') // This may need to be handled differently if it's a file
//         };

//         fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(flowerData),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     return response.text().then(text => {
//                         console.error('Error updating flower:', response.status, text);
//                         throw new Error('Failed to update flower.');
//                     });
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 alert('Flower updated successfully');
//                 window.location.href = 'all_flowers.html'; // Redirect to the flowers list page
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert('Failed to update flower. Please try again later.');
//             });
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//     const flowerId = new URLSearchParams(window.location.search).get('Id');

//     if (!flowerId) {
//         console.error('No flower ID found in the URL');
//         return;
//     }

//     // Fetch existing flower data
//     fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error fetching flower data: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(flower => {
//             document.getElementById('flower_name').value = flower.flower_name;
//             document.getElementById('price').value = flower.price;
//             document.getElementById('stock').value = flower.stock;
//             document.getElementById('description').value = flower.description;
//             document.getElementById('category').value = flower.category.name; // Adjust if necessary
//             document.getElementById('image').value = flower.image; // Handle image if needed
//         })
//         .catch(error => {
//             console.error('Error fetching flower data:', error);
//         });

//     // Handle form submission
//     document.getElementById('editFlowerForm').addEventListener('submit', (event) => {
//         event.preventDefault();

//         // Collect form data
//         const formData = new FormData(event.target);
//         const flowerData = {
//             flower_name: formData.get('flower_name'),
//             price: formData.get('price'),
//             stock: formData.get('stock'),
//             description: formData.get('description'),
//             category: formData.get('category'),
//             image: formData.get('image') // Handle image if needed
//         };

//         // Log the form data to debug
//         console.log('Form Data:', flowerData);

//         // Perform PATCH request to update the flower
//         fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(flowerData),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     return response.text().then(text => {
//                         console.error('Error updating flower:', response.status, text);
//                         throw new Error('Failed to update flower.');
//                     });
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 alert('Flower updated successfully');
//                 window.location.href = 'all_flowers.html'; // Redirect to the flowers list page
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert('Failed to update flower. Please try again later.');
//             });
//     });
// });


//Prefinal
// document.addEventListener("DOMContentLoaded", () => {
//     const flowerId = new URLSearchParams(window.location.search).get('Id');

//     if (!flowerId) {
//         console.error('No flower ID found in the URL');
//         return;
//     }

//     // Fetch existing flower data
//     fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error fetching flower data: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(flower => {
//             console.log('Fetched Flower Data:', flower); // Log data for debugging
            
//             document.getElementById('flower_name').value = flower.flower_name || '';
//             document.getElementById('price').value = flower.price || '';
//             document.getElementById('stock').value = flower.stock || '';
//             document.getElementById('description').value = flower.description || '';
//             // Assuming category is an object with a 'name' field. Adjust if needed.
//             document.getElementById('category').value = flower.category?.name || '';
//             document.getElementById('image').value = flower.image || '';
//         })
//         .catch(error => {
//             console.error('Error fetching flower data:', error);
//         });

//     // Handle form submission
//     document.getElementById('editFlowerForm').addEventListener('submit', (event) => {
//         event.preventDefault();

//         const formData = new FormData(event.target);
//         const flowerData = {
//             flower_name: formData.get('flower_name'),
//             price: formData.get('price'),
//             stock: formData.get('stock'),
//             description: formData.get('description'),
//             category: formData.get('category'),
//             image: formData.get('image')
//         };

//         console.log('Form Data:', flowerData); // Log form data for debugging

//         fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(flowerData),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     return response.text().then(text => {
//                         console.error('Error updating flower:', response.status, text);
//                         throw new Error('Failed to update flower.');
//                     });
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 alert('Flower updated successfully');
//                 window.location.href = 'all_flowers.html'; // Redirect to the flowers list page
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert('Failed to update flower. Please try again later.');
//             });
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//     const flowerId = new URLSearchParams(window.location.search).get('Id');

//     if (!flowerId) {
//         console.error('No flower ID found in the URL');
//         return;
//     }

//     // Fetch the existing flower data and populate the form
//     fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error fetching flower data: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(flower => {
//             console.log('Fetched Flower Data:', flower); // Log the fetched data

//             document.getElementById('flower_name').value = flower.flower_name || '';
//             document.getElementById('price').value = flower.price || '';
//             document.getElementById('stock').value = flower.stock || '';
//             document.getElementById('description').value = flower.description || '';
//             document.getElementById('category').value = flower.category || ''; // Adjust this based on how category is returned
//             document.getElementById('image').value = flower.image || '';
//         })
//         .catch(error => {
//             console.error('Error fetching flower data:', error);
//         });

//     // Handle form submission for updating the flower
//     document.getElementById('editFlowerForm').addEventListener('submit', (event) => {
//         event.preventDefault();

//         const flowerData = {
//             flower_name: document.getElementById('flower_name').value,
//             price: document.getElementById('price').value,
//             stock: document.getElementById('stock').value,
//             description: document.getElementById('description').value,
//             category: document.getElementById('category').value,
//             image: document.getElementById('image').value
//         };

//         console.log('Form Data:', flowerData); // Log form data for debugging

//         fetch(`https://flowerworld.onrender.com/flowers/${flowerId}/`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(flowerData),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 return response.text().then(text => {
//                     console.error('Error updating flower:', response.status, text);
//                     throw new Error('Failed to update flower.');
//                 });
//             }
//             return response.json();
//         })
//         .then(data => {
//             alert('Flower updated successfully');
//             window.location.href = 'all_flowers.html'; // Redirect to flowers list page after success
//         })
//         .catch(error => {
//             console.error('Fetch error:', error);
//             alert('Failed to update flower. Please try again later.');
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    const flowerId = new URLSearchParams(window.location.search).get('Id');

    if (!flowerId) {
        console.error('No flower ID found in the URL');
        return;
    }
    fetch(`https://flowerworld-modified.onrender.com/flowers/${flowerId}/`)
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

        fetch(`https://flowerworld-modified.onrender.com/flowers/${flowerId}/`, {
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


