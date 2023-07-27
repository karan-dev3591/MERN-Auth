import express from "express";
import dotenv from 'dotenv';
dotenv.config(); //This confirguration get the .env file data
const port = process.env.PORT; 
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.use(cookieParser());

app.get('/' , (req,res) => res.send('Server is Ready'));

app.listen(port, () => console.log(`Server started on port ${port}`));
