import express from 'express';
import path from 'path';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

// Notes API
app.use('/api/note', noteRoutes);

// Production settings
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front-end/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end", "dist", "index.html"));
  });
}

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
