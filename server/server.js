require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 8080;
connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log('Server running on', PORT));
});