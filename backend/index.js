// index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes"); 
const bookRoutes = require("./routes/bookRoutes"); 
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

connectDB();

app.listen(PORT,()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('✅ MongoDB connected');
})
