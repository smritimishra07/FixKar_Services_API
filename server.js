const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const serviceRoutes = require('./routes/serviceRoutes');
const providerRoutes = require('./routes/providerRoutes');

const app = express();
const PORT = 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/api/services', serviceRoutes);
app.use('/api/providers', providerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
