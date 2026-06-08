# 📢 Notice Board Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for creating, managing, and sharing notices with authentication and authorization features.

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based login and registration
- 📝 **Notice Management** - Create, read, update, and delete notices
- 👥 **Role-Based Access** - Admin and user roles with different permissions
- 🔒 **Password Security** - bcryptjs encryption for user passwords
- 📱 **Responsive UI** - Mobile-friendly React interface with Vite
- 🐳 **Docker Support** - Easy deployment with Docker Compose

## 🏗️ Project Structure

```
notice_proj/
├── backend/                 # Node.js Express API server
│   ├── controllers/         # Route handlers
│   ├── models/              # MongoDB schemas
│   ├── middleware/          # Auth & validation middleware
│   ├── routes/              # API endpoints
│   ├── db.js                # Database connection
│   ├── server.js            # Express server setup
│   ├── package.json         # Dependencies
│   └── Dockerfile           # Docker configuration
│
├── frontend/                # React Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Helper functions & API calls
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   └── Dockerfile           # Docker configuration
│
├── docker-compose.yml       # Docker services orchestration
└── README.md                # This file
```

## 🛠️ Tech Stack

### Frontend
- **React** v19.2.0 - UI library
- **Vite** - Lightning-fast build tool
- **JavaScript ES6+** - Modern JavaScript
- **CSS3** - Styling
- **ESLint** - Code quality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** v5.1.0 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** v8.19.3 - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v14+) and **npm**
- **MongoDB** (local or Atlas)
- **Docker** & **Docker Compose** (optional, for containerized setup)

## 🚀 Quick Start

### Option 1: Local Development

#### 1. Clone and Install Dependencies
```bash
# Backend setup
cd backend
npm install

# Frontend setup (in another terminal)
cd frontend
npm install
```

#### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=mongodb://localhost:27017/notice_proj
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

#### 3. Start the Application

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Option 2: Docker Compose

```bash
# Start all services
docker-compose up

# Stop services
docker-compose down
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "role": "user",
  "userId": "user_id_here"
}
```

### Notice Endpoints

#### Get All Notices
```
GET /api/notices
Headers: Authorization: Bearer {token}
```

#### Create Notice
```
POST /api/notices
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Notice Title",
  "description": "Notice description",
  "date": "2024-06-08"
}
```

#### Update Notice
```
PUT /api/notices/{id}
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Notice
```
DELETE /api/notices/{id}
Headers: Authorization: Bearer {token}
```

For detailed API testing, refer to [backend/POSTMAN_GUIDE.md](backend/POSTMAN_GUIDE.md).

## 📖 Documentation

- **Backend Setup**: See [backend/README.md](backend/README.md)
- **Frontend Setup**: See [frontend/README.md](frontend/README.md)
- **Quick Start Guide**: See [backend/QUICK_START.js](backend/QUICK_START.js)
- **API Testing**: See [backend/POSTMAN_GUIDE.md](backend/POSTMAN_GUIDE.md)
- **Code Review**: See [backend/CODE_REVIEW.md](backend/CODE_REVIEW.md)

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

Or use Postman with the provided collection:
```bash
npm run postman
```

## 🐛 Known Issues & Fixes

See [backend/CORRECTIONS.md](backend/CORRECTIONS.md) for a list of fixed issues and improvements.

## 📝 Environment Variables

### Backend (.env)
```env
# Database
MONGO_URI=mongodb://localhost:27017/notice_proj

# JWT
JWT_SECRET=your_jwt_secret_key

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Support

For issues, questions, or suggestions, please open an issue in the repository.

## 🎯 Roadmap

- [ ] Email notifications for new notices
- [ ] Notice categories and tags
- [ ] Comment system
- [ ] Advanced search and filtering
- [ ] User profile management
- [ ] Notice scheduling
- [ ] File attachments

---

**Happy coding! 🚀**
