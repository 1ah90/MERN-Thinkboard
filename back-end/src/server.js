import express from 'express';
import cors from "cors"
// note route 
import noteRoutes from './routes/noteRoutes.js';
// connection with database 
import connectDB from './config/db.js';
// configration to env file 
import dotenv from "dotenv"
dotenv.config()

// connectioon & run the server
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`the server run in port ${PORT}`);
  });

})

// the app server 
const app = express();

// middleware 
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",

}))


// notes
app.use('/api/note', noteRoutes);

const PORT = process.env.PORT || 5001

