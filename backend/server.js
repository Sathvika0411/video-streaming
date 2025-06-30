import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(8000, () => console.log('Server running on 8000')))
  .catch(err => console.log(err));
