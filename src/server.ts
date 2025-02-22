import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import api from './routes/api';

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Route
app.use('/api', api);

// Set port
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Connect to the database then start the server
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);
