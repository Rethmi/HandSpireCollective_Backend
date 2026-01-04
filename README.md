 🖥️ Hand_Spire_Collective – Backend API

 📌 Project Overview

The **Hand_Spire_Collective Backend** is a RESTful API developed to support the frontend of the Hand_Spire_Collective web application. It handles **authentication**, **authorization**, **business logic**, and **database operations**, ensuring secure and efficient data management.

This backend was developed as part of an **academic / software development project**, following REST principles and clean architecture practices.

 
 ⚙️ Technologies & Tools Used

 🧩 Backend Stack

* 🟢 **Node.js**
* 🚀 **Express.js**
* 🍃 **MongoDB**
* 📦 **Mongoose**
* 🔐 **JWT (JSON Web Token)** Authentication
* ☁️ **Cloudinary** (Image Uploads)

  🧰 Development Tools

* 💻 **VS Code**
* 🧪 **Postman** (API Testing)
* 🗂️ **Git & GitHub**
* 🌍 **MongoDB Atlas**
* 🚀 **Vercel** (Frontend,Backend Deployment)

 

  📂 Project Structure
 
backend/
│── config/
│   ├── db.js
│   ├── cloudinary.js
│
│── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   ├── projectController.js
│   ├── userController.js
│
│── models/
│   ├── User.js
│   ├── Category.js
│   ├── Project.js
│
│── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── projectRoutes.js
│   ├── userRoutes.js
│
│── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│
│── .env
│── server.js
│── package.json
 

 

  🔐 Authentication & Authorization

* User Registration & Login using **JWT**
* Role-based access control (**Admin / User**)
* Protected routes using middleware

 
  📡 API Endpoints (Overview)

  🔑 Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | User login        |

  📂 Categories

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | `/api/categories`     | Get all categories      |
| POST   | `/api/categories`     | Create category (Admin) |
| PUT    | `/api/categories/:id` | Update category         |
| DELETE | `/api/categories/:id` | Delete category         |

  🎨 Projects

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/projects`     | Get all projects  |
| POST   | `/api/projects`     | Add new project   |
| GET    | `/api/projects/:id` | Get project by ID |
| PUT    | `/api/projects/:id` | Update project    |
| DELETE | `/api/projects/:id` | Delete project    |

  👥 Users (Admin)

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/users`     | Get all users |
| DELETE | `/api/users/:id` | Delete user   |

 

  ⚙️ Setup & Run Instructions
🔹 Backend Setup

1. Clone the repository
	git clone https://github.com/Rethmi/HandSpireCollective_Backend.git
 
2. Install dependencies
	npm install

 
3. Configure environment variables (`.env`)


4. Run the backend server
	npm run dev
 

Backend will run on:
 	http://localhost:5000
 

🔹 Frontend Setup

1. Clone the frontend repository
	https://github.com/Rethmi/HandSpireCollective_Frontend.git
 

2. Install dependencies
	npm install
	

3. Start the development server
	npm run dev
 

Frontend will run on:
	http://localhost:5173
 

🌍 Deployed URLs

	Frontend: hand-spire-collective-frontend.vercel.app
	Backend : hand-spire-collective-backend.vercel.app
 


  🧪 API Testing

* Use **Postman** to test endpoints
* Include JWT token in `Authorization` header for protected routes

 

 
  👩‍💻 Author

**Sainsa Rethmi Thennakoon**
 
