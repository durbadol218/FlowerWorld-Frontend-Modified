document.getElementById('addCategoryForm').addEventListener('submit', function(e){
  e.preventDefault();
  const categoryName = document.getElementById('add_category').value;
  const addCategoryUrl = 'https://flowerworld-api.vercel.app/categories/';
  const token = localStorage.getItem("token");
  fetch(addCategoryUrl, {
    method:'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      name:categoryName
    }),
  })
  .then(res => {
    if(res.ok){
      return res.json();
    }
    throw new Error('Failed to add category');
  })
  .then(data => {
    document.getElementById('success-message').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';
      document.getElementById('add_category').value = '';
    })
    .catch(error => {
      document.getElementById('success-message').style.display = 'none';
      document.getElementById('error-message').style.display = 'block';
      console.error('Error:', error);
    });
});