import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';

// Load environment variables from .env
dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRoutes);

// Connect to MongoDB
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('API is working properly!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.listen(5000, () => console.log('Server running on port 5000'));
//Use project routes
app.use('/api/projects', projectRoutes);
app.use(express.json());
