# 🚀 Node.js Backend REST API

A production-style **RESTful Backend API** built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project demonstrates the complete backend development lifecycle — from basic Express setup and CRUD operations to JWT authentication, role-based authorization, file uploads, pagination, security, rate limiting, testing, and deployment.

---

## 📌 Project Overview

The application provides a secure **User Management API** where users can:

* Register an account
* Login securely
* Receive a JWT
* Access protected routes
* Upload a profile image
* Update user information
* Search users
* Filter users
* Sort results
* Use pagination

Administrators can additionally access protected admin operations through **Role-Based Authorization**.

---

# ✨ Features

### 🧱 Backend Fundamentals

* REST API architecture
* Express.js routing
* MVC-style project structure
* MongoDB database integration
* Mongoose schemas and models
* Environment variable management

### 👤 User Management

* Create users
* Get all users
* Get user by ID
* Update user
* Partial user update
* Delete user
* Delete all users with admin authorization

### 🔐 Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT generation
* JWT verification
* Protected routes
* Current logged-in user endpoint

### 🛡️ Authorization & Security

* Role-Based Access Control
* User/Admin roles
* Helmet security headers
* CORS configuration
* Global API rate limiting
* Login-specific rate limiting
* JSON payload limits
* File size restrictions
* Input field whitelisting
* Centralized error handling

### 🔍 Advanced API Features

* Search
* Filtering
* Sorting
* Pagination
* Query parameters

### 🖼️ File Upload

* Multer
* Profile image upload
* Image type validation
* Image size validation
* Static file serving

### 🧪 Testing & Deployment

* Postman API testing
* Development/production environments
* MongoDB Atlas support
* Deployment-ready configuration

---

# 🛠️ Tech Stack

| Technology             | Purpose                    |
| ---------------------- | -------------------------- |
| **Node.js**            | JavaScript runtime         |
| **Express.js**         | Backend framework          |
| **MongoDB**            | NoSQL database             |
| **Mongoose**           | MongoDB ODM                |
| **JWT**                | Authentication             |
| **bcryptjs**           | Password hashing           |
| **Multer**             | File uploads               |
| **Helmet**             | HTTP security headers      |
| **express-rate-limit** | API rate limiting          |
| **CORS**               | Cross-origin configuration |
| **dotenv**             | Environment variables      |
| **Nodemon**            | Development server         |

---

# 🏗️ Application Architecture

```text
                         CLIENT
                    Web / Mobile / Postman
                             │
                             │ HTTP Request
                             ▼
                  ┌─────────────────────┐
                  │    Express Server   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │       Helmet        │
                  │  Security Headers   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │        CORS         │
                  │ Origin Validation   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    Rate Limiter     │
                  │   Abuse Protection  │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │       Router        │
                  └──────────┬──────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
       ┌──────────────────┐    ┌──────────────────┐
       │ Authentication   │    │      Multer      │
       │ JWT Verification │    │   File Upload    │
       └────────┬─────────┘    └────────┬─────────┘
                │                       │
                ▼                       ▼
       ┌──────────────────┐          req.file
       │  Authorization   │             │
       │   Role Checking  │             │
       └────────┬─────────┘             │
                │                       │
                └───────────┬───────────┘
                            ▼
                  ┌─────────────────────┐
                  │     Controller      │
                  │   Business Logic    │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │      Mongoose       │
                  │    Data Access      │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │       MongoDB       │
                  └──────────┬──────────┘
                             │
                             ▼
                       JSON Response
```

---

# 📂 Folder Structure

```text
backend-crud/
│
├── uploads/
│   └── profiles/
│       └── uploaded-images
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── asyncHandler.js
│   │   └── generateToken.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# 📁 Folder Responsibilities

### `config/`

Contains configuration-related logic.

```text
config/
└── db.js
```

`db.js` establishes the MongoDB connection using Mongoose.

---

### `controllers/`

Contains application business logic.

```text
controllers/
├── authController.js
└── userController.js
```

`authController.js`

Handles:

* Registration
* Login
* Password hashing
* Password verification
* Current user

`userController.js`

Handles:

* User CRUD
* Search
* Filtering
* Sorting
* Pagination
* Profile image updates

---

### `middleware/`

Contains middleware executed before controllers.

```text
middleware/
├── authMiddleware.js
├── roleMiddleware.js
├── uploadMiddleware.js
└── errorMiddleware.js
```

Responsibilities:

```text
authMiddleware
→ JWT verification

roleMiddleware
→ Authorization

uploadMiddleware
→ Multer/file handling

errorMiddleware
→ Centralized error responses
```

---

### `models/`

Contains Mongoose schemas.

```text
models/
└── User.js
```

The User schema defines fields such as:

```text
name
email
password
age
role
profileImage
createdAt
updatedAt
```

---

### `routes/`

Defines API endpoints and connects middleware/controllers.

```text
routes/
├── authRoutes.js
└── userRoutes.js
```

Example:

```js
router.post(
  "/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);
```

---

### `utils/`

Reusable helper functionality.

```text
utils/
├── AppError.js
├── asyncHandler.js
└── generateToken.js
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <repository-url>
```

Enter the project:

```bash
cd backend-crud
```

---

## 2. Install Dependencies

```bash
npm install
```

If creating the project manually:

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer helmet express-rate-limit
```

Development dependency:

```bash
npm install --save-dev nodemon
```

---

# 🔧 Environment Variables

Create:

```text
.env
```

Development configuration:

```env
PORT=5000

NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/backend_crud

JWT_SECRET=your_secure_secret

FRONTEND_URL=http://localhost:5173
```

---

## Development vs Production

During local development:

```env
NODE_ENV=development
```

Production:

```env
NODE_ENV=production
```

This allows application behavior to change based on environment.

```js
if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
}
```

Typical usage includes:

* Error logging
* Stack traces
* CORS configuration
* Debugging
* Production-specific behavior

---

# 🔒 Environment Security

Never commit:

```text
.env
```

Add to `.gitignore`:

```gitignore
node_modules/
.env
uploads/
```

Never expose:

```text
JWT_SECRET
MongoDB credentials
API keys
Passwords
```

---

# 🚀 Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Example `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Local API:

```text
http://localhost:5000
```

---

# 🗄️ MongoDB Connection

`src/config/db.js`

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;
```

---

# 👤 User Model

Example structure:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    age: {
      type: Number,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);
```

Password hashing is intentionally handled inside `authController.js` in this project rather than through Mongoose hooks.

---

# 🔐 Authentication

Authentication uses:

```text
bcrypt
+
JWT
```

## Registration Flow

```text
POST /api/auth/register
          │
          ▼
    Validate Input
          │
          ▼
    Check Email
          │
          ▼
   bcrypt.genSalt()
          │
          ▼
     bcrypt.hash()
          │
          ▼
      Create User
          │
          ▼
        MongoDB
```

Registration creates the account but does **not** automatically log the user in.

---

# 🔑 Login Flow

```text
POST /api/auth/login
          │
          ▼
      Find User
          │
          ▼
  Retrieve Password Hash
          │
          ▼
    bcrypt.compare()
          │
          ▼
     Password Valid?
       /       \
      NO       YES
      │         │
     401        ▼
          Generate JWT
               │
               ▼
          Send Token
```

Example:

```js
const isPasswordCorrect =
  await bcrypt.compare(
    password,
    user.password
  );
```

---

# 🎟️ JWT Authentication Flow

After login:

```text
Server
  │
  ▼
Generate JWT
  │
  ▼
Client receives token
  │
  ▼
Client stores token
  │
  ▼
Next protected request
```

Client sends:

```http
Authorization: Bearer <JWT_TOKEN>
```

Backend:

```text
Authorization Header
        │
        ▼
Extract JWT
        │
        ▼
jwt.verify()
        │
        ▼
decoded.userId
        │
        ▼
Find User
        │
        ▼
req.user = user
        │
        ▼
next()
```

---

# 🛡️ Authentication vs Authorization

Authentication asks:

```text
Who are you?
```

Authorization asks:

```text
What are you allowed to do?
```

Example:

```text
JWT
 ↓
Authentication
 ↓
Logged-in User
 ↓
Authorization
 ↓
Admin?
 ↓
Controller
```

---

# 👮 Role-Based Authorization

Supported roles:

```text
user
admin
```

Example protected admin route:

```js
router.delete(
  "/",
  protect,
  authorize("admin"),
  deleteAllUsers
);
```

Results:

```text
No JWT
→ 401 Unauthorized

Valid JWT + user role
→ 403 Forbidden

Valid JWT + admin role
→ Access granted
```

Never allow public registration to directly choose an admin role.

---

# 🌐 API Endpoints

## Authentication APIs

| Method | Endpoint             | Access  | Description      |
| ------ | -------------------- | ------- | ---------------- |
| POST   | `/api/auth/register` | Public  | Register account |
| POST   | `/api/auth/login`    | Public  | Login            |
| GET    | `/api/auth/me`       | Private | Current user     |

---

## User APIs

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| POST   | `/api/users`               | Create user              |
| GET    | `/api/users`               | Get users                |
| GET    | `/api/users/:id`           | Get user                 |
| PUT    | `/api/users/:id`           | Full update              |
| PATCH  | `/api/users/:id`           | Partial update           |
| DELETE | `/api/users/:id`           | Delete user              |
| DELETE | `/api/users`               | Delete all users — Admin |
| POST   | `/api/users/profile-image` | Upload profile image     |

---

# 🔎 Search

Example:

```http
GET /api/users?search=abhishek
```

MongoDB query:

```js
filter.$or = [
  {
    name: {
      $regex: search,
      $options: "i",
    },
  },
  {
    email: {
      $regex: search,
      $options: "i",
    },
  },
];
```

`$options: "i"` makes the search case-insensitive.

---

# 🎯 Filtering

Example:

```http
GET /api/users?role=admin
```

Equivalent filter:

```js
filter.role = "admin";
```

---

# ↕️ Sorting

Ascending:

```http
GET /api/users?sort=name
```

Descending:

```http
GET /api/users?sort=-name
```

Newest first:

```http
GET /api/users?sort=-createdAt
```

---

# 📄 Pagination

Example:

```http
GET /api/users?page=2&limit=10
```

Formula:

```text
skip = (page - 1) × limit
```

Example:

```text
page  = 2
limit = 10

skip = (2 - 1) × 10
     = 10
```

Mongoose:

```js
User.find(filter)
  .sort(sort)
  .skip(skip)
  .limit(limit);
```

Total records:

```js
User.countDocuments(filter);
```

Example response:

```json
{
  "success": true,
  "pagination": {
    "currentPage": 2,
    "totalPages": 10,
    "totalUsers": 100,
    "limit": 10
  },
  "data": []
}
```

---

# 🔥 Combined Query

Search, filter, sorting and pagination can work together:

```http
GET /api/users?search=abhishek&role=user&page=1&limit=10&sort=-createdAt
```

Flow:

```text
Request
   │
   ▼
Search
   │
   ▼
Filter
   │
   ▼
Sort
   │
   ▼
Pagination
   │
   ▼
MongoDB
   │
   ▼
Response
```

---

# 🖼️ File Upload with Multer

Profile images are uploaded using:

```text
multipart/form-data
```

Route:

```js
router.post(
  "/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);
```

---

## Upload Flow

```text
Client
  │
  │ multipart/form-data
  ▼
Protected Route
  │
  ▼
JWT Authentication
  │
  ▼
Multer
  │
  ├── Check MIME type
  ├── Check file size
  ├── Generate filename
  └── Save file
  │
  ▼
req.file
  │
  ▼
Controller
  │
  ▼
Store image path
  │
  ▼
MongoDB
```

---

# 📦 Multer Storage

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});
```

---

# 📷 Allowed Image Types

```text
JPEG
PNG
WEBP
```

Example:

```js
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
```

Maximum file size:

```text
5 MB
```

---

# 📁 File vs Database

The actual image is stored in:

```text
uploads/
└── profiles/
    └── 1788281000-image.jpg
```

MongoDB stores only its path:

```json
{
  "profileImage": "/uploads/profiles/1788281000-image.jpg"
}
```

---

# 📤 `req.body` vs `req.file`

```text
JSON / Text
     ↓
req.body

Single File
     ↓
req.file

Multiple Files
     ↓
req.files
```

---

# 🌍 Serving Static Images

In `app.js`:

```js
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);
```

A saved image can then be accessed at:

```text
http://localhost:5000/uploads/profiles/image.jpg
```

For production systems, object/cloud storage is generally preferable to relying on local application storage.

---

# 🛡️ Security

The API implements multiple security layers.

```text
Client
   │
   ▼
Helmet
   │
   ▼
CORS
   │
   ▼
Payload Limit
   │
   ▼
Rate Limiting
   │
   ▼
JWT Authentication
   │
   ▼
Role Authorization
   │
   ▼
Controller
```

---

# 🪖 Helmet

Install:

```bash
npm install helmet
```

Use:

```js
app.use(helmet());
```

Helmet adds security-related HTTP headers.

---

# 🌐 CORS

Example:

```js
app.use(
  cors({
    origin: process.env.FRONTEND_URL,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);
```

---

# 📦 Payload Limit

```js
app.use(
  express.json({
    limit: "10kb",
  })
);
```

This limits normal JSON request bodies.

Multer separately limits uploaded files.

---

# 🚦 API Rate Limiting

Install:

```bash
npm install express-rate-limit
```

Global limiter:

```js
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);
```

This allows approximately:

```text
100 requests / 15 minutes
```

per limiter key.

Exceeded requests receive:

```text
429 Too Many Requests
```

---

# 🔐 Login Rate Limiting

Login receives stricter protection.

```js
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },
});
```

Route:

```js
router.post(
  "/login",
  loginLimiter,
  login
);
```

This helps reduce brute-force login attempts.

---

# ❌ Centralized Error Handling

Errors are handled in one place.

Examples:

```text
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
409 → Conflict
429 → Too Many Requests
500 → Internal Server Error
```

Example response:

```json
{
  "success": false,
  "message": "User not found"
}
```

---

# 🎟️ JWT Error Handling

Invalid JWT:

```json
{
  "success": false,
  "message": "Invalid token"
}
```

Status:

```text
401
```

Expired JWT:

```json
{
  "success": false,
  "message": "Token expired"
}
```

---

# 🔐 Password Security

Passwords are hashed using bcrypt.

```text
Plain Password
      │
      ▼
bcrypt.genSalt()
      │
      ▼
bcrypt.hash()
      │
      ▼
Password Hash
      │
      ▼
MongoDB
```

During login:

```text
Entered Password
       +
Stored Hash
       │
       ▼
bcrypt.compare()
       │
       ▼
true / false
```

Plain-text passwords must never be stored in the database.

---

# 🚫 Mass Assignment Protection

Avoid:

```js
User.findByIdAndUpdate(
  req.params.id,
  req.body
);
```

A malicious client might send:

```json
{
  "role": "admin"
}
```

Instead, whitelist fields:

```js
const allowedUpdates = [
  "name",
  "age",
];
```

Only approved fields should be updated.

---

# 🧪 Postman Testing

Recommended testing order:

```text
Register
   ↓
Login
   ↓
Copy JWT
   ↓
Get Current User
   ↓
Test CRUD
   ↓
Test Authorization
   ↓
Test Search
   ↓
Test Filtering
   ↓
Test Sorting
   ↓
Test Pagination
   ↓
Upload Image
   ↓
Test Invalid JWT
   ↓
Test Rate Limiting
```

---

# 🔑 Testing Protected Routes

Postman:

```text
Authorization
     ↓
Bearer Token
     ↓
Paste JWT
```

Equivalent HTTP header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🖼️ Testing File Upload

Postman:

```text
Body
 ↓
form-data
```

Add:

```text
KEY       TYPE       VALUE

image     File       profile.jpg
```

The field name must match:

```js
upload.single("image");
```

---

# 🚀 Production Deployment

Before deployment, ensure:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Server:

```js
const dotenv = require("dotenv");

dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Server running on port ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Failed to start server:",
      error
    );

    process.exit(1);
  }
};

startServer();
```

---

# ☁️ Production Database

Local development:

```env
MONGO_URI=mongodb://localhost:27017/backend_crud
```

`localhost` will not refer to your development computer once the backend is deployed.

Use a remotely accessible production database such as MongoDB Atlas.

Conceptual example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/backend_crud
```

Never commit the actual connection string if it contains credentials.

---

# 🌎 Production Environment

Example production environment:

```env
NODE_ENV=production

MONGO_URI=<production-database-uri>

JWT_SECRET=<strong-production-secret>

FRONTEND_URL=https://your-frontend.com
```

Hosting providers should store these values as environment variables rather than putting secrets directly into source code.

---

# 🔄 Development vs Production Architecture

```text
DEVELOPMENT

React
localhost:5173
      │
      ▼
Node API
localhost:5000
      │
      ▼
Local MongoDB
```

Production:

```text
PRODUCTION

Deployed Frontend
       │
       ▼
Deployed Node API
       │
       ▼
MongoDB Atlas
```

---

# 📊 HTTP Status Codes

|  Code | Meaning               | Example                 |
| ----: | --------------------- | ----------------------- |
| `200` | OK                    | Successful request      |
| `201` | Created               | User registered         |
| `400` | Bad Request           | Invalid input           |
| `401` | Unauthorized          | Missing/invalid JWT     |
| `403` | Forbidden             | Insufficient role       |
| `404` | Not Found             | User doesn't exist      |
| `409` | Conflict              | Duplicate email         |
| `413` | Payload Too Large     | Request too large       |
| `429` | Too Many Requests     | Rate limit reached      |
| `500` | Internal Server Error | Unexpected server error |

---

# 🧠 Complete Request Lifecycle

```text
CLIENT
  │
  ▼
HTTP Request
  │
  ▼
Helmet
  │
  ▼
CORS
  │
  ▼
Body Parser
  │
  ▼
Rate Limiter
  │
  ▼
Router
  │
  ▼
Authentication
  │
  ▼
Authorization
  │
  ▼
Multer (if file)
  │
  ▼
Controller
  │
  ▼
Mongoose
  │
  ▼
MongoDB
  │
  ▼
Controller
  │
  ▼
JSON Response
  │
  ▼
CLIENT
```

---

# 🗺️ Learning Roadmap Completed

| Step | Topic                        | Status |
| ---: | ---------------------------- | :----: |
|    1 | Express Project Setup        |    ✅   |
|    2 | MongoDB + Mongoose           |    ✅   |
|    3 | CRUD APIs                    |    ✅   |
|    4 | Validation + Error Handling  |    ✅   |
|    5 | Register + Login + bcrypt    |    ✅   |
|    6 | JWT + Protected Routes       |    ✅   |
|    7 | Role-Based Authorization     |    ✅   |
|    8 | Search + Filtering + Sorting |    ✅   |
|    9 | Pagination                   |    ✅   |
|   10 | Multer File Upload           |    ✅   |
|   11 | Security + Rate Limiting     |    ✅   |
|   12 | API Testing + Deployment     |    ✅   |

**Progress: 12 / 12 — Completed 🎉**

---

# 🎯 Concepts Learned

After completing this project, you should understand:

```text
REST APIs
Express
Routing
Middleware
Controllers
MongoDB
Mongoose
CRUD
Validation
Centralized Errors
bcrypt
JWT
Authentication
Authorization
RBAC
Query Parameters
Search
Filtering
Sorting
Pagination
Multer
multipart/form-data
Static Files
Helmet
CORS
Rate Limiting
Environment Variables
Development vs Production
API Testing
Deployment
```

---

# 🔮 Recommended Next Topics

After mastering this project, good next backend topics are:

```text
Refresh Tokens
Access Token Rotation
HTTP-only Cookies
Email Verification
Forgot Password / Reset Password
OTP
Redis
Caching
MongoDB Indexing
Logging
API Documentation with Swagger/OpenAPI
Unit Testing
Integration Testing
Docker
CI/CD
Background Jobs
Message Queues
WebSockets
Cloud Storage
```

These topics take the project from a strong REST API foundation toward larger production backend systems.

---

# 📌 Final Summary

This project demonstrates the complete flow of a modern Node.js REST backend:

```text
Client Request
      ↓
Security Middleware
      ↓
Authentication
      ↓
Authorization
      ↓
Route
      ↓
Controller
      ↓
Database
      ↓
Response
```

It combines **CRUD operations, authentication, authorization, file handling, querying, security, testing, and deployment** in one structured backend project.

---

## ⭐ Project Status

```text
Backend REST API
████████████████████ 100%

12 / 12 Steps Completed ✅
```

The backend foundation is complete and ready to be extended with more advanced production features.
