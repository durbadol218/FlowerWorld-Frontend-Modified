# 🌸 FlowerWorld

**FlowerWorld** is a full-featured eCommerce web application where users can browse and purchase flowers, and administrators can manage orders and product listings. It supports user authentication, order management, category filtering, dynamic user dashboards, and email notifications.

---

## 🔍 Overview

FlowerWorld is designed to provide a smooth floral shopping experience with modern UI, responsive design, and real-time interactions. Users can explore flowers by category, view details, place orders, and track order status. Admins can manage flowers, users, and monitor business performance via the dashboard.

---

## 🚀 Core Features

### 👤 User Side:
- ✅ User Registration and Login (Token-based)
- 🔐 Email verification after registration
- 🌸 Browse flowers with images, description, and price
- 🛒 One-click “Buy Now” ordering system
- 📦 View order history and current order status
- 📂 Filter flowers by category
- 📬 Receive confirmation email after placing an order
- ✍️ Newsletter subscription
- 📝 Read latest blog posts

### 🛠️ Admin Side:
- 🧑‍💼 Admin login with role-based access
- 📋 View all orders and change status (Pending ➝ Completed)
- 📨 Send email to user on order status change
- 🏷️ Add, update, delete flower listings
- 📊 Dashboard with order and product stats
- 📈 View customer testimonials and feedback

---

## 🧑‍💻 Technologies Used

### 👨‍🏫 Frontend
- **HTML5**, **CSS3**, **JavaScript (ES6)**
- **Bootstrap 5**
- **Owl Carousel**, **FontAwesome**, **Google Fonts**

### 🖥 Backend (API)
- **Django** + **Django REST Framework**
- **JWT Authentication**
- **SMTP Email Handling (via `EmailMultiAlternatives`)**
- **Model-based User Roles (`UserAccount` with `account_type`)**

### 📦 Other Tools
- **PostgreSQL** (or SQLite)
- **Vercel** for frontend deployment
- **Vercel** for backend hosting
- **Imgbb** usef for flower images

---

## 📁 Project Structure

```
flowerworld/
├── backend/
│   ├── api/
│   ├── users/
│   ├── flowers/
│   ├── orders/
│   └── templates/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── admin/
│   └── assets/
└── README.md
```

---

## ⚙️ Installation & Setup

### ▶️ Backend Setup
```bash
git clone https://github.com/durbadol218/FlowerWorld-New
cd flowerworld/backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### ▶️ Frontend Setup
Just open `index.html` in your browser or deploy to [Vercel](https://vercel.com).

> 💡 You can configure `.env` or settings.py for your own API keys and email credentials.

---

## 🔐 Authentication Info

- Register at `/user/register/`
- Login at `/user/login/` (returns JWT token)
- Access protected endpoints using:
  ```
  Authorization: Bearer <your_token>
  ```

---

## 🖼 Screenshots

> *(Replace these with actual images)*

| Home Page | Order Page | Admin Dashboard |
|-----------|------------|------------------|
| ![Home](screenshots/flowerWorld_frontend_home.png) | ![Order](screenshots/flowerWorld_frontend_orders.png) | ![Admin](screenshots/flowerWorld_frontend_admin_home.png) |

---

## 💌 Contact

**Project Owner:** Durbadol Goswami  
📧 Email: goswamidurbadol@gmail.com  
🌐 Portfolio: https://responsive-portfolio-blond.vercel.app/  
🔗 GitHub: https://github.com/durbadol218

---



Backend Link: https://flowerworld-api.vercel.app/
Fronted Link: https://flower-world-modified.vercel.app/


## 📃 License

This project is licensed under the MIT License. Feel free to use and customize as needed.

