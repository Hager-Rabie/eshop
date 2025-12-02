import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import 'dotenv/config';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import detectPort from 'detect-port';

const DEFAULT_PORT = 5000;

// ----- إنشاء الابلكيشن ----- //
const app = express();

// ----- Middlewares ----- //
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----- Routes ----- //
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/payment', paymentRoutes);

// ----- Production build ----- //
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// ----- Error handlers ----- //
app.use(notFound);
app.use(errorHandler);

// ----- Connect to MongoDB ----- //
connectDB();

// ----- Listen on port ----- //
const startServer = async () => {
  const PORT = await detectPort(DEFAULT_PORT); // لو 5000 مش فاضي، يختار فاضي تلقائي
  if (PORT !== DEFAULT_PORT) console.log(`Port ${DEFAULT_PORT} busy, using ${PORT} instead`);
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
};

startServer();
