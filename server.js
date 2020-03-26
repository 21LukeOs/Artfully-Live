const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/photos', require('./routes/api/photos'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));