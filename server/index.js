require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const createSocketIO = require("./routes/socketio");

const connectToDatabase = require("./mongo");

const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const medicineRoute = require('./routes/medicine');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

const app = express();

connectToDatabase();

// Middleware
app.use(cors());
const server = http.createServer(app);
createSocketIO(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/medicine', medicineRoute);
app.use('/api/user', userRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
