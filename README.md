# Pharmic - Online Pharmacy Management System 💊

A full-stack e-commerce platform for online pharmacy management, built with Angular and Node.js. This application provides a seamless experience for customers to browse and purchase medicines, while offering comprehensive administrative tools for managing inventory, orders, and users.

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.jpeg)
The landing page showcases featured medicines, categories, and services with an intuitive user interface designed for easy navigation.

### All Medicines
![All Medicines](screenshots/all_medecines.jpeg)
Browse through the complete catalog of available medicines with detailed information, pricing, and easy add-to-cart functionality.

### Shopping Cart
![Shopping Cart](screenshots/cart.jpeg)
View and manage items in your cart with quantity adjustments, price calculations, and direct checkout access.

### Checkout
![Checkout](screenshots/checkout.jpeg)
Secure checkout process with order summary, delivery information, and payment options.

### Admin Dashboard
![Admin Dashboard](screenshots/admin.jpeg)
Comprehensive administrative panel for managing medicines, categories, users, and orders with real-time updates.

## 🚀 Features

### For Customers
- 🏠 **Home Page**: Featured products, categories, and promotional services
- 🔍 **Medicine Catalog**: Browse and search through all available medicines
- 🛒 **Shopping Cart**: Add, update, and remove items with real-time price calculations
- 💳 **Secure Checkout**: Complete order process with delivery details
- 👤 **User Dashboard**: View order history and manage account settings
- 📦 **Order Tracking**: Track order status and history

### For Administrators
- 📊 **Admin Dashboard**: Overview of system statistics and activities
- 💊 **Medicine Management**: Add, edit, and delete medicines
- 📂 **Category Management**: Organize medicines into categories
- 👥 **User Management**: Manage customer accounts and permissions
- 📋 **Order Management**: View and process customer orders
- 🔄 **Real-time Updates**: Socket.io integration for live order notifications

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 16
- **UI Components**: Angular Material
- **Styling**: TailwindCSS
- **Icons**: Font Awesome
- **Carousel**: ngx-owl-carousel-o
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Real-time Communication**: Socket.io
- **File Upload**: Multer
- **CORS**: Enabled for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4 or higher)
- **Angular CLI** (v16)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pharmic.git
cd pharmic
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pharmic
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd client
npm install
```

Update proxy configuration if needed in `proxy.config.json`:
```json
{
  "/api": {
    "target": "http://localhost:5000",
    "secure": false
  }
}
```

Start the Angular development server:
```bash
npm start
```

The application will run on `http://localhost:4200`

### 4. Database Seeding (Optional)
To populate the database with sample data:
```bash
cd server
node seed.js
```

## 📁 Project Structure

```
pharmic/
├── client/                    # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable components
│   │   │   │   ├── admin/    # Admin-specific components
│   │   │   │   └── user/     # User-specific components
│   │   │   ├── layouts/      # Layout components
│   │   │   ├── models/       # TypeScript interfaces and models
│   │   │   ├── pages/        # Page components
│   │   │   └── services/     # Angular services for API calls
│   │   └── assets/           # Static assets (images, etc.)
│   └── package.json
│
├── server/                    # Node.js backend application
│   ├── models/               # MongoDB schemas
│   ├── routes/               # Express route handlers
│   ├── middlewares/          # Custom middleware (auth, etc.)
│   ├── index.js              # Main server file
│   ├── mongo.js              # MongoDB connection
│   └── package.json
│
└── screenshots/              # Application screenshots
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are generated upon successful login
- Protected routes require valid JWT in the Authorization header
- Admin routes have additional role-based authorization

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Medicines
- `GET /api/medicine` - Get all medicines
- `GET /api/medicine/:id` - Get single medicine
- `POST /api/medicine` - Add new medicine (Admin)
- `PUT /api/medicine/:id` - Update medicine (Admin)
- `DELETE /api/medicine/:id` - Delete medicine (Admin)

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Add new category (Admin)
- `PUT /api/category/:id` - Update category (Admin)
- `DELETE /api/category/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/order` - Get user orders
- `POST /api/order` - Create new order
- `GET /api/order/admin` - Get all orders (Admin)
- `PUT /api/order/:id` - Update order status (Admin)

### Users
- `GET /api/user` - Get all users (Admin)
- `GET /api/user/:id` - Get user details
- `PUT /api/user/:id` - Update user (Admin)
- `DELETE /api/user/:id` - Delete user (Admin)

## 🔄 Real-time Features

The application uses Socket.io for real-time features:
- **Order Notifications**: Admins receive instant notifications when new orders are placed
- **Live Updates**: Order status updates are pushed to users in real-time

## 🎨 Styling

The application uses a combination of:
- **TailwindCSS**: Utility-first CSS framework for custom styling
- **Angular Material**: Pre-built UI components following Material Design
- **Custom CSS**: Additional styling for unique components

## 🧪 Testing

### Run Frontend Tests
```bash
cd client
npm test
```

### Run Backend Tests
```bash
cd server
npm test
```

## 📦 Building for Production

### Build Frontend
```bash
cd client
ng build --configuration production
```

The build artifacts will be stored in the `client/dist/` directory.

### Production Deployment
1. Build the frontend application
2. Serve the static files from your backend or a CDN
3. Configure environment variables for production
4. Use a process manager like PM2 for the Node.js server

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

**Note**: This is a demonstration project. Please ensure proper security measures, data validation, and compliance with healthcare regulations before using in a production environment.
