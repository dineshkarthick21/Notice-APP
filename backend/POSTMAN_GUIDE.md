# Postman API Testing Guide

## 📥 Import Collection

1. Open Postman
2. Click **Import** (top-left)
3. Select the file: `postman-collection.json`
4. Click **Import**

## 🚀 Quick Start

### Step 1: Start the Backend Server
```bash
cd backend
npm start
# or
node server.js
```

Server should run on `http://localhost:5000`

### Step 2: Register Users

**Signup as Admin:**
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/signup`
- **Body**:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

**Signup as Regular User:**
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/signup`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Step 3: Login & Get Token

**Login as Admin:**
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/login`
- **Body**:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response** (copy the `token`):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "admin",
  "userId": "507f1f77bcf86cd799439011"
}
```

### Step 4: Use Token in Requests

In Postman collection, update the `{{adminToken}}` variable:
1. Click **Variables** tab
2. Set `adminToken` to the token from login response
3. Or manually add header: `Authorization: Bearer <token>`

### Step 5: Test CRUD Operations

#### Create Notice (Admin)
- **Method**: POST
- **URL**: `http://localhost:5000/api/notices`
- **Headers**: 
  - `Authorization: Bearer {{adminToken}}`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "title": "Annual Holidays",
  "date": "2025-12-25",
  "type": "leave"
}
```

Save the `notice._id` as `{{noticeId}}`

#### Get All Notices (Public)
- **Method**: GET
- **URL**: `http://localhost:5000/api/notices`

#### Get Notice by ID (Public)
- **Method**: GET
- **URL**: `http://localhost:5000/api/notices/{{noticeId}}`

#### Update Notice (Admin)
- **Method**: PUT
- **URL**: `http://localhost:5000/api/notices/{{noticeId}}`
- **Headers**: `Authorization: Bearer {{adminToken}}`
- **Body**:
```json
{
  "title": "Updated Holiday Notice",
  "date": "2025-12-26",
  "type": "leave"
}
```

#### Delete Notice (Admin)
- **Method**: DELETE
- **URL**: `http://localhost:5000/api/notices/{{noticeId}}`
- **Headers**: `Authorization: Bearer {{adminToken}}`

## ✅ Expected Responses

### Success Responses

**Signup**:
```json
{
  "message": "User registered successfully"
}
```

**Login**:
```json
{
  "message": "Login successful",
  "token": "...",
  "role": "admin",
  "userId": "..."
}
```

**Create Notice**:
```json
{
  "message": "Notice created",
  "notice": {
    "_id": "...",
    "title": "Annual Holidays",
    "date": "2025-12-25T00:00:00.000Z",
    "type": "leave",
    "createdBy": "...",
    "timestamps": {}
  }
}
```

### Error Responses

**Unauthorized (No Token)**:
```json
{
  "message": "No token provided"
}
```

**Forbidden (Not Admin)**:
```json
{
  "message": "Admins only"
}
```

**Not Found**:
```json
{
  "message": "Notice not found"
}
```

## 🔒 Authentication Details

- **Token Type**: JWT (JSON Web Token)
- **Expiration**: 1 hour
- **Secret**: Stored in `.env` as `JWT_SECRET`
- **Format**: `Bearer <token>`

## 🐛 Troubleshooting

### "Cannot connect to localhost:5000"
- Ensure server is running
- Check port 5000 is not in use
- Verify MongoDB is running

### "Invalid or expired token"
- Get a new token from login endpoint
- Copy exact token (no extra spaces)
- Check token hasn't expired (1 hour limit)

### "Admins only"
- Ensure you logged in as admin
- Use admin token in Authorization header
- Verify user role is 'admin'

## 📦 Files

- `postman-collection.json` - Postman collection (import this)
- `CORRECTIONS.md` - Code fixes documentation
- `server.js` - Express server
- `db.js` - MongoDB connection
- `routes/` - API route definitions
- `controllers/` - Route handlers
- `models/` - MongoDB schemas
- `middleware/` - JWT authentication

## 🎯 Next Steps

1. Import `postman-collection.json` into Postman
2. Start backend server
3. Test endpoints in order (signup → login → CRUD)
4. Use the `{{adminToken}}` variable for protected routes
